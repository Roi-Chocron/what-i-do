# GitHub Projects Review — Roi-Chocron

> הסקירה המפורטת של כל קוד המקור, נקודות הכניסה, הארכיטקטורה, הפקודות,
> הטכנולוגיות והפערים נמצאת ב-[GITHUB_CODE_REVIEW.md](./GITHUB_CODE_REVIEW.md).

## סיכום הסריקה

הסריקה בוצעה ב־29/10/2026 עבור המשתמש `Roi-Chocron`.

- לאחר הסרת repositories ריקים ומחיקת `roiwebsite` ו־`Math`, נשארו
  **18 repositories לא־ריקים**.
- נבדקו metadata, branch ברירת מחדל, מבנה קבצים וקבצי README/config כאשר היו זמינים.
- לא נקראו קבצי secrets או קבצים בינאריים.
- repositories ריקים סומנו במפורש כ־"ריק" ולא קיבלו תיאור מומצא.
- הנתונים הוכנסו לנתוני demo של האתר ול־[db/github-projects.sql](./db/github-projects.sql).
- `roiwebsite` ו־`Math` נמחקו לבקשת המשתמש גם מ־GitHub וגם מהאתר.
- כל 18 ה־repositories הלא־ריקים עברו קריאת קוד מלאה במסגרת הסקירה המפורטת.

## פירוט הפרויקטים

הפירוט ההיסטורי להלן נשמר כהקשר של הסריקה המקורית. לצורך מצב עדכני ומדויק,
יש להשתמש ב-[GITHUB_CODE_REVIEW.md](./GITHUB_CODE_REVIEW.md), שמחליף את ההערכות
החלקיות ומפריד בין עובדות שנקראו בקוד לבין מסקנות.

ב־29/10/2026 אומתו באמצעות GitHub API כ־repositories ריקים לחלוטין ונמחקו
מהאינדקס המקומי ומהאתר: `client-portal`, `Mange-time`, `Hackers`, `Siri3`,
`ubuntu`, `hjhh`, `aptttt`, `apk`, `site-spotlight`.

### 1. SalesAI

- **קישור:** [Roi-Chocron/SalesAI](https://github.com/Roi-Chocron/SalesAI)
- **מה נקרא:** `README.md`, `load_dataset.py`.
- **מטרה שניתן להסיק:** הכנת dataset לאימון מודל.
- **טכנולוגיות:** Python, Hugging Face Datasets, JSONL.
- **מימוש שנקרא:** טעינת `HuggingFaceFW/fineweb-edu` ב־streaming, עצירה לאחר 600,000 דוגמאות וכתיבת שדה `text` ל־`fineweb_edu_3gb.jsonl`.
- **שלב משוער:** רעיון/הכנת תשתית.
- **מה חסר בתיעוד המקורי:** מטרת מודל היעד, קוד אימון, evaluation ודרך שחזור.

### 2. haredisurvey

- **קישור:** [Roi-Chocron/haredisurvey](https://github.com/Roi-Chocron/haredisurvey)
- **מה נקרא:** `package.json`, `TASKS.md`, `index.html`, קבצי Netlify ונכסי מדיה.
- **מטרה:** אתר לאמנת הנשים החרדיות, כולל הצגת האמנה ואיסוף חתימות.
- **טכנולוגיות:** HTML, JavaScript, Netlify Functions, Netlify Database, Google Sheets.
- **מימוש שנקרא:** אתר סטטי גדול, פונקציית Google Sheets, דפי אמנה, תמונות, PDF, sitemap ו־Netlify configuration.
- **שלב משוער:** פעיל/תחזוקה.
- **המשך מומלץ:** לבדוק את מסלול החתימה החי, הרשאות Google Sheets ופרסום Netlify.

### 3. booking

- **קישור:** [Roi-Chocron/booking](https://github.com/Roi-Chocron/booking)
- **מה נקרא:** `package.json`, עץ `src/`, קבצי DB ו־Next/Vercel config.
- **מטרה:** מערכת לקביעת פגישות.
- **טכנולוגיות:** Next.js, React 19, PostgreSQL, PGlite, Google Calendar, Vercel Blob, Anthropic SDK, bcrypt, jose.
- **מימוש שנקרא:** מודולים לזמינות, bookings, Google Calendar, notifications, reminders, transcripts, server, worker ו־database.
- **שלב משוער:** פיתוח.
- **המשך מומלץ:** להגדיר secrets, לבדוק deployment ולתעד את מודל הפגישות וה-auth.

### 4. client-portal

- **קישור:** [Roi-Chocron/client-portal](https://github.com/Roi-Chocron/client-portal)
- **מה נקרא:** metadata בלבד; GitHub דיווח שה-repository ריק.
- **מטרה:** לא ניתן לקבוע.
- **שלב משוער:** רעיון.
- **המשך מומלץ:** להוסיף README ו־commit ראשון או לארכב.

### 5. LiveEdits

- **קישור:** [Roi-Chocron/LiveEdits](https://github.com/Roi-Chocron/LiveEdits)
- **מה נקרא:** `filemap.xml`, `workplan.md`, קבצי server/agent ידועים.
- **מטרה:** עריכת וידאו מבוססת קליפים לסטרימר, עם Stream Deck, OBS והעברה לעורכים.
- **טכנולוגיות:** Python, JavaScript, React, Socket.IO, OBS WebSocket, YouTube API.
- **ארכיטקטורה שנקראה:** streamer agent מקומי, compressor, uploader, server cloud, upload route, YouTube uploader, client React ו־deck UI.
- **שלב משוער:** אפיון/תכנון.
- **המשך מומלץ:** להשוות בין `filemap.xml` לבין הקוד בפועל ולהחליט מהו ה־MVP.

### 6. Karu-AI

- **קישור:** [Roi-Chocron/Karu-AI](https://github.com/Roi-Chocron/Karu-AI)
- **מה נקרא:** `README.md`, `CLOUD_DEPLOYMENT_GUIDE.md`, `package.json`.
- **מטרה:** יצירת קרוסלות Instagram מונעות AI.
- **טכנולוגיות:** Hono, Cloudflare Workers, D1, KV, Workers AI, Llama, FLUX/SDXL, Node.js, Express, Playwright, Docker.
- **ארכיטקטורה:** מסלול Cloudflare Serverless ומסלול Docker עצמאי.
- **שלב משוער:** מוכן לפריסה.
- **המשך מומלץ:** לבחור מסלול אחד, להגדיר JWT/Meta/Polar ולבדוק migrations ו־deploy.

### 7. Math

- **קישור:** [Roi-Chocron/Math](https://github.com/Roi-Chocron/Math)
- **מה נקרא:** `index.html`.
- **מטרה:** אתר סטטי לתוכן מתמטי.
- **טכנולוגיות:** HTML.
- **שלב משוער:** פעיל או הושלם.
- **המשך מומלץ:** להוסיף README, מקור התוכן ויעד hosting.

### 8. CRM

- **קישור:** [Roi-Chocron/CRM](https://github.com/Roi-Chocron/CRM)
- **מה נקרא:** metadata ומבנה repository; branch שסופק לא היה קריא דרך החיבור.
- **מטרה משוערת:** CRM או prototype עסקי.
- **טכנולוגיות נראות:** HTML, JavaScript.
- **שלב משוער:** אפיון.
- **המשך מומלץ:** לקרוא את branch הנכון ולתעד מסכים, מודל נתונים ופעולות.

### 9. minharez-sw

- **קישור:** [Roi-Chocron/minharez-sw](https://github.com/Roi-Chocron/minharez-sw)
- **מה נקרא:** `index.html`, `sw.js`.
- **מטרה:** host בסיסי ל־Service Worker.
- **טכנולוגיות:** HTML, JavaScript, Service Worker.
- **שלב משוער:** הושלם.
- **המשך מומלץ:** להוסיף README שמסביר כיצד השירות משמש את המערכת הגדולה.

### 10. GemmaAgent

- **קישור:** [Roi-Chocron/GemmaAgent](https://github.com/Roi-Chocron/GemmaAgent)
- **מה נקרא:** `README.md`, עץ קבצים, קבצי Python, מפרטי agent ו־dashboard.
- **מטרה:** ניהול ואינטראקציה עם מודלי Gemma מקומיים דרך Ollama, יחד עם Gemini.
- **טכנולוגיות:** Python, Gemma, Ollama, Gemini API, GUI, HTTP API.
- **רכיבים שנקראו:** `gemma_manager.py`, `gemma_agent_gui.py`, `agent_engine.py`, `agent_tools.py`, `agent_api_server.py`, `voice_manager.py`.
- **שלב משוער:** פיתוח.
- **המשך מומלץ:** להריץ מסלול GUI מלא ולתעד את התקנת Ollama, המודלים והשרת המרוחק.

### 11. localaiagent

- **קישור:** [Roi-Chocron/localaiagent](https://github.com/Roi-Chocron/localaiagent)
- **מה נקרא:** `package.json`, metadata ומבנה Expo/Rork.
- **מטרה:** אפליקציית מובייל של local AI; המטרה המדויקת לא מתועדת ב־README.
- **טכנולוגיות:** Expo, React Native, TypeScript, Expo Router, SQLite, NativeWind, Zustand.
- **שלב משוער:** פיתוח.
- **המשך מומלץ:** להוסיף README, להגדיר backend/מודל מקומי ולתעד מסכים.

### 12. roiwebsite

- **קישור:** [Roi-Chocron/roiwebsite](https://github.com/Roi-Chocron/roiwebsite)
- **מה נקרא:** `index.html`.
- **מטרה:** אתר אישי בעברית סביב למידה בדרך אישית.
- **טכנולוגיות נראות:** HTML, Tailwind CSS, JavaScript.
- **שלב משוער:** פעיל.
- **המשך מומלץ:** לתעד את היעד העסקי, מקור התוכן ו־hosting.

### 13. agent-foundry

- **קישור:** [Roi-Chocron/agent-foundry](https://github.com/Roi-Chocron/agent-foundry)
- **מה נקרא:** metadata ומבנה repository; branch `master` לא היה זמין דרך החיבור.
- **מטרה משוערת:** תשתית agent מודולרית.
- **מבנה שנראה:** `agent_management`, `computer_control`, `llm_communication`, `screen_understanding`, `user_interface`.
- **שלב משוער:** אפיון.
- **המשך מומלץ:** לקרוא את branch ברירת המחדל בפועל, `README.md` ו־`main.py`.

### 14. backupmywebsite

- **קישור:** [Roi-Chocron/backupmywebsite](https://github.com/Roi-Chocron/backupmywebsite)
- **מה נקרא:** מבנה cPanel, `accessibility_recommendations.md`, `seo_recommendations.md`, תיקיית `htdocs`.
- **מטרה:** גיבוי אתר והמלצות לשיפור SEO ונגישות.
- **טכנולוגיות/תשתית:** HTML, cPanel, SQL.
- **שלב משוער:** ארכיון.
- **המשך מומלץ:** לסמן מהו backup בלבד ומה מיועד לשחזור או פריסה.

### 15. orchestrator

- **קישור:** [Roi-Chocron/orchestrator](https://github.com/Roi-Chocron/orchestrator)
- **מה נקרא:** metadata ומבנה repository; README לא הוחזר באופן תקין דרך החיבור.
- **מטרה משוערת:** תזמור תהליכים או סוכנים ב־Python.
- **טכנולוגיות נראות:** Python.
- **שלב משוער:** אפיון.
- **המשך מומלץ:** להוסיף README ותרשים זרימה.

### 16. Gemini-Gui-Agent

- **קישור:** [Roi-Chocron/Gemini-Gui-Agent](https://github.com/Roi-Chocron/Gemini-Gui-Agent)
- **מה נקרא:** `README.md`, `requirements.txt`, עץ קבצים.
- **מטרה:** agent אוטונומי שמקבל משימות, מנתח את המסך ושולט בעכבר ובמקלדת.
- **טכנולוגיות:** Python, Gemini API, PyAutoGUI, Pillow, python-dotenv, Rich.
- **Roadmap שנקראה:** OODA loop, agent management, זיכרון קצר/ארוך וסוכנים מומחים.
- **שלב משוער:** פיתוח.
- **המשך מומלץ:** להוסיף config בטוח, ליישם OODA ולבדוק sandbox להרצת פעולות GUI.

### 17. cigarete

- **קישור:** [Roi-Chocron/cigarete](https://github.com/Roi-Chocron/cigarete)
- **מה נקרא:** `package.json`, `app.json`, מבנה Expo.
- **מטרה:** אפליקציית מובייל בשם Smoke; המטרה העסקית עדיין לא מתועדת.
- **טכנולוגיות:** Expo, React Native, TypeScript, Expo Router, SQLite, notifications, location, image picker.
- **שלב משוער:** פיתוח.
- **המשך מומלץ:** לכתוב README ולהסביר את מודל הנתונים, הרשאות והמסכים.

### 18. Mange-time

- **קישור:** [Roi-Chocron/Mange-time](https://github.com/Roi-Chocron/Mange-time)
- **מה נקרא:** metadata; repository ריק.
- **מטרה:** לא ידועה.
- **שלב משוער:** רעיון.
- **המשך מומלץ:** להוסיף תיאור או לארכב.

### 19. Hackers

- **קישור:** [Roi-Chocron/Hackers](https://github.com/Roi-Chocron/Hackers)
- **מה נקרא:** metadata; repository ריק.
- **מטרה:** לא ידועה.
- **שלב משוער:** רעיון.
- **המשך מומלץ:** להוסיף תיאור או לארכב.

### 20. Siri2

- **קישור:** [Roi-Chocron/Siri2](https://github.com/Roi-Chocron/Siri2)
- **מה נקרא:** `README.md`, מבנה `jarvis_assistant`.
- **מטרה:** עוזר קולי J.A.R.V.I.S. עם זיהוי קולי, TTS, ניהול קבצים, הפעלת אפליקציות וחיפוש.
- **טכנולוגיות:** Python, Gemini, speech recognition, TTS ואוטומציית OS.
- **שלב משוער:** אפיון/פיתוח.
- **המשך מומלץ:** לייצב תלויות OS, להוציא API keys לקובץ סביבה ולהשלים תכונות planned.

### 21. Siri3

- **קישור:** [Roi-Chocron/Siri3](https://github.com/Roi-Chocron/Siri3)
- **מה נקרא:** metadata; repository ריק.
- **מטרה:** לא ידועה.
- **שלב משוער:** רעיון.
- **המשך מומלץ:** להוסיף תכולה או לקשר לגרסה אחרת של Siri.

### 22. siri

- **קישור:** [Roi-Chocron/siri](https://github.com/Roi-Chocron/siri)
- **מה נקרא:** `server.py`, `index.html`, `actions.py`, `communication_server.py`, `gemini_basic.py`.
- **מטרה:** שרת סטטי קטן וסביבת ניסוי לעוזר.
- **טכנולוגיות:** Python, HTTP server, HTML, Gemini.
- **מימוש שנקרא:** `server.py` מגיש את תיקיית הפרויקט על פורט 8002.
- **שלב משוער:** הושלם/ניסוי.
- **המשך מומלץ:** להוסיף README, הוראות הרצה והפרדה בין ניסויים לשרת.

### 23. ubuntu

- **קישור:** [Roi-Chocron/ubuntu](https://github.com/Roi-Chocron/ubuntu)
- **מה נקרא:** metadata; repository פרטי וריק.
- **מטרה:** לא ידועה.
- **שלב משוער:** רעיון.
- **המשך מומלץ:** להוסיף תיעוד או להסיר placeholder.

### 24. hjhh

- **קישור:** [Roi-Chocron/hjhh](https://github.com/Roi-Chocron/hjhh)
- **מה נקרא:** metadata; repository ריק.
- **מטרה:** לא ידועה.
- **שלב משוער:** רעיון.
- **המשך מומלץ:** להוסיף תיאור ומטרה.

### 25. aptttt

- **קישור:** [Roi-Chocron/aptttt](https://github.com/Roi-Chocron/aptttt)
- **מה נקרא:** metadata; repository ריק.
- **מטרה:** לא ידועה.
- **שלב משוער:** רעיון.
- **המשך מומלץ:** להוסיף תיאור ומטרה.

### 26. apk

- **קישור:** [Roi-Chocron/apk](https://github.com/Roi-Chocron/apk)
- **מה נקרא:** metadata; repository ריק.
- **מטרה:** לא ידועה.
- **שלב משוער:** רעיון.
- **המשך מומלץ:** להוסיף תיאור ומטרה.

### 27. site-spotlight-48e04e4d

- **קישור:** [Roi-Chocron/site-spotlight-48e04e4d](https://github.com/Roi-Chocron/site-spotlight-48e04e4d)
- **מה נקרא:** `README.md`, `package.json`, Vite/Tailwind config.
- **מטרה:** פרויקט Lovable לבניית אתר.
- **טכנולוגיות:** Vite, React, TypeScript, shadcn-ui, Tailwind CSS, Lovable.
- **שלב משוער:** פיתוח.
- **המשך מומלץ:** לתעד את המוצר והחיבור ל־Lovable.

### 28. site-spotlight

- **קישור:** [Roi-Chocron/site-spotlight](https://github.com/Roi-Chocron/site-spotlight)
- **מה נקרא:** metadata; repository פרטי ריק.
- **מטרה:** לא ידועה; ייתכן שהוא גרסה מקבילה ל־site-spotlight-48e04e4d.
- **שלב משוער:** רעיון.
- **המשך מומלץ:** להחליט איזה repository הוא המקור הפעיל.

### 29. roi-courses

- **קישור:** [Roi-Chocron/roi-courses](https://github.com/Roi-Chocron/roi-courses)
- **מה נקרא:** `README.md`, `package.json`, Vite/Tailwind config.
- **מטרה:** פרויקט Lovable של קורסים.
- **טכנולוגיות:** Vite, React, TypeScript, shadcn-ui, Tailwind CSS, Lovable.
- **שלב משוער:** פיתוח.
- **המשך מומלץ:** לתעד את מבנה הקורסים, data layer והאם קיים Supabase/backend.

## מגבלות הסריקה

1. GitHub API החזיר כמה repositories ריקים ולכן אין דרך לקרוא מהם קוד.
2. בחלק מה-repositories branch ברירת המחדל שסופק לא תאם ל-branch הקיים, ולכן התיעוד מסומן כמשוער.
3. לא הועתק קוד ל-repository המקומי; נשמרו רק מטא־דאטה, סיכומים, קישורים ונתוני seed.
4. לא נאספו secrets, קבצי `.env`, מסדי נתונים בינאריים או תמונות.
5. `lastWorkedAt` בנתוני הייבוא מסומן כמועד הסריקה, לא כמועד commit אחרון. יש לסנכרן אותו מול GitHub commits בשלב הבא.

## מה הוסף לאתר

- נתוני demo לכל 29 הפרויקטים ב־[github-projects.ts](./apps/web/src/lib/github-projects.ts).
- seed SQL לכל 29 הפרויקטים ב־[github-projects.sql](./db/github-projects.sql).
- קישור GitHub לכל פרויקט.
- סטטוס, עדיפות, טכנולוגיות, תיאור וצעד הבא.
- תיעוד מפורט זה.

## מה נשאר

1. להריץ את `db/github-projects.sql` על D1 המקומי/production.
2. להוסיף סנכרון commit אחרון, branch ושפות באמצעות GitHub API.
3. להוסיף שדות `githubDefaultBranch`, `githubVisibility`, `githubUpdatedAt` ו־`githubLastCommitAt`.
4. להשלים קריאה של branches שלא היו זמינים דרך החיבור.
5. לבצע review ידני שלך לתיאורים ולסטטוסים המשוערים.
