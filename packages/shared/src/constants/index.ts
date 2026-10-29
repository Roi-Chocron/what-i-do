export const PROJECT_STATUSES = [
  "idea",
  "planning",
  "development",
  "testing",
  "ready",
  "active",
  "paused",
  "completed",
  "archived",
] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const PRIORITIES = ["low", "normal", "high"] as const;
export type Priority = (typeof PRIORITIES)[number];

export const HOSTING_PROVIDERS = [
  "cloudflare",
  "vercel",
  "netlify",
  "vps",
  "github-pages",
  "railway",
  "render",
  "fly.io",
  "aws",
  "other",
] as const;
export type HostingProvider = (typeof HOSTING_PROVIDERS)[number];

export const TASK_STATUSES = ["todo", "in_progress", "done"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export const LINK_TYPES = [
  "github",
  "live",
  "staging",
  "figma",
  "docs",
  "trello",
  "jira",
  "other",
] as const;
export type LinkType = (typeof LINK_TYPES)[number];
