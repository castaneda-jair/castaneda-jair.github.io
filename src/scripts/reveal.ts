/**
 * Scroll-reveal for elements with `data-reveal="up|down"` (replaces AOS).
 * Each element animates once when it enters the viewport.
 * Optional `data-reveal-delay="200"` (ms) staggers elements.
 */
export function initReveal(root: ParentNode = document) {
  const elements = root.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)");
  if (elements.length === 0) return;

  const reveal = (el: HTMLElement) => el.classList.add("is-revealed");

  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        if (el.dataset.revealDelay) el.style.setProperty("--reveal-delay", `${el.dataset.revealDelay}ms`);
        reveal(el);
        observer.unobserve(el);
      }
    },
    { rootMargin: "0px 0px -10% 0px" },
  );

  elements.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}
