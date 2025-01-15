import { client } from "./client";

export interface MiniSession {
  miniSessionId: string;
  miniSession: string;
  userId: string;
  publicKey: string;
  privateKey: string;
}

export const setMiniSession = async ({
  miniSessionId,
  miniSession,
  userId,
  publicKey,
  privateKey,
}: {
  miniSessionId: string;
  miniSession: string;
  userId: string;
  publicKey: string;
  privateKey: string;
}) => {
  await client.set(
    `miniSession:${miniSession}`,
    JSON.stringify({
      miniSessionId,
      userId,
      publicKey,
      privateKey,
    }),
    "EX",
    600,
  );
};

export const getMiniSession = async (
  miniSessionId: string,
): Promise<MiniSession> => {
  const stored = await client.get(`miniSession:${miniSessionId}`);

  if (!stored) {
    throw new Error("Session key not found or expired in Redis");
  }

  return JSON.parse(stored) as MiniSession;
};

export const deleteMiniSession = async (miniSessionId: string) => {
  return client.del(`miniSession:${miniSessionId}`);
};
