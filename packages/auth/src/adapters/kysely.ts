import type {
  Adapter,
  AdapterAccount,
  AdapterSession,
  AdapterUser,
} from "@auth/core/adapters";
import type { JWT } from "next-auth/jwt";
import { isDate } from "@auth/core/adapters";
import { Kysely, SqliteAdapter } from "kysely";
import { decode } from "next-auth/jwt";

import type {
  Database,
  NewAccount,
  NewSession,
  NewUser,
  Session,
  User,
  VerificationToken,
} from "@homefront/db";

import type { KyselyAdapterUser, SanitizedUser } from "../types";
import { env } from "../../env";

export const format = {
  from<T>(object?: Record<string, unknown>): T {
    const newObject: Record<string, unknown> = {};
    for (const key in object) {
      const value = object[key];
      if (isDate(value))
        newObject[key] = new Date(value as string | number | Date);
      else newObject[key] = value;
    }
    return newObject as T;
  },
  to<T>(object: Record<string, unknown>): T {
    const newObject: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(object))
      newObject[key] = value instanceof Date ? value.toISOString() : value;
    return newObject as T;
  },
};

function mapToAdapterUser(user: SanitizedUser): KyselyAdapterUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email ?? "", // email is nullable in the database
    emailVerified: user.emailVerified,
    image: user.image,
    role: user.role,
    username: user.username,
    twoFactorEnabled: user.twoFactorEnabled,
  };
}

function mapFromAdapterAccount(account: AdapterAccount): NewAccount {
  return {
    userId: account.userId,
    providerAccountId: account.providerAccountId,
    type: account.type,
    expires_at: account.expires_at ?? null,
    access_token: account.access_token ?? null,
    refresh_token: account.refresh_token ?? null,
    token_type: account.token_type ?? null,
    id_token: account.id_token ?? null,
    scope: account.scope ?? null,
    provider: account.provider,
  };
}

function mapToNewSession(session: AdapterSession): NewSession {
  return {
    userId: session.userId,
    sessionToken: session.sessionToken,
    expires: session.expires,
  };
}

function mapToAdapterSession(session: Session): AdapterSession {
  return {
    userId: session.userId,
    sessionToken: session.sessionToken,
    expires: session.expires,
  };
}

async function decodeSessionToken(sessionToken: string): Promise<JWT | null> {
  return decode<JWT>({
    token: sessionToken,
    salt: env.AUTH_SALT,
    secret: env.AUTH_SECRET,
  });
}

type KyselyAdapterUserInput = AdapterUser & {
  passwordHash: string;
  username: string;
};

interface KyselyAdapter extends Adapter {
  createUser(data: KyselyAdapterUserInput): Promise<KyselyAdapterUser>;
  getUser(id: string): Promise<KyselyAdapterUser | null>;
  getUserByEmail(email: string): Promise<KyselyAdapterUser | null>;
  getUserByAccount(account: AdapterAccount): Promise<KyselyAdapterUser | null>;
  updateUser(user: KyselyAdapterUser): Promise<KyselyAdapterUser>;
  deleteUser(userId: string): Promise<void>;
  linkAccount(account: AdapterAccount): Promise<AdapterAccount>;
  unlinkAccount(account: AdapterAccount): Promise<void>;
  createSession(session: AdapterSession): Promise<AdapterSession>;
  getSessionAndUser(
    sessionToken: string,
  ): Promise<{ user: KyselyAdapterUser; session: AdapterSession } | null>;
  updateSession(session: AdapterSession): Promise<AdapterSession>;
  deleteSession(sessionToken: string): Promise<void>;
  createVerificationToken(data: VerificationToken): Promise<VerificationToken>;
  useVerificationToken(
    data: VerificationToken,
  ): Promise<VerificationToken | null>;
}

export function KyselyAdapter(db: Kysely<Database>): KyselyAdapter {
  const { adapter } = db.getExecutor();
  const { supportsReturning } = adapter;
  const isSqlite = adapter instanceof SqliteAdapter;
  /** If the database is SQLite, turn dates into an ISO string  */
  const to = isSqlite
    ? <T>(x: Record<string, unknown> | T): T =>
        format.to(x as Record<string, unknown>)
    : <T>(x: T): T => x;
  /** If the database is SQLite, turn ISO strings into dates */
  const from = isSqlite
    ? <T>(x: Record<string, unknown>): T => format.from(x)
    : <T>(x: T): T => x;
  return {
    async createUser(data: KyselyAdapterUserInput): Promise<KyselyAdapterUser> {
      const newUser: NewUser = {
        ...data,
        role: data.role as User["role"],
        passwordHash: data.passwordHash,
        twoFactorEnabled: false,
        twoFactorSecret: null,
      };

      const result = await db
        .insertInto("users")
        .values(to(newUser))
        .returningAll()
        .executeTakeFirstOrThrow();
      return mapToAdapterUser(from(result));
    },
    async getUser(id: string): Promise<KyselyAdapterUser | null> {
      const result = await db
        .selectFrom("users")
        .selectAll()
        .where("id", "=", id)
        .executeTakeFirst();

      if (!result) return null;

      return mapToAdapterUser(from(result));
    },
    async getUserByEmail(email?: string): Promise<KyselyAdapterUser | null> {
      if (!email || email === "") return null;

      const result = await db
        .selectFrom("users")
        .selectAll()
        .where("email", "=", email)
        .executeTakeFirst();

      if (!result) return null;

      return mapToAdapterUser(from(result));
    },
    async getUserByAccount({
      providerAccountId,
      provider,
    }): Promise<KyselyAdapterUser | null> {
      const result = await db
        .selectFrom("users")
        .innerJoin("accounts", "users.id", "accounts.userId")
        .selectAll("users")
        .where("accounts.providerAccountId", "=", providerAccountId)
        .where("accounts.provider", "=", provider)
        .executeTakeFirst();

      if (!result) return null;

      return mapToAdapterUser(from(result));
    },
    async updateUser({
      id,
      ...user
    }: KyselyAdapterUser): Promise<KyselyAdapterUser> {
      const userData = to(user);
      const query = db
        .updateTable("users")
        .set(userData as User)
        .where("id", "=", id);
      const result = supportsReturning
        ? query.returningAll().executeTakeFirstOrThrow()
        : query
            .executeTakeFirstOrThrow()
            .then(() =>
              db
                .selectFrom("users")
                .selectAll()
                .where("id", "=", id)
                .executeTakeFirstOrThrow(),
            );
      return mapToAdapterUser(from(await result));
    },
    async deleteUser(userId: string): Promise<void> {
      await db
        .deleteFrom("users")
        .where("users.id", "=", userId)
        .executeTakeFirst();
    },
    async linkAccount(account: AdapterAccount): Promise<AdapterAccount> {
      await db
        .insertInto("accounts")
        .values(mapFromAdapterAccount(to(account)))
        .onConflict((oc) =>
          oc.columns(["providerAccountId", "provider"]).doUpdateSet({
            ...account,
          }),
        )
        .executeTakeFirstOrThrow();
      return account;
    },
    async unlinkAccount({ providerAccountId, provider }): Promise<void> {
      await db
        .deleteFrom("accounts")
        .where("accounts.providerAccountId", "=", providerAccountId)
        .where("accounts.provider", "=", provider)
        .executeTakeFirstOrThrow();
    },
    async createSession(session: AdapterSession): Promise<AdapterSession> {
      const newSession = await db
        .insertInto("sessions")
        .values(mapToNewSession(to(session)))
        .returningAll()
        .executeTakeFirstOrThrow();

      return mapToAdapterSession(from(newSession));
    },
    async getSessionAndUser(
      sessionToken,
    ): Promise<{ user: KyselyAdapterUser; session: AdapterSession } | null> {
      const jwt = await decodeSessionToken(sessionToken);
      if (!jwt) return null;

      const result = await db
        .selectFrom("sessions")
        .innerJoin("users", "users.id", "sessions.userId")
        .selectAll("users")
        .select(["sessions.expires", "sessions.userId"])
        .where("sessions.sessionToken", "=", jwt.id)
        .executeTakeFirst();

      if (!result) return null;

      const { userId, expires, ...user } = result;
      const session = { sessionToken, userId, expires } as const;
      return { user: mapToAdapterUser(from(user)), session: from(session) };
    },
    async updateSession(session: AdapterSession): Promise<AdapterSession> {
      const jwt = await decodeSessionToken(session.sessionToken);
      if (!jwt) throw new Error("Invalid session token");
      session.sessionToken = jwt.id;
      const sessionData = to(session);
      const query = db
        .updateTable("sessions")
        .set(sessionData)
        .where("sessions.sessionToken", "=", jwt.id);
      const result = supportsReturning
        ? await query.returningAll().executeTakeFirstOrThrow()
        : await query.executeTakeFirstOrThrow().then(async () => {
            return await db
              .selectFrom("sessions")
              .selectAll()
              .where("sessions.sessionToken", "=", jwt.id)
              .executeTakeFirstOrThrow();
          });
      return mapToAdapterSession(from(result));
    },
    async deleteSession(sessionToken): Promise<void> {
      await db
        .deleteFrom("sessions")
        .where("sessions.sessionToken", "=", sessionToken)
        .executeTakeFirstOrThrow();
    },
    async createVerificationToken(
      data: VerificationToken,
    ): Promise<VerificationToken> {
      await db.insertInto("verificationTokens").values(to(data)).execute();
      return data;
    },
    async useVerificationToken({
      identifier,
      token,
    }: VerificationToken): Promise<VerificationToken | null> {
      const deleteQuery = db
        .deleteFrom("verificationTokens")
        .where("verificationTokens.token", "=", token)
        .where("verificationTokens.identifier", "=", identifier);

      const result = supportsReturning
        ? await deleteQuery.returningAll().executeTakeFirst()
        : await db
            .selectFrom("verificationTokens")
            .selectAll()
            .where("token", "=", token)
            .where("identifier", "=", identifier)
            .executeTakeFirst()
            .then(async (res) => {
              await deleteQuery.executeTakeFirst();
              return res;
            });

      if (!result) return null;

      return from(result);
    },
  } satisfies Adapter;
}

/**
 * Wrapper over the original `Kysely` class in order to validate the passed in
 * database interface. A regular Kysely instance may also be used, but wrapping
 * it ensures the database interface implements the fields that Auth.js
 * requires. When used with `kysely-codegen`, the `Codegen` type can be passed as
 * the second generic argument. The generated types will be used, and
 * `KyselyAuth` will only verify that the correct fields exist.
 *
 * Example usage with `kysely-codegen`:
 *
 * ```typescript
 * import { KyselyAuth, Codegen } from './path/to/this/file';
 * import { Kysely, SqliteDialect } from 'kysely';
 * import { Database } from './path/to/generated/types';
 *
 * const db = new Kysely<Database>({
 *   dialect: new SqliteDialect({
 *     database: 'path/to/database.sqlite',
 *   }),
 * });
 *
 * const authDb = new KyselyAuth<Database, Codegen>(db);
 * ```
 */
export class KyselyAuth<DB extends T, T = Database> extends Kysely<DB> {}

export type Codegen = {
  [K in keyof Database]: { [J in keyof Database[K]]: unknown };
};
