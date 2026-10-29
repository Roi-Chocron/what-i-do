-- Imported from Roi-Chocron GitHub repositories on 2026-10-29.
-- Run after 0001_create_projects.sql and 0002_create_project_technologies.sql.
INSERT OR IGNORE INTO projects
  (id,name,slug,description,status,priority,github_url,last_worked_at,next_step,created_at,updated_at)
VALUES
('salesai','SalesAI','salesai','מאגר הכנת נתונים לאימון מודל עם FineWeb-Edu ו-JSONL.','idea','normal','https://github.com/Roi-Chocron/SalesAI','2026-10-29T00:00:00.000Z','לתעד את מטרת המודל ואת שלבי האימון החסרים.','2026-10-29T00:00:00.000Z','2026-10-29T00:00:00.000Z'),
('haredisurvey','haredisurvey','haredisurvey','אתר ומערכת תוכן לאמנת הנשים החרדיות, כולל חתימות ו-Google Sheets.','active','normal','https://github.com/Roi-Chocron/haredisurvey','2026-10-29T00:00:00.000Z','לבדוק את הזרימה החיה של חתימה ושליחת הנתונים.','2026-10-29T00:00:00.000Z','2026-10-29T00:00:00.000Z'),
('booking','booking','booking','מערכת לקביעת פגישות עם זמינות, Google Calendar, התראות ותמלולים.','development','high','https://github.com/Roi-Chocron/booking','2026-10-29T00:00:00.000Z','להשלים בדיקת deployment והגדרת secrets.','2026-10-29T00:00:00.000Z','2026-10-29T00:00:00.000Z'),
('liveedits','LiveEdits','liveedits','פלטפורמת עריכת וידאו וזרימת עבודה לסטרימר עם OBS, Stream Deck ו-YouTube.','planning','high','https://github.com/Roi-Chocron/LiveEdits','2026-10-29T00:00:00.000Z','ליישר בין filemap לבין הקוד בפועל.','2026-10-29T00:00:00.000Z','2026-10-29T00:00:00.000Z'),
('karu-ai','Karu-AI','karu-ai','פלטפורמה ליצירת קרוסלות Instagram מונעות AI עם מסלולי Cloudflare ו-Docker.','ready','high','https://github.com/Roi-Chocron/Karu-AI','2026-10-29T00:00:00.000Z','לבחור מסלול פריסה ולהגדיר secrets.','2026-10-29T00:00:00.000Z','2026-10-29T00:00:00.000Z'),
('crm','CRM','crm','אתר או prototype של CRM מבוסס HTML ו-JavaScript.','planning','normal','https://github.com/Roi-Chocron/CRM','2026-10-29T00:00:00.000Z','לתעד את מסכי ה-CRM ושכבת הנתונים.','2026-10-29T00:00:00.000Z','2026-10-29T00:00:00.000Z'),
('minharez-sw','minharez-sw','minharez-sw','Service Worker Host קטן שמגיש עמוד בסיסי.','completed','low','https://github.com/Roi-Chocron/minharez-sw','2026-10-29T00:00:00.000Z','להוסיף README עם מטרת ה-host.','2026-10-29T00:00:00.000Z','2026-10-29T00:00:00.000Z'),
('gemmaagent','GemmaAgent','gemmaagent','מנהל מודלי Gemma מקומיים עם Ollama, Gemini, GUI, API ו-dashboard.','development','high','https://github.com/Roi-Chocron/GemmaAgent','2026-10-29T00:00:00.000Z','להריץ את ה-GUI ולתעד את מסלול ההפעלה.','2026-10-29T00:00:00.000Z','2026-10-29T00:00:00.000Z'),
('localaiagent','localaiagent','localaiagent','אפליקציית Expo/Rork עם React Native ותשתית מובייל.','development','normal','https://github.com/Roi-Chocron/localaiagent','2026-10-29T00:00:00.000Z','להוסיף README שמסביר את מטרת האפליקציה.','2026-10-29T00:00:00.000Z','2026-10-29T00:00:00.000Z'),
('agent-foundry','agent-foundry','agent-foundry','תשתית סוכן AI מודולרית עם שליטה במחשב, תקשורת LLM והבנת מסך.','planning','high','https://github.com/Roi-Chocron/agent-foundry','2026-10-29T00:00:00.000Z','לתעד את ה-branch הפעיל ונקודת הכניסה.','2026-10-29T00:00:00.000Z','2026-10-29T00:00:00.000Z'),
('backupmywebsite','backupmywebsite','backupmywebsite','גיבוי אתר הכולל cPanel, המלצות SEO ונגישות ונכסי htdocs.','archived','low','https://github.com/Roi-Chocron/backupmywebsite','2026-10-29T00:00:00.000Z','לסמן קבצי גיבוי מול קבצי פריסה.','2026-10-29T00:00:00.000Z','2026-10-29T00:00:00.000Z'),
('orchestrator','orchestrator','orchestrator','Repository Python לתזמור תהליכים או סוכנים.','planning','normal','https://github.com/Roi-Chocron/orchestrator','2026-10-29T00:00:00.000Z','להוסיף README ותרשים זרימה.','2026-10-29T00:00:00.000Z','2026-10-29T00:00:00.000Z'),
('gemini-gui-agent','Gemini-Gui-Agent','gemini-gui-agent','סוכן אוטונומי עם Gemini, ראייה ושליטה בעכבר ובמקלדת.','development','high','https://github.com/Roi-Chocron/Gemini-Gui-Agent','2026-10-29T00:00:00.000Z','ליישם את לולאת OODA.','2026-10-29T00:00:00.000Z','2026-10-29T00:00:00.000Z'),
('cigarete','cigarete','cigarete','אפליקציית Expo בשם Smoke עם SQLite, notifications ויכולות מובייל.','development','normal','https://github.com/Roi-Chocron/cigarete','2026-10-29T00:00:00.000Z','לתעד את מטרת המוצר ולבדוק מסכים.','2026-10-29T00:00:00.000Z','2026-10-29T00:00:00.000Z'),
('siri2','Siri2','siri2','עוזר קולי J.A.R.V.I.S. עם זיהוי קולי, TTS ושליטה במערכת.','planning','normal','https://github.com/Roi-Chocron/Siri2','2026-10-29T00:00:00.000Z','לייצב התקנה cross-platform.','2026-10-29T00:00:00.000Z','2026-10-29T00:00:00.000Z'),
('siri','siri','siri','שרת HTTP קטן שמגיש קבצים סטטיים על פורט 8002.','completed','low','https://github.com/Roi-Chocron/siri','2026-10-29T00:00:00.000Z','להוסיף README עם אופן השימוש.','2026-10-29T00:00:00.000Z','2026-10-29T00:00:00.000Z'),
('site-spotlight-48e04e4d','site-spotlight-48e04e4d','site-spotlight-48e04e4d','פרויקט Lovable/Vite עם React, TypeScript, shadcn-ui ו-Tailwind CSS.','development','normal','https://github.com/Roi-Chocron/site-spotlight-48e04e4d','2026-10-29T00:00:00.000Z','לתעד מהו המוצר ולחבר ל-Lovable.','2026-10-29T00:00:00.000Z','2026-10-29T00:00:00.000Z'),
('roi-courses','roi-courses','roi-courses','פרויקט Lovable/Vite של קורסים מבוסס React ו-Tailwind CSS.','development','normal','https://github.com/Roi-Chocron/roi-courses','2026-10-29T00:00:00.000Z','לתעד את מבנה הקורסים וה-backend.','2026-10-29T00:00:00.000Z','2026-10-29T00:00:00.000Z');

INSERT OR IGNORE INTO project_technologies (project_id, technology) VALUES
('salesai','Python'),('salesai','Hugging Face Datasets'),('salesai','JSONL'),
('haredisurvey','HTML'),('haredisurvey','JavaScript'),('haredisurvey','Netlify'),
('booking','Next.js'),('booking','React'),('booking','Google Calendar'),
('liveedits','Python'),('liveedits','React'),('liveedits','OBS WebSocket'),
('karu-ai','Hono'),('karu-ai','Cloudflare Workers'),('karu-ai','Workers AI'),
('crm','HTML'),('crm','JavaScript'),('minharez-sw','Service Worker'),
('gemmaagent','Python'),('gemmaagent','Ollama'),('gemmaagent','Gemma'),
('localaiagent','Expo'),('localaiagent','React Native'),('localaiagent','TypeScript'),
('agent-foundry','Python'),('agent-foundry','LLM'),('agent-foundry','Computer Control'),
('backupmywebsite','HTML'),('backupmywebsite','cPanel'),('backupmywebsite','SQL'),
('orchestrator','Python'),('gemini-gui-agent','Python'),('gemini-gui-agent','Gemini API'),
('gemini-gui-agent','PyAutoGUI'),('cigarete','Expo'),('cigarete','React Native'),
('cigarete','SQLite'),('siri2','Python'),('siri2','Gemini'),('siri2','TTS'),
('siri','Python'),('siri','HTTP Server'),('site-spotlight-48e04e4d','Vite'),
('site-spotlight-48e04e4d','React'),('site-spotlight-48e04e4d','TypeScript'),
('site-spotlight-48e04e4d','Tailwind CSS'),('roi-courses','Vite'),('roi-courses','React'),
('roi-courses','TypeScript'),('roi-courses','Tailwind CSS');
