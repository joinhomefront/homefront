import type { EmbeddingsList } from "@pinecone-database/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";

import type { Occupation, Skill } from "@homefront/db";
import { db, sql } from "@homefront/db";

const apiKey = process.env.PINECONE_API_KEY;
if (!apiKey) {
  throw new Error("PINECONE_API_KEY is not defined");
}

const pc = new Pinecone({
  apiKey,
});

const index = pc.index("multilingual-e5-large");

async function fetchUserData(userId: string) {
  const userSkills = await db
    .selectFrom("userSkills")
    .innerJoin("skills", "userSkills.skillId", "skills.id")
    .selectAll("skills")
    .where("userSkills.userId", "=", userId)
    .execute();

  const userOccupations = await db
    .selectFrom("userOccupations")
    .innerJoin("occupations", "userOccupations.occupationId", "occupations.id")
    .selectAll("occupations")
    .where("userOccupations.userId", "=", userId)
    .execute();

  return { userSkills, userOccupations };
}

async function createEmbeddings(
  occupations: Occupation[],
  skills: Skill[],
): Promise<EmbeddingsList> {
  const model = "multilingual-e5-large";

  const text = [...occupations, ...skills]
    .map((record) => `${record.title} ${record.description}`)
    .join(" ");

  const embeddings = await pc.inference.embed(model, [text], {
    inputType: "passage",
    truncate: "END",
  });

  return embeddings;
}

export async function recommendRoles(userId: string) {
  const { userSkills, userOccupations } = await fetchUserData(userId);

  const embeddings: EmbeddingsList = await createEmbeddings(
    userOccupations,
    userSkills,
  );

  const queryResponse = await index.namespace("roles-with-skills").query({
    vector: embeddings[0]?.values ?? [],
    topK: 20,
    includeMetadata: true,
  });

  const recommendedRoles = await db
    .selectFrom("roles as r")
    .innerJoin("roleDomainAreas", "r.id", "roleDomainAreas.roleId")
    .innerJoin("domainAreas as da", "roleDomainAreas.domainAreaId", "da.id")
    .leftJoin("userRoles as ur", (join) =>
      join.onRef("r.id", "=", "ur.roleId").on("ur.userId", "=", userId),
    )
    .select([
      "r.id as id",
      "r.title as title",
      "r.description as description",
      "r.priority as priority",
      sql<string[]>`array_agg(DISTINCT da.slug)`.as("domainAreas"),
      "ur.id as userRoleId",
      sql<boolean>`(ur.id IS NOT NULL)`.as("hasRole"),
    ])
    .where(
      "r.id",
      "in",
      queryResponse.matches.map(({ id }) => id),
    )
    .groupBy(["r.id", "userRoleId"])
    .execute();

  return recommendedRoles
    .map((role) => {
      const match = queryResponse.matches.find(({ id }) => id === role.id);
      return {
        ...role,
        similarityScore: match?.score ?? null,
      };
    })
    .sort((a, b) => (b.similarityScore ?? 0) - (a.similarityScore ?? 0));
}
