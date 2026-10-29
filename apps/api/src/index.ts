import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";

export type Bindings = {
  DB: D1Database;
  ALLOWED_ORIGIN?: string;
  AUTH_TOKEN?: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// --------------------------------------------------------------------------
// Validation Schemas
// --------------------------------------------------------------------------
const projectStatus = z.enum([
  "idea",
  "planning",
  "development",
  "testing",
  "ready",
  "active",
  "paused",
  "completed",
  "archived",
]);

const priority = z.enum(["low", "normal", "high"]);
const projectType = z.enum(["client", "studies", "personal"]);
const personalProjectType = z.enum(["commercial", "other"]);

const projectInput = z.object({
  name: z.string().trim().min(1, "שם הפרויקט הינו שדה חובה").max(120),
  slug: z.string().trim().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().trim().max(2000).default(""),
  projectOverview: z.string().trim().max(10000).optional().or(z.literal("")),
  stageDetails: z.string().trim().max(5000).optional().or(z.literal("")),
  status: projectStatus,
  priority,
  projectType: projectType.optional(),
  personalProjectType: personalProjectType.optional(),
  localPath: z.string().max(1000).optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  hostingProvider: z.string().max(120).optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  stagingUrl: z.string().url().optional().or(z.literal("")),
  technologies: z.array(z.string().trim().min(1).max(80)).max(30).default([]),
  lastWorkedAt: z.string().datetime().optional(),
  nextStep: z.string().trim().max(500).default(""),
  notes: z.string().max(5000).optional().or(z.literal("")),
});

const taskInput = z.object({
  title: z.string().trim().min(1, "כותרת המשימה הינה שדה חובה").max(200),
  status: z.enum(["todo", "in_progress", "done"]).default("todo"),
  priority: priority.default("normal"),
  dueDate: z.string().optional().nullable().or(z.literal("")),
});

const linkInput = z.object({
  title: z.string().trim().min(1, "כותרת הקישור הינה שדה חובה").max(120),
  url: z.string().url("כתובת ה-URL אינה תקינה"),
  type: z.string().default("other"),
});

const activityInput = z.object({
  activityType: z.string().default("manual_note"),
  description: z.string().trim().min(1, "תיאור הפעילות הינו שדה חובה").max(1000),
});

// --------------------------------------------------------------------------
// Middleware
// --------------------------------------------------------------------------
app.use("*", async (c, next) => {
  const origin = c.env.ALLOWED_ORIGIN ?? "*";
  return cors({
    origin,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: origin !== "*",
  })(c, next);
});

// Optional Token auth if configured in env
app.use("/api/*", async (c, next) => {
  if (c.req.path === "/api/health") return next();
  const token = c.env.AUTH_TOKEN;
  if (token) {
    const authHeader = c.req.header("Authorization");
    if (!authHeader || authHeader !== `Bearer ${token}`) {
      return c.json({ message: "לא מורשה.", code: "UNAUTHORIZED" }, 401);
    }
  }
  return next();
});

app.onError((error, c) => {
  console.error("Server error:", error);
  return c.json(
    { message: "אירעה שגיאה פנימית בשרת.", code: "INTERNAL_ERROR" },
    500
  );
});

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------
function toProject(row: Record<string, unknown>, technologies: string[]) {
  return {
    id: String(row.id),
    name: String(row.name),
    slug: String(row.slug),
    description: String(row.description ?? ""),
    projectOverview: row.project_overview ? String(row.project_overview) : undefined,
    stageDetails: row.stage_details ? String(row.stage_details) : undefined,
    status: String(row.status),
    priority: String(row.priority),
    projectType: row.project_type ? String(row.project_type) : undefined,
    personalProjectType: row.personal_project_type ? String(row.personal_project_type) : undefined,
    localPath: row.local_path ? String(row.local_path) : undefined,
    githubUrl: row.github_url ? String(row.github_url) : undefined,
    hostingProvider: row.hosting_provider ? String(row.hosting_provider) : undefined,
    liveUrl: row.live_url ? String(row.live_url) : undefined,
    stagingUrl: row.staging_url ? String(row.staging_url) : undefined,
    technologies,
    lastWorkedAt: String(row.last_worked_at),
    nextStep: String(row.next_step ?? ""),
    notes: row.notes ? String(row.notes) : undefined,
    archivedAt: row.archived_at ? String(row.archived_at) : undefined,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

async function getTechnologies(db: D1Database, projectId: string) {
  const result = await db
    .prepare(
      "SELECT technology FROM project_technologies WHERE project_id = ? ORDER BY technology"
    )
    .bind(projectId)
    .all<{ technology: string }>();
  return result.results.map((item) => item.technology);
}

async function saveTechnologies(
  db: D1Database,
  projectId: string,
  technologies: string[]
) {
  await db
    .prepare("DELETE FROM project_technologies WHERE project_id = ?")
    .bind(projectId)
    .run();
  for (const technology of technologies) {
    await db
      .prepare(
        "INSERT INTO project_technologies (project_id, technology) VALUES (?, ?)"
      )
      .bind(projectId, technology)
      .run();
  }
}

// --------------------------------------------------------------------------
// Routes: Health & Dashboard
// --------------------------------------------------------------------------
app.get("/api/health", (c) => c.json({ ok: true, timestamp: new Date().toISOString() }));

app.get("/api/dashboard", async (c) => {
  const projectsRes = await c.env.DB.prepare(
    "SELECT * FROM projects WHERE archived_at IS NULL ORDER BY updated_at DESC"
  ).all<Record<string, unknown>>();

  const projects = await Promise.all(
    projectsRes.results.map(async (row) =>
      toProject(row, await getTechnologies(c.env.DB, String(row.id)))
    )
  );

  const byStatus: Record<string, number> = {
    idea: 0,
    planning: 0,
    development: 0,
    testing: 0,
    ready: 0,
    active: 0,
    paused: 0,
    completed: 0,
    archived: 0,
  };

  const byPriority: Record<string, number> = {
    low: 0,
    normal: 0,
    high: 0,
  };

  for (const p of projects) {
    if (byStatus[p.status] !== undefined) byStatus[p.status]++;
    if (byPriority[p.priority] !== undefined) byPriority[p.priority]++;
  }

  const now = Date.now();
  const fourteenDaysMs = 14 * 24 * 60 * 60 * 1000;

  const needsAttention = projects.filter((p) => {
    if (p.status === "completed" || p.status === "archived") return false;
    const lastWorked = new Date(p.lastWorkedAt).getTime();
    const isStale = isNaN(lastWorked) || now - lastWorked > fourteenDaysMs;
    const hasNoNextStep = !p.nextStep || p.nextStep.trim() === "";
    return isStale || hasNoNextStep;
  });

  const recentlyWorked = [...projects]
    .sort((a, b) => new Date(b.lastWorkedAt).getTime() - new Date(a.lastWorkedAt).getTime())
    .slice(0, 5);

  return c.json({
    totalProjects: projects.length,
    activeProjects: byStatus["active"] + byStatus["development"],
    completedProjects: byStatus["completed"],
    pausedProjects: byStatus["paused"],
    byStatus,
    byPriority,
    recentlyWorked,
    needsAttention,
  });
});

// --------------------------------------------------------------------------
// Routes: Projects
// --------------------------------------------------------------------------
app.get("/api/projects", async (c) => {
  const statusParam = c.req.query("status");
  const priorityParam = c.req.query("priority");
  const searchParam = c.req.query("search");

  let query = "SELECT * FROM projects WHERE archived_at IS NULL";
  const params: unknown[] = [];

  if (statusParam) {
    query += " AND status = ?";
    params.push(statusParam);
  }
  if (priorityParam) {
    query += " AND priority = ?";
    params.push(priorityParam);
  }
  if (searchParam) {
    query += " AND (name LIKE ? OR description LIKE ? OR next_step LIKE ?)";
    const wildcard = `%${searchParam}%`;
    params.push(wildcard, wildcard, wildcard);
  }

  query += " ORDER BY updated_at DESC";

  const stmt = c.env.DB.prepare(query);
  const result = await (params.length > 0 ? stmt.bind(...params) : stmt).all<Record<string, unknown>>();

  const projects = await Promise.all(
    result.results.map(async (row) =>
      toProject(row, await getTechnologies(c.env.DB, String(row.id)))
    )
  );

  return c.json(projects);
});

app.get("/api/projects/:id", async (c) => {
  const row = await c.env.DB.prepare(
    "SELECT * FROM projects WHERE (id = ? OR slug = ?) AND archived_at IS NULL"
  )
    .bind(c.req.param("id"), c.req.param("id"))
    .first<Record<string, unknown>>();

  if (!row) return c.json({ message: "הפרויקט לא נמצא.", code: "NOT_FOUND" }, 404);

  return c.json(toProject(row, await getTechnologies(c.env.DB, String(row.id))));
});

app.post("/api/projects", async (c) => {
  const parsed = projectInput.safeParse(await c.req.json());
  if (!parsed.success) {
    return c.json(
      {
        message: "יש לתקן את השדות שסומנו.",
        code: "VALIDATION_ERROR",
        fields: parsed.error.flatten().fieldErrors,
      },
      400
    );
  }

  const input = parsed.data;
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  try {
    await c.env.DB.prepare(
      `INSERT INTO projects
        (id, name, slug, description, project_overview, stage_details, status, priority, project_type, personal_project_type, local_path, github_url,
         hosting_provider, live_url, staging_url, last_worked_at, next_step, notes,
         created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        id,
        input.name,
        input.slug,
        input.description,
        input.projectOverview ?? "",
        input.stageDetails ?? "",
        input.status,
        input.priority,
        input.projectType ?? null,
        input.personalProjectType ?? null,
        input.localPath ?? "",
        input.githubUrl ?? "",
        input.hostingProvider ?? "",
        input.liveUrl ?? "",
        input.stagingUrl ?? "",
        input.lastWorkedAt ?? now,
        input.nextStep,
        input.notes ?? "",
        now,
        now
      )
      .run();

    await saveTechnologies(c.env.DB, id, input.technologies);
  } catch {
    return c.json(
      { message: "לא ניתן ליצור את הפרויקט. ייתכן שה-slug כבר קיים.", code: "CREATE_FAILED" },
      409
    );
  }

  const row = await c.env.DB.prepare("SELECT * FROM projects WHERE id = ?")
    .bind(id)
    .first<Record<string, unknown>>();

  return c.json(toProject(row!, input.technologies), 201);
});

app.patch("/api/projects/:id", async (c) => {
  const current = await c.env.DB.prepare(
    "SELECT * FROM projects WHERE id = ? AND archived_at IS NULL"
  )
    .bind(c.req.param("id"))
    .first<Record<string, unknown>>();

  if (!current) return c.json({ message: "הפרויקט לא נמצא.", code: "NOT_FOUND" }, 404);

  const parsed = projectInput.partial().safeParse(await c.req.json());
  if (!parsed.success) {
    return c.json(
      {
        message: "יש לתקן את השדות שסומנו.",
        code: "VALIDATION_ERROR",
        fields: parsed.error.flatten().fieldErrors,
      },
      400
    );
  }

  const input = parsed.data;
  const merged = {
    name: input.name ?? current.name,
    slug: input.slug ?? current.slug,
    description: input.description ?? current.description,
    projectOverview: input.projectOverview !== undefined ? input.projectOverview : current.project_overview,
    stageDetails: input.stageDetails !== undefined ? input.stageDetails : current.stage_details,
    status: input.status ?? current.status,
    priority: input.priority ?? current.priority,
    projectType: input.projectType !== undefined ? input.projectType : current.project_type,
    personalProjectType: input.personalProjectType !== undefined ? input.personalProjectType : current.personal_project_type,
    localPath: input.localPath !== undefined ? input.localPath : current.local_path,
    githubUrl: input.githubUrl !== undefined ? input.githubUrl : current.github_url,
    hostingProvider: input.hostingProvider !== undefined ? input.hostingProvider : current.hosting_provider,
    liveUrl: input.liveUrl !== undefined ? input.liveUrl : current.live_url,
    stagingUrl: input.stagingUrl !== undefined ? input.stagingUrl : current.staging_url,
    lastWorkedAt: input.lastWorkedAt ?? current.last_worked_at,
    nextStep: input.nextStep ?? current.next_step,
    notes: input.notes !== undefined ? input.notes : current.notes,
  };

  const updatedAt = new Date().toISOString();
  await c.env.DB.prepare(
    `UPDATE projects SET name=?, slug=?, description=?, project_overview=?, stage_details=?, status=?, priority=?, project_type=?, personal_project_type=?, local_path=?,
     github_url=?, hosting_provider=?, live_url=?, staging_url=?, last_worked_at=?,
     next_step=?, notes=?, updated_at=? WHERE id=?`
  )
    .bind(
      merged.name,
      merged.slug,
      merged.description,
      merged.projectOverview,
      merged.stageDetails,
      merged.status,
      merged.priority,
      merged.projectType,
      merged.personalProjectType,
      merged.localPath,
      merged.githubUrl,
      merged.hostingProvider,
      merged.liveUrl,
      merged.stagingUrl,
      merged.lastWorkedAt,
      merged.nextStep,
      merged.notes,
      updatedAt,
      c.req.param("id")
    )
    .run();

  const technologies = input.technologies ?? (await getTechnologies(c.env.DB, c.req.param("id")));
  if (input.technologies) {
    await saveTechnologies(c.env.DB, c.req.param("id"), input.technologies);
  }

  const row = await c.env.DB.prepare("SELECT * FROM projects WHERE id = ?")
    .bind(c.req.param("id"))
    .first<Record<string, unknown>>();

  return c.json(toProject(row!, technologies));
});

app.post("/api/projects/:id/archive", async (c) => {
  const now = new Date().toISOString();
  const result = await c.env.DB.prepare(
    "UPDATE projects SET archived_at = ?, updated_at = ? WHERE id = ? AND archived_at IS NULL"
  )
    .bind(now, now, c.req.param("id"))
    .run();

  if (!result.meta.changes) return c.json({ message: "הפרויקט לא נמצא.", code: "NOT_FOUND" }, 404);
  return c.body(null, 204);
});

// --------------------------------------------------------------------------
// Routes: Technologies
// --------------------------------------------------------------------------
app.get("/api/technologies", async (c) => {
  const result = await c.env.DB.prepare(
    "SELECT DISTINCT technology FROM project_technologies ORDER BY technology ASC"
  ).all<{ technology: string }>();
  return c.json(result.results.map((r) => r.technology));
});

// --------------------------------------------------------------------------
// Routes: Tasks
// --------------------------------------------------------------------------
app.get("/api/projects/:id/tasks", async (c) => {
  const result = await c.env.DB.prepare(
    "SELECT * FROM project_tasks WHERE project_id = ? ORDER BY created_at DESC"
  )
    .bind(c.req.param("id"))
    .all<Record<string, unknown>>();

  const tasks = result.results.map((r) => ({
    id: r.id,
    projectId: r.project_id,
    title: r.title,
    status: r.status,
    priority: r.priority,
    dueDate: r.due_date || undefined,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  }));

  return c.json(tasks);
});

app.post("/api/projects/:id/tasks", async (c) => {
  const parsed = taskInput.safeParse(await c.req.json());
  if (!parsed.success) {
    return c.json({ message: "שגיאת ולידציה", code: "VALIDATION_ERROR", errors: parsed.error }, 400);
  }

  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const input = parsed.data;

  await c.env.DB.prepare(
    `INSERT INTO project_tasks (id, project_id, title, status, priority, due_date, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(id, c.req.param("id"), input.title, input.status, input.priority, input.dueDate ?? null, now, now)
    .run();

  return c.json(
    {
      id,
      projectId: c.req.param("id"),
      title: input.title,
      status: input.status,
      priority: input.priority,
      dueDate: input.dueDate || undefined,
      createdAt: now,
      updatedAt: now,
    },
    201
  );
});

app.patch("/api/projects/:id/tasks/:taskId", async (c) => {
  const current = await c.env.DB.prepare(
    "SELECT * FROM project_tasks WHERE id = ? AND project_id = ?"
  )
    .bind(c.req.param("taskId"), c.req.param("id"))
    .first<Record<string, unknown>>();

  if (!current) return c.json({ message: "המשימה לא נמצאה.", code: "NOT_FOUND" }, 404);

  const parsed = taskInput.partial().safeParse(await c.req.json());
  if (!parsed.success) {
    return c.json({ message: "שגיאת ולידציה", code: "VALIDATION_ERROR" }, 400);
  }

  const input = parsed.data;
  const now = new Date().toISOString();
  const title = input.title ?? current.title;
  const status = input.status ?? current.status;
  const priority = input.priority ?? current.priority;
  const dueDate = input.dueDate !== undefined ? input.dueDate : current.due_date;

  await c.env.DB.prepare(
    "UPDATE project_tasks SET title = ?, status = ?, priority = ?, due_date = ?, updated_at = ? WHERE id = ?"
  )
    .bind(title, status, priority, dueDate, now, c.req.param("taskId"))
    .run();

  return c.json({
    id: c.req.param("taskId"),
    projectId: c.req.param("id"),
    title,
    status,
    priority,
    dueDate: dueDate || undefined,
    createdAt: current.created_at,
    updatedAt: now,
  });
});

app.delete("/api/projects/:id/tasks/:taskId", async (c) => {
  const result = await c.env.DB.prepare(
    "DELETE FROM project_tasks WHERE id = ? AND project_id = ?"
  )
    .bind(c.req.param("taskId"), c.req.param("id"))
    .run();

  if (!result.meta.changes) return c.json({ message: "המשימה לא נמצאה.", code: "NOT_FOUND" }, 404);
  return c.body(null, 204);
});

// --------------------------------------------------------------------------
// Routes: Project Links
// --------------------------------------------------------------------------
app.get("/api/projects/:id/links", async (c) => {
  const result = await c.env.DB.prepare(
    "SELECT * FROM project_links WHERE project_id = ? ORDER BY created_at ASC"
  )
    .bind(c.req.param("id"))
    .all<Record<string, unknown>>();

  const links = result.results.map((r) => ({
    id: r.id,
    projectId: r.project_id,
    title: r.title,
    url: r.url,
    type: r.type,
    createdAt: r.created_at,
  }));

  return c.json(links);
});

app.post("/api/projects/:id/links", async (c) => {
  const parsed = linkInput.safeParse(await c.req.json());
  if (!parsed.success) {
    return c.json({ message: "ולידציה נכשלה", code: "VALIDATION_ERROR" }, 400);
  }

  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const input = parsed.data;

  await c.env.DB.prepare(
    "INSERT INTO project_links (id, project_id, title, url, type, created_at) VALUES (?, ?, ?, ?, ?, ?)"
  )
    .bind(id, c.req.param("id"), input.title, input.url, input.type, now)
    .run();

  return c.json(
    {
      id,
      projectId: c.req.param("id"),
      title: input.title,
      url: input.url,
      type: input.type,
      createdAt: now,
    },
    201
  );
});

app.delete("/api/projects/:id/links/:linkId", async (c) => {
  const result = await c.env.DB.prepare(
    "DELETE FROM project_links WHERE id = ? AND project_id = ?"
  )
    .bind(c.req.param("linkId"), c.req.param("id"))
    .run();

  if (!result.meta.changes) return c.json({ message: "הקישור לא נמצא.", code: "NOT_FOUND" }, 404);
  return c.body(null, 204);
});

// --------------------------------------------------------------------------
// Routes: Activity Log
// --------------------------------------------------------------------------
app.get("/api/projects/:id/activity", async (c) => {
  const result = await c.env.DB.prepare(
    "SELECT * FROM activity_log WHERE project_id = ? ORDER BY created_at DESC"
  )
    .bind(c.req.param("id"))
    .all<Record<string, unknown>>();

  const logs = result.results.map((r) => ({
    id: r.id,
    projectId: r.project_id,
    activityType: r.activity_type,
    description: r.description,
    timestamp: r.created_at,
  }));

  return c.json(logs);
});

app.post("/api/projects/:id/activity", async (c) => {
  const parsed = activityInput.safeParse(await c.req.json());
  if (!parsed.success) {
    return c.json({ message: "ולידציה נכשלה", code: "VALIDATION_ERROR" }, 400);
  }

  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const input = parsed.data;

  await c.env.DB.prepare(
    "INSERT INTO activity_log (id, project_id, activity_type, description, created_at) VALUES (?, ?, ?, ?, ?)"
  )
    .bind(id, c.req.param("id"), input.activityType, input.description, now)
    .run();

  // Also update last_worked_at and updated_at on the project
  await c.env.DB.prepare(
    "UPDATE projects SET last_worked_at = ?, updated_at = ? WHERE id = ?"
  )
    .bind(now, now, c.req.param("id"))
    .run();

  return c.json(
    {
      id,
      projectId: c.req.param("id"),
      activityType: input.activityType,
      description: input.description,
      timestamp: now,
    },
    201
  );
});

export default app;
