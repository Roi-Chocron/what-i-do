INSERT OR IGNORE INTO projects
  (id, name, slug, description, status, priority, local_path, hosting_provider,
   last_worked_at, next_step, notes, created_at, updated_at)
VALUES
  ('what-i-do', 'מה עשיתי', 'what-i-do',
   'לוח בקרה אישי שמרכז את כל הפרויקטים, הקישורים והצעד הבא.',
   'development', 'high', '/home/roi/data_storage/WhatIDo',
   'Cloudflare Workers & Pages', '2026-10-29T00:55:00.000Z',
   'להשלים את צד הלקוח ולחבר API',
   'העיצוב מבוסס על מערכת המותג של AI Course.',
   '2026-10-28T00:00:00.000Z', '2026-10-29T00:55:00.000Z');

INSERT OR IGNORE INTO project_technologies (project_id, technology) VALUES
  ('what-i-do', 'React'),
  ('what-i-do', 'TypeScript'),
  ('what-i-do', 'Cloudflare D1');
