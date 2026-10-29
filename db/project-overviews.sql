UPDATE projects
SET
  project_overview = 'What I Do היא מערכת אישית לניהול ולתיעוד של כל הפרויקטים שנבנו לאורך הזמן. היא מאחדת במקום אחד פרויקטי GitHub, עותקים מקומיים ותתי-מערכות, ומציגה לכל רשומה את המטרה, שלב הפיתוח, הטכנולוגיות, הנתיבים, הקישורים, הפעילות האחרונה והצעד הבא. המערכת בנויה ב-React ו-TypeScript, עם API ב-Hono על Cloudflare Workers ומסד נתונים D1.',
  stage_details = 'המערכת נמצאת בשלב MVP מתקדם: Dashboard, חיפוש, סינון, צפייה ועריכה עובדים; ה-API, migrations, seed-ים וסיווגים קיימים ועברו בדיקות. עדיין נדרשים אימות ידני של התיאורים והשלבים, D1 production, Cloudflare Access, פריסה, בדיקת production וסנכרון GitHub אמיתי.',
  updated_at = '2026-10-29T01:41:00.000Z'
WHERE id = 'what-i-do';

UPDATE projects
SET
  project_overview = 'האתר האישי של רועי הוא אתר סטטי בעברית שמציג פעילות, תוכן ומקרי בוחן אישיים. הוא נבנה ב-Astro עם Tailwind CSS, TypeScript, Partytown ו-Sharp, ומיועד לטעינה מהירה ולתחזוקת תוכן פשוטה.',
  stage_details = 'הפרויקט הושלם ונמצא בתחזוקה. העבודה הבאה היא לעדכן מקרי בוחן ומאמרים חדשים ולבדוק את האתר לאחר כל פרסום.',
  updated_at = '2026-10-29T01:41:00.000Z'
WHERE id = 'roi-website';
