import type { Priority, Project, ProjectStatus } from "../types/project";
import { githubProjects } from "./github-projects";
import { localProjects } from "./local-projects";

export const statusLabels: Record<ProjectStatus, string> = {
  idea: "רעיון",
  planning: "אפיון",
  development: "פיתוח",
  testing: "בדיקות",
  ready: "מוכן לפריסה",
  active: "פעיל",
  paused: "בהמתנה",
  completed: "הושלם",
  archived: "ננטש",
};

export const priorityLabels: Record<Priority, string> = {
  low: "נמוכה",
  normal: "רגילה",
  high: "גבוהה",
};

export const projectTypeLabels = {
  client: "עבודה ללקוח",
  studies: "עבודה ללימודים",
  personal: "פרויקט אישי",
} as const;

export const personalProjectTypeLabels = {
  commercial: "אישי — למטרת רווח",
  other: "אישי — מטרה אחרת",
} as const;

export const demoProjects: Project[] = [
  {
    id: "what-i-do",
    name: "מה עשיתי",
    slug: "what-i-do",
    description: "לוח בקרה אישי שמרכז את כל הפרויקטים, הקישורים והצעד הבא.",
    projectOverview: "What I Do היא מערכת אישית לניהול ולתיעוד של כל הפרויקטים שנבנו לאורך הזמן. היא מאחדת במקום אחד את פרויקטי GitHub, עותקים מקומיים ותתי-מערכות, ומציגה לכל רשומה את המטרה, שלב הפיתוח, הטכנולוגיות, הנתיבים, הקישורים, הפעילות האחרונה והצעד הבא. המערכת בנויה כ-frontend ב-React ו-TypeScript, API ב-Hono שרץ על Cloudflare Workers ומסד נתונים D1. בשלב הנוכחי ה-Dashboard, חיפוש, סינון, צפייה ועריכה עובדים, נתוני GitHub והסריקה המקומית נטענים ל-demo ול-D1 המקומי, והשלב הבא הוא השלמת סיווג ותיעוד ידני, חיבור production, Cloudflare Access וסנכרון GitHub אמיתי.",
    stageDetails: "המערכת נמצאת בשלב MVP מתקדם: ממשק ה-Dashboard, מודל הפרויקט, טופס עריכה, API CRUD, migrations, seed-ים וסיווגים קיימים ועברו build/typecheck. עדיין נדרשים אימות ידני של התיאורים והשלבים, הגדרת D1 production ו-Cloudflare Access, פריסה ובדיקת production, ובהמשך סנכרון GitHub, משימות, קישורים ויומן פעילות.",
    status: "development",
    priority: "high",
    projectType: "personal",
    personalProjectType: "other",
    localPath: "/home/roi/data_storage/WhatIDo",
    hostingProvider: "Cloudflare Workers & Pages",
    technologies: ["React", "TypeScript", "Cloudflare D1"],
    lastWorkedAt: "2026-10-29T00:55:00.000Z",
    nextStep: "להשלים את צד הלקוח ולחבר API",
    notes: "העיצוב מבוסס על מערכת המותג של AI Course.",
    createdAt: "2026-10-28T00:00:00.000Z",
    updatedAt: "2026-10-29T00:55:00.000Z",
  },
  {
    id: "roi-website",
    name: "Roi Chocron — אתר אישי נקי",
    slug: "roi-website",
    description: "האתר האישי של רועי שנבנה ב-Astro ו-Tailwind CSS.",
    projectOverview: "האתר האישי של רועי הוא אתר סטטי בעברית שמציג את הפעילות, התוכן ומקרי הבוחן האישיים. הוא נבנה ב-Astro עם Tailwind CSS, TypeScript, Partytown ו-Sharp, ומיועד לטעינה מהירה ולתחזוקת תוכן פשוטה. האתר הושלם ונמצא בשלב תחזוקה ועדכון תוכן; העבודה הבאה היא להוסיף מקרי בוחן ומאמרים חדשים.",
    stageDetails: "הפרויקט הושלם ונמצא בתחזוקה. אין כרגע שינוי תשתיתי דחוף; נדרשים עדכוני תוכן תקופתיים ובדיקה לאחר כל פרסום.",
    status: "completed",
    priority: "normal",
    projectType: "personal",
    personalProjectType: "other",
    technologies: ["Astro", "Partytown", "Sharp", "Tailwind CSS", "TypeScript"],
    lastWorkedAt: "2026-10-12T16:20:00.000Z",
    nextStep: "עדכון מקרי בוחן ומאמרים חדשים בבלוג",
    localPath: "/home/roi/data_storage/Code/Roi_Website_Clean",
    hostingProvider: "Cloudflare",
    liveUrl: "https://roichocron.com",
    notes: "אתר סטטי מהיר במיוחד.",
    createdAt: "2026-10-28T23:28:30.423678Z",
    updatedAt: "2026-10-28T23:28:30.423678Z",
  },
  ...githubProjects,
  ...localProjects,
];
