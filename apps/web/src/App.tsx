import { useMemo, useState } from "react";
import { Layout } from "./components/Layout";
import { ProjectCard } from "./components/ProjectCard";
import { ProjectDetail } from "./components/ProjectDetail";
import { ProjectForm } from "./components/ProjectForm";
import { useFilteredProjects, useProjects, useTheme } from "./hooks";
import { statusLabels } from "./lib/constants";
import type { Project } from "./types/project";
import "./styles/app.css";

function App() {
  const { projects, loading, error, reload } = useProjects();
  const { dark, toggle } = useTheme();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const [formMode, setFormMode] = useState<"new" | "edit" | null>(null);
  const filtered = useFilteredProjects(projects, query, status);
  const activeCount = useMemo(() => projects.filter((project) => project.status === "active").length, [projects]);
  const inProgressCount = useMemo(() => projects.filter((project) => project.status === "development").length, [projects]);

  return (
    <Layout dark={dark} onToggleTheme={toggle}>
      {formMode ? <ProjectForm project={formMode === "edit" ? selected ?? undefined : undefined} onCancel={() => setFormMode(null)} onSaved={(saved) => { setFormMode(null); setSelected(saved); void reload(); }} /> : selected ? <ProjectDetail project={selected} onBack={() => setSelected(null)} onEdit={() => setFormMode("edit")} /> : (
        <>
          <section className="hero">
            <div className="wrap hero__content">
              <div>
                <div className="eyebrow">לוח בקרה אישי · 2026</div>
                <h1>מה עשיתי<span className="hero__period">.</span></h1>
                <p className="tag">כל הפרויקטים שלי. כל הצעדים הבאים.</p>
                <p className="hero__intro">מקום אחד שמחזיק את מה שבניתי, איפה זה נמצא ומה מחכה לי עכשיו.</p>
              </div>
              <div className="hero__mark" aria-hidden="true"><img src="/assets/logo-mark.svg" alt="" /></div>
            </div>
          </section>
          <section className="sec alt" id="activity">
            <div className="wrap">
              <div className="sec__head"><span className="sec__num">01</span><h2>תמונת מצב</h2><p>המספרים החשובים לפני שבוחרים על מה לעבוד.</p></div>
              <div className="stats-grid">
                <div className="stat-card"><span>כל הפרויקטים</span><strong>{projects.length}</strong><small>ברשימה</small></div>
                <div className="stat-card stat-card--mint"><span>פעילים</span><strong>{activeCount}</strong><small>בשימוש או זמינים</small></div>
                <div className="stat-card stat-card--amber"><span>בפיתוח</span><strong>{inProgressCount}</strong><small>עבודה פתוחה</small></div>
                <div className="stat-card stat-card--berry"><span>דורשים תשומת לב</span><strong>{projects.filter((project) => project.nextStep).length}</strong><small>עם צעד הבא מוגדר</small></div>
              </div>
            </div>
          </section>
          <section className="sec" id="projects">
            <div className="wrap">
              <div className="sec__head"><span className="sec__num">02</span><h2>הפרויקטים</h2><p>חיפוש מהיר בין כל מה שנמצא בתנועה, בהמתנה או כבר באוויר.</p></div>
              <div className="toolbar">
                <label className="search-field"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="חיפוש לפי שם, תיאור או טכנולוגיה" /></label>
                <select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="סינון לפי סטטוס">
                  <option value="all">כל השלבים</option>
                  {Object.entries(statusLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
                </select>
                <button className="primary-button" onClick={() => setFormMode("new")}>+ פרויקט חדש</button>
              </div>
              {loading && <div className="state-card">טוען את הפרויקטים...</div>}
              {error && <div className="state-card state-card--error"><strong>לא הצלחתי לטעון את הנתונים.</strong><span>{error}</span><button onClick={reload}>לנסות שוב</button></div>}
              {!loading && !error && <div className="project-grid">{filtered.map((project) => <ProjectCard key={project.id} project={project} onSelect={(value) => { setSelected(value); setFormMode(null); }} />)}</div>}
              {!loading && !error && filtered.length === 0 && <div className="state-card">לא נמצאו פרויקטים שמתאימים לחיפוש.</div>}
            </div>
          </section>
        </>
      )}
    </Layout>
  );
}

export default App;
