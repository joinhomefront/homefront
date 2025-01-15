import type { Kysely } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  // Add missing indexes following existing naming conventions
  await db.schema
    .createIndex("accounts_provider_idx")
    .on("accounts")
    .column("provider")
    .execute();
  await db.schema
    .createIndex("accounts_provider_account_id_idx")
    .on("accounts")
    .column("provider_account_id")
    .execute();
  await db.schema
    .createIndex("auth_challenges_user_id_idx")
    .on("auth_challenges")
    .column("user_id")
    .execute();
  await db.schema
    .createIndex("relationships_user_id_idx")
    .on("relationships")
    .column("user_id")
    .execute();
  await db.schema
    .createIndex("relationships_friend_id_idx")
    .on("relationships")
    .column("friend_id")
    .execute();
  await db.schema
    .createIndex("user_domain_areas_user_id_idx")
    .on("user_domain_areas")
    .column("user_id")
    .execute();
  await db.schema
    .createIndex("user_domain_areas_domain_area_id_idx")
    .on("user_domain_areas")
    .column("domain_area_id")
    .execute();
  await db.schema
    .createIndex("user_actions_completed_at_idx")
    .on("user_actions")
    .column("completed_at")
    .execute();
  await db.schema
    .createIndex("user_actions_position_idx")
    .on("user_actions")
    .column("position")
    .execute();
  await db.schema
    .createIndex("recommended_actions_responded_at_idx")
    .on("recommended_actions")
    .column("responded_at")
    .execute();
  await db.schema
    .createIndex("invites_user_id_idx")
    .on("invites")
    .column("user_id")
    .execute();
  await db.schema
    .createIndex("invites_code_idx")
    .on("invites")
    .column("code")
    .execute();
  await db.schema
    .createIndex("invites_used_idx")
    .on("invites")
    .column("used")
    .execute();
  await db.schema
    .createIndex("user_locations_user_id_idx")
    .on("user_locations")
    .column("user_id")
    .execute();

  // Add missing foreign key constraints
  await db.schema
    .alterTable("user_domain_areas")
    .addForeignKeyConstraint(
      "user_domain_areas_user_id_fk",
      ["user_id"],
      "users",
      ["id"],
    )
    .execute();

  await db.schema
    .alterTable("user_domain_areas")
    .addForeignKeyConstraint(
      "user_domain_areas_domain_area_id_fk",
      ["domain_area_id"],
      "domain_areas",
      ["id"],
    )
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  // Drop indexes using consistent naming patterns
  await db.schema.dropIndex("accounts_provider_idx").execute();
  await db.schema.dropIndex("accounts_provider_account_id_idx").execute();
  await db.schema.dropIndex("auth_challenges_user_id_idx").execute();
  await db.schema.dropIndex("relationships_user_id_idx").execute();
  await db.schema.dropIndex("relationships_friend_id_idx").execute();
  await db.schema.dropIndex("user_domain_areas_user_id_idx").execute();
  await db.schema.dropIndex("user_domain_areas_domain_area_id_idx").execute();
  await db.schema.dropIndex("user_actions_completed_at_idx").execute();
  await db.schema.dropIndex("user_actions_position_idx").execute();
  await db.schema.dropIndex("recommended_actions_responded_at_idx").execute();
  await db.schema.dropIndex("invites_user_id_idx").execute();
  await db.schema.dropIndex("invites_code_idx").execute();
  await db.schema.dropIndex("invites_used_idx").execute();
  await db.schema.dropIndex("user_locations_user_id_idx").execute();

  // Drop foreign key constraints using consistent naming patterns
  await db.schema
    .alterTable("user_domain_areas")
    .dropConstraint("user_domain_areas_user_id_fk")
    .execute();

  await db.schema
    .alterTable("user_domain_areas")
    .dropConstraint("user_domain_areas_domain_area_id_fk")
    .execute();
}
