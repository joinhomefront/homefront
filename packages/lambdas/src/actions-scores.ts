import { neonConfig } from "@neondatabase/serverless";
import { sql } from "kysely";
import ws from "ws";

import { db } from "@homefront/db";

neonConfig.webSocketConstructor = ws;

export async function handler() {
  try {
    const result = await db
      .updateTable("actions as r")
      .set({
        hotScore: sql`
          log(10, GREATEST(
            (SELECT COALESCE(SUM(vote), 0) FROM action_votes WHERE action_id = r.id), 
            1
          )) + 
          (1 - EXTRACT(EPOCH FROM (now() - created_at)) / 45000)
        `,
        risingScore: sql`(
          COALESCE(
            (
              SELECT COALESCE(SUM(vote), 0) / EXTRACT(EPOCH FROM (NOW() - MIN(created_at))) 
              FROM action_votes 
              WHERE action_id = r.id
              AND created_at > now() - interval '24 hours'
            ), 0
          )
        )`,
      })
      .execute();

    return {
      statusCode: 200,
      body: JSON.stringify({ updated: result.length }),
    };
  } catch (error) {
    console.error("Error updating scores:", error);
    return { statusCode: 500 };
  }
}
