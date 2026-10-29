import { formatDate } from "../lib/formatters";
import { personalProjectTypeLabels, priorityLabels, projectTypeLabels, statusLabels } from "../lib/constants";
import type { Project } from "../types/project";

type Props = { project: Project; onBack: () => void; onEdit?: () => void };

export function ProjectDetail({ project, onBack, onEdit }: Props) {
  return (
    <section className="sec project-detail">
      <div className="wrap">
        <button className="back-button" onClick={onBack}>→ חזרה לכל הפרויקטים</button>
        <div className="detail-heading">
          <div>
            <span className={`eyebrow eyebrow--${project.status}`}>{statusLabels[project.status]}</span>
            <h1>{project.name}</h1>
            <p className="lead">{project.description}</p>
          </div>
          <span className="detail-priority">{priorityLabels[project.priority]}</span>
        </div>
        {onEdit && <button className="primary-button detail-edit" onClick={onEdit}>עריכת פרויקט</button>}
        <div className="card project-overview">
          <h2>על הפרויקט</h2>
          <p>{project.projectOverview || project.description || "טרם נכתבה סקירה מלאה לפרויקט."}</p>
        </div>
        <div className="detail-grid">
          <div className="detail-main">
            <div className="card">
              <h2>השלב הנוכחי</h2>
              <p>{project.stageDetails || `הפרויקט נמצא בשלב: ${statusLabels[project.status]}.`}</p>
            </div>
            <div className="callout tip">
              <span className="callout__tab">הצעד הבא</span>
              <p>{project.nextStep}</p>
            </div>
            <div className="card">
              <h2>הערות</h2>
              <p>{project.notes || "אין הערות עדיין."}</p>
            </div>
          </div>
          <aside className="detail-sidebar">
            <div className="card">
              <h3>פרטי פרויקט</h3>
              <dl className="metadata">
                <div><dt>סוג</dt><dd>{project.projectType ? projectTypeLabels[project.projectType] : "לא הוגדר"}</dd></div>
                {project.projectType === "personal" && <div><dt>מטרת הפרויקט האישי</dt><dd>{project.personalProjectType ? personalProjectTypeLabels[project.personalProjectType] : "לא הוגדר"}</dd></div>}
                <div><dt>עבודה אחרונה</dt><dd>{formatDate(project.lastWorkedAt)}</dd></div>
                <div><dt>עודכן</dt><dd>{formatDate(project.updatedAt)}</dd></div>
                <div><dt>אירוח</dt><dd>{project.hostingProvider || "לא הוגדר"}</dd></div>
              </dl>
            </div>
            <div className="card">
              <h3>מיקומים וקישורים</h3>
              <div className="detail-links">
                {project.localPath && <code>{project.localPath}</code>}
                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>}
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">אתר חי ↗</a>}
                {!project.localPath && !project.githubUrl && !project.liveUrl && <span className="small">אין קישורים עדיין</span>}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
