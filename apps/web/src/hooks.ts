import { useCallback, useEffect, useMemo, useState } from "react";
import { listProjects } from "./lib/api-client";
import type { Project } from "./types/project";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setProjects(await listProjects());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "שגיאה בטעינת הפרויקטים");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => void reload(), [reload]);
  return { projects, setProjects, loading, error, reload };
}

export function useTheme() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  return { dark, toggle: () => setDark((value) => !value) };
}

export function useFilteredProjects(projects: Project[], query: string, status: string) {
  return useMemo(
    () =>
      projects.filter((project) => {
        const haystack = [
          project.name,
          project.description,
          project.nextStep,
          ...project.technologies,
        ]
          .join(" ")
          .toLowerCase();
        return (
          haystack.includes(query.toLowerCase()) &&
          (status === "all" || project.status === status)
        );
      }),
    [projects, query, status],
  );
}
