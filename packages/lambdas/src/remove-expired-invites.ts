import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

import { db } from "@homefront/db";

neonConfig.webSocketConstructor = ws;

export async function handler() {
  try {
    const result = await db.transaction().execute(async (tx) => {
      const now = new Date();

      // Find expired invites
      const expiredInvites = await tx
        .selectFrom("invites")
        .select(["id"])
        .where("expiresAt", "<", now)
        .execute();

      if (expiredInvites.length === 0) {
        return { removed: 0 };
      }

      // Delete expired invites
      await tx.deleteFrom("invites").where("expiresAt", "<", now).execute();

      return { removed: expiredInvites.length };
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successfully removed ${result.removed} expired invites`,
        removed: result.removed,
      }),
    };
  } catch (error) {
    console.error("Error removing expired invites:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to remove expired invites",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
}
