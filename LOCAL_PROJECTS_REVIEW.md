# Local Projects Review

## Scope

נבדקו תיקיות עבודה תחת:

- `/home/roi/שולחן עבודה`
- `/home/roi/data_storage/AI Course/brand`

הזיהוי התבסס על תיקיות פרויקט, קובצי `package.json` ותיקיות source/config
נלוות. תיקיות cache, `node_modules`, סביבות Python וקבצי build לא נרשמו כפרויקטים.

## עקרון איחוד

כל עותק מקומי נשמר כרשומה נפרדת עם `localPath`. כאשר ניתן לזהות התאמה ל־GitHub,
הרשומה מקבלת את אותו `githubUrl`, אך אינה מתמזגת עם הרשומה המקורית. כך נשמרים:

- נתיב נפרד לכל עותק.
- שלב פיתוח נפרד לכל עותק.
- אפשרות להשוות בין עותק מקומי, repository ועותקים נוספים.

הנתונים נמצאים ב־[local-projects.ts](./apps/web/src/lib/local-projects.ts) ונוספו
לרשימת ה־demo המאוחדת ב־[constants.ts](./apps/web/src/lib/constants.ts).

## התאמות שזוהו

| משפחה | GitHub | עותקים מקומיים |
|---|---|---|
| Karu AI | `Karu-AI` | `KaruAI2`, `android-app`, `cloudflare-mcp-server`, `karu-cloudflare-backend`, `KaruAI - Export` |
| Client Portal | `client-portal` | `שולחן עבודה/תשתית` |
| Lesson | `lesson-app` | `שולחן עבודה/lesson` |
| Points | `points-management` | `שולחן עבודה/Points` |
| Instagram Lead Bot | `instagram-lead-bot` | `שולחן עבודה/Costumers` |

Kickgame, WhatsApp Exporter, Marketing Video, Wix/Astro ו־AI Course Brand נשמרו
גם הם כפרויקטים מקומיים, גם כאשר לא נמצאה התאמת GitHub חד־משמעית.

## סטטוס

- נוספו 23 רשומות מקומיות נפרדות.
- מצב demo כולל כעת את פרויקטי GitHub, הפרויקטים הקיימים ואת העותקים המקומיים.
- אין מחיקה או החלפה של רשומות GitHub.
- התאמות GitHub הן קישור אינדקס בלבד; הן אינן טוענות שהקוד המקומי והקוד המרוחק זהים.

## מה עדיין נדרש

1. לבצע השוואת commit/branch בין כל עותק מקומי ל־GitHub.
2. לאשר ידנית את שמות הפרויקטים והסטטוסים המשוערים.
3. להריץ את seed המקומי של הרשומות המקומיות גם ב־D1, כדי שמצב API יציג אותן.
4. להוסיף סריקה חוזרת מבוקרת במקום להסתמך על סריקה חד־פעמית.
