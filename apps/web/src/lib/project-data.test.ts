import { describe, expect, it } from "vitest";
import { demoProjects } from "./constants";

describe("project demo data", () => {
  it("keeps the complete imported project list", () => {
    expect(demoProjects.length).toBeGreaterThanOrEqual(43);
    expect(demoProjects.some((project) => project.id === "what-i-do")).toBe(true);
    expect(demoProjects.some((project) => project.id === "salesai")).toBe(true);
    expect(demoProjects.some((project) => project.id === "booking")).toBe(true);
    expect(demoProjects.some((project) => project.id === "local-karu-ai2")).toBe(true);
    expect(demoProjects.some((project) => project.id === "local-omni")).toBe(true);
    expect(demoProjects.filter((project) => project.githubUrl?.endsWith("/Karu-AI")).length).toBeGreaterThanOrEqual(5);
    for (const emptyRepository of ["client-portal", "mange-time", "hackers", "siri3", "ubuntu", "hjhh", "aptttt", "apk", "site-spotlight"]) {
      expect(demoProjects.some((project) => project.slug === emptyRepository)).toBe(false);
    }
    expect(demoProjects.some((project) => project.slug === "roiwebsite")).toBe(false);
    expect(demoProjects.some((project) => project.slug === "math")).toBe(false);
  });
});
