# מה עשיתי / What I do — רשימת קבצים למימוש

## 1. מטרת המסמך

המסמך מגדיר את הקבצים שנצטרך ליצור כדי להפוך את העיצוב הקיים ב-[brand/](<../AI Course/brand>) למערכת האישית **מה עשיתי / What I do**.

הכוונה היא לשמור על אותה שפה חזותית ככל האפשר:

- אותה פלטת צבעים.
- אותם tokens של צבע, טיפוגרפיה, ריווח, פינות וצללים.
- אותו סגנון של כפתורים, כרטיסים, תגיות, מסגרות ו-micro-interactions.
- אותם פונטים ואייקוני SVG.
- אותו כיוון RTL ועקרונות responsive.

השינוי הוא בתוכן ובפונקציונליות: במקום ספר מותג של קורס, הממשק יציג dashboard אישי של פרויקטים.

## 2. העיצוב הקיים שנשתמש בו

### קבצים קיימים שצריך להעתיק או לשמר

מקור: `/home/roi/data_storage/AI Course/brand`

| קובץ/תיקייה | שימוש במערכת החדשה | פעולה |
|---|---|---|
| `tokens.css` | צבעים, טיפוגרפיה, ריווח, צללים, themes | להעתיק ולשנות רק מיתוג/ערכים שנדרשים |
| `components.css` | רכיבי UI ואינטראקציות בסיסיות | להעתיק ולשמר |
| `brand-book.css` | layout וסגנון עמודים | לפצל או להרחיב לפי מסכי המערכת |
| `assets/fonts.css` | טעינת פונטים | להעתיק |
| `assets/fonts/` | קובצי הפונטים | להעתיק |
| `assets/*.svg` | favicon, סימן מותג ולוגואים | להעתיק ולהחליף/לעדכן את סימן המותג לפי הצורך |
| `vendor/lucide/` | אייקונים | להעתיק או להתקין דרך package manager |

### התאמות תוכן בעיצוב

במקום:

- `בונים את המוח`
- `Building the Mind`
- `ספר מותג`
- `קורסים`, `פרקים` ו`רמות`

יופיעו:

- `מה עשיתי`
- `What I do`
- `ניהול הפרויקטים שלי`
- `פרויקטים`, `שלבים`, `טכנולוגיות` ו`פעילות אחרונה`

## 3. מבנה repository מומלץ

```text
what-i-do/
├── apps/
│   ├── web/                         # צד לקוח
│   └── api/                         # צד שרת / Cloudflare Worker
├── packages/
│   └── shared/                      # טיפוסים, סכמות וערכים משותפים
├── db/
│   ├── migrations/                  # migrations של D1
│   └── seed.ts                      # נתוני התחלה אופציונליים
├── public/
│   └── assets/                      # assets סטטיים של העיצוב
├── tests/
│   ├── api/
│   └── web/
├── wrangler.toml
├── package.json
├── tsconfig.json
├── eslint.config.js
├── prettier.config.js
└── README.md
```

## 4. צד לקוח — `apps/web`

### 4.1 קבצי תשתית

```text
apps/web/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
└── src/
```

#### `apps/web/index.html`

- נקודת הכניסה של אפליקציית ה-React.
- `lang="he"` ו-`dir="rtl"`.
- title: `מה עשיתי · What I do`.
- meta description פרטית ולא שיווקית.
- טעינת favicon וה-assets.

#### `apps/web/package.json`

תלויות צד לקוח עיקריות:

- `react`
- `react-dom`
- `react-router-dom`
- `@tanstack/react-query`
- `react-hook-form`
- `zod`
- `@hookform/resolvers`
- `lucide-react`

### 4.2 קבצי מקור

```text
apps/web/src/
├── main.tsx
├── App.tsx
├── router.tsx
├── styles/
│   ├── tokens.css
│   ├── components.css
│   ├── app.css
│   └── brand.css
├── assets/
│   ├── fonts.css
│   ├── fonts/
│   ├── favicon.svg
│   ├── logo-mark.svg
│   ├── logo-mark-reverse.svg
│   ├── logo-mark-mono-ink.svg
│   └── logo-mark-mono-white.svg
├── lib/
│   ├── api-client.ts
│   ├── query-client.ts
│   ├── formatters.ts
│   ├── constants.ts
│   └── utils.ts
├── types/
│   └── project.ts
├── hooks/
│   ├── use-projects.ts
│   ├── use-project.ts
│   ├── use-technologies.ts
│   └── use-theme.ts
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   ├── Topbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── MobileNav.tsx
│   │   └── PageContainer.tsx
│   ├── brand/
│   │   ├── BrandLockup.tsx
│   │   └── BrandMark.tsx
│   ├── dashboard/
│   │   ├── DashboardStats.tsx
│   │   ├── RecentProjects.tsx
│   │   ├── AttentionProjects.tsx
│   │   └── ActivitySummary.tsx
│   ├── projects/
│   │   ├── ProjectTable.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectRow.tsx
│   │   ├── ProjectStatusBadge.tsx
│   │   ├── ProjectPriorityBadge.tsx
│   │   ├── ProjectFilters.tsx
│   │   ├── ProjectSearch.tsx
│   │   ├── ProjectLinks.tsx
│   │   ├── TechnologyTags.tsx
│   │   ├── ProjectEmptyState.tsx
│   │   └── ProjectSkeleton.tsx
│   ├── forms/
│   │   ├── ProjectForm.tsx
│   │   ├── ProjectBasicFields.tsx
│   │   ├── ProjectLocationFields.tsx
│   │   ├── ProjectStatusFields.tsx
│   │   ├── TechnologyPicker.tsx
│   │   ├── LinkFields.tsx
│   │   └── FormError.tsx
│   ├── activity/
│   │   ├── ActivityTimeline.tsx
│   │   ├── ActivityItem.tsx
│   │   └── QuickUpdateActivity.tsx
│   ├── tasks/
│   │   ├── TaskList.tsx
│   │   ├── TaskItem.tsx
│   │   └── AddTaskForm.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── IconButton.tsx
│       ├── Badge.tsx
│       ├── Card.tsx
│       ├── Modal.tsx
│       ├── Select.tsx
│       ├── TextInput.tsx
│       ├── Textarea.tsx
│       ├── EmptyState.tsx
│       ├── LoadingState.tsx
│       ├── ErrorState.tsx
│       └── ThemeToggle.tsx
├── pages/
│   ├── DashboardPage.tsx
│   ├── ProjectsPage.tsx
│   ├── ProjectDetailsPage.tsx
│   ├── NewProjectPage.tsx
│   ├── EditProjectPage.tsx
│   ├── SettingsPage.tsx
│   ├── NotFoundPage.tsx
│   └── UnauthorizedPage.tsx
└── test/
    ├── setup.ts
    ├── ProjectForm.test.tsx
    ├── ProjectFilters.test.tsx
    └── DashboardStats.test.tsx
```

### 4.3 תפקיד מסכי הצד לקוח

| מסך | Route | תפקיד |
|---|---|---|
| Dashboard | `/` | תמונת מצב, פעילות אחרונה ופרויקטים שדורשים תשומת לב |
| רשימת פרויקטים | `/projects` | חיפוש, סינון, מיון וכניסה לפרויקט |
| פרויקט | `/projects/:id` | כל המידע, הקישורים, המשימות והפעילות |
| פרויקט חדש | `/projects/new` | יצירת פרויקט |
| עריכת פרויקט | `/projects/:id/edit` | עדכון מידע קיים |
| הגדרות | `/settings` | theme, ערכי מערכת והעדפות עתידיות |

## 5. צד שרת — `apps/api`

### 5.1 קבצי תשתית

```text
apps/api/
├── package.json
├── tsconfig.json
├── wrangler.toml
└── src/
```

#### `apps/api/src/index.ts`

- יצירת Worker.
- חיבור ל-Hono.
- רישום routes ו-middleware.
- טיפול ב-CORS לפי הדומיין של האפליקציה.

#### `apps/api/src/types.ts`

- טיפוסי `Bindings` עבור D1, secrets ו-Cloudflare Access.
- טיפוסי context של Hono.

### 5.2 routes

```text
apps/api/src/
├── index.ts
├── types.ts
├── app.ts
├── middleware/
│   ├── auth.ts
│   ├── error-handler.ts
│   ├── cors.ts
│   └── request-id.ts
├── routes/
│   ├── health.ts
│   ├── projects.ts
│   ├── technologies.ts
│   ├── project-links.ts
│   ├── project-tasks.ts
│   └── activity.ts
├── handlers/
│   ├── project-handlers.ts
│   ├── technology-handlers.ts
│   ├── task-handlers.ts
│   └── activity-handlers.ts
├── services/
│   ├── project-service.ts
│   ├── technology-service.ts
│   ├── dashboard-service.ts
│   └── activity-service.ts
├── repositories/
│   ├── project-repository.ts
│   ├── technology-repository.ts
│   ├── task-repository.ts
│   └── activity-repository.ts
├── schemas/
│   ├── project-schema.ts
│   ├── technology-schema.ts
│   ├── task-schema.ts
│   └── query-schema.ts
└── db/
    ├── client.ts
    └── schema.ts
```

### 5.3 endpoints נדרשים

```text
GET    /api/health

GET    /api/dashboard

GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PATCH  /api/projects/:id
POST   /api/projects/:id/archive
POST   /api/projects/:id/activity

GET    /api/projects/:id/tasks
POST   /api/projects/:id/tasks
PATCH  /api/projects/:id/tasks/:taskId
DELETE /api/projects/:id/tasks/:taskId

GET    /api/technologies
POST   /api/technologies

GET    /api/projects/:id/links
POST   /api/projects/:id/links
PATCH  /api/projects/:id/links/:linkId
DELETE /api/projects/:id/links/:linkId
```

### 5.4 כללי צד שרת

- כל body ו-query עוברים ולידציה עם Zod.
- כל route שאינו `/api/health` מוגן דרך Cloudflare Access או middleware תואם.
- אין גישה ישירה של הדפדפן ל-D1.
- אין לשמור token של GitHub ב-frontend.
- אין לבצע מחיקה פיזית של פרויקט ב-MVP; משתמשים ב-archive.
- שגיאות מחזירות status code מתאים ופורמט JSON עקבי.

## 6. חבילה משותפת — `packages/shared`

```text
packages/shared/
├── package.json
└── src/
    ├── index.ts
    ├── types/
    │   ├── project.ts
    │   ├── technology.ts
    │   ├── task.ts
    │   ├── activity.ts
    │   └── dashboard.ts
    ├── schemas/
    │   ├── project.ts
    │   ├── technology.ts
    │   ├── task.ts
    │   └── filters.ts
    ├── constants/
    │   ├── project-statuses.ts
    │   ├── priorities.ts
    │   └── hosting-providers.ts
    └── api/
        └── error-response.ts
```

מטרת החבילה היא למנוע מצב שבו צד הלקוח וצד השרת מגדירים מודלים שונים לאותו פרויקט.

## 7. מסד נתונים ו-migrations — `db`

```text
db/
├── migrations/
│   ├── 0001_create_projects.sql
│   ├── 0002_create_technologies.sql
│   ├── 0003_create_project_links.sql
│   ├── 0004_create_project_tasks.sql
│   └── 0005_create_activity_log.sql
├── seed.ts
└── README.md
```

### טבלאות

- `projects`
- `technologies`
- `project_technologies`
- `project_links`
- `project_tasks`
- `activity_log`

### אינדקסים

יש ליצור אינדקסים לפחות על:

- `projects.status`
- `projects.priority`
- `projects.last_worked_at`
- `projects.updated_at`
- `project_tasks.project_id`
- `activity_log.project_id`

## 8. קבצי פריסה ותפעול

```text
wrangler.toml
.dev.vars.example
.env.example
.gitignore
.github/
└── workflows/
    ├── test.yml
    └── deploy.yml
```

### `wrangler.toml`

- הגדרת Worker.
- binding ל-D1.
- הגדרת assets של אפליקציית ה-web.
- environments של `dev`, `staging` ו-`production`.

### `.dev.vars.example`

דוגמה בלבד למשתני פיתוח. אין לשמור secrets אמיתיים ב-repository.

### GitHub Actions

- `test.yml`: typecheck, lint, unit tests ו-build.
- `deploy.yml`: הרצת migrations ופריסה לאחר הצלחת הבדיקות.

## 9. בדיקות

```text
tests/
├── api/
│   ├── projects.test.ts
│   ├── dashboard.test.ts
│   ├── auth.test.ts
│   └── validation.test.ts
└── web/
    ├── dashboard.test.tsx
    ├── projects-list.test.tsx
    ├── project-details.test.tsx
    └── project-form.test.tsx
```

בדיקות חובה ל-MVP:

- יצירת פרויקט עם שדות חובה.
- דחיית URL לא תקין.
- עדכון סטטוס ו-`last_worked_at`.
- חיפוש וסינון.
- הצגת dashboard.
- חסימת משתמש לא מורשה.
- מצב empty, loading ו-error בצד לקוח.

## 10. סדר יצירת הקבצים

### שלב א — העברת המיתוג והעיצוב

1. `apps/web/index.html`
2. `apps/web/src/styles/tokens.css`
3. `apps/web/src/styles/components.css`
4. `apps/web/src/styles/brand.css`
5. `apps/web/src/assets/`
6. `BrandLockup.tsx`
7. `AppShell.tsx`

### שלב ב — שלד האפליקציה

1. `main.tsx`
2. `App.tsx`
3. `router.tsx`
4. `api-client.ts`
5. `ProjectTable.tsx`
6. `ProjectCard.tsx`
7. `DashboardPage.tsx`
8. `ProjectsPage.tsx`

### שלב ג — נתונים ו-API

1. `packages/shared/src/types/`
2. `packages/shared/src/schemas/`
3. migrations
4. `db/schema.ts`
5. repositories
6. services
7. routes
8. `index.ts`

### שלב ד — CRUD

1. `ProjectForm.tsx`
2. `NewProjectPage.tsx`
3. `EditProjectPage.tsx`
4. `ProjectDetailsPage.tsx`
5. tasks, links ו-activity

### שלב ה — אבטחה ופריסה

1. `auth.ts`
2. `wrangler.toml`
3. `.dev.vars.example`
4. `test.yml`
5. `deploy.yml`

## 11. קבצים שלא צריך ליצור בשלב הראשון

- GitHub OAuth מלא.
- GitHub webhook.
- CLI לסריקת המחשב.
- מערכת משתמשים מרובת חשבונות.
- מערכת הרשאות לפי תפקידים.
- worker נפרד לכל אינטגרציה.
- מנגנון סנכרון אוטומטי של נתיבים מקומיים.

הקבצים האלה יוסיפו מורכבות לפני שיש צורך מוכח בהם.

## 12. תוצאה צפויה

בסיום ה-MVP יהיו:

- ממשק שנראה ומתנהג כמו העיצוב שסופק, עם מיתוג **מה עשיתי / What I do**.
- Dashboard אישי.
- ניהול מלא של פרויקטים.
- API מאובטח.
- D1 עם migrations.
- בדיקות בסיסיות.
- פריסה מוכנה ל-Cloudflare Workers & Pages.

## 13. סטטוס מימוש

### כבר נוצר

- `apps/web/` עם אפליקציית React + TypeScript + Vite.
- העיצוב המקורי הועבר ל-`apps/web/src/styles/` ול-`apps/web/public/assets/`.
- Dashboard, רשימת פרויקטים, חיפוש, סינון, כרטיסי פרויקט ועמוד פרויקט.
- טופס יצירה ועריכה ב-`apps/web/src/components/ProjectForm.tsx`.
- client ל-API ב-`apps/web/src/lib/api-client.ts`.
- `apps/api/src/index.ts` עם health check ו-CRUD בסיסי לפרויקטים.
- `db/migrations/0001_create_projects.sql`.
- `db/migrations/0002_create_project_technologies.sql`.
- `apps/api/wrangler.toml`.
- `CLIENT_IMPLEMENTATION.md` עם תיעוד חוזה ה-API ורשימת ההמשך.
- `apps/web/src/lib/github-projects.ts` עם 29 פרויקטים שיובאו מ-GitHub.
- `db/github-projects.sql` עם seed לייבוא הפרויקטים ל-D1.
- `GITHUB_PROJECTS_REVIEW.md` עם תיעוד מפורט של הסריקה.

### נשאר ליצור או להשלים

- יצירת D1 production והחלפת `database_id` האמיתי.
- Cloudflare Access והגנה בפועל על ה-API וה-frontend.
- migrations והרצת seed בסביבת development ו-production.
- בדיקות API, בדיקות הרשאות ובדיקות UI.
- GitHub Actions ל-test ול-deploy.
- CRUD ל-tasks, links ו-activity log.
- GitHub API וסנכרון נתוני repository בשלב עתידי.
- React Router אם יידרשו deep links לעמודי פרויקט.
- סנכרון אוטומטי של commit אחרון, branch ושפות GitHub.
