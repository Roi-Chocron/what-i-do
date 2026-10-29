import { z } from "zod";
import {
  ProjectSchema,
  CreateProjectSchema,
  UpdateProjectSchema,
  ProjectQuerySchema,
  TaskSchema,
  CreateTaskSchema,
  UpdateTaskSchema,
  ProjectLinkSchema,
  CreateProjectLinkSchema,
  TechnologySchema,
  CreateTechnologySchema,
  ActivityLogSchema,
  CreateActivitySchema,
} from "../schemas/index.js";
import { ProjectStatus, Priority } from "../constants/index.js";

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectInput = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;
export type ProjectQuery = z.infer<typeof ProjectQuerySchema>;

export type Task = z.infer<typeof TaskSchema>;
export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskInput = z.infer<typeof UpdateTaskSchema>;

export type ProjectLink = z.infer<typeof ProjectLinkSchema>;
export type CreateProjectLinkInput = z.infer<typeof CreateProjectLinkSchema>;

export type Technology = z.infer<typeof TechnologySchema>;
export type CreateTechnologyInput = z.infer<typeof CreateTechnologySchema>;

export type ActivityLog = z.infer<typeof ActivityLogSchema>;
export type CreateActivityInput = z.infer<typeof CreateActivitySchema>;

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  pausedProjects: number;
  byStatus: Record<ProjectStatus, number>;
  byPriority: Record<Priority, number>;
  recentlyWorked: Project[];
  needsAttention: Project[]; // פרויקטים שלא עודכנו למעלה מ-14 יום או ללא צעד הבא
}
