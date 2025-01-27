import type { Kysely } from "kysely";
import { sql } from "kysely";

const columnsToUpdate = [
  { table: "accounts", columns: ["created_at", "updated_at"] },
  { table: "action_domain_areas", columns: ["created_at", "updated_at"] },
  { table: "action_roles", columns: ["created_at", "updated_at"] },
  { table: "action_skills", columns: ["created_at", "updated_at"] },
  { table: "action_votes", columns: ["created_at", "updated_at"] },
  {
    table: "actions",
    columns: [
      "completed_at",
      "created_at",
      "due_date",
      "due_time",
      "updated_at",
    ],
  },
  {
    table: "auth_challenges",
    columns: ["created_at", "expires_at", "updated_at"],
  },
  { table: "auth_codes", columns: ["created_at", "expires_at", "updated_at"] },
  { table: "avatars", columns: ["created_at", "updated_at"] },
  { table: "backup_codes", columns: ["created_at", "updated_at", "used_at"] },
  { table: "clients", columns: ["created_at", "updated_at"] },
  { table: "curated_actions", columns: ["created_at", "updated_at"] },
  { table: "domain_areas", columns: ["created_at", "updated_at"] },
  { table: "equipment", columns: ["created_at", "updated_at"] },
  { table: "esco_onet_mappings", columns: ["created_at", "updated_at"] },
  { table: "invites", columns: ["created_at", "expires_at", "updated_at"] },
  { table: "occupation_skills", columns: ["created_at", "updated_at"] },
  { table: "occupation_titles", columns: ["created_at", "updated_at"] },
  { table: "occupations", columns: ["created_at", "updated_at"] },
  {
    table: "recommended_actions",
    columns: ["created_at", "responded_at", "updated_at"],
  },
  { table: "recovery_phrases", columns: ["created_at"] },
  {
    table: "relationships",
    columns: ["created_at", "invite_created_at", "updated_at"],
  },
  { table: "reports", columns: ["created_at", "updated_at"] },
  { table: "resource_bookmarks", columns: ["created_at", "updated_at"] },
  { table: "resource_domain_areas", columns: ["created_at", "updated_at"] },
  { table: "resource_votes", columns: ["created_at", "updated_at"] },
  { table: "resources", columns: ["created_at", "updated_at"] },
  { table: "role_domain_areas", columns: ["created_at", "updated_at"] },
  { table: "role_occupations", columns: ["created_at", "updated_at"] },
  { table: "role_skills", columns: ["created_at", "updated_at"] },
  { table: "roles", columns: ["created_at", "updated_at"] },
  { table: "sessions", columns: ["created_at", "expires", "updated_at"] },
  { table: "skill_domain_areas", columns: ["created_at", "updated_at"] },
  { table: "skills", columns: ["created_at", "updated_at"] },
  { table: "stripe_customers", columns: ["created_at", "updated_at"] },
  {
    table: "stripe_events",
    columns: ["created_at", "processed_at", "updated_at"],
  },
  { table: "stripe_payment_intents", columns: ["created_at", "updated_at"] },
  { table: "stripe_prices", columns: ["created_at", "updated_at"] },
  { table: "stripe_products", columns: ["created_at", "updated_at"] },
  { table: "stripe_subscriptions", columns: ["created_at", "updated_at"] },
  {
    table: "tokens",
    columns: [
      "access_token_expires_at",
      "created_at",
      "refresh_token_expires_at",
      "updated_at",
    ],
  },
  {
    table: "user_actions",
    columns: [
      "completed_at",
      "created_at",
      "due_date",
      "due_time",
      "updated_at",
    ],
  },
  { table: "user_domain_areas", columns: ["created_at", "updated_at"] },
  { table: "user_equipment", columns: ["created_at", "updated_at"] },
  { table: "user_locations", columns: ["created_at", "updated_at"] },
  { table: "user_occupations", columns: ["created_at", "updated_at"] },
  { table: "user_roles", columns: ["created_at", "updated_at"] },
  { table: "user_skills", columns: ["created_at", "updated_at"] },
  { table: "users", columns: ["created_at", "email_verified", "updated_at"] },
  {
    table: "verification_tokens",
    columns: ["created_at", "expires", "updated_at"],
  },
] as const;

export async function up(db: Kysely<unknown>): Promise<void> {
  for (const { table, columns } of columnsToUpdate) {
    for (const column of columns) {
      const tempColumn = `${column}_new`;

      await db.schema
        .alterTable(table)
        .addColumn(tempColumn, "timestamptz", (col) =>
          col.defaultTo(sql`now()`),
        )
        .execute();

      const query = sql`
			UPDATE ${sql.table(table)}
			SET ${sql.ref(tempColumn)} = ${sql.ref(column)}::timestamp
				AT TIME ZONE 'UTC'
			WHERE ${sql.ref(column)} IS NOT NULL`;

      await db.executeQuery(query.compile(db));

      await db.schema.alterTable(table).dropColumn(column).execute();

      await db.schema
        .alterTable(table)
        .renameColumn(tempColumn, column)
        .execute();
    }
  }
}

export async function down(db: Kysely<unknown>): Promise<void> {
  for (const { table, columns } of columnsToUpdate) {
    for (const column of columns) {
      const tempColumn = `${column}_old`;

      await db.schema
        .alterTable(table)
        .addColumn(tempColumn, "timestamp", (col) => col.defaultTo(sql`now()`))
        .execute();

      await db.executeQuery(
        sql`
          UPDATE ${sql.id(table)}
          SET ${sql.ref(tempColumn)} =
            CASE
              WHEN ${sql.ref(column)} IS NOT NULL
              THEN ${sql.ref(column)} AT TIME ZONE 'UTC'
              ELSE NULL
            END
        `.compile(db),
      );

      await db.schema.alterTable(table).dropColumn(column).execute();

      await db.schema
        .alterTable(table)
        .renameColumn(tempColumn, column)
        .execute();
    }
  }
}
