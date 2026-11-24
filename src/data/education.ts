import type { Locale } from "../i18n/ui";

/** Education shown in the Experience section (from LinkedIn). Dates are "YYYY.MM". */
export interface Education {
  school: string;
  degree?: Record<Locale, string>;
  start: string;
  /** `null` = ongoing. */
  end: string | null;
}

export const education: Education[] = [
  {
    school: "Universidad Peruana de Ciencias Aplicadas (UPC)",
    degree: { es: "Ingeniería de Sistemas", en: "Systems Engineering" },
    start: "2026.05",
    end: null,
  },
  {
    school: "ISIL",
    degree: { es: "Desarrollo de Sistemas de Información", en: "Information Systems Development" },
    start: "2023.01",
    end: "2025.12",
  },
];
