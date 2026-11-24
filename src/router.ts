import { createRouter, createWebHistory } from 'vue-router';
import { projects } from './lib/content';
import { trackPage } from './lib/analytics';
import { updateMetadata } from './lib/metadata';
import HomeView from './views/HomeView.vue';
import ProjectView from './views/ProjectView.vue';
import NotFoundView from './views/NotFoundView.vue';
export const router = createRouter({
 history: createWebHistory(),
 routes: [
  { path: '/:locale(en)?/:section(projects|experience|info)?', name: 'home', component: HomeView },
  { path: `/:locale(en)?/projects/:slug(${projects.map(p => p.id).join('|')})/`, name: 'project', component: ProjectView },
  ...projects.map(p => ({ path: `/${p.id}/`, redirect: `/projects/${p.id}/` })),
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
 ],
 scrollBehavior(to, from, saved) {
  // The home view scrolls to its requested section.
  if (to.name === 'home') return false;
  if (to.path === from.path) return false;
  return saved ?? { left: 0, top: 0, behavior: 'instant' };
 },
});
// Convert old section bookmarks to clean section routes.
router.beforeEach(to => {
 if (to.name !== 'home') return;
 const prefix = to.params.locale === 'en' ? '/en' : '';
 const section = to.hash.slice(1);
 if (['top', 'projects', 'experience', 'info'].includes(section)) {
  return { path: prefix + (section === 'top' ? '/' : `/${section}`), query: to.query, replace: true };
 }
 if (to.params.section && to.path.endsWith('/')) return { path: to.path.slice(0, -1), query: to.query, replace: true };
});
router.afterEach((to, _from, failure) => { if (!failure) { updateMetadata(to.path); if (to.path !== _from.path) trackPage(); } });
