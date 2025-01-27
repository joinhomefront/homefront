import { neonConfig } from "@neondatabase/serverless";
import { sql } from "kysely";
import ws from "ws";

import { db } from "@homefront/db";

neonConfig.webSocketConstructor = ws;

export async function handler() {
  try {
    const result = await db
      .updateTable("resources as r")
      .set({
        votes: sql`(
          SELECT COALESCE(SUM(vote), 0) 
          FROM resource_votes 
          WHERE resource_id = r.id
        )`,
      })
      .where(
        sql<boolean>`EXISTS (
        SELECT 1 
        FROM resource_votes 
        WHERE resource_id = r.id 
        AND updated_at > now() - interval '10 minutes'
      )`,
      )
      .execute();

    return {
      statusCode: 200,
      body: JSON.stringify({ updated: result.length }),
    };
  } catch (error) {
    console.error("Error updating votes:", error);
    return { statusCode: 500 };
  }
}
