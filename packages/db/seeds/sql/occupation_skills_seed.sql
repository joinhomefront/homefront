-- Idempotent SQL Seed Data for Occupation Skills Table
BEGIN;

-- Create temporary table
CREATE TEMP TABLE temp_occupation_skills (
    occupation_uri text,
    skill_uri text,
    relation_type text,
    skill_type text,
    level text
);

-- Copy data from CSV
\COPY temp_occupation_skills FROM './data/occupation_skills_prepared.csv' WITH (FORMAT csv);

-- Insert data with conflict handling
INSERT INTO occupation_skills (
    occupation_id, 
    skill_id, 
    esco_relation_type, 
    esco_skill_type, 
    level, 
    created_at, 
    updated_at
)
SELECT 
    o.id,
    s.id,
    t.relation_type,
    t.skill_type,
    NULLIF(t.level, ''),
    NOW(),
    NOW()
FROM temp_occupation_skills t
JOIN occupations o ON o.esco_concept_uri = t.occupation_uri
JOIN skills s ON s.esco_concept_uri = t.skill_uri
ON CONFLICT (occupation_id, skill_id) DO UPDATE SET
    esco_relation_type = EXCLUDED.esco_relation_type,
    esco_skill_type = EXCLUDED.esco_skill_type,
    level = EXCLUDED.level,
    updated_at = NOW();

DROP TABLE temp_occupation_skills;

COMMIT;
