import { sql  } from 'kysely';
import type {Kysely} from 'kysely';
import type { Database } from '../src';

export async function seed(db: Kysely<Database>): Promise<void> {
  // Get role-occupation mappings and related skills
  await db.transaction().execute(async (trx) => {
    // Create role_skills from occupation_skills via role_occupations
    await sql`
      WITH role_occupation_skills AS (
        SELECT DISTINCT
          ro.role_id,
          os.skill_id
        FROM role_occupations ro
        JOIN occupation_skills os ON os.occupation_id = ro.occupation_id
        GROUP BY ro.role_id, os.skill_id
      )
      INSERT INTO role_skills (
        role_id,
        skill_id, 
        created_at,
        updated_at
      )
      SELECT
        role_id,
        skill_id,
        NOW(),
        NOW()
      FROM role_occupation_skills
      ON CONFLICT DO NOTHING;
    `.execute(trx);
  });
}
