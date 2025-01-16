import { setTimeout } from "node:timers/promises";
import { Pinecone } from "@pinecone-database/pinecone";

import type { Occupation, Skill } from "@homefront/db";
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
const PAUSE_AFTER = 480;
const PAUSE_DURATION = 60000; // 1 minute in milliseconds

async function fetchOccupationSkills(occupationId: string): Promise<Skill[]> {
  return await db
    .selectFrom("occupationSkills")
    .innerJoin("skills", "occupationSkills.skillId", "skills.id")
    .selectAll("skills")
    .where("occupationSkills.occupationId", "=", occupationId)
    .execute();
}

async function createOccupationEmbeddings(occupations: Occupation[]) {
  const model = "multilingual-e5-large";

  await index.namespace("occupations-with-skills").deleteAll();

  for (let i = 0; i < occupations.length; i += BATCH_SIZE) {
    const batch = occupations.slice(i, i + BATCH_SIZE);

    try {
      const embeddings = await pc.inference.embed(
        model,
        await Promise.all(
          batch.map(async (occupation) => {
            const skills = await fetchOccupationSkills(occupation.id);
            const skillsText = skills
              .map((skill) => `${skill.title} ${skill.description}`)
              .join(" ");
            return `${occupation.title} ${occupation.description} ${skillsText}`;
          }),
        ),
        { inputType: "passage", truncate: "END" },
      );

      const records = batch.map((occupation, j) => ({
        id: occupation.id,
        values: embeddings[j]?.values ?? [],
        metadata: {
          title: occupation.title,
          description: occupation.description ?? "",
        },
      }));

      await index.namespace("occupations-with-skills").upsert(records);
      console.log(`Processed batch starting at index ${i}`);
    } catch (error) {
      console.error(`Failed to process batch starting at index ${i}:`, error);
    }

    // Pause for one minute after processing every 480 records
    if ((i + BATCH_SIZE) % PAUSE_AFTER === 0) {
      console.log(`Pausing for ${PAUSE_DURATION / 1000} seconds...`);
      await setTimeout(PAUSE_DURATION);
    }
  }
}

async function main() {
  try {
    const occupations: Occupation[] = await db
      .selectFrom("occupations")
      .selectAll()
      .execute();

    await createOccupationEmbeddings(occupations);
  } catch (error) {
    console.error("Failed to create occupation embeddings:", error);
  }
}

main().catch((error) => {
  console.error("Unexpected error:", error);
});
