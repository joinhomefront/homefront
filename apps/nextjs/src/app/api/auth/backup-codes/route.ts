import { NextResponse } from "next/server";

import { auth } from "@homefront/auth";
import {
  generateBackupCodes,
  storeBackupCodes,
} from "@homefront/auth/backup-codes";
import { db } from "@homefront/db";

export async function POST() {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Generate backup codes
    const backupCodes = generateBackupCodes();

    const result = await db.transaction().execute(async (tx) => {
      return storeBackupCodes(backupCodes, session.user.id, tx);
    });

    if (!result) {
      return NextResponse.json(
        { error: "Failed to generate backup codes" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, backupCodes });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Backup codes generation error:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    } else {
      console.error("Unknown error during backup codes generation:", error);
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
