/** Single source of truth for personal data used across the site. */
export const site = {
  name: "Jair C.",
  url: "https://castaneda-jair.github.io",
  analyticsId: "G-9HK5NQ2DPJ",
  email: "c.h.jair13@gmail.com",
  /** Public path to a CV PDF (put the file in /public). Leave empty to hide the button. */
  cvUrl: "",
  repoUrl: "https://github.com/Anemone3/portfolio",
} as const;

export type SocialId = "github" | "linkedin" | "email";

export interface Social {
  id: SocialId;
  label: string;
  href: string;
  hidden: boolean;
}

export const socials: Social[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Anemone3",
    hidden: false,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/castaneda-jair/",
    hidden: false,
  },
  { id: "email", label: "Email", href: `mailto:${site.email}`, hidden: true },
];

/** Profile links shown as chips in the Info page. */
export const profileLinks = socials.filter((s) => !s.hidden);

/**
 * Layout of the Experience section: "detailed" | "summary" | "elegant" | "light".
 * Compare them in dev at /preview/experience/.
 */
export const experienceLayout: "detailed" | "summary" | "elegant" | "light" = "elegant";
