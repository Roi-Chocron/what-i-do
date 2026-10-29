CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL CHECK (status IN ('idea','planning','development','testing','ready','active','paused','completed','archived')),
  priority TEXT NOT NULL CHECK (priority IN ('low','normal','high')),
  local_path TEXT NOT NULL DEFAULT '',
  github_url TEXT NOT NULL DEFAULT '',
  hosting_provider TEXT NOT NULL DEFAULT '',
  live_url TEXT NOT NULL DEFAULT '',
  staging_url TEXT NOT NULL DEFAULT '',
  last_worked_at TEXT NOT NULL,
  next_step TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  archived_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_updated_at ON projects(updated_at DESC);
