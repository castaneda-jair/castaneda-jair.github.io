/** Tech registry: every technology a project can reference by key. */
const iconUrls = import.meta.glob<string>("../icons/tech/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
});

const icon = (file: string): string => {
  const url = iconUrls[`../icons/tech/${file}.svg`];
  if (!url) throw new Error(`Missing tech icon: ${file}.svg`);
  return url;
};

export interface Tech {
  name: string;
  url: string;
  /** Optional: techs without a logo render as text only. */
  icon?: string;
}

export const stack = {
  react: { name: "React", url: "https://react.dev/", icon: icon("react") },
  tailwindcss: { name: "TailwindCSS", url: "https://tailwindcss.com/", icon: icon("tailwindcss") },
  nodejs: { name: "NodeJS", url: "https://nodejs.org/", icon: icon("nodejs") },
  awss3: { name: "AWS S3", url: "https://docs.aws.amazon.com/s3/", icon: icon("awss3") },
  prisma: { name: "Prisma", url: "https://www.prisma.io/", icon: icon("prisma") },
  postgresql: { name: "PostgreSQL", url: "https://www.postgresql.org/", icon: icon("postgresql") },
  angular: { name: "Angular", url: "https://angular.dev/", icon: icon("angular") },
  nestjs: { name: "NestJS", url: "https://nestjs.com/", icon: icon("nestjs") },
  typescript: { name: "TypeScript", url: "https://www.typescriptlang.org/", icon: icon("typescript") },
  mysql: { name: "MySQL", url: "https://www.mysql.com/", icon: icon("mysql") },
  springboot: { name: "Spring Boot", url: "https://spring.io/projects/spring-boot", icon: icon("springboot") },
  electron: { name: "ElectronJS", url: "https://www.electronjs.org/", icon: icon("electronjs") },
  typeorm: { name: "TypeORM", url: "https://typeorm.io/", icon: icon("typeorm") },
  zustand: { name: "Zustand", url: "https://zustand.docs.pmnd.rs/", icon: icon("zustand") },
  daisyui: { name: "daisyUI", url: "https://daisyui.com/", icon: icon("daisyui") },
  redux: { name: "Redux", url: "https://redux.js.org/", icon: icon("redux") },
  elixir: { name: "Elixir", url: "https://elixir-lang.org/", icon: icon("elixir") },
  phoenix: { name: "Phoenix", url: "https://www.phoenixframework.org/", icon: icon("phoenixframework") },
  liveview: { name: "Phoenix LiveView", url: "https://hexdocs.pm/phoenix_live_view/", icon: icon("phoenixframework") },
  python: { name: "Python", url: "https://www.python.org/", icon: icon("python") },
  fastapi: { name: "FastAPI", url: "https://fastapi.tiangolo.com/", icon: icon("fastapi") },
  pydanticai: { name: "Pydantic AI", url: "https://ai.pydantic.dev/", icon: icon("pydantic") },
  logfire: { name: "Logfire", url: "https://logfire.pydantic.dev/", icon: icon("logfire") },
  opentelemetry: { name: "OpenTelemetry", url: "https://opentelemetry.io/", icon: icon("opentelemetry") },
  oauth2: { name: "OAuth2", url: "https://oauth.net/2/", icon: icon("oauth2") },
  pdfjs: { name: "PDF.js", url: "https://mozilla.github.io/pdf.js/", icon: icon("pdfjs") },
  libreoffice: { name: "LibreOffice", url: "https://www.libreoffice.org/", icon: icon("libreoffice") },
  docker: { name: "Docker", url: "https://www.docker.com/", icon: icon("docker") },
  surrealdb: { name: "SurrealDB", url: "https://surrealdb.com/", icon: icon("surrealdb") },
  falkordb: { name: "FalkorDB", url: "https://www.falkordb.com/", icon: icon("falkordb") },
  valkey: { name: "Valkey", url: "https://valkey.io/", icon: icon("valkey") },
  ovh: { name: "OVH Object Storage", url: "https://www.ovhcloud.com/en/public-cloud/object-storage/", icon: icon("ovh") },
  backblaze: { name: "Backblaze B2", url: "https://www.backblaze.com/cloud-storage", icon: icon("backblaze") },
} as const satisfies Record<string, Tech>;

export type TechId = keyof typeof stack;
export const techIds = Object.keys(stack) as [TechId, ...TechId[]];
