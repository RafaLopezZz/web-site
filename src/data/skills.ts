export type SkillsLocale = "es" | "en";

type LocalizedText = {
  es: string;
  en: string;
};

export type SkillDomain = {
  id: "backend" | "data" | "systems" | "applied-ai";
  kicker: string;
  title: string;
  description: string;
  capabilities: readonly string[];
  technologies: readonly string[];
  evidence?: {
    intro: string;
    statements: readonly string[];
    linkLabel: string;
  };
};

type LocalizedSkillDomain = {
  id: SkillDomain["id"];
  kicker: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  capabilities: { es: readonly string[]; en: readonly string[] };
  technologies: readonly string[];
  evidence?: {
    intro: LocalizedText;
    statements: { es: readonly string[]; en: readonly string[] };
    linkLabel: LocalizedText;
  };
};

const localizedDomains: readonly LocalizedSkillDomain[] = [
  {
    id: "backend",
    kicker: { es: "RLP / SKILLS / 001", en: "RLP / SKILLS / 001" },
    title: { es: "Backend", en: "Backend" },
    description: {
      es: "Diseño y desarrollo de aplicaciones y APIs con atención a reglas de negocio y datos relacionales.",
      en: "I design and build applications and APIs with attention to business rules and relational data.",
    },
    capabilities: {
      es: ["Aplicaciones web", "APIs REST", "Lógica de negocio", "Persistencia relacional"],
      en: ["Web applications", "REST APIs", "Business logic", "Relational persistence"],
    },
    technologies: ["Java", "Spring Boot", "PHP", "Laravel", "PostgreSQL", "MySQL"],
  },
  {
    id: "data",
    kicker: { es: "RLP / SKILLS / 002", en: "RLP / SKILLS / 002" },
    title: { es: "Data", en: "Data" },
    description: {
      es: "Trabajo con datos desde el modelado relacional y SQL hasta la exploración y el aprendizaje automático en formación.",
      en: "I work with data from relational modelling and SQL to exploration and machine learning in training.",
    },
    capabilities: {
      es: ["Modelado relacional", "Consultas SQL", "Exploración de datos", "Visualización", "Machine learning"],
      en: ["Relational modelling", "SQL queries", "Data exploration", "Visualization", "Machine learning"],
    },
    technologies: ["PostgreSQL", "MySQL", "Python", "Machine Learning", "Visualización de datos", "Business Intelligence"],
  },
  {
    id: "systems",
    kicker: { es: "RLP / SKILLS / 003", en: "RLP / SKILLS / 003" },
    title: { es: "Systems", en: "Systems" },
    description: {
      es: "Mantengo una base práctica en sistemas, redes, automatización y soporte de entornos reales.",
      en: "I maintain a practical foundation in systems, networks, automation, and support for real environments.",
    },
    capabilities: {
      es: ["Soporte técnico", "Entornos Windows y Linux", "Automatización", "Continuidad sin conexión"],
      en: ["Technical support", "Windows and Linux environments", "Automation", "Offline continuity"],
    },
    technologies: ["Bash / Shell", "PowerShell", "Git", "Docker", "MQTT", "Node-RED", "SQLite"],
  },
  {
    id: "applied-ai",
    kicker: { es: "RLP / SKILLS / 004", en: "RLP / SKILLS / 004" },
    title: { es: "IA aplicada", en: "Applied AI" },
    description: {
      es: "Capacidad de integrar asistencia de agentes en ingeniería sin delegar el criterio, los límites ni la validación.",
      en: "A capability for integrating agent assistance into engineering without delegating judgment, boundaries, or validation.",
    },
    capabilities: {
      es: [
        "Flujos de ingeniería asistidos por agentes",
        "Enrutamiento explícito",
        "Límites de responsabilidad",
        "Ciclo de vida SDD",
        "Validación automatizada",
        "Trazabilidad y evidencia de intentos",
        "Controles contra fallbacks silenciosos",
      ],
      en: [
        "Agent-assisted engineering workflows",
        "Explicit routing",
        "Responsibility boundaries",
        "SDD lifecycle",
        "Automated validation",
        "Traceability and attempt evidence",
        "Controls against silent fallbacks",
      ],
    },
    technologies: [],
    evidence: {
      intro: {
        es: "La evidencia pública se limita a la validación suministrada del flujo de trabajo.",
        en: "The public evidence is limited to the supplied validation of the workflow.",
      },
      statements: {
        es: [
          "36 rutas explícitas",
          "150 aserciones",
          "enrutamiento de proveedores/modelos 7/7",
          "Ciclo de vida SDD completo",
          "La ausencia de fallback silencioso queda acotada a la validación suministrada.",
        ],
        en: [
          "36 explicit routes",
          "150 assertions",
          "7/7 provider/model routing",
          "Full SDD lifecycle",
          "The no-silent-fallback claim is bounded to the supplied validation.",
        ],
      },
      linkLabel: { es: "Ver artefacto de evidencia ↗", en: "View evidence artifact ↗" },
    },
  },
];

export function getSkillDomains(locale: SkillsLocale): readonly SkillDomain[] {
  return localizedDomains.map((domain) => ({
    id: domain.id,
    kicker: domain.kicker[locale],
    title: domain.title[locale],
    description: domain.description[locale],
    capabilities: domain.capabilities[locale],
    technologies: domain.technologies,
    evidence: domain.evidence
      ? {
          intro: domain.evidence.intro[locale],
          statements: domain.evidence.statements[locale],
          linkLabel: domain.evidence.linkLabel[locale],
        }
      : undefined,
  }));
}
