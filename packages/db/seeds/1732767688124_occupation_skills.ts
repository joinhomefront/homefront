import { execSync } from 'node:child_process'
import { join } from 'node:path'
import type { Kysely } from 'kysely'
import type { Database } from '../src'

export function seed(_db: Kysely<Database>): void {
  try {
    const __dirname = new URL('.', import.meta.url).pathname
    const csvPath = join(__dirname, './data/occupation_skills_prepared.csv')
    
    // Setup temp table with proper cleanup
    execSync(`psql "${process.env.DATABASE_URL}" -c "
      DROP TABLE IF EXISTS temp_occupation_skills;
      CREATE TEMP TABLE temp_occupation_skills (
        occupation_uri text,
        skill_uri text,
        relation_type text,
        skill_type text,
        level text
      );"
    `)

    // Import CSV data
    execSync(`psql "${process.env.DATABASE_URL}" -c "\\copy temp_occupation_skills FROM '${csvPath}' CSV;"`)

    // Insert data with proper joins and deduplication
    execSync(`psql "${process.env.DATABASE_URL}" -c "
      WITH distinct_skills AS (
        SELECT DISTINCT ON (o.id, s.id)
          o.id AS occupation_id,
          s.id AS skill_id,
          t.relation_type,
          t.skill_type,
          t.level
        FROM temp_occupation_skills t
        JOIN occupations o ON o.esco_concept_uri = t.occupation_uri
        JOIN skills s ON s.esco_concept_uri = t.skill_uri
      )
      INSERT INTO occupation_skills (
        occupation_id, skill_id, esco_relation_type, 
        esco_skill_type, level, created_at, updated_at
      )
      SELECT 
        occupation_id,
        skill_id,
        relation_type,
        skill_type,
        NULLIF(level, ''),
        NOW(),
        NOW()
      FROM distinct_skills
      ON CONFLICT (occupation_id, skill_id) DO UPDATE SET
        esco_relation_type = EXCLUDED.esco_relation_type,
        esco_skill_type = EXCLUDED.esco_skill_type,
        level = EXCLUDED.level,
        updated_at = NOW();"
    `)

    // Final cleanup
    execSync(`psql "${process.env.DATABASE_URL}" -c "DROP TABLE IF EXISTS temp_occupation_skills;"`)

    console.log('Successfully seeded occupation_skills table')
  } catch (error) {
    console.error('Failed to seed occupation_skills:', error)
    throw error
  }
}
