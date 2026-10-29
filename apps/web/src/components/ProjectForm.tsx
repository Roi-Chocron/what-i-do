import { useState } from "react";
import type { FormEvent } from "react";
import { createProject, updateProject } from "../lib/api-client";
import { personalProjectTypeLabels, priorityLabels, projectTypeLabels, statusLabels } from "../lib/constants";
import type { Project, ProjectInput } from "../types/project";

type Props = {
  project?: Project;
  onSaved: (project: Project) => void;
  onCancel: () => void;
};

const empty: ProjectInput = {
  name: "",
  slug: "",
  description: "",
  projectOverview: "",
  stageDetails: "",
  status: "idea",
  priority: "normal",
  projectType: undefined,
  personalProjectType: undefined,
  localPath: "",
  githubUrl: "",
  hostingProvider: "",
  liveUrl: "",
  stagingUrl: "",
  technologies: [],
  nextStep: "",
  notes: "",
};

export function ProjectForm({ project, onSaved, onCancel }: Props) {
  const [values, setValues] = useState<ProjectInput>(project ? {
    name: project.name, slug: project.slug, description: project.description,
    projectOverview: project.projectOverview, stageDetails: project.stageDetails,
    status: project.status, priority: project.priority, localPath: project.localPath,
    projectType: project.projectType, personalProjectType: project.personalProjectType,
    githubUrl: project.githubUrl, hostingProvider: project.hostingProvider,
    liveUrl: project.liveUrl, stagingUrl: project.stagingUrl,
    technologies: project.technologies, lastWorkedAt: project.lastWorkedAt,
    nextStep: project.nextStep, notes: project.notes,
  } : empty);
  const [technologies, setTechnologies] = useState(project?.technologies.join(", ") ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof ProjectInput>(key: K, value: ProjectInput[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    const payload = { ...values, technologies: technologies.split(",").map((item) => item.trim()).filter(Boolean) };
    try {
      const saved = project ? await updateProject(project.id, payload) : await createProject(payload);
      onSaved(saved);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "לא ניתן לשמור את הפרויקט.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="form-panel">
      <div className="form-panel__header"><div><span className="eyebrow">{project ? "עריכת פרויקט" : "פרויקט חדש"}</span><h2>{project ? project.name : "מה מתחילים?"}</h2></div><button className="back-button" onClick={onCancel} type="button">ביטול</button></div>
      <form onSubmit={submit} className="project-form">
        <label>שם הפרויקט<input required value={values.name} onChange={(e) => update("name", e.target.value)} /></label>
        <label>Slug באנגלית<input required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" value={values.slug} onChange={(e) => update("slug", e.target.value)} dir="ltr" /></label>
        <label className="form-wide">תיאור<textarea rows={3} value={values.description} onChange={(e) => update("description", e.target.value)} /></label>
        <label className="form-wide">סקירת הפרויקט <span className="form-help">פסקה מלאה בסגנון README: מה המערכת עושה, למי היא מיועדת ואיך היא עובדת.</span><textarea rows={7} value={values.projectOverview ?? ""} onChange={(e) => update("projectOverview", e.target.value)} /></label>
        <label>שלב<select value={values.status} onChange={(e) => update("status", e.target.value as ProjectInput["status"])}>{Object.entries(statusLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
        <label>עדיפות<select value={values.priority} onChange={(e) => update("priority", e.target.value as ProjectInput["priority"])}>{Object.entries(priorityLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
        <label>סוג הפרויקט<select value={values.projectType ?? ""} onChange={(e) => update("projectType", e.target.value ? e.target.value as ProjectInput["projectType"] : undefined)}><option value="">לא הוגדר</option>{Object.entries(projectTypeLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
        {values.projectType === "personal" && <label>סוג פרויקט אישי<select value={values.personalProjectType ?? ""} onChange={(e) => update("personalProjectType", e.target.value ? e.target.value as ProjectInput["personalProjectType"] : undefined)}><option value="">לא הוגדר</option>{Object.entries(personalProjectTypeLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>}
        <label>נתיב מקומי<input value={values.localPath ?? ""} onChange={(e) => update("localPath", e.target.value)} dir="ltr" /></label>
        <label>GitHub URL<input type="url" value={values.githubUrl ?? ""} onChange={(e) => update("githubUrl", e.target.value)} dir="ltr" /></label>
        <label>שירות אירוח<input value={values.hostingProvider ?? ""} onChange={(e) => update("hostingProvider", e.target.value)} /></label>
        <label>Live URL<input type="url" value={values.liveUrl ?? ""} onChange={(e) => update("liveUrl", e.target.value)} dir="ltr" /></label>
        <label className="form-wide">טכנולוגיות <span className="form-help">מופרדות בפסיקים</span><input value={technologies} onChange={(e) => setTechnologies(e.target.value)} /></label>
        <label className="form-wide">הצעד הבא<textarea rows={2} value={values.nextStep} onChange={(e) => update("nextStep", e.target.value)} /></label>
        <label className="form-wide">השלב הנוכחי בפירוט <span className="form-help">מה כבר עובד, מה בבדיקה ומה עדיין חסר.</span><textarea rows={4} value={values.stageDetails ?? ""} onChange={(e) => update("stageDetails", e.target.value)} /></label>
        <label className="form-wide">הערות<textarea rows={3} value={values.notes ?? ""} onChange={(e) => update("notes", e.target.value)} /></label>
        {error && <div className="form-error form-wide">{error}</div>}
        <div className="form-actions form-wide"><button className="primary-button" disabled={saving}>{saving ? "שומר..." : "שמירת פרויקט"}</button><button type="button" className="secondary-button" onClick={onCancel}>ביטול</button></div>
      </form>
    </div>
  );
}
