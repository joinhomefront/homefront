import type { Transaction } from "kysely";
import { hash } from "@node-rs/argon2";
import { generateMnemonic } from "bip39";

import type { Database } from "@homefront/db";

const generateRecoveryPhrase = () => {
  return generateMnemonic();
};

const hashRecoveryPhrase = async (phrase: string): Promise<string> => {
  return hash(phrase);
};

const storeRecoveryPhrase = async (
  phrase: string,
  userId: string,
  tx: Transaction<Database>,
) => {
  const phraseHash = await hashRecoveryPhrase(phrase);

  try {
    return tx
      .insertInto("recoveryPhrases")
      .values({ phraseHash, userId })
      .execute();
  } catch (error) {
    console.error("Failed to store recovery phrase:", error);
  }
};

export { generateRecoveryPhrase, storeRecoveryPhrase };
