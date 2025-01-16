import { Pinecone } from "@pinecone-database/pinecone";

import type { Skill } from "@homefront/db";
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

async function createSkillEmbeddings(skills: Skill[]) {
  const model = "multilingual-e5-large";

  for (let i = 0; i < skills.length; i += BATCH_SIZE) {
    const batch = skills.slice(i, i + BATCH_SIZE);

    try {
      const embeddings = await pc.inference.embed(
        model,
        batch.map((skill) => `${skill.title} ${skill.description}`),
        { inputType: "passage", truncate: "END" },
      );

      const records = batch.map((skill, j) => ({
        id: skill.id,
        values: embeddings[j]?.values ?? [],
        metadata: {
          title: skill.title,
          description: skill.description ?? "",
        },
      }));

      await index.namespace("skills").upsert(records);
    } catch (error) {
      console.error(`Failed to process batch starting at index ${i}:`, error);
    }
  }
}

async function main() {
  try {
    const skills: Skill[] = await db.selectFrom("skills").selectAll().execute();
    await createSkillEmbeddings(skills);
    console.log("Skill embeddings created successfully.");
  } catch (error) {
    console.error("Failed to create skill embeddings:", error);
  }
}

main().catch(console.error);
