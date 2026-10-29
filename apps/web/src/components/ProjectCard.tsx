import { formatRelativeDate } from "../lib/formatters";
import { personalProjectTypeLabels, priorityLabels, projectTypeLabels, statusLabels } from "../lib/constants";
import type { Project } from "../types/project";

type Props = { project: Project; onSelect: (project: Project) => void };

export function ProjectCard({ project, onSelect }: Props) {
  return (
    <button className={`project-card ${project.priority === "high" ? "project-card--priority" : ""}`} onClick={() => onSelect(project)}>
      <div className="project-card__head">
        <span className={`status-dot status-dot--${project.status}`} />
        <span className="project-card__status">{statusLabels[project.status]}</span>
        <span className="project-card__priority">{priorityLabels[project.priority]}</span>
      </div>
      <div className="project-card__body">
        <h3>{project.name}</h3>
        {project.projectType && <div className="project-card__type">{projectTypeLabels[project.projectType]}{project.personalProjectType ? ` · ${personalProjectTypeLabels[project.personalProjectType]}` : ""}</div>}
        <p>{project.description}</p>
        <div className="tag-list">
          {project.technologies.map((technology) => <span className="chip" key={technology}>{technology}</span>)}
        </div>
      </div>
      <div className="project-card__footer">
        <span>עבודה אחרונה: {formatRelativeDate(project.lastWorkedAt)}</span>
        <span className="project-card__arrow" aria-hidden="true">←</span>
      </div>
    </button>
  );
}
