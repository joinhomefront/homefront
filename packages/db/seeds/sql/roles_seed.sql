BEGIN;
DELETE FROM role_domain_areas;
DELETE FROM role_occupations;
DELETE FROM roles;

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Administrative Support', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Administrative Support'),
        '45db075f-2f37-490f-9ce9-fdd768d5c809',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Administrative Support'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Advanced Nurse Practitioner', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Advanced Nurse Practitioner'),
        'b0cc905c-2f67-4559-9f56-103487dd2d4d',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Advanced Nurse Practitioner'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Anesthesia Technician', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Anesthesia Technician'),
        'd16769e7-31c1-464d-b14f-0b5ed992b366',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Anesthesia Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Application Engineer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Application Engineer'),
        '88bdb828-41dd-48fb-9eed-d24eaffb1947',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Application Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Art Director', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Art Director'),
        'be67b1e3-9ba7-4c28-9469-2fb89a693206',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Art Director'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Athletic Trainer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Athletic Trainer'),
        'b30f3654-fcc1-44f2-8caa-8fb2b03324d3',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Athletic Trainer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Athletic Trainer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Attorney', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Attorney'),
        'e987ac4f-2b82-4fe8-9003-d0514e2b0753',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Attorney'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Legal'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Biomedical Scientist', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Biomedical Scientist'),
        '6456798f-56ff-4d03-8a4a-4cdb0ed119db',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Biomedical Scientist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Biomedical Scientist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Blockchain Engineer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Blockchain Engineer'),
        '7dbdd5e9-64b8-474e-9e15-59a99d1fa295',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Blockchain Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Blood Donation Coordinator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Blood Donation Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Blood Donation Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Clinical Pharmacist', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Clinical Pharmacist'),
        '413f7195-6c10-421a-bec5-5a38a1e1ee5b',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Clinical Pharmacist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Clinical Pharmacist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Cloud Software Developer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Cloud Software Developer'),
        '8e2393fb-971a-4b3b-b6ce-c57570b5fa07',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Cloud Software Developer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Combat Medic', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Combat Medic'),
        'eb57adbd-b5ff-4dbd-9706-03430ff03999',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Combat Medic'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Combat Medic'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Combat Medic'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Emergency'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Communication Infrastructure Maintainer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Communication Infrastructure Maintainer'),
        'f442d3d9-5324-4f25-bfc1-ab38e37a3623',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Communication Infrastructure Maintainer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Communications'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Communication Infrastructure Maintainer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Communication Infrastructure Maintainer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Communications Equipment Operator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Communications Equipment Operator'),
        'ef3b198e-db58-4d35-9753-cb61bad52239',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Communications Equipment Operator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Communications'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Communications Equipment Operator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Community Health Worker', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Community Health Worker'),
        'bb697447-5bd1-4cf1-9fa8-5d34e882c23e',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Community Health Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Community Health Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Community Safety Coordinator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Community Safety Coordinator'),
        'e78fd8d7-9ec2-4f0a-906f-f5d562f112c0',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Community Safety Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Community Safety Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Community Service Manager', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Community Service Manager'),
        '32f121bb-4bb6-46a0-9d94-5a3f6bfe17c1',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Community Service Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Computer Scientist', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Computer Scientist'),
        '584ec5b8-93c4-47ac-aeee-3079f83c6483',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Computer Scientist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Content Creator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Content Creator'),
        '7ab6db1b-0cff-4f52-8c7a-149757009745',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Content Creator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Content Creator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Media'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Copy Editor', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Copy Editor'),
        'b32205c2-927f-42e1-a2e3-4188315d81d1',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Copy Editor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Media'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Copy Editor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Copy Editor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Cryptographer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Cryptographer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Communications'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Cryptographer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Cryptographer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Intelligence'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Data Analyst', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Data Analyst'),
        '6d11c560-c0dc-420e-a6b6-161cf363fd66',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Data Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Data Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Data Entry Keyer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Data Entry Keyer'),
        '29c951c6-c40c-4b4b-b9d2-344079031668',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Data Entry Keyer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Data Entry Keyer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Data Visualizer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Data Visualizer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Database Administrator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Database Administrator'),
        'fc4bfab0-6b9e-4ea4-a2a7-c1c8f5a46076',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Database Administrator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Database Architect', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Database Architect'),
        'df40162c-009c-4e76-9ebd-4da641c3711a',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Database Architect'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Database Developer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Database Developer'),
        '96633d52-4648-411c-947c-146e182d74d1',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Database Developer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Intelligence'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Database Developer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Defense Analyst', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Defense Analyst'),
        'ad77db97-59b6-49f2-9134-f7033e31564f',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Defense Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Designer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Designer'),
        'f8066127-3b6f-44c3-a03a-2be6de3d2748',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Designer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Dispatcher', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Dispatcher'),
        '25a99c52-87c3-477e-960a-12a5bd37aadf',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Dispatcher'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Emergency'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Dispatcher'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Dispatcher'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Document Management Specialist', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Document Management Specialist'),
        '0d88703e-2aa0-472c-8ce9-6646dc3f266e',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Document Management Specialist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Drone Operator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Drone Operator'),
        'bf2d20a8-5c62-43fc-9ca6-9e62de2ed78c',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Drone Operator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Drone Operator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Intelligence'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('E-Learning Developer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'E-Learning Developer'),
        'fef8c50f-15a6-4a6a-b054-5f27b3116ebc',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'E-Learning Developer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Education'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'E-Learning Developer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Education Coordinator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Education Coordinator'),
        '0fa9ad17-c260-4985-88d8-16613b2b2797',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Education Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Education'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Education Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Emergency Communication Coordinator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Emergency Communication Coordinator'),
        'cfd6b8f9-6072-420b-894e-2a3b754dc4f7',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Emergency Communication Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Emergency'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Emergency Communication Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Communications'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Emergency Medical Dispatcher', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Emergency Medical Dispatcher'),
        '03a1753c-363e-4371-a5a6-54b8a718315c',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Emergency Medical Dispatcher'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Emergency'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Emergency Medical Dispatcher'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Emergency Medical Dispatcher'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Emergency Medical Vehicle Driver', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Emergency Medical Vehicle Driver'),
        '0c710946-6ef0-4650-b9e7-adc985097e5e',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Emergency Medical Vehicle Driver'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Emergency'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Emergency Medical Vehicle Driver'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Emergency Medical Vehicle Driver'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Emergency Response Coordinator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Emergency Response Coordinator'),
        'cfd6b8f9-6072-420b-894e-2a3b754dc4f7',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Emergency Response Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Emergency'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Emergency Response Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Emergency Response Trainer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Emergency Response Trainer'),
        '6f990fa8-1643-41d5-8b41-c6ba3aa5d774',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Emergency Response Trainer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Emergency'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Emergency Response Trainer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Education'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Evacuation Coordinator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Evacuation Coordinator'),
        'cfd6b8f9-6072-420b-894e-2a3b754dc4f7',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Evacuation Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Emergency'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Evacuation Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Evacuation Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Evacuation Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Evacuation Support', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Evacuation Support'),
        'cfd6b8f9-6072-420b-894e-2a3b754dc4f7',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Evacuation Support'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Emergency'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Evacuation Support'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Evacuation Support'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Explosive Ordnance Disposal', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Explosive Ordnance Disposal'),
        'a0e4f9fb-7d35-4010-91c9-2e3a90fee5f8',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Explosive Ordnance Disposal'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Explosive Ordnance Disposal'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Emergency'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Fire Truck Operator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Fire Truck Operator'),
        '2d1a0061-c6e1-4187-a32a-9a3c1b10759b',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Fire Truck Operator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Emergency'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Firearms Instructor', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Firearms Instructor'),
        'f006c84f-d500-489e-9359-de8ed018d0c6',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Firearms Instructor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Education'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Firearms Instructor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Firefighter', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Firefighter'),
        '14af5dd2-e045-4702-ad8f-d66a9079f219',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Firefighter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Emergency'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('First Aid Trainer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'First Aid Trainer'),
        '6f990fa8-1643-41d5-8b41-c6ba3aa5d774',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'First Aid Trainer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'First Aid Trainer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Education'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'First Aid Trainer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Emergency'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Fitness Coordinator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Fitness Coordinator'),
        '6544e325-5502-44db-955a-bf6371a87c61',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Fitness Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Fitness Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Fitness Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Fitness Trainer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Fitness Trainer'),
        'b56c6d44-c695-4670-bd33-cd4b1ce86ab9',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Fitness Trainer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Fitness Trainer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Forensics Analyst', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Forensics Analyst'),
        '95875fff-1efc-437c-88df-55dcb332e0c8',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Forensics Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Forensics Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Forensics Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Fundraiser', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Fundraiser'),
        '1ef6837e-76a6-4d9b-9951-228d49dcdf14',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Fundraiser'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Fundraiser'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Finance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Geographic Information System (GIS) Analyst', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Geographic Information System (GIS) Analyst'),
        '077fdb7b-b8bb-4664-a3d1-ff056316225e',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Geographic Information System (GIS) Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Geographic Information System (GIS) Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Geographic Information System (GIS) Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Intelligence'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Graphic Designer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Graphic Designer'),
        'dcfe9215-873b-46b5-9bc4-44c8b39a540e',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Graphic Designer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Graphic Designer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Media'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Gunsmith', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Gunsmith'),
        '953c13ca-5e8d-4316-9576-339ca4c37a05',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Gunsmith'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Gunsmith'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Gunsmith'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Gunsmith'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Healthcare Facility Manager', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Healthcare Facility Manager'),
        '228e2aa1-5eca-49c3-a68e-cb17e7adb0e1',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Healthcare Facility Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Healthcare Facility Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Healthcare Provider', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Healthcare Provider'),
        '275479f3-9299-43ad-9b6f-b544844b0f66',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Healthcare Provider'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Healthcare Support', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Healthcare Support'),
        'bb697447-5bd1-4cf1-9fa8-5d34e882c23e',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Healthcare Support'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Housing Coordinator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Housing Coordinator'),
        '5d0dd533-0f9c-4541-b4fa-99caab58e853',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Housing Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Housing Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Housing Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Human Resources Assistant', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Human Resources Assistant'),
        '8f8dd2cb-0b77-4bbc-a54f-d405a26aa9e1',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Human Resources Assistant'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Human Resources Assistant'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Human Resources Manager', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Human Resources Manager'),
        '22961f4a-3306-4b64-9daf-43f5c52d5c38',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Human Resources Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Human Resources Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Human Resources Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Industrial Engineer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Industrial Engineer'),
        '7842a7af-0b2a-407f-8837-bfac9917a3e8',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Industrial Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Industrial Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Industrial Firefighter', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Industrial Firefighter'),
        '304c925d-e6e6-4801-83bb-91aeb316e952',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Industrial Firefighter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Emergency'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Infantryman', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Infantryman'),
        '1afe2942-b0c0-49be-98be-4467973ce155',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Infantryman'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Military'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Infantryman'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Information Security Analyst', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Information Security Analyst'),
        'be5fe5fa-366c-4751-af2b-3badd52ef5db',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Information Security Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Information Security Engineer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Information Security Engineer'),
        '93cdb7b6-4fff-4c73-8707-034d7ec09c51',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Information Security Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Information Security Trainer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Information Security Trainer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Education'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Information Security Trainer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Information Technology Advisor', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Information Technology Advisor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Information Technology Advisor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Policy'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Intelligence Analyst', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Intelligence Analyst'),
        '3b2cdf82-e14d-4f64-84e5-7e7e692c7501',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Intelligence Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Intelligence'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Intelligence Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Intelligence Officer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Intelligence Officer'),
        '3b2cdf82-e14d-4f64-84e5-7e7e692c7501',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Intelligence Officer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Intelligence'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Intelligence Officer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Intelligence Support', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Intelligence Support'),
        '3b2cdf82-e14d-4f64-84e5-7e7e692c7501',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Intelligence Support'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Intelligence'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Intelligence Support'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Interpreter', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Interpreter'),
        'ca96e744-d4e9-4f2f-88ca-432bb8dbf692',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Interpreter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Communications'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Interpreter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Interpreter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Intelligence'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('IT Security Administrator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'IT Security Administrator'),
        'e8b39ada-c373-4949-af16-2be8c50e036c',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'IT Security Administrator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('IT System Developer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'IT System Developer'),
        '226dfd10-4ba5-4e88-a1b6-9cc67269a68b',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'IT System Developer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Journalist', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Journalist'),
        '64c4f6e1-548d-4994-9a00-1e570000c73e',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Journalist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Media'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Legal Advisor', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Legal Advisor'),
        '1f360825-ddd2-4751-8453-1e8aa363e294',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Legal Advisor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Legal'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Legal Advisor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Policy'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Legal Administrative Assistant', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Legal Administrative Assistant'),
        '6c1a9e71-32dd-4078-82b7-a7ef10e41b4a',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Legal Administrative Assistant'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Legal Administrative Assistant'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Legal'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Legal Assistant', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Legal Assistant'),
        'a4716b28-9d39-4dce-a9c8-7a9e20ea809a',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Legal Assistant'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Legal Assistant'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Legal'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Legal Coordinator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Legal Coordinator'),
        '1f360825-ddd2-4751-8453-1e8aa363e294',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Legal Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Legal Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Legal'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Librarian', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Librarian'),
        '04e6e668-4e12-4c8d-8226-234a6aa72e74',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Librarian'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Education'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Librarian'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Logistics Analyst', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Logistics Analyst'),
        '374b8c25-0816-4d20-8565-b9cdf7f5a2f9',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Logistics Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Logistics Coordinator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Logistics Coordinator'),
        'a797019a-0d6b-43a5-8a67-22f1ced8ef36',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Logistics Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Logistics Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Logistics Support', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Logistics Support'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Maintenance Coordinator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Maintenance Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Maintenance Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Maintenance Worker', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Maintenance Worker'),
        'cd685745-0505-45d2-9ef2-8230f059848b',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Maintenance Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Mechanic', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Mechanic'),
        '50999ef7-4e95-4199-8d4e-4033220de1b9',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Mechanic'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Mechanical Engineer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Mechanical Engineer'),
        '89c8b78e-dcc7-4380-84b3-1157c33db1b6',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Mechanical Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Mechanical Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Media Planner', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Media Planner'),
        '09fd2b46-be4f-440e-945a-8d47cdac86f4',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Media Planner'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Media'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Medical Administrative Assistant', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Medical Administrative Assistant'),
        '982a7315-2a01-4104-9a11-56c16c778ed9',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Medical Administrative Assistant'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Medical Administrative Assistant'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Medical Coordinator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Medical Coordinator'),
        '4c0f3501-c914-4916-9202-6b67fceeb46f',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Medical Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Medical Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Medical Instructor', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Medical Instructor'),
        '0f3005bd-6fc2-4e8f-80e5-9f8efdd2acb9',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Medical Instructor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Medical Instructor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Education'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Medical Social Worker', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Medical Social Worker'),
        'd969794e-fda4-4e79-9fb9-c9a57601d85f',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Medical Social Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Medical Social Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Meeting Planner', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Meeting Planner'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Meeting Planner'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Military Engineer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Military Engineer'),
        '1b81f8c4-ccce-4db3-a3c3-c0bf029d8228',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Military Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Military Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Military'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Military Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Mobile App Developer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Mobile App Developer'),
        '539b4d6c-b909-429b-a3c7-5fa2161ed3b2',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Mobile App Developer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Munitions Worker', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Munitions Worker'),
        'c186f2a9-0cec-41ff-8988-f3cc78afb6ed',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Munitions Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Munitions Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('System Administrator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'System Administrator'),
        '1966c692-748c-45c3-8313-266526dda4fe',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'System Administrator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Network Administrator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Network Administrator'),
        'b6ee9e1f-e6d9-473e-bbd4-9cadac8f3536',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Network Administrator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Network Architect', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Network Architect'),
        '6c6f6ae7-2d12-4210-9643-b82a81a8ac66',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Network Architect'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Nursing Assistant', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Nursing Assistant'),
        '05aeaa6b-f73a-496f-9c10-511e012e967c',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Nursing Assistant'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Operations Analyst', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Operations Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Operations Planner', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Operations Planner'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Operations Support', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Operations Support'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Penetration Tester', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Penetration Tester'),
        '654885df-6ec9-47b6-847c-0a59791a6314',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Penetration Tester'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Penetration Tester'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Penetration Tester'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Intelligence'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Photographer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Photographer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Media'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Photographer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Political Organizer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Political Organizer'),
        'ca41f698-6640-413c-9d87-3339de50f5a0',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Political Organizer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Precision Mechanic', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Precision Mechanic'),
        '21fb8554-0666-48cf-b930-7a3c22d3f1c9',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Precision Mechanic'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Precision Mechanic'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Product Developer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Product Developer'),
        '3ec82215-5084-4528-af25-8ab940473ecf',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Product Developer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Product Developer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Protest Coordinator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Protest Coordinator'),
        '1ffeb680-9f9a-47a2-80db-f293289ba4df',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Protest Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Protest Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Policy'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Public Relations Manager', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Public Relations Manager'),
        'b9cc9523-fa6d-433e-817e-7f2133fc9a94',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Public Relations Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Media'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Public Relations Specialist', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Public Relations Specialist'),
        '5de3c4bc-d108-4a43-b42e-0d7f367ab892',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Public Relations Specialist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Media'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Rapid Response Coordinator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Rapid Response Coordinator'),
        'cfd6b8f9-6072-420b-894e-2a3b754dc4f7',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Rapid Response Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Emergency'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Rapid Response Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Rapid Response Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Rapid Response Volunteer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Rapid Response Volunteer'),
        'e4d4229e-47d4-4b78-8ef3-2fcd4c76cd33',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Rapid Response Volunteer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Emergency'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Rapid Response Volunteer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Recruiting Consultant', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Recruiting Consultant'),
        'de32719b-d7d6-4653-ab1b-6960d2a60ec0',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Recruiting Consultant'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Registered Nurse', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Registered Nurse'),
        '239964a8-91b5-4252-b9a6-6c6184a4a7ce',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Registered Nurse'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Reliability Engineer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Reliability Engineer'),
        'ae9d1c76-d4e8-4d8f-8753-ff6d2ec308d2',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Reliability Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Risk Analyst', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Risk Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Policy'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Scout', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Scout'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Scout'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Military'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Search and Rescue Operator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Search and Rescue Operator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Emergency'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Search and Rescue Operator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Search and Rescue Operator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Military'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Security Advisor', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Security Advisor'),
        '1d747dee-ca67-463f-998d-38dc63444d70',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Security Advisor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Security Advisor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Intelligence'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Security Coordinator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Security Coordinator'),
        '81d45213-1305-49e8-a68f-71c9b0de7aa3',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Security Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Security Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Security Guard', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Security Guard'),
        'ef0924e2-9c77-48a6-a564-863765072519',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Security Guard'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Security Guard Manager', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Security Guard Manager'),
        '6b78dee7-c7b6-420f-9615-0efad02f9fa1',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Security Guard Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Security Guard Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Self-Defense Trainer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Self-Defense Trainer'),
        '1fbe11ed-0a10-42cc-90b6-c999d9961140',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Self-Defense Trainer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Self-Defense Trainer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Signals Intelligence Analyst', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Signals Intelligence Analyst'),
        'd940df9c-9c9e-4877-ae2d-66fc45569e9a',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Signals Intelligence Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Intelligence'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Signals Intelligence Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Communications'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Signals Intelligence Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Social and Community Service Manager', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Social and Community Service Manager'),
        'bce37579-ada7-40ee-9c5f-6bf34f561f7c',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Social and Community Service Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Social and Community Service Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Social Media Manager', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Social Media Manager'),
        '58653fc8-0fec-4977-94de-fa38e06b9000',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Social Media Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Social Media Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Media'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Social Media Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Social Worker', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Social Worker'),
        '57ac2329-e9c8-4367-b1cc-68982f22c38d',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Social Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Social Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Software Analyst', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Software Analyst'),
        '957721a4-5f7f-4081-85e8-5cd94d4896ec',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Software Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Software Project Manager', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Software Project Manager'),
        '0d5780d9-5ec2-4aea-8228-ca8332dc869e',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Software Project Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Software Project Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Software Tester', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Software Tester'),
        '8d218c62-8a59-48e8-aa82-66900e950c9e',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Software Tester'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Solar Power Engineer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Solar Power Engineer'),
        'c2c4e849-6b50-4632-81d9-76a45b943343',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Solar Power Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Energy'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Solar Power Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Specialized Nurse', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Specialized Nurse'),
        '4b3ef49f-0ca1-4c73-b3d8-fcb29cc85100',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Specialized Nurse'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Strike Coordinator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Strike Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Strike Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Supply Chain Manager', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Supply Chain Manager'),
        '4b5c04c7-a34c-4abc-be85-e2700f4b80cb',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Supply Chain Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Supply Chain Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Surgical Assistant', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Surgical Assistant'),
        'c70843c0-093a-45c4-bd95-e6a519e79487',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Surgical Assistant'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Systems Analyst', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Systems Analyst'),
        '7b6495d2-bf66-4bff-b5ef-4288e5044211',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Systems Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Tactical Advisor', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Tactical Advisor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Tactical Advisor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Military'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Tactical Instructor', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Tactical Instructor'),
        'f006c84f-d500-489e-9359-de8ed018d0c6',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Tactical Instructor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Tactical Instructor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Military'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Tactical Operator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Tactical Operator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Tactical Operator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Military'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Tactical Planner', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Tactical Planner'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Tactical Planner'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Military'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Tactical Support', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Tactical Support'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Tactical Support'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Military'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Tactical Team Leader', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Tactical Team Leader'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Tactical Team Leader'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Military'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Technical Support', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Technical Support'),
        '9180e2ab-3ced-410a-b5b7-d8e8b44f273e',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Technical Support'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Technical Support'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Technical Writer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Technical Writer'),
        '65b04751-9f34-490b-96e7-6126c0e8ebc1',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Technical Writer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Technical Writer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Telecommunications Technician', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Telecommunications Technician'),
        '53d87c5d-4b1c-4b15-b907-0d25c66253c3',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Telecommunications Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Communications'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Telecommunications Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Telecommunications Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Training Coordinator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Training Coordinator'),
        'e0116588-8a13-4b0f-a514-6b0874380552',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Training Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Education'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Training Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Training Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Transportation Coordinator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Transportation Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Transportation Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('User Experience Designer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'User Experience Designer'),
        '65b04751-9f34-490b-96e7-6126c0e8ebc1',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'User Experience Designer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'User Experience Designer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('User Experience Researcher', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'User Experience Researcher'),
        '8b5af429-d977-461a-8c0f-4083f15275fc',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'User Experience Researcher'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'User Experience Researcher'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('User Interface Developer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'User Interface Developer'),
        '1a203661-e8c8-46ae-8645-d3b9aa3803ed',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'User Interface Developer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Volunteer Coordinator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Volunteer Coordinator'),
        'dbe438ce-4b99-47d6-b4d7-4691bbf099e4',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Volunteer Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Volunteer Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Volunteer Recruiter', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Volunteer Recruiter'),
        'c2c9b69a-bf17-4132-ada9-82b1e2dc769a',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Volunteer Recruiter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Water Engineer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Water Engineer'),
        '63cb7c6a-6394-4377-8408-13a4c0e17323',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Water Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Water Network Operator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Water Network Operator'),
        '2ad14c4e-873d-4175-90c6-5b114a5d1ae1',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Water Network Operator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Web Designer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Web Designer'),
        '920c21a8-ca82-4c80-adc2-c95cb8365348',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Web Designer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Web Designer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Web Developer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Web Developer'),
        '82029347-d4ef-4bd2-ae2d-2fb46bdc15be',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Web Developer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();






















INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('IT Disaster Recovery Analyst', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'IT Disaster Recovery Analyst'),
        '4d206cc9-89b4-4543-8494-2dfeab908e1a',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'IT Disaster Recovery Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();













INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Electrical Engineering Technician', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Electrical Engineering Technician'),
        '5c015a5e-b7a4-44d0-bd6d-18ddfbe6a84c',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Electrical Engineering Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineer'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Electrical Engineering Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();


































INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Specialized Doctor', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Specialized Doctor'),
        '84b29fe5-fb00-4e6b-b049-8e16dcbf2771',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Specialized Doctor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();
















INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Electromechanical Engineer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Electromechanical Engineer'),
        'b718ddda-76b6-4758-9c5b-ced471e80c89',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Electromechanical Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Human Rights Officer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Human Rights Officer'),
        'c3711199-d366-4ed1-b2b0-4e083cf2f7b1',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Human Rights Officer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Human Rights Officer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Policy'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Human Rights Officer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Legal'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('First Responder', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'First Responder'),
        'c8631cde-4a1a-40fd-a89f-375433a6df09',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'First Responder'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Emergency'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'First Responder'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'First Responder'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();
















INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Accountant', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Accountant'),
        'd4916878-72ad-4944-ab33-c0c69014dc50',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Accountant'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Finance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Accountant'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Adult Care Worker', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Adult Care Worker'),
        'f64ccf62-8a6e-4947-aed5-a0539f5d76ae',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Adult Care Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Adult Care Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Aerospace Engineer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Aerospace Engineer'),
        'dfd953a7-95d1-4605-aff8-06b8112de452',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Aerospace Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Aerospace Engineering Technician', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Aerospace Engineering Technician'),
        'db588289-018f-4170-a736-096d4d5a59b1',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Aerospace Engineering Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Aerospace Engineering Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Agricultural Engineer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Agricultural Engineer'),
        '88f6ac71-21b4-4083-af87-02418424b886',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Agricultural Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Agricultural Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Agriculture'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Agricultural Machinery Technician', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Agricultural Machinery Technician'),
        'e2e1613b-de5b-4b5f-a97d-9c52432b8327',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Agricultural Machinery Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Agricultural Machinery Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Agriculture'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Agricultural Policy Specialist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Agricultural Policy Specialist'),
        'bdceff37-ec58-4b2b-8a5f-052f6a3f9f92',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Agricultural Policy Specialist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Policy'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Agricultural Policy Specialist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Agriculture'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Agricultural Scientist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Agricultural Scientist'),
        '46c05007-16bb-441c-a1ce-cd2cc5aca8d8',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Agricultural Scientist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Agricultural Scientist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Agriculture'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Agricultural Worker', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Agricultural Worker'),
        '543b846d-d677-4936-b106-04f314d9c3e7',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Agricultural Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Agriculture'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Animal Caretaker', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Animal Caretaker'),
        '9b515698-23cf-4403-9569-1f7178ff2098',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Animal Caretaker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Animal Caretaker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Animal Rescue Coordinator', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Animal Rescue Coordinator'),
        '6ac12a5a-a4e6-4a73-b17d-6da68946efad',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Animal Rescue Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Animal Rescue Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Animal Rescue Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Emergency'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Animal Trainer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Animal Trainer'),
        '3a2835a2-fe3f-48f0-84ed-a35994814589',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Animal Trainer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Appliance Repair Technician', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Appliance Repair Technician'),
        'c91faf59-5ae0-46d7-b469-1276b53cb08c',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Appliance Repair Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Architect', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Architect'),
        '1e6198cc-00be-48d0-8689-c3e85a7e618e',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Architect'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Architect'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Construction'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Architectural Drafter', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Architectural Drafter'),
        '4329db92-0c6e-47ec-9990-5d6aa907cfc1',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Architectural Drafter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Architectural Drafter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Construction'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Archivist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Archivist'),
        'c9a43246-3431-41ab-96fd-a60705a0a679',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Archivist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Artificial Intelligence Specialist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Artificial Intelligence Specialist'),
        'd6183d74-6659-404a-ad3a-6b7b0458f042',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Artificial Intelligence Specialist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Artificial Intelligence Specialist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Audio Video Technician', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Audio Video Technician'),
        '0694b5ef-090d-4b76-88a7-cf59e62a49e4',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Audio Video Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Media'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Audio Video Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Audio Video Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Communications'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Automotive Body Repairer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Automotive Body Repairer'),
        '23273244-fc51-4845-a7e8-a7fdef5636de',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Automotive Body Repairer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Automotive Body Repairer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Automotive Engineer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Automotive Engineer'),
        '1ce5ee7e-594b-4f81-adcc-f57bcd101633',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Automotive Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Automotive Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Automotive Glass Installer and Repairer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Automotive Glass Installer and Repairer'),
        '5b6c4edb-73e7-4c04-8132-28d37c6e66e0',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Automotive Glass Installer and Repairer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Automotive Glass Installer and Repairer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Automotive Glass Installer and Repairer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Aviation Inspector', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Aviation Inspector'),
        '9a57f000-74cb-4b71-b8dd-e180a1222955',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Aviation Inspector'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Baker', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Baker'),
        '52ee242b-d0c9-486b-9b5e-7557c3864ce0',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Baker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Food'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Benefits Manager', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Benefits Manager'),
        '5ed2bff5-bec7-48c0-98ba-8796d4e0fb2f',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Benefits Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Finance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Benefits Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Billing Clerk', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Billing Clerk'),
        '49902573-3243-423d-b5b6-d021d2b4efd2',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Billing Clerk'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Finance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Billing Clerk'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Binder', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Binder'),
        '4a7e95a8-b870-4e8a-a57c-a75a84fde755',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Binder'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Bioengineer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Bioengineer'),
        '274e9baa-1651-4556-922f-b59999ddcfab',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Bioengineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Bioengineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Bioengineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Boat Captain', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Boat Captain'),
        '300731d9-41c3-4427-934c-7de9cee35003',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Boat Captain'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Boat Captain'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Boat Captain'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Military'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Boilermaker', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Boilermaker'),
        '2c9856ea-43bb-4383-8634-d6b3fc6ab017',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Boilermaker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Boilermaker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Brazer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Brazer'),
        '50868dc2-ddea-4ada-aca7-52270eee59f0',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Brazer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Brazer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Budget Analyst', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Budget Analyst'),
        'fdde62c1-6afb-468f-8380-1237e97f57fb',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Budget Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Finance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Butcher', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Butcher'),
        '4df7b6c5-4192-4e72-a2ed-39aec7dbdee8',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Butcher'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Food'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Calibration Technologist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Calibration Technologist'),
        '5850dae5-1c2d-4d8a-b1dd-305cab6c1ed8',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Calibration Technologist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Carpenter', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Carpenter'),
        'f01886de-f87a-473f-8c92-309d001ab1d6',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Carpenter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Construction'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Cashier', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Cashier'),
        '1163bd59-9500-486d-b683-bf88bfe0938d',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Cashier'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Finance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Cement Mason', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Cement Mason'),
        '0a7e3325-fefb-47bb-b645-9c9ae37306cf',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Cement Mason'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Construction'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Chemical Engineer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Chemical Engineer'),
        '618f4bcf-e8e6-4681-9410-db247c9f0d52',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Chemical Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Chemical Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Chemical Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Chemist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Chemist'),
        'fb3a8218-ce28-4516-845e-883d021043c9',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Chemist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Chemist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Chemist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Childcare Provider', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Childcare Provider'),
        '9afee00c-69db-459f-99fb-36acfa436078',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Childcare Provider'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Cleaner', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Cleaner'),
        'c0685959-daee-47eb-b07c-fabb1db5e469',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Cleaner'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Clerical Support', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Clerical Support'),
        '45db075f-2f37-490f-9ce9-fdd768d5c809',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Clerical Support'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Clinical Psychologist', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Clinical Psychologist'),
        '52c0f75f-dab8-4eee-ba46-b47d3f0cbb27',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Clinical Psychologist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Clinical Psychologist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Cogitive Behavioral Therapist', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Cogitive Behavioral Therapist'),
        '817c7662-72fb-4ddf-9d93-0f74d4711dd0',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Cogitive Behavioral Therapist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Cogitive Behavioral Therapist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Coiler', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Coiler'),
        'eb778106-e234-4ce1-92ff-e8ec2044f06a',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Coiler'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Community Safety Officer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Community Safety Officer'),
        'e78fd8d7-9ec2-4f0a-906f-f5d562f112c0',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Community Safety Officer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Community Safety Officer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Compensation Specialist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Compensation Specialist'),
        'cfe67145-75cf-4e5f-a078-bb973ea68d45',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Compensation Specialist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Finance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Construction Manager', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Construction Manager'),
        '0461f3da-3a8d-4de3-9c52-7e538cd0ad04',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Construction Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Construction'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Construction Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Construction Worker', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Construction Worker'),
        '04316ba3-64bc-473e-99d3-1f25142d39ca',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Construction Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Construction'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Cook', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Cook'),
        '91674ace-0f9a-4af0-85c8-d7466e04bdb1',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Cook'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Food'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Cook'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Correspondence Clerk', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Correspondence Clerk'),
        'b4892b46-fed4-44ee-9080-8e4d0c6728a2',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Correspondence Clerk'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Correspondence Clerk'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Communications'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Cost Estimator', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Cost Estimator'),
        '17fbba02-1126-45f8-abb3-2ecfc60a2e5b',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Cost Estimator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Finance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Courier', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Courier'),
        'c4eff2ac-7319-4482-8c5a-7bb0ad5f4e2f',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Courier'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Courier'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Communications'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Critical Care Nurse', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Critical Care Nurse'),
        '4b3ef49f-0ca1-4c73-b3d8-fcb29cc85100',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Critical Care Nurse'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Critical Care Nurse'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Emergency'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Curator', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Curator'),
        '17515e57-179c-4363-8b24-a3e91dc12ed6',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Curator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Curator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Curator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Curator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Education'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Curriculum Developer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Curriculum Developer'),
        '90f3c2a5-fa73-43bf-a8bf-1196cc0a6019',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Curriculum Developer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Education'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Curriculum Developer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Customer Service Representative', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Customer Service Representative'),
        'bfd17f79-aac5-4c5a-be71-a4591e1e9c6c',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Customer Service Representative'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Data Scientist', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Data Scientist'),
        '3cac43fc-873b-45d5-a51d-fd092b0576e8',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Data Scientist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Data Scientist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Decontamination Worker', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Decontamination Worker'),
        'b981afe6-fcd2-49cb-b29d-934d35054988',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Decontamination Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Emergency'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Dentist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Dentist'),
        '11e9843f-eb29-46c1-a3e0-4b635d3ea4f2',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Dentist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Detective', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Detective'),
        'de6e8233-bcc9-4b35-888d-8103146c39c2',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Detective'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Detective'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Intelligence'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Drafter', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Drafter'),
        'fbfe711a-cd45-409a-894c-7e19fae738fa',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Drafter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Drafter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Drill Operator', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Drill Operator'),
        'b81a952f-2a91-48d4-89c6-213afd73ed04',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Drill Operator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Construction'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Drill Operator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Energy'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Drill Operator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Drill Operator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Economist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Economist'),
        '4429caca-7cf5-4d7b-a5e8-473a5274d5d5',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Economist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Finance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Economist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Policy'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Economist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Electrical Contractor', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Electrical Contractor'),
        '075eef83-236f-4805-b57f-29683b79a107',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Electrical Contractor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Construction'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Electrical Contractor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Electrical Contractor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Electrical Drafter', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Electrical Drafter'),
        'f9a64219-954a-440c-a45f-019f83d84691',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Electrical Drafter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Electrical Drafter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Electrical Engineer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Electrical Engineer'),
        '368e183d-d91e-437f-abe1-3a38a75e1963',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Electrical Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Electrical Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Energy'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Electrical Mechanic', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Electrical Mechanic'),
        '3d4c863a-e1ed-4d3a-a81a-f2a9baea7f11',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Electrical Mechanic'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Electrical Mechanic'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Electrical Mechanic'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Energy'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Electrician', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Electrician'),
        'a0a7a82a-c4d7-4855-a4de-9bba7d02bc10',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Electrician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Electrician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Electrician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Construction'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Electrician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Energy'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Electronics Drafter', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Electronics Drafter'),
        '7f7c8355-b51e-44d9-9ee4-6536d18ec546',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Electronics Drafter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Electronics Drafter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Electronics Repairer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Electronics Repairer'),
        '3906e6ee-5c8f-4ff6-998a-38259891afaf',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Electronics Repairer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Electronics Repairer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Emergency Preparedness Advisor', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Emergency Preparedness Advisor'),
        'cfd6b8f9-6072-420b-894e-2a3b754dc4f7',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Emergency Preparedness Advisor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Emergency'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Energy Analyst', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Energy Analyst'),
        'b80d4822-34e1-4e96-95cf-c807a7bdc4c1',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Energy Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Energy'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Energy Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Energy Coordinator', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Energy Coordinator'),
        'e62a8eae-e16f-485d-8f3f-033b71d56b6d',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Energy Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Energy'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Energy Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Energy Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Energy Engineer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Energy Engineer'),
        '84fa92ee-5ca2-4c7a-aa60-5eb08740bbf9',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Energy Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Energy Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Energy'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Engineer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Engineering Coordinator', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Engineering Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Engineering Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Engineering Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Engineering Teacher', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Engineering Teacher'),
        'e7d03cfb-b4a5-436d-8cce-c561a1ac51db',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Engineering Teacher'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Education'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Engineering Teacher'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Engraver', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Engraver'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Engraver'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Environmental Scientist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Environmental Scientist'),
        'a9cb01ce-8f82-48df-a377-0344b3dd59a0',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Environmental Scientist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Ergonomist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Ergonomist'),
        'aa70e7b9-0f06-4083-bd64-d7d4eed28fac',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Ergonomist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Ergonomist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Etcher', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Etcher'),
        '5ec693c8-c0db-41df-826c-f102577bfd74',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Etcher'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Etcher'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Event Planner', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Event Planner'),
        '869b24b2-78fd-4229-890f-e6066c4afe2b',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Event Planner'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Event Planner'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Excavator', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Excavator'),
        'fa7e51b1-df6f-4a70-ad9c-aa7dd9bb1e58',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Excavator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Construction'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Excavator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Extraction Worker', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Extraction Worker'),
        '6c80c721-eecc-421a-9d0f-3b9ed903bbe8',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Extraction Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Agriculture'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Extraction Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Extraction Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Construction'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Extruding Machine Operator', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Extruding Machine Operator'),
        'c6be33ca-564e-42d3-be71-419b9a551ea3',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Extruding Machine Operator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Extruding Machine Operator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Facilities Manager', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Facilities Manager'),
        '3a669929-4b9a-49b6-a5a5-501961f381fd',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Facilities Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Facilities Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Fact Checker', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Fact Checker'),
        'a6535bb2-e39f-4dbe-bfd2-e2c080eb2559',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Fact Checker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Intelligence'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Fact Checker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Fact Checker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Media'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Farmer', 
        'critical',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Farmer'),
        '252b8933-bb6b-4f87-86b9-2642d814a283',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Farmer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Agriculture'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Farmer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Farmer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Food'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Filer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Filer'),
        '89214a1a-802f-4991-bb1a-bf3adeeaae0c',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Filer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Film and Video Editor', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Film and Video Editor'),
        'f8652c80-4862-4dd0-9a9b-b32d42c52f8e',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Film and Video Editor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Film and Video Editor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Media'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Financial Advisor', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Financial Advisor'),
        '5a899098-68b5-41b3-aca4-db0e16a1d0c9',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Financial Advisor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Finance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Financial Analyst', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Financial Analyst'),
        '234a1dc5-0114-498b-a6ba-eb35bc012d41',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Financial Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Finance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Financial Clerk', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Financial Clerk'),
        '49902573-3243-423d-b5b6-d021d2b4efd2',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Financial Clerk'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Finance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Financial Coordinator', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Financial Coordinator'),
        '450ea4cb-b2df-4cc5-9053-87e7aeeb2dc3',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Financial Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Finance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Financial Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Financial Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Financial Educator', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Financial Educator'),
        '234a1dc5-0114-498b-a6ba-eb35bc012d41',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Financial Educator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Education'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Financial Educator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Finance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Financial Educator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Financial Examiner', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Financial Examiner'),
        '30a42869-9f0b-4070-8292-59b2735cbf8f',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Financial Examiner'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Finance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Financial Examiner'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Legal'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Financial Risk Analyst', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Financial Risk Analyst'),
        '6d3d23d6-672b-4a64-9ed5-1cff99711d13',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Financial Risk Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Finance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Fire Inspector', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Fire Inspector'),
        'e6af5fe1-0472-4283-a634-1562480e9a99',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Fire Inspector'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Emergency'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Fish Processor', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Fish Processor'),
        '07cda808-43fb-4e01-b88a-8d1fcf50606f',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Fish Processor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Food'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Fish Processor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Agriculture'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Fisher', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Fisher'),
        'ae84b25e-36fe-4251-836e-2af47d038cb0',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Fisher'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Food'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Fisher'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Agriculture'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Food Preparation Worker', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Food Preparation Worker'),
        'd62fddaf-82f8-4012-9def-362e31b2c1dd',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Food Preparation Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Food'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Forestry Worker', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Forestry Worker'),
        'cb02ae25-717a-4802-a08c-7b39cc6d20e6',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Forestry Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Agriculture'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Forming Machine Setter', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Forming Machine Setter'),
        '2bed242c-102f-40a4-af92-fe2456361fd1',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Forming Machine Setter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Fraud Analyst', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Fraud Analyst'),
        '05d61643-c402-4050-b5a8-6d4ae1e18856',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Fraud Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Finance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Fraud Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Intelligence'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Freight Mover', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Freight Mover'),
        '3f655f04-1980-4807-875e-cdd2d7b58fa1',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Freight Mover'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Fuel Cell Engineer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Fuel Cell Engineer'),
        'f437e28d-d79f-448a-a64b-eb1249c43b2d',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Fuel Cell Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Fuel Cell Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Energy'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Fuel Cell Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Fuel Distribution Specialist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Fuel Distribution Specialist'),
        '52346854-ee18-48b4-8365-07abca0bfd44',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Fuel Distribution Specialist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Energy'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Fuel Distribution Specialist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Geneticist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Geneticist'),
        'ebfcfa88-49ed-4686-ba1d-3822c4c56da9',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Geneticist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Geographer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Geographer'),
        '261086aa-42ba-4fb3-b43b-edc6b4b5b359',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Geographer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Geoscientist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Geoscientist'),
        'cd1abb3d-0ad4-4203-8614-057b0b817fbb',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Geoscientist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Geothermal Technician', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Geothermal Technician'),
        '5e08020c-71e9-4888-806d-dd8af9669838',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Geothermal Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Energy'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Geothermal Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Geothermal Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Glass Blower', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Glass Blower'),
        'b6fee7e3-3d1c-4333-8aba-b59025fc0f08',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Glass Blower'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Glass Blower'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Grounds Maintenance Worker', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Grounds Maintenance Worker'),
        'b540e84d-1cea-43f2-8ff9-0461b6bf4db8',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Grounds Maintenance Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Hand Sewer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Hand Sewer'),
        'bae92443-7ba3-4f18-8895-6e2adde44483',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Hand Sewer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Hand Sewer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Health and Safety Engineer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Health and Safety Engineer'),
        'b2cf8f7c-b63d-4913-a39f-9a90dba2efbf',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Health and Safety Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Health and Safety Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Health Education Specialist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Health Education Specialist'),
        '13726ead-8a15-4dce-8f53-5b53dc243633',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Health Education Specialist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Health Education Specialist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Education'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Health Information Technologist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Health Information Technologist'),
        '546f6da3-6140-4486-bfe3-d610d46aa793',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Health Information Technologist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Health Information Technologist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Health Technologist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Health Technologist'),
        'e51539c6-4c22-4af0-b4ff-e42ced4800c5',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Health Technologist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Health Technologist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Hearing Aid Specialist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Hearing Aid Specialist'),
        'adae61c7-380b-4f72-bb3c-e48ff6ac7985',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Hearing Aid Specialist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Hearing Aid Specialist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Heavy Equipment Mechanic', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Heavy Equipment Mechanic'),
        '0eb37727-133d-4390-85d4-a66a6b7cf842',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Heavy Equipment Mechanic'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Historian', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Historian'),
        '753ea159-0773-4f29-8f8f-7e252305f2e8',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Historian'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Historian'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Historian'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Historian'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Education'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Human Resources Specialist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Human Resources Specialist'),
        '22961f4a-3306-4b64-9daf-43f5c52d5c38',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Human Resources Specialist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Human Resources Specialist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('HVAC Technician', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'HVAC Technician'),
        '96d2b8d1-1626-4738-8bee-e466ce04dd6c',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'HVAC Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'HVAC Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Hydrologist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Hydrologist'),
        'df866ffc-7173-48b5-a169-d6477d8edb49',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Hydrologist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Hydrologist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Industrial Equipment Mechanic', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Industrial Equipment Mechanic'),
        'ecd54ee1-8e9c-40a3-bd59-1d1fde0fc71f',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Industrial Equipment Mechanic'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Industrial Equipment Mechanic'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Information Security Officer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Information Security Officer'),
        'cbc7fc26-50d1-4054-a980-ad206ffb0d4e',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Information Security Officer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Information Security Officer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Insulation Worker', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Insulation Worker'),
        'b966936d-73c4-4019-be0e-b7ac5d2bc6b7',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Insulation Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Construction'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Insulation Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Janitor', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Janitor'),
        'c47acd01-b79b-4640-b084-83898c8ba7e5',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Janitor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Labor Organizer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Labor Organizer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Labor Relations Specialist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Labor Relations Specialist'),
        '135a1548-539c-4ebd-9533-7886eae0ea53',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Labor Relations Specialist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Laborer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Laborer'),
        'de3e393d-0153-495c-a69a-45e10f44c587',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Laborer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Construction'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Laborer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Laborer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Agriculture'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Laborer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Landscape Architect', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Landscape Architect'),
        'e5c619c0-8232-43e2-8d2c-61208f937173',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Landscape Architect'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Construction'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Landscape Architect'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Landscaper', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Landscaper'),
        'e38c3b0d-4a7d-453b-b1ab-bd45b6d3547b',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Landscaper'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Construction'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Landscaper'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Lathe and Turning Machine Tool Operator', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Lathe and Turning Machine Tool Operator'),
        '2bd5ed57-232f-48db-ad60-293383f76a86',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Lathe and Turning Machine Tool Operator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Lighting Technician', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Lighting Technician'),
        'ce6f7a02-ef69-41f1-91a1-fc5ea68d8514',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Lighting Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Lighting Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Logger', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Logger'),
        '511d6776-4594-4025-bf80-75010aa169ae',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Logger'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Agriculture'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Logistics Engineer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Logistics Engineer'),
        'f53b21b5-675b-402c-a257-dc2d657ff580',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Logistics Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Logistics Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Machine Learning Engineer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Machine Learning Engineer'),
        '77759a3c-88ce-4896-b025-2da2b9ccb70f',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Machine Learning Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Machine Learning Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Mail Carrier', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Mail Carrier'),
        '1922e69b-9655-4b6f-aa48-1584d247e2a2',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Mail Carrier'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Mail Sorter', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Mail Sorter'),
        '8141d96c-680e-40b8-8a8c-7801892632b9',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Mail Sorter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Manufacturing Engineer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Manufacturing Engineer'),
        '375719e3-bb4e-4488-a7f5-fbc46cccf17d',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Manufacturing Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Manufacturing Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Map Maker', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Map Maker'),
        '23ccf056-46fd-4ed4-bc17-695186fa4106',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Map Maker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Map Maker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Map Maker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Map Maker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Intelligence'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Material Mover', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Material Mover'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Material Mover'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Materials Engineer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Materials Engineer'),
        '4941c060-7d66-45ea-b8eb-235ebc104bfe',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Materials Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Materials Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Materials Scientist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Materials Scientist'),
        '4d126537-36ac-4046-8f06-36983b9c2d19',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Materials Scientist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Materials Scientist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Mathematician', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Mathematician'),
        '8e707ef0-0c45-4e23-b4fe-bf246c859ca6',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Mathematician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Meat Cutter', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Meat Cutter'),
        '65aa01cf-1f36-4924-9478-d5595d2238cb',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Meat Cutter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Food'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Meat Cutter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Agriculture'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Mechanical Drafter', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Mechanical Drafter'),
        '591d78c2-bd73-44b5-a7a4-695c640c9af1',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Mechanical Drafter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Mediator', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Mediator'),
        'd2d303b8-e7ad-48cd-91b5-d022cc1773a3',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Mediator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Legal'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Mediator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Medic', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Medic'),
        'eb57adbd-b5ff-4dbd-9706-03430ff03999',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Medic'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Medic'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Emergency'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Medical Appliance Technician', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Medical Appliance Technician'),
        'd7dfe4c3-ecc3-4ac3-b588-c65cc25231c0',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Medical Appliance Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Medical Appliance Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Medical Appliance Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Medical Appliance Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Medical Device Engineer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Medical Device Engineer'),
        '51bc3b57-7a88-4a5a-8e2c-f25fb21de3a0',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Medical Device Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Medical Device Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Medical Device Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Medical Laboratory Technician', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Medical Laboratory Technician'),
        '68c8268e-9696-4a13-9aa0-c17df57f8b50',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Medical Laboratory Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Medical Laboratory Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Medical Records Specialist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Medical Records Specialist'),
        '70d8a508-acf6-4606-a268-9a59dd3bb2ba',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Medical Records Specialist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Medical Records Specialist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Medical Transcriptionist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Medical Transcriptionist'),
        '03860729-7b9b-4578-b5f9-a48a359bdfb8',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Medical Transcriptionist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Medical Transcriptionist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Metal Caster', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Metal Caster'),
        'ab827430-33a1-4701-acef-7c6668fdb7c6',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Metal Caster'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Metal Products Assembler', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Metal Products Assembler'),
        'b5509d8b-455a-4011-b66e-862a2866ddd2',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Metal Products Assembler'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Meteorlogist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Meteorlogist'),
        'a6b648df-0649-4bb8-bc91-e84b6a5830d0',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Meteorlogist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Microsystems Engineer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Microsystems Engineer'),
        '616ac866-7976-4ed0-a527-eb4d801e51ec',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Microsystems Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Microsystems Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Milling and Planing Machine Operator', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Milling and Planing Machine Operator'),
        'a82011cc-b4d3-438a-8499-94309afcf783',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Milling and Planing Machine Operator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Mining Engineer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Mining Engineer'),
        '677ec195-e1de-4965-ab16-83193dc15e46',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Mining Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Molding Machine Setter', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Molding Machine Setter'),
        'a9159d05-568b-4ca3-b316-493d90b73ce7',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Molding Machine Setter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Moldmaker', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Moldmaker'),
        '774da316-d078-4fbd-bfaf-5f982e16508c',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Moldmaker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Musician', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Musician'),
        'bb7ca0b7-b678-428b-8324-0fd155ce661c',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Musician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Nanoengineer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Nanoengineer'),
        '394229e0-b815-42c5-8a46-5895a0f50e68',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Nanoengineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Nanoengineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Neurologist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Neurologist'),
        '4f9999ea-44ec-47e7-8b6a-ba854b73d993',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Neurologist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('News Analyst', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'News Analyst'),
        'd0a214c5-a85e-4f40-9df4-b5e38adbf7c9',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'News Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Media'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Nursing Instructor', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Nursing Instructor'),
        '40604887-57fe-44a3-8ffa-c9b58ce4ce3e',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Nursing Instructor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Nursing Instructor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Education'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Nutritionist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Nutritionist'),
        '853c147f-33ff-4e20-8568-de4510e5b5eb',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Nutritionist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Nutritionist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Food'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Occupational Health and Safety Officer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Occupational Health and Safety Officer'),
        '09b18913-a592-479c-8757-49f029d0bacf',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Occupational Health and Safety Officer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Office Clerk', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Office Clerk'),
        '45db075f-2f37-490f-9ce9-fdd768d5c809',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Office Clerk'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Ophthalmologist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Ophthalmologist'),
        'cab0af9b-5669-4d93-aeff-0f818d17a123',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Ophthalmologist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Optical Equipment Technician', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Optical Equipment Technician'),
        '997d5c2c-b524-48bf-9fde-fe56935bf506',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Optical Equipment Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Optometrist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Optometrist'),
        '0a5a43e5-53c4-4046-a062-f89783ca2fdf',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Optometrist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Order Clerk', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Order Clerk'),
        'b221dd82-a5b3-4604-ad7f-94e9a7660cdc',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Order Clerk'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Order Filler', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Order Filler'),
        '5c7abae8-65aa-41d6-88d5-f339af88925d',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Order Filler'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Order Filler'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Order Filler'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Painter', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Painter'),
        'bbfc9f9e-980d-4c41-956d-7abcdcf6a12e',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Painter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Painter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Painter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Construction'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Passenger Attendant', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Passenger Attendant'),
        '42ba613f-a4e1-45eb-a2f9-1fca80aeb3de',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Passenger Attendant'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Patternmaker', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Patternmaker'),
        'a09abc52-e7a0-4ff5-8571-c6790b59afe7',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Patternmaker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Patternmaker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Payroll Clerk', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Payroll Clerk'),
        'ca419a00-8dd6-49dd-9dc3-d2ca04d6947e',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Payroll Clerk'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Finance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Payroll Clerk'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Pesticide Handler', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Pesticide Handler'),
        '46222b94-3eb6-49de-819c-27dde9d52314',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Pesticide Handler'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Agriculture'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Photogrammetrist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Photogrammetrist'),
        '20fa8140-3998-43e0-8110-9224cdd0168d',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Photogrammetrist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Photogrammetrist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Photogrammetrist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Intelligence'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Physical Therapist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Physical Therapist'),
        '90786f81-cb2f-4833-8d43-a24cabeb5927',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Physical Therapist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Physical Therapist Assistant', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Physical Therapist Assistant'),
        '01e0066b-17fd-4c36-adaa-1e8b83b41a35',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Physical Therapist Assistant'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Pilot', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Pilot'),
        '6281417d-afd3-48df-9452-48d1111d0a04',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Pilot'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Pilot'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Pilot'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Military'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Pilot'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Emergency'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Plastic Worker', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Plastic Worker'),
        '88736831-5634-4e7b-be43-779bf731e242',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Plastic Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Plumber', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Plumber'),
        '7cd4e75d-205b-4278-bd64-0e7dfcc94cf7',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Plumber'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Construction'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Plumber'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Podiatrist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Podiatrist'),
        'cc66f2c2-dc32-46c2-9fc5-3fc8ed4b7995',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Podiatrist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Policy Analyst', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Policy Analyst'),
        '72b83de3-96de-4573-8dda-ee66ef134f69',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Policy Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Policy'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Political Scientist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Political Scientist'),
        '7ba18a4b-9b6f-4539-a89e-7771cf01cd48',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Political Scientist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Policy'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Political Scientist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Potter', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Potter'),
        'c304a207-55e2-45c0-bc6c-920c72cb4153',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Potter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Potter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Prepress Technician', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Prepress Technician'),
        '06f7c365-5d36-42de-b415-2c14e3c800ab',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Prepress Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Media'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Prepress Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Printing Coordinator', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Printing Coordinator'),
        '41e994b3-8d56-4915-98ce-de3898c33b03',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Printing Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Media'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Printing Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Printing Press Operator', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Printing Press Operator'),
        '69adb85c-15fe-4a81-a8fd-91392238e9dd',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Printing Press Operator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Media'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Printing Press Operator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Procurement Clerk', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Procurement Clerk'),
        'b9dd55ff-c084-4686-a9d3-8862686e082d',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Procurement Clerk'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Procurement Clerk'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Finance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Project Manager', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Project Manager'),
        '2db21ece-5437-4b8a-b7d3-77b3e7668f08',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Project Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Project Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Project Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Proofreader', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Proofreader'),
        'c0c00449-c7c1-4c23-96ee-55f203dfa488',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Proofreader'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Proofreader'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Media'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Property Manager', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Property Manager'),
        'd08abfd8-dbec-4172-80fd-310b2589c55a',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Property Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Property Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Prosthetist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Prosthetist'),
        'e6d95059-c833-4636-b79c-84d6c0704c56',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Prosthetist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Psychologist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Psychologist'),
        '0fb81dfb-9a83-47aa-aa20-cbb9dedac425',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Psychologist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Psychologist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Quality Control Analyst', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Quality Control Analyst'),
        '4818348b-1ba4-4038-b1d6-e5e5d7f8a4ce',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Quality Control Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Quality Control System Manager', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Quality Control System Manager'),
        '4818348b-1ba4-4038-b1d6-e5e5d7f8a4ce',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Quality Control System Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Radiologic Technologist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Radiologic Technologist'),
        '2c28afb4-55bd-4aa1-a91c-35227dcf06dc',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Radiologic Technologist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Radiologic Technologist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Record Clerk', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Record Clerk'),
        '9b8d4dff-98ac-45fd-ad94-d3c691498a0e',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Record Clerk'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Recordkeeper', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Recordkeeper'),
        'ac2d6a01-05bd-4de4-a0bb-6ef0b7ae4f41',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Recordkeeper'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Recreation Worker', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Recreation Worker'),
        'fe37d2ff-d5d4-48a2-af9b-10cc99c183ec',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Recreation Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Recreation Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Recycling and Reclamation Worker', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Recycling and Reclamation Worker'),
        '1a4d3525-75a9-4e23-b0d4-1f3a08fd93a6',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Recycling and Reclamation Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Recycling Coordinator', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Recycling Coordinator'),
        'a4beb127-6b9e-4f49-9c82-3af20e900b9f',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Recycling Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Recycling Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Regulatory Affairs Manager', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Regulatory Affairs Manager'),
        '5703f1be-8d2b-413e-b689-38a1bc91c85d',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Regulatory Affairs Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Policy'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Regulatory Affairs Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Legal'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Regulatory Affairs Manager'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Rehabilitation Counselor', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Rehabilitation Counselor'),
        'f622e6c1-db45-4a71-8237-9851d67eac69',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Rehabilitation Counselor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Rehabilitation Counselor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Remote Sensing Technician', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Remote Sensing Technician'),
        '80b72a69-41e7-4cf5-a5bc-0eb8e6ca18c5',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Remote Sensing Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Remote Sensing Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Repair Technician', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Repair Technician'),
        '8dc74947-e27b-46ae-aaff-3b2de2c752b2',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Repair Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Repair Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Rescue Diver', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Rescue Diver'),
        '4e15ea74-1afc-4374-8d9a-7e7b6a5c0dd0',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Rescue Diver'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Emergency'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Rescue Diver'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Rescue Diver'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Military'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Research Analyst', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Research Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Research Analyst'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Policy'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Research Support', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Research Support'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Research Support'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Policy'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Research Support'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Resources Coordinator', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Resources Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Resources Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Resources Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Education'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Resources Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Resources Volunteer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Resources Volunteer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Resources Volunteer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Resources Volunteer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Education'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Robotics Engineer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Robotics Engineer'),
        'e8d1f046-7723-493a-b4cb-55d2f2046f24',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Robotics Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Robotics Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Robotics Technician', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Robotics Technician'),
        'dd0e9f44-a70e-40da-ada7-35e2451b99d6',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Robotics Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Robotics Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Robotics Technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Rock Splitter', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Rock Splitter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Construction'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Rock Splitter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Roofer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Roofer'),
        '636ab324-1678-41c2-8004-1a49736b5971',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Roofer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Construction'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Safety Officer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Safety Officer'),
        '8bb3b31d-80c1-4d4d-8599-9d8db8948193',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Safety Officer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Security Screener', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Security Screener'),
        '0f0743e8-09a9-4477-bcdb-780005515b3e',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Security Screener'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Security System Installer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Security System Installer'),
        'd4f3bb5b-6733-4ec3-9613-a27dfa4c5828',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Security System Installer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Security System Installer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Septic Tank Servicer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Septic Tank Servicer'),
        '14df9542-aa98-4f6c-8e25-e609d2cca022',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Septic Tank Servicer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Septic Tank Servicer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Construction'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Sewer Pipe Cleaner', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Sewer Pipe Cleaner'),
        '7103e1a0-41f4-4ed3-a005-50f29fbca288',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Sewer Pipe Cleaner'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Sewer Pipe Cleaner'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Construction'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Sheet Metal Worker', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Sheet Metal Worker'),
        '78ed20b4-1fad-4ff0-869b-acdb9e1049d3',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Sheet Metal Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Sheet Metal Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Construction'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Social Scientist', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Social Scientist'),
        'f9fddbb1-8fe8-40b5-bbf8-a12ebce87df1',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Social Scientist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Social Scientist'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Software Developer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Software Developer'),
        '0c4b1a07-7697-45b1-8d8a-4b66e2ffcf33',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Software Developer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Solar technician', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Solar technician'),
        '80e8cb7e-55ed-44de-ad8d-da53a95df2ea',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Solar technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Energy'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Solar technician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Solderer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Solderer'),
        '43e9248b-fd65-4595-80c6-27fc2a1b4865',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Solderer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Solderer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Maintenance'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Sound Engineer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Sound Engineer'),
        '23ed532a-e54d-4759-a516-a8d4703a47ce',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Sound Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Sound Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Sound Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Statistical Assistant', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Statistical Assistant'),
        'ce2b6ebb-474f-42a0-8de3-b3b9b63d54aa',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Statistical Assistant'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Statistical Assistant'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Statistical Assistant'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Administrative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Statistician', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Statistician'),
        'ea014495-f9fd-477a-9d19-930920415261',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Statistician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Statistician'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Stock Mover', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Stock Mover'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Stocker', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Stocker'),
        '5e89fce5-42f8-4b52-9ecc-6fb3bcdd3de6',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Stocker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Stone Cutter', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Stone Cutter'),
        '6884597b-e4bd-468a-b1e8-782036ef06cb',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Stone Cutter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Stone Cutter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Construction'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Stonemason', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Stonemason'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Stonemason'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Construction'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Strategic Planner', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Strategic Planner'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Strategic Planner'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Policy'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Structural Metal Worker', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Structural Metal Worker'),
        'b9513d17-5aba-412f-a177-9892c8a000ae',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Structural Metal Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Construction'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Structural Metal Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Substance Abuse Social Worker', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Substance Abuse Social Worker'),
        '098cbcbb-0000-42f8-b25d-1d7f6b1751d2',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Substance Abuse Social Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Substance Abuse Social Worker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Support Coordinator', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Support Coordinator'),
        '41281c11-c2d1-4c73-9eef-eafc7dc67a8d',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Support Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Support Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Surface Miner', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Surface Miner'),
        '3bfcac54-4250-4aed-a780-71db2d6a775d',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Surface Miner'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Surgeon', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Surgeon'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Survey Researcher', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Survey Researcher'),
        'c07a3ec0-a18e-45a5-9c11-58af45080ec0',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Survey Researcher'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Science'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Survey Researcher'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Surveyor', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Surveyor'),
        'af677dc0-95e7-4f99-9896-af0d90013788',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Surveyor'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Switch Operator', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Switch Operator'),
        '7b9a732a-c31c-4ab1-8fc0-635c3d30b6a1',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Switch Operator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Logistics'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Teacher', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Teacher'),
        '95268960-0a1b-4a31-83f1-3269ea4f8c44',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Teacher'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Education'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Teacher'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Teaching Assistant', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Teaching Assistant'),
        '31525ea4-3812-4916-93a6-3ef91a322566',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Teaching Assistant'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Education'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Teaching Assistant'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Telecommunications Engineer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Telecommunications Engineer'),
        'e8cb8494-e027-4954-ae92-bb3adf2a69b3',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Telecommunications Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Technology'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Telecommunications Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Telecommunications Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Communications'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Textile Bleaching and Dyeing Machine Operator', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Textile Bleaching and Dyeing Machine Operator'),
        '712d8a96-83d4-4a45-8f91-92097dc95d0a',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Textile Bleaching and Dyeing Machine Operator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Textile Cutter', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Textile Cutter'),
        'bd4224db-db73-46a9-92f8-ea5345eab840',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Textile Cutter'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Tire Maker', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Tire Maker'),
        'd42262d3-7b29-439b-9c9b-33253ff4407a',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Tire Maker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Tool and Die Maker', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Tool and Die Maker'),
        '01d72aef-f65f-4412-af3d-1a6447ad1185',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Tool and Die Maker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Tool Sharpener', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Tool Sharpener'),
        'f4d3bd98-2a95-4730-a486-f0ca1365aa99',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Tool Sharpener'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Translator', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Translator'),
        'fca9ea48-fe43-490c-beba-40caec0e7d3c',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Translator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Translator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Intelligence'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Translator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Media'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Underground Miner', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Underground Miner'),
        '720cb876-fcc5-4763-829c-e03f17673ba4',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Underground Miner'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Urban Planner', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Urban Planner'),
        '706d8195-8765-43e5-b0f4-0d1f33936456',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Urban Planner'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Urban Planner'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Policy'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Veterinarian', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Veterinarian'),
        '047bb405-c77b-401a-ac0d-63bfad5d7175',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Veterinarian'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Veterinarian'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Waste Engineer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Waste Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Wastewater Engineer', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Wastewater Engineer'),
        '93d99b58-1dc8-4c7d-8daf-088c025c2a88',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Wastewater Engineer'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Engineering'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Wellness Coordinator', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Wellness Coordinator'),
        '6aa01f38-9812-4605-95c2-30b3e79507c7',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Wellness Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Health'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Wellness Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Wellness Coordinator'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Woodworker', 
        'high',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Woodworker'),
        '22390fda-91e7-44e7-9b8d-58bd97148593',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Woodworker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Creative'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Woodworker'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Manufacturing'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();



























































































































































































































































































































































































































































































































































































































































































































































































































































































































































































INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Fire Team Leader', 
        'major',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Fire Team Leader'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Fire Team Leader'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Military'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Fire Team Leader'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Military Pilot', 
        'major',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Military Pilot'),
        'ca3b46fc-cf4c-4aa4-9dad-6973d2dcd16f',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Military Pilot'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Military Pilot'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Military'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Regional Planner', 
        'major',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();

INSERT INTO role_occupations (role_id, occupation_id, created_at, updated_at)
VALUES ((SELECT id FROM roles WHERE title = 'Regional Planner'),
        'eadc4aa6-6c07-419c-8894-9d00b59de53f',
        NOW(), NOW())
ON CONFLICT (role_id, occupation_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Regional Planner'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Community'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Regional Planner'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO roles (title, priority, created_at, updated_at) 
VALUES ('Squad Leader', 
        'major',
        NOW(), NOW())
ON CONFLICT (title) DO UPDATE SET
    priority = EXCLUDED.priority,
    updated_at = NOW();


INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Squad Leader'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Security'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Squad Leader'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Military'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();

INSERT INTO role_domain_areas (role_id, domain_area_id, created_at, updated_at)
SELECT 
    (SELECT id FROM roles WHERE title = 'Squad Leader'),
    id,
    NOW(),
    NOW()
FROM domain_areas 
WHERE title = 'Leadership'
ON CONFLICT (role_id, domain_area_id) DO UPDATE SET
    updated_at = NOW();















COMMIT;