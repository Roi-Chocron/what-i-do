import { z } from "zod";
import {
  PROJECT_STATUSES,
  PRIORITIES,
  TASK_STATUSES,
  LINK_TYPES,
} from "../constants/index.js";

export const ProjectStatusSchema = z.enum(PROJECT_STATUSES);
export const PrioritySchema = z.enum(PRIORITIES);
export const TaskStatusSchema = z.enum(TASK_STATUSES);
export const LinkTypeSchema = z.enum(LINK_TYPES);

export const ProjectSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "שם הפרויקט הינו שדה חובה"),
  slug: z.string().min(1),
  description: z.string().default(""),
  status: ProjectStatusSchema.default("idea"),
  priority: PrioritySchema.default("normal"),
  localPath: z.string().optional().nullable(),
  githubUrl: z.string().url().optional().nullable().or(z.literal("")),
  hostingProvider: z.string().optional().nullable(),
  liveUrl: z.string().url().optional().nullable().or(z.literal("")),
  stagingUrl: z.string().url().optional().nullable().or(z.literal("")),
  technologies: z.array(z.string()).default([]),
  lastWorkedAt: z.string(),
  nextStep: z.string().default(""),
  notes: z.string().optional().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CreateProjectSchema = z.object({
  name: z.string().min(1, "שם הפרויקט הינו שדה חובה"),
  slug: z.string().optional(),
  description: z.string().optional().default(""),
  status: ProjectStatusSchema.optional().default("idea"),
  priority: PrioritySchema.optional().default("normal"),
  localPath: z.string().optional().nullable(),
  githubUrl: z.string().url().optional().nullable().or(z.literal("")),
  hostingProvider: z.string().optional().nullable(),
  liveUrl: z.string().url().optional().nullable().or(z.literal("")),
  stagingUrl: z.string().url().optional().nullable().or(z.literal("")),
  technologies: z.array(z.string()).optional().default([]),
  lastWorkedAt: z.string().optional(),
  nextStep: z.string().optional().default(""),
  notes: z.string().optional().nullable(),
});

export const UpdateProjectSchema = CreateProjectSchema.partial();

export const ProjectQuerySchema = z.object({
  status: ProjectStatusSchema.optional(),
  priority: PrioritySchema.optional(),
  search: z.string().optional(),
  technology: z.string().optional(),
  sort: z.enum(["updated_at", "last_worked_at", "name", "priority"]).optional().default("updated_at"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
  limit: z.coerce.number().min(1).max(100).optional().default(50),
  offset: z.coerce.number().min(0).optional().default(0),
});

export const TaskSchema = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  title: z.string().min(1, "כותרת המשימה הינה שדה חובה"),
  status: TaskStatusSchema.default("todo"),
  priority: PrioritySchema.default("normal"),
  dueDate: z.string().optional().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CreateTaskSchema = z.object({
  title: z.string().min(1, "כותרת המשימה הינה שדה חובה"),
  status: TaskStatusSchema.optional().default("todo"),
  priority: PrioritySchema.optional().default("normal"),
  dueDate: z.string().optional().nullable(),
});

export const UpdateTaskSchema = CreateTaskSchema.partial();

export const ProjectLinkSchema = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  title: z.string().min(1),
  url: z.string().url(),
  type: LinkTypeSchema.default("other"),
  createdAt: z.string(),
});

export const CreateProjectLinkSchema = z.object({
  title: z.string().min(1, "כותרת הקישור הינה שדה חובה"),
  url: z.string().url("כתובת ה-URL אינה תקינה"),
  type: LinkTypeSchema.optional().default("other"),
});

export const TechnologySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  category: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
});

export const CreateTechnologySchema = z.object({
  name: z.string().min(1, "שם הטכנולוגיה הינו שדה חובה"),
  slug: z.string().optional(),
  category: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
});

export const ActivityLogSchema = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  activityType: z.string(),
  description: z.string().min(1),
  timestamp: z.string(),
});

export const CreateActivitySchema = z.object({
  activityType: z.string().optional().default("manual_note"),
  description: z.string().min(1, "תיאור הפעילות הינו שדה חובה"),
});
