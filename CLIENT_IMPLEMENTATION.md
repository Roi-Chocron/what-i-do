# מה עשיתי / What I do — תיעוד מימוש צד לקוח

## 1. מה נבנה בשלב הזה

נבנה שלד צד לקוח עובד תחת `apps/web` באמצעות:

- React 19.
- TypeScript במצב strict.
- Vite.
- CSS קיים שהועבר מהעיצוב המקורי.
- נתוני demo מקומיים כדי שאפשר יהיה לראות את הממשק לפני חיבור ה-API.

המיתוג הוחלף מ"ספר המותג של בונים את המוח" ל:

- **מה עשיתי**
- **What I do**
- **כל הפרויקטים שלי. כל הצעדים הבאים.**

## 2. שלבים שבוצעו

### שלב 1 — העברת שפת העיצוב

הועתקו לתוך `apps/web`:

- `tokens.css`
- `components.css`
- `brand-book.css`
- `fonts.css`
- קובצי הפונטים
- favicon וסימני הלוגו

הקבצים נשמרו כבסיס לעיצוב החדש, ובנוסף נוצר `app.css` עבור layout ופיצ'רים ייחודיים ל-dashboard.

### שלב 2 — יצירת תשתית Vite

נוצרו:

- `apps/web/package.json`
- `apps/web/vite.config.ts`
- `apps/web/tsconfig.json`
- `apps/web/index.html`
- `apps/web/src/main.tsx`

המסמך הראשי מוגדר בעברית ובכיוון RTL.

### שלב 3 — יצירת מודל הפרויקט

ב-[project.ts](./apps/web/src/types/project.ts) הוגדרו:

- `Project`
- `ProjectInput`
- `ProjectStatus`
- `Priority`

הטיפוסים כוללים שם, תיאור, סטטוס, עדיפות, נתיב מקומי, GitHub, hosting, קישור חי, טכנולוגיות, פעילות אחרונה והצעד הבא.

### שלב 4 — יצירת מסכי הממשק

נוצרו:

- `Dashboard` בתוך `App.tsx`.
- רשימת פרויקטים.
- חיפוש טקסטואלי.
- סינון לפי סטטוס.
- כרטיסי פרויקט.
- עמוד פרויקט מפורט.
- אזור מדדים.
- מצב טעינה, שגיאה ורשימה ריקה.
- החלפת מצב בהיר/כהה.

### שלב 5 — יצירת שכבת גישה לנתונים

ב-[api-client.ts](./apps/web/src/lib/api-client.ts) נוצר client קטן שמרכז את כל הקריאות לשרת.

במצב פיתוח אפשר להציג נתוני demo כאשר מוגדר:

```env
VITE_USE_DEMO_DATA=true
```

כאשר המשתנה אינו `true`, ה-client פונה ל-`/api`.

### שלב 6 — CRUD בצד הלקוח

נוסף [ProjectForm.tsx](./apps/web/src/components/ProjectForm.tsx), שמאפשר:

- יצירת פרויקט חדש.
- עריכת פרויקט קיים.
- עדכון שם, slug, תיאור, סטטוס, עדיפות, מיקומים, טכנולוגיות, הצעד הבא והערות.
- הצגת שגיאת שמירה למשתמש.

הטופס שולח את אותו `ProjectInput` שמתועד בחוזה ה-API, ולכן אין שכבת התאמה נוספת בין הטופס לשרת.

### שלב 7 — צד שרת ו-D1

נוסף [apps/api/src/index.ts](./apps/api/src/index.ts) עם:

- `GET /api/health`.
- `GET /api/projects`.
- `GET /api/projects/:id`.
- `POST /api/projects`.
- `PATCH /api/projects/:id`.
- `POST /api/projects/:id/archive`.
- ולידציה עם Zod.
- טיפול בשגיאות JSON.
- CORS לפי `ALLOWED_ORIGIN`.
- שמירת טכנולוגיות בטבלת קשר.

נוספו migrations:

- [0001_create_projects.sql](./db/migrations/0001_create_projects.sql)
- [0002_create_project_technologies.sql](./db/migrations/0002_create_project_technologies.sql)

השרת משתמש ישירות ב-D1 דרך binding בשם `DB`. אין גישה למסד הנתונים מהדפדפן.

### שלב 8 — תפעול ופריסה

נוספו:

- [db/seed.sql](./db/seed.sql) לנתוני התחלה מקומיים/מבוקרים.
- [.env.example](./.env.example) למשתני ה-frontend.
- [test.yml](./.github/workflows/test.yml) לבדיקת build ו-typecheck.
- [deploy.yml](./.github/workflows/deploy.yml) לפריסת Worker והרצת migrations ידנית דרך GitHub Actions.

ה-deploy workflow מוגדר כ-`workflow_dispatch` בכוונה, כדי שלא תתבצע פריסת production אוטומטית לפני הגדרת D1, Access וה-secrets.

### שלב 9 — ייבוא GitHub

בוצעה סריקה של חשבון `Roi-Chocron` ונמצאו 29 repositories. נוצרו:

- [github-projects.ts](./apps/web/src/lib/github-projects.ts) — נתוני demo לכל הפרויקטים.
- [github-projects.sql](./db/github-projects.sql) — seed ל-D1.
- [GITHUB_PROJECTS_REVIEW.md](./GITHUB_PROJECTS_REVIEW.md) — תיעוד מפורט של מה שנקרא מכל repository.

בפרויקטים ריקים או כאלה שה-branch שלהם לא היה זמין, נשמר תיאור שקוף שמציין את המגבלה. לא נאספו secrets, קבצי `.env` או קבצים בינאריים.

### שלב 10 — תיקון regression ברשימת הפרויקטים

זוהה ש-[constants.ts](./apps/web/src/lib/constants.ts) הוחלף בטעות בגרסה שהכילה
רק את `roi-website`. כתוצאה מכך מצב ה-demo הציג פרויקט אחד, אף שנתוני
GitHub עצמם עדיין היו קיימים ב-[github-projects.ts](./apps/web/src/lib/github-projects.ts).

הרשימה שוחזרה למקור מאוחד:

- פרויקט `what-i-do`.
- `roi-website`.
- כל 29 פרויקטי GitHub.

נוסף [project-data.test.ts](./apps/web/src/lib/project-data.test.ts) שמוודא שמספר
הפרויקטים לא יורד מתחת ל-31 ושפרויקטי מפתח נשארים ברשימה.

### שלב 11 — איחוד פרויקטי GitHub עם פרויקטים מקומיים

נוספו 23 רשומות מקומיות נפרדות ב-[local-projects.ts](./apps/web/src/lib/local-projects.ts).
עותקים מקומיים אינם מתמזגים אוטומטית עם רשומת GitHub: לכל עותק נשמר `localPath`,
סטטוס ופיתוח נפרדים. כאשר זוהתה התאמה, נשמר גם אותו `githubUrl`.

הסקירה וההנחות מתועדות ב-[LOCAL_PROJECTS_REVIEW.md](./LOCAL_PROJECTS_REVIEW.md).
למצב API נוסף seed נפרד ב-[local-projects.sql](./db/local-projects.sql).
הסיווגים המאומתים ל-D1 נמצאים ב-[project-classification.sql](./db/project-classification.sql);
יש להריץ אותו לאחר ה-seed-ים.

### שלב 12 — סיווג ותיאור פרויקטים

לכל פרויקט יש כעת שדות נפרדים עבור:

- מטרת הפרויקט — מיוצגת בשדה `description` ומוצגת כ״תיאור / מטרת הפרויקט״.
- שלב הפיתוח — `status`.
- סוג ההקשר — `projectType`: עבודה ללקוח, עבודה ללימודים או פרויקט אישי.
- תת־סוג לפרויקט אישי — `personalProjectType`: למטרת רווח או מטרה אחרת.

הסיווג אינו משלים מידע שלא אומת. כאשר לא ניתן להסיק אם הפרויקט הוא ללקוח,
ללימודים או אישי, השדה נשאר ריק וניתן לעריכה במסך הפרויקט. Karu-AI סווג כפרויקט
אישי למטרת רווח; What I Do והאתר האישי סווגו כפרויקטים אישיים למטרה אחרת.
כל עותקי Karu-AI המקומיים קיבלו את הסיווג המסחרי אך שומרים שלב פיתוח נפרד.

### שלב 13 — סקירת README לכל פרויקט

נוסף לכל פרויקט שדה `projectOverview` לפסקה מלאה בסגנון README, ושדה
`stageDetails` לתיאור מדויק של מה שכבר עובד, מה נמצא בבדיקה ומה עדיין חסר.
שני השדות ניתנים לעריכה בטופס הפרויקט ומוצגים בעמוד הפרויקט תחת ״על הפרויקט״
ו״השלב הנוכחי״. מידע שלא ניתן לאמת נשאר ריק או מוצג כתיאור הקצר הקיים, במקום
להמציא פרטים.

לרשומות GitHub ולעותקים המקומיים נוצר גם סיכום ראשוני עקבי מתוך המידע שנקרא:
המטרה, השלב הנוכחי והצעד הבא. הסיכום מציין במפורש כאשר הסטטוס הוא הערכה על בסיס
מבנה הקוד, כדי להבדיל בין עובדה שנקראה לבין מידע שעדיין צריך אישור ידני.

הסקירות המאומתות הראשונות ל-What I Do ולאתר האישי נשמרות ב-
[project-overviews.sql](./db/project-overviews.sql).

## 3. חוזה API שה-frontend מצפה לו

### 3.1 רשימת פרויקטים

```http
GET /api/projects
```

תגובה צפויה:

```json
[
  {
    "id": "what-i-do",
    "name": "מה עשיתי",
    "slug": "what-i-do",
    "description": "לוח בקרה אישי",
    "status": "development",
    "priority": "high",
    "localPath": "/home/roi/data_storage/WhatIDo",
    "githubUrl": "https://github.com/example/what-i-do",
    "hostingProvider": "Cloudflare Workers & Pages",
    "liveUrl": "https://example.pages.dev",
    "stagingUrl": null,
    "technologies": ["React", "TypeScript", "Cloudflare D1"],
    "lastWorkedAt": "2026-10-29T00:55:00.000Z",
    "nextStep": "להשלים את צד הלקוח ולחבר API",
    "notes": "הערה",
    "createdAt": "2026-10-28T00:00:00.000Z",
    "updatedAt": "2026-10-29T00:55:00.000Z"
  }
]
```

הערה: ה-frontend משתמש כרגע ב-`camelCase`. אם השרת מחזיר `snake_case`, צריך להוסיף שכבת mapping ב-`api-client.ts`; אין להחזיר מבנה מעורב.

### 3.2 פרויקט יחיד

```http
GET /api/projects/:id
```

תגובה: אובייקט `Project` יחיד באותו מבנה שלמעלה.

השדות `projectType` ו-`personalProjectType` מוחזרים כאשר הוגדרו. ערך חסר מוחזר
כ-`undefined` בצד הלקוח, כדי להבדיל בין מידע שלא ידוע לבין מידע שסווג.

### 3.3 יצירת פרויקט

```http
POST /api/projects
Content-Type: application/json
```

גוף הבקשה:

```json
{
  "name": "שם הפרויקט",
  "slug": "project-slug",
  "description": "מה הפרויקט עושה",
  "status": "idea",
  "priority": "normal",
  "localPath": "/path/to/project",
  "githubUrl": "",
  "hostingProvider": "Cloudflare Pages",
  "liveUrl": "",
  "stagingUrl": "",
  "technologies": ["React", "TypeScript"],
  "lastWorkedAt": "2026-10-29T00:55:00.000Z",
  "nextStep": "להגדיר את השלב הבא",
  "notes": ""
}
```

השרת צריך להשלים:

- `id`
- `createdAt`
- `updatedAt`
- `lastWorkedAt` אם לא נשלח

תגובה: פרויקט מלא שנוצר, עם HTTP `201`.

### 3.4 עדכון פרויקט

```http
PATCH /api/projects/:id
Content-Type: application/json
```

ניתן לשלוח רק שדות שהשתנו:

```json
{
  "status": "testing",
  "lastWorkedAt": "2026-10-29T01:20:00.000Z",
  "nextStep": "להריץ בדיקות responsive"
}
```

תגובה: פרויקט מלא ומעודכן.

### 3.5 שגיאות

כל שגיאה צריכה להחזיר JSON:

```json
{
  "message": "תיאור ברור למשתמש",
  "code": "VALIDATION_ERROR",
  "fields": {
    "name": "שם הפרויקט הוא שדה חובה"
  }
}
```

ה-frontend מציג את `message`. בעת הוספת טפסים מלאים, יוצגו גם שגיאות מתוך `fields`.

## 4. אבטחה ו-headers

הדפדפן לא ישלח token ידני. ההנחה היא ש-Cloudflare Access יגן על היישום וה-API, וה-cookie של Access יישלח באותו origin.

השרת צריך:

- להחזיר `401` או `403` כאשר המשתמש אינו מורשה.
- להחזיר `Content-Type: application/json`.
- להגדיר CORS רק אם ה-frontend וה-API ייפרסו בדומיינים שונים.
- לא לחשוף secrets ב-response.

## 5. החלטות שעדיין פתוחות

- Cloudflare Access עדיין לא חובר בפועל; כרגע ה-middleware מוכן ברמת CORS, וההגנה תוגדר בפריסת Cloudflare.
- הניווט בין רשימה לפרויקט נעשה כרגע בתוך `App.tsx`; React Router יתווסף אם נצטרך deep links או refresh בעמוד פרויקט.
- נתוני demo מופעלים רק במפורש דרך `VITE_USE_DEMO_DATA=true`; אין fallback שקט כאשר API אמיתי נכשל.
- הנתיב המקומי הוא טקסט תיעודי בלבד. אתר בענן לא יכול לפתוח תיקייה מקומית בלי helper מקומי ייעודי.
- `wrangler.toml` עדיין מכיל `database_id` placeholder, ולכן אין לבצע deploy production לפני החלפתו.
- CRUD של tasks, links ו-activity log טרם נבנה.
- אין עדיין GitHub API או סנכרון אוטומטי.
- ה-workflows קיימים אך לא הופעלו מול חשבון Cloudflare אמיתי.
- נתוני GitHub נוספו ל-demo ול-seed, אך עדיין לא הורצו על D1 המקומי או production.
- `lastWorkedAt` של הייבוא הוא מועד הסריקה, לא מועד commit אחרון.
- נתוני ה-demo מאוחדים כעת וכוללים את פרויקט What I Do, האתר האישי, 29 פרויקטי GitHub ו-23 רשומות מקומיות.
- תשעה repositories שאומתו כריקים לחלוטין הוסרו מנתוני האתר ומה-seed; המחיקה מ-GitHub
  דורשת הרשאת מחיקת repository ואינה מבוצעת דרך חיבור הקריאה הנוכחי.
- לאחר סריקה חוזרת נמחקו בפועל כל 9 ה-repositories הריקים מ-GitHub, ואימות GitHub
  מחזיר כעת 0 repositories ריקים. העותק המקומי של Client Portal נשאר כי הוא תיקייה
  מקומית לא-ריקה, אך הקישור ל-repository המרוחק הוסר.
- `roiwebsite` ו-`Math` הוסרו מנתוני האתר ומה-seed לבקשת המשתמש. מחיקתם בפועל
  מ-GitHub דורשת הרשאת מחיקה שאינה זמינה בחיבור הנוכחי.

## 6. מה נשאר לעשות

### חובה לפני MVP בענן

1. ליצור D1 database אמיתי ולהחליף את `database_id` ב-[wrangler.toml](./apps/api/wrangler.toml).
2. להריץ migrations מקומית וב-production.
3. להגדיר Cloudflare Access ולהגביל את הגישה למשתמש המורשה.
4. להגדיר את ה-frontend וה-API על אותו origin או לעדכן `VITE_API_BASE_URL` ו-CORS.
5. להוסיף בדיקות API והרשאות.
6. להגדיר workflow לפריסה ולבדוק deploy מלא.
7. להריץ את `db/github-projects.sql` אחרי ה-migrations כדי שכל הפרויקטים יופיעו ב-D1.

### אחרי MVP

1. להוסיף tasks, links ו-activity log.
2. להוסיף React Router וכתובות deep-link.
3. להוסיף GitHub API באופן מאובטח בצד השרת.
4. להוסיף export וגיבוי.
5. להוסיף helper מקומי מבוקר אם יהיה צורך בפתיחת תיקיות מקומיות.
6. לבצע review ידני של התיאורים והסטטוסים המשוערים ב-[GITHUB_PROJECTS_REVIEW.md](./GITHUB_PROJECTS_REVIEW.md).

## 7. הרצה מקומית

מתוך `apps/web`:

```bash
npm install
npm run dev
```

להרצה עם נתוני demo:

```bash
VITE_USE_DEMO_DATA=true npm run dev
```

build:

```bash
npm run build
```

## 8. אימות שבוצע

הורצו בהצלחה:

```bash
cd apps/web
npm install
npm run build
```

ה-build עבר בהצלחה עם TypeScript strict ו-Vite. קבצי `dist`, `node_modules` ו-`*.tsbuildinfo` מוחרגים באמצעות `.gitignore`.

נוסף test regression:

```bash
cd apps/web
npm test
```

הבדיקה עברה בהצלחה: פרויקט אחד, test אחד.

נוסף גם API typecheck:

```bash
cd apps/api
npm install
npm run typecheck
```

ה-typecheck של ה-Worker עבר בהצלחה. `npm install` של Wrangler דיווח על חולשות תלויות transitive; הן מגיעות מחבילת כלי הפיתוח ולא מחבילת runtime של ה-API, ויש לבדוק אותן לפני פריסת production.

נוסף עדכון ל-Zod 4.6.7. בדיקת `npm audit --omit=dev --audit-level=high` של ה-API הסתיימה ללא חולשות runtime; קיימות עדיין התראות transitive בחבילות כלי הפיתוח של Wrangler.

## 9. מצב נוכחי

### הושלם מקומית

- צד לקוח עובד עם נתוני demo או API אמיתי.
- CRUD בסיסי לפרויקטים.
- טופס יצירה ועריכה.
- חיפוש וסינון.
- Dashboard ועמוד פרויקט.
- Worker API עם Zod ו-D1.
- migrations ו-seed.
- build של ה-frontend.
- typecheck של ה-API.
- workflow בדיקות ו-workflow deploy ידני.
- בדיקת regression שמונעת החלפה שקטה של הרשימה המלאה בנתוני demo.

### נשאר לפני סיום הפריסה

1. יצירת database אמיתי ב-Cloudflare.
2. החלפת `database_id` ב-[wrangler.toml](./apps/api/wrangler.toml).
3. הגדרת Cloudflare Access.
4. הוספת secrets ל-GitHub Actions.
5. הרצת migrations ו-deploy בסביבת Cloudflare.
6. בדיקה ידנית של ה-UI מול Worker production.

### נשאר לאחר ה-MVP

- tasks, links ו-activity log.
- GitHub API.
- איחוד או תיעוד מפורש של seed ה-D1 המלא, כדי שלא יהיה צורך להריץ שני קובצי seed
  בנפרד.
- deep links עם React Router.
- ייצוא וגיבוי.
- helper מקומי לנתיבים.
