import { Pinecone } from "@pinecone-database/pinecone";

import type { Role, Skill } from "@homefront/db";
import { db } from "@homefront/db";

const apiKey = process.env.PINECONE_API_KEY;
if (!apiKey) {
  throw new Error("PINECONE_API_KEY is not defined");
}

const pc = new Pinecone({
  apiKey,
});

const index = pc.index(process.env.PINECONE_INDEX ?? "multilingual-e5-large");
const BATCH_SIZE = 96;

async function fetchRoleSkills(roleId: string): Promise<Skill[]> {
  return await db
    .selectFrom("roleSkills")
    .innerJoin("skills", "roleSkills.skillId", "skills.id")
    .selectAll("skills")
    .where("roleSkills.roleId", "=", roleId)
    .execute();
}

async function createRoleEmbeddings(roles: Role[]) {
  const model = "multilingual-e5-large";

  for (let i = 0; i < roles.length; i += BATCH_SIZE) {
    const batch = roles.slice(i, i + BATCH_SIZE);

    try {
      const embeddings = await pc.inference.embed(
        model,
        await Promise.all(
          batch.map(async (role) => {
            const skills = await fetchRoleSkills(role.id);
            const skillsText = skills
              .map((skill) => `${skill.title} ${skill.description}`)
              .join(" ");
            return `${role.title} ${role.description} ${skillsText}`;
          }),
        ),
        { inputType: "passage", truncate: "END" },
      );

      const records = batch.map((role, j) => ({
        id: role.id,
        values: embeddings[j]?.values ?? [],
        metadata: {
          title: role.title,
          description: role.description ?? "",
        },
      }));

      await index.namespace("roles-with-skills").upsert(records);
      console.log(`Processed batch starting at index ${i}`);
    } catch (error) {
      console.error(`Failed to process batch starting at index ${i}:`, error);
    }
  }
}

async function main() {
  try {
    const roles: Role[] = await db.selectFrom("roles").selectAll().execute();
    await createRoleEmbeddings(roles);
    console.log("Role embeddings created successfully.");
  } catch (error) {
    console.error("Failed to create role embeddings:", error);
  }
}

main().catch(console.error);
