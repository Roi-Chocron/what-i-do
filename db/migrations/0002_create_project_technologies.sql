CREATE TABLE IF NOT EXISTS project_technologies (
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  technology TEXT NOT NULL,
  PRIMARY KEY (project_id, technology)
);
CREATE INDEX IF NOT EXISTS idx_project_technologies_technology ON project_technologies(technology);
