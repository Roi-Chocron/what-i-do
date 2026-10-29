-- Verified classifications. Unknown projects intentionally remain NULL.
UPDATE projects
SET project_type = 'personal', personal_project_type = 'other'
WHERE id IN ('what-i-do', 'roi-website');

UPDATE projects
SET project_type = 'personal', personal_project_type = 'commercial'
WHERE id = 'karu-ai' OR id LIKE 'local-karu-ai%';
