import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
 await page.route('**/*googletagmanager.com/**', route => route.abort());
 await page.route('**/*google-analytics.com/**', route => route.abort());
});

test('internal navigation, language and history keep the same document', async ({ page, isMobile }) => {
 const errors: string[] = [];
 page.on('pageerror', e => errors.push(e.message));
 await page.goto('/');
 await expect(page.locator('h1')).toContainText('hello, Jair here');
 await page.evaluate(() => { (window as unknown as Record<string, unknown>).__documentToken = 'still-alive'; });
 const documents: string[] = [];
 page.on('request', r => { if (r.resourceType() === 'document') documents.push(r.url()); });
 if (isMobile) await page.locator('[data-sidenav-toggle]').click();
 await page.locator('[data-sidenav-link="projects"]').click();
 await expect(page.locator('#projects')).toBeInViewport();
 await expect(page).toHaveURL(/\/projects$/);
 await page.locator('[data-project-card="unsplash-box"]').first().click();
 await expect(page).toHaveURL(/\/projects\/unsplash-box\//);
 await expect(page.locator('h1')).toHaveText('Unsplash Box');
 if (isMobile) await page.locator('[data-sidenav-toggle]').click();
 await page.locator('a[hreflang="en"]').click();
 await expect(page).toHaveURL(/\/en\/projects\/unsplash-box\//);
 await expect(page.locator('html')).toHaveAttribute('lang', 'en');
 await expect(page.getByRole('link', { name: '← Back to index' })).toBeVisible();
 await page.goBack();
 await expect(page.locator('html')).toHaveAttribute('lang', 'es');
 await page.goBack();
 await expect(page.locator('#projects')).toBeInViewport();
 if (isMobile) await page.locator('[data-sidenav-toggle]').click();
 await page.locator('[data-sidenav-link="experience"]').click();
 await expect(page.locator('#experience')).toBeInViewport();
 await expect(page).toHaveURL(/\/experience$/);
 await expect(page.locator('#experience details').first()).toHaveAttribute('open', '');
 if (isMobile) await page.locator('[data-sidenav-toggle]').click();
 await page.locator('[data-sidenav-link="info"]').click();
 await expect(page.locator('#info')).toBeInViewport();
 const photo = page.locator('#info img');
 await expect(photo).toHaveAttribute('src', '/images/profile_1.png');
 await expect.poll(() => photo.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
 await expect(page.locator('[data-sidenav-link][aria-current="location"]')).toHaveCount(1);
 await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async (text: string) => { (window as unknown as Record<string, unknown>).__copied = text; } } }));
 await page.locator('#info a[href^="mailto:"]').click();
 await expect(page.locator('[role="status"]')).toHaveText('Correo copiado al portapapeles');
 expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).__documentToken)).toBe('still-alive');
 expect(documents).toEqual([]);
 expect(errors).toEqual([]);
 await page.screenshot({ path: `test-results/${isMobile ? 'mobile' : 'desktop'}-info.png`, fullPage: true });
});

test('project previews, carousel, keyboard and repeat visits work', async ({ page, isMobile }) => {
 test.skip(isMobile, 'Project previews are desktop-only');
 const errors: string[] = [];
 page.on('pageerror', e => errors.push(e.message));
 await page.goto('/projects');
 await page.locator('[data-project-card="unsplash-box"]').first().hover();
 const panel = page.locator('[data-project-panel="unsplash-box"]');
 await expect(panel).toBeVisible();
 await panel.locator('[data-next]').click();
 await expect(panel.locator('[data-dot="1"]')).toHaveAttribute('aria-current', 'true');
 await panel.locator('[data-prev]').click();
 await expect(panel.locator('[data-dot="0"]')).toHaveAttribute('aria-current', 'true');
 await panel.locator('[data-next]').focus();
 await page.keyboard.press('ArrowRight');
 await expect(panel.locator('[data-dot="1"]')).toHaveAttribute('aria-current', 'true');
 await expect(page.locator('[data-sidenav-link="projects"]')).toHaveAttribute('aria-current', 'location');
 for (let i = 0; i < 3; i++) {
  await page.locator('[data-project-card="melon-podoromo"]').first().click();
  await expect(page.locator('h1')).toHaveText('Melon Podoromo');
  await page.getByRole('link', { name: '← Volver al índice' }).click();
  await expect(page.locator('#projects')).toBeInViewport();
 }
 await page.locator('[data-sidenav-link="experience"]').focus();
 await page.keyboard.press('Enter');
 await expect(page.locator('[data-sidenav-link="experience"]')).toHaveAttribute('aria-current', 'location');
 await expect(page.locator('#experience')).toBeInViewport();
 await page.locator('[data-sidenav-link="projects"]').focus();
 await page.keyboard.press('Enter');
 await expect(page.locator('[data-sidenav-link="projects"]')).toHaveAttribute('aria-current', 'location');
 expect(errors).toEqual([]);
 await page.screenshot({ path: 'test-results/desktop-projects.png', fullPage: true });
});

test('direct project routes, social HTML and assets work without JavaScript', async ({ request }) => {
 for (const prefix of ['', '/en']) {
  for (const route of ['/', '/projects', '/experience', '/info', '/projects/koyora/', '/projects/melon-podoromo/', '/projects/unsplash-box/']) {
   const path = prefix + route;
   const response = await request.get(path);
   expect(response.status()).toBe(200);
   const html = await response.text();
   expect(html).toContain(`<html lang="${prefix ? 'en' : 'es'}">`);
   expect(html).toContain('property="og:title"');
   expect(html).toContain('property="og:description"');
   expect(html).toContain('property="og:url" content="https://castaneda-jair.pages.dev' + path + '"');
   const image = html.match(/property="og:image" content="([^"]+)"/)?.[1];
   expect(image).toBeTruthy();
   const imageResponse = await request.get(new URL(image!).pathname);
   expect(imageResponse.status()).toBe(200);
   expect(imageResponse.headers()['content-type']).toContain('image/jpeg');
   expect(html).toContain('id="app"');
   expect(html).not.toContain('astro');
  }
 }
});

test('deep routes, unknown routes and legacy redirects render correctly', async ({ page }) => {
 await page.goto('/en/projects/unsplash-box/');
 await expect(page.locator('h1')).toHaveText('Unsplash Box');
 await page.reload();
 await expect(page.locator('h1')).toHaveText('Unsplash Box');
 await page.goto('/projects/unknown/');
 await expect(page.locator('h1')).toContainText('404');
 await page.goto('/en/info/');
 await expect(page).toHaveURL(/\/en\/info$/);
 await expect(page.locator('#info')).toBeInViewport();
 await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});


test('the page scrolls vertically on home and project routes', async ({ page }) => {
 await page.emulateMedia({ reducedMotion: 'no-preference' });
 await page.goto('/');
 await page.mouse.move(page.viewportSize()!.width - 30, 500);
 await page.mouse.wheel(0, 300);
 await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100);
 expect(await page.evaluate(() => window.scrollX)).toBe(0);
 expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
 await page.goto('/projects');
 await page.locator('[data-project-card="melon-podoromo"]').first().click();
 await expect(page.locator('h1')).toHaveText('Melon Podoromo');
 await page.mouse.wheel(0, 800);
 await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100);
 expect(await page.evaluate(() => window.scrollX)).toBe(0);
});


test('section routes support direct entry, history, language and old bookmarks', async ({ page, isMobile }) => {
 await page.goto('/experience');
 await expect(page.locator('#experience')).toBeInViewport();
 await expect(page).toHaveURL(/\/experience$/);
 await page.reload();
 await expect(page.locator('#experience')).toBeInViewport();
 if (isMobile) await page.locator('[data-sidenav-toggle]').click();
 await page.locator('a[hreflang="en"]').click();
 await expect(page).toHaveURL(/\/en\/experience$/);
 await expect(page.locator('#experience')).toBeInViewport();
 if (isMobile) await page.locator('[data-sidenav-toggle]').click();
 await page.locator('[data-sidenav-link="info"]').click();
 await expect(page).toHaveURL(/\/en\/info$/);
 await page.goBack();
 await expect(page).toHaveURL(/\/en\/experience$/);
 await expect(page.locator('#experience')).toBeInViewport();
 await page.goto('/#experience');
 await expect(page).toHaveURL(/\/experience$/);
 await expect(page.locator('#experience')).toBeInViewport();
});
