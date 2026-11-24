import projectData from '../content/projects.json';
import experienceData from '../content/experience.json';
export const projects = projectData;
export type Project = (typeof projects)[number];
const key = (e: (typeof experienceData)[number]) => (e.end ?? '9999-99') + (e.start ?? '');
export const experience = experienceData.filter(e => import.meta.env.DEV || !('draft' in e && e.draft)).sort((a,b) => key(b).localeCompare(key(a)));
export const companies = [...new Set(experience.map(e => e.company))].map(company => ({ ...experience.find(e => e.company === company)!, roles: experience.filter(e => e.company === company) }));
export const period = (start: string | undefined, end: string | null, present: string) => [start?.replace('-', '.'), end?.replace('-', '.') ?? present].filter(Boolean).join(' — ');
