ALTER TABLE projects ADD COLUMN project_type TEXT CHECK (project_type IN ('client', 'studies', 'personal'));
ALTER TABLE projects ADD COLUMN personal_project_type TEXT CHECK (personal_project_type IN ('commercial', 'other'));
