import type { Project } from "../types/project";

type GithubSeed = Pick<Project, "name" | "slug" | "description" | "status" | "priority" | "technologies" | "nextStep" | "githubUrl"> & {
  lastWorkedAt: string;
};

const repo = (name: string) => `https://github.com/Roi-Chocron/${name}`;
const now = "2026-10-29T00:00:00.000Z";

const projects: GithubSeed[] = [
  { name: "SalesAI", slug: "salesai", description: "מאגר הכנת נתונים לאימון מודל: הורדת תת-מערך FineWeb-Edu ב-streaming וכתיבה ל-JSONL.", status: "idea", priority: "normal", technologies: ["Python", "Hugging Face Datasets", "JSONL"], nextStep: "לתעד את מטרת המודל ואת שלבי האימון החסרים.", githubUrl: repo("SalesAI"), lastWorkedAt: now },
  { name: "haredisurvey", slug: "haredisurvey", description: "אתר ומערכת תוכן לאמנת הנשים החרדיות, כולל חתימות, Google Sheets, נכסי מדיה ופריסה ב-Netlify.", status: "active", priority: "normal", technologies: ["HTML", "JavaScript", "Netlify Functions", "Netlify Database", "Google Sheets"], nextStep: "לבדוק את הזרימה החיה של חתימה ושליחת הנתונים.", githubUrl: repo("haredisurvey"), lastWorkedAt: now },
  { name: "booking", slug: "booking", description: "מערכת לקביעת פגישות עם זמינות, Google Calendar, התראות, תזכורות ותמלולים.", status: "development", priority: "high", technologies: ["Next.js", "React", "JavaScript", "PostgreSQL", "PGlite", "Google Calendar", "Vercel Blob"], nextStep: "להשלים בדיקת deployment והגדרת secrets.", githubUrl: repo("booking"), lastWorkedAt: now },
  { name: "LiveEdits", slug: "liveedits", description: "פלטפורמת עריכת וידאו וזרימת עבודה לסטרימר: Stream Deck, OBS, העלאה, עריכה מרחוק ופרסום ל-YouTube.", status: "planning", priority: "high", technologies: ["Python", "JavaScript", "React", "Socket.IO", "OBS WebSocket", "YouTube API"], nextStep: "להחליט על המבנה הפעיל וליישר בין filemap לבין הקוד בפועל.", githubUrl: repo("LiveEdits"), lastWorkedAt: now },
  { name: "Karu-AI", slug: "karu-ai", description: "פלטפורמה ליצירת קרוסלות Instagram מונעות AI, עם מסלולי Cloudflare Serverless ו-Docker.", status: "ready", priority: "high", technologies: ["Hono", "Cloudflare Workers", "D1", "KV", "Workers AI", "Express", "Playwright", "Docker"], nextStep: "לבחור מסלול פריסה אחד ולהגדיר secrets לפני deploy.", githubUrl: repo("Karu-AI"), lastWorkedAt: now },
  { name: "CRM", slug: "crm", description: "אתר או prototype של CRM מבוסס HTML ו-JavaScript; נדרש לקרוא את הקוד הפנימי כדי לתעד מודולים.", status: "planning", priority: "normal", technologies: ["HTML", "JavaScript"], nextStep: "לתעד את מסכי ה-CRM ואת שכבת הנתונים.", githubUrl: repo("CRM"), lastWorkedAt: now },
  { name: "minharez-sw", slug: "minharez-sw", description: "Service Worker Host קטן שמגיש עמוד בסיסי ומיועד כנראה לתשתית Service Worker.", status: "completed", priority: "low", technologies: ["JavaScript", "Service Worker", "HTML"], nextStep: "להוסיף README עם מטרת ה-host וה-deployment.", githubUrl: repo("minharez-sw"), lastWorkedAt: now },
  { name: "GemmaAgent", slug: "gemmaagent", description: "מנהל מודלי Gemma מקומיים עם Ollama, תמיכה ב-Gemini, GUI, API מרוחק ו-dashboard.", status: "development", priority: "high", technologies: ["Python", "Gemma", "Ollama", "Gemini API", "GUI", "API"], nextStep: "להריץ את ה-GUI ולתעד את מסלול ההפעלה בפועל.", githubUrl: repo("GemmaAgent"), lastWorkedAt: now },
  { name: "localaiagent", slug: "localaiagent", description: "אפליקציית Expo/Rork בשם expo-app, עם תשתית React Native ומסכי מובייל.", status: "development", priority: "normal", technologies: ["Expo", "React Native", "TypeScript", "Expo Router", "SQLite", "NativeWind"], nextStep: "להוסיף README שמסביר את מטרת האפליקציה ואת החיבור ל-local AI.", githubUrl: repo("localaiagent"), lastWorkedAt: now },
  { name: "agent-foundry", slug: "agent-foundry", description: "Repository של תשתית סוכן AI מודולרית; המבנה כולל ניהול סוכנים, שליטה במחשב, תקשורת LLM, הבנת מסך ו-UI.", status: "planning", priority: "high", technologies: ["Python", "LLM", "Computer Control", "Screen Understanding"], nextStep: "לבדוק את branch ברירת המחדל ולתעד את נקודת הכניסה.", githubUrl: repo("agent-foundry"), lastWorkedAt: now },
  { name: "backupmywebsite", slug: "backupmywebsite", description: "גיבוי אתר הכולל קבצי cPanel, המלצות SEO ונגישות ונכסי htdocs.", status: "archived", priority: "low", technologies: ["HTML", "cPanel", "SQL"], nextStep: "לסמן אילו קבצים הם גיבוי בלבד ואילו מיועדים לפריסה.", githubUrl: repo("backupmywebsite"), lastWorkedAt: now },
  { name: "orchestrator", slug: "orchestrator", description: "Repository Python לתזמור תהליכים או סוכנים; נדרש לקרוא את branch הפעיל כדי להשלים תיעוד.", status: "planning", priority: "normal", technologies: ["Python"], nextStep: "להוסיף README ותרשים זרימה של orchestration.", githubUrl: repo("orchestrator"), lastWorkedAt: now },
  { name: "Gemini-Gui-Agent", slug: "gemini-gui-agent", description: "סוכן אוטונומי שמשתמש ב-Gemini כדי להבין משימות, לראות את המסך ולשלוט בעכבר ובמקלדת.", status: "development", priority: "high", technologies: ["Python", "Gemini API", "PyAutoGUI", "Pillow"], nextStep: "ליישם את לולאת OODA ולחבר את ניהול הסוכנים.", githubUrl: repo("Gemini-Gui-Agent"), lastWorkedAt: now },
  { name: "cigarete", slug: "cigarete", description: "אפליקציית Expo בשם Smoke, עם הרשאות, SQLite, notifications ויכולות מובייל.", status: "development", priority: "normal", technologies: ["Expo", "React Native", "TypeScript", "SQLite", "Notifications"], nextStep: "לתעד את מטרת המוצר ולבדוק את מסכי האפליקציה.", githubUrl: repo("cigarete"), lastWorkedAt: now },
  { name: "Siri2", slug: "siri2", description: "עוזר קולי J.A.R.V.I.S. עם זיהוי קולי, TTS, שליטה במערכת, פתיחת אפליקציות וחיפוש.", status: "planning", priority: "normal", technologies: ["Python", "Gemini", "Speech Recognition", "TTS", "OS Automation"], nextStep: "ליישם את היכולות המתוכננות ולייצב התקנה cross-platform.", githubUrl: repo("Siri2"), lastWorkedAt: now },
  { name: "siri", slug: "siri", description: "שרת HTTP קטן שמגיש קבצים סטטיים על פורט 8002.", status: "completed", priority: "low", technologies: ["Python", "HTTP Server", "HTML"], nextStep: "להוסיף README עם אופן השימוש והקשר לפרויקט Siri.", githubUrl: repo("siri"), lastWorkedAt: now },
  { name: "site-spotlight-48e04e4d", slug: "site-spotlight-48e04e4d", description: "פרויקט Lovable/Vite עם React, TypeScript, shadcn-ui ו-Tailwind CSS.", status: "development", priority: "normal", technologies: ["Vite", "React", "TypeScript", "shadcn-ui", "Tailwind CSS", "Lovable"], nextStep: "לתעד מהו המוצר ולחבר את ה-repository לפרויקט Lovable.", githubUrl: repo("site-spotlight-48e04e4d"), lastWorkedAt: now },
  { name: "roi-courses", slug: "roi-courses", description: "פרויקט Lovable/Vite של קורסים, מבוסס React, TypeScript, shadcn-ui ו-Tailwind CSS.", status: "development", priority: "normal", technologies: ["Vite", "React", "TypeScript", "shadcn-ui", "Tailwind CSS", "Lovable"], nextStep: "לתעד את מבנה הקורסים והאם יש backend או Supabase.", githubUrl: repo("roi-courses"), lastWorkedAt: now },
];

export const githubProjects: Project[] = projects.map((project) => ({
  ...project,
  id: project.slug,
  projectOverview: `${project.description} בשלב הנוכחי הפרויקט מסווג כ-${project.status}, והעבודה הבאה שהוגדרה עבורו היא: ${project.nextStep}`,
  stageDetails: `שלב הפיתוח הנוכחי: ${project.status}. התיאור מבוסס על קבצי ה-repository שנקראו בסריקה; כאשר לא היה מספיק מידע, הסיווג מסומן כהערכה ולא כהצהרה סופית. הצעד הבא: ${project.nextStep}`,
  ...(project.slug === "karu-ai"
    ? { projectType: "personal" as const, personalProjectType: "commercial" as const }
    : {}),
  createdAt: project.lastWorkedAt,
  updatedAt: project.lastWorkedAt,
}));
