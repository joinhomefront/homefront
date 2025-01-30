import type { RawBuilder } from "kysely";
import { sql } from "kysely";

if (!process.env.DB_ENCRYPTION_KEY) {
  throw new Error("DB_ENCRYPTION_KEY is required");
}

const DB_ENCRYPTION_KEY = process.env.DB_ENCRYPTION_KEY;

interface PgpSymEncryptOpts {
  key?: string;
  options?: string;
}

export const pgpSymEncrypt = (
  value: string,
  {
    key = DB_ENCRYPTION_KEY,
    options = "compress-algo=1, cipher-algo=aes256",
  }: PgpSymEncryptOpts = {},
): RawBuilder<string> => {
  return sql<string>`pgp_sym_encrypt(${value}, ${key}, ${options})`;
};

interface PgpSymDecryptOpts {
  key?: string;
  options?: string;
}

export const pgpSymDecrypt = (
  column: string,
  {
    key = DB_ENCRYPTION_KEY,
    options = "cipher-algo=aes256",
  }: PgpSymDecryptOpts = {},
) => {
  return sql<string>`pgp_sym_decrypt(${sql.ref(column)}::bytea, ${key}, ${options})`;
};
