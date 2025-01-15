import type { Kysely } from "kysely";
import { sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  // Stripe Customers
  await db.schema
    .createTable("stripe_customers")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("user_id", "uuid", (col) =>
      col.notNull().references("users.id").unique(),
    )
    .addColumn("stripe_customer_id", "bytea", (col) => col.notNull())
    .addColumn("stripe_customer_id_hash", "text", (col) =>
      col.notNull().unique(),
    )
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  // Stripe Products
  await db.schema
    .createTable("stripe_products")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("stripe_product_id", "text", (col) => col.notNull().unique())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("active", "boolean", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  // Stripe Prices
  await db.schema
    .createTable("stripe_prices")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("stripe_price_id", "text", (col) => col.notNull().unique())
    .addColumn("stripe_product_id", "text", (col) =>
      col.notNull().references("stripe_products.stripe_product_id"),
    )
    .addColumn("amount", "integer")
    .addColumn(
      "type",
      sql`text CHECK (type IN ('one_time', 'monthly', 'yearly'))`,
      (col) => col.notNull(),
    )
    .addColumn("lookup_key", "text", (col) => col.notNull().unique())
    .addColumn("active", "boolean", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  // Stripe Subscriptions
  await db.schema
    .createTable("stripe_subscriptions")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("stripe_subscription_id", "bytea", (col) => col.notNull())
    .addColumn("stripe_subscription_id_hash", "text", (col) =>
      col.notNull().unique(),
    )
    .addColumn("stripe_customer_id", "bytea", (col) => col.notNull())
    .addColumn("stripe_customer_id_hash", "text", (col) =>
      col.notNull().references("stripe_customers.stripe_customer_id_hash"),
    )
    .addColumn("stripe_price_id", "text", (col) =>
      col.notNull().references("stripe_prices.stripe_price_id"),
    )
    .addColumn("status", "text", (col) => col.notNull())
    .addColumn("current_period_start", "bigint", (col) => col.notNull())
    .addColumn("current_period_end", "bigint", (col) => col.notNull())
    .addColumn("cancel_at", "bigint")
    .addColumn("canceled_at", "bigint")
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  // Stripe Payment Intents
  await db.schema
    .createTable("stripe_payment_intents")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("stripe_payment_intent_id", "bytea", (col) => col.notNull())
    .addColumn("stripe_payment_intent_id_hash", "text", (col) =>
      col.notNull().unique(),
    )
    .addColumn("stripe_customer_id", "bytea", (col) => col.notNull())
    .addColumn("stripe_customer_id_hash", "text", (col) =>
      col.notNull().references("stripe_customers.stripe_customer_id_hash"),
    )
    .addColumn("stripe_price_id", "text", (col) =>
      col.notNull().references("stripe_prices.stripe_price_id"),
    )
    .addColumn("amount", "integer", (col) => col.notNull())
    .addColumn("status", "text", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  // Stripe Events
  await db.schema
    .createTable("stripe_events")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("stripe_event_id", "text", (col) => col.notNull())
    .addColumn("stripe_event_id_hash", "text", (col) => col.notNull().unique())
    .addColumn("type", "text", (col) => col.notNull())
    .addColumn(
      "status",
      sql`text CHECK (status IN ('pending', 'processed', 'failed', 'unhandled'))`,
      (col) => col.notNull().defaultTo("pending"),
    )
    .addColumn("error", "text")
    .addColumn("processed_at", "timestamp")
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable("stripe_events").execute();
  await db.schema.dropTable("stripe_payment_intents").execute();
  await db.schema.dropTable("stripe_subscriptions").execute();
  await db.schema.dropTable("stripe_prices").execute();
  await db.schema.dropTable("stripe_products").execute();
  await db.schema.dropTable("stripe_customers").execute();
}
