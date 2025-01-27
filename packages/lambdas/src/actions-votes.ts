import { neonConfig } from "@neondatabase/serverless";
import { sql } from "kysely";
import ws from "ws";

import { db } from "@homefront/db";

neonConfig.webSocketConstructor = ws;

export async function handler() {
  try {
    const result = await db
      .updateTable("actions as a")
      .set({
        votes: sql`(
          SELECT COALESCE(SUM(vote), 0) 
          FROM action_votes 
          WHERE action_id = a.id
        )`,
      })
      .where(
        sql<boolean>`EXISTS (
        SELECT 1 
        FROM action_votes 
        WHERE action_id = a.id 
        AND updated_at > now() - interval '1 month'
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
