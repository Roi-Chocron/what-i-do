DELETE FROM project_technologies
WHERE project_id IN ('client-portal', 'mange-time', 'hackers', 'siri3', 'ubuntu', 'hjhh', 'aptttt', 'apk', 'site-spotlight');

DELETE FROM projects
WHERE id IN ('client-portal', 'mange-time', 'hackers', 'siri3', 'ubuntu', 'hjhh', 'aptttt', 'apk', 'site-spotlight');

UPDATE projects
SET github_url = '',
    next_step = 'לתעד את שלב הפיתוח המקומי; ה-repository המרוחק נמחק כי היה ריק.',
    updated_at = '2026-10-29T02:14:00.000Z'
WHERE id = 'local-client-portal';
