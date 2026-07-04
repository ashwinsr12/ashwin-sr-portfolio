import projectsData from "../data/projects.json";

export const projects = projectsData;

export function getProjectBySlug(slug) {
  return projectsData.find((p) => p.slug === slug);
}
