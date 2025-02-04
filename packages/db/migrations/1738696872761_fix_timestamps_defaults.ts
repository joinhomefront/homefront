import type { Kysely } from "kysely";
import { sql } from "kysely";

const columnsToUpdate = [
  { table: "actions", columns: ["completed_at", "due_date", "due_time"] },
  { table: "auth_challenges", columns: ["expires_at"] },
  { table: "auth_codes", columns: ["expires_at"] },
  { table: "backup_codes", columns: ["used_at"] },
  { table: "invites", columns: ["expires_at"] },
  { table: "recommended_actions", columns: ["responded_at"] },
  { table: "relationships", columns: ["invite_created_at"] },
  { table: "sessions", columns: ["expires"] },
  { table: "stripe_events", columns: ["processed_at"] },
  {
    table: "tokens",
    columns: ["access_token_expires_at", "refresh_token_expires_at"],
  },
  {
    table: "user_actions",
    columns: ["completed_at", "due_date", "due_time"],
  },
];

export async function up(db: Kysely<unknown>): Promise<void> {
  for (const { table, columns } of columnsToUpdate) {
    for (const column of columns) {
      // We need to NULL all the values that are equal to the default value
      const nullQuery = sql`
        UPDATE ${sql.table(table)}
        SET ${sql.ref(column)} = NULL
        WHERE ${sql.ref(column)} IS NOT NULL 
        AND ${sql.ref(column)} = ${sql.ref("created_at")}`;

      await db.executeQuery(nullQuery.compile(db));

      await db.schema
        .alterTable(table)
        .alterColumn(column, (col) => col.dropDefault())
        .execute();
    }
  }
}

export async function down(db: Kysely<unknown>): Promise<void> {
  for (const { table, columns } of columnsToUpdate) {
    for (const column of columns) {
      await db.schema
        .alterTable(table)
        .alterColumn(column, (col) => col.setDefault(sql`now()`))
        .execute();
    }
  }
}
