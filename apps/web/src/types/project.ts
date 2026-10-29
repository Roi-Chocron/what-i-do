export type ProjectStatus =
  | "idea"
  | "planning"
  | "development"
  | "testing"
  | "ready"
  | "active"
  | "paused"
  | "completed"
  | "archived";

export type Priority = "low" | "normal" | "high";
export type ProjectType = "client" | "studies" | "personal";
export type PersonalProjectType = "commercial" | "other";

export type Project = {
  id: string;
  name: string;
  slug: string;
  description: string;
  projectOverview?: string;
  stageDetails?: string;
  status: ProjectStatus;
  priority: Priority;
  projectType?: ProjectType;
  personalProjectType?: PersonalProjectType;
  localPath?: string;
  githubUrl?: string;
  hostingProvider?: string;
  liveUrl?: string;
  stagingUrl?: string;
  technologies: string[];
  lastWorkedAt: string;
  nextStep: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type ProjectInput = Omit<
  Project,
  "id" | "createdAt" | "updatedAt" | "lastWorkedAt"
> & { lastWorkedAt?: string };
