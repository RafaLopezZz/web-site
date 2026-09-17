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
      es: "Conecto APIs, lógica de aplicación y persistencia para convertir requisitos en soluciones que funcionen dentro del sistema completo.",
      en: "I connect APIs, application logic, and persistence to turn requirements into solutions that work within the complete system.",
    },
    capabilities: {
      es: [
        "Aplicaciones web",
        "APIs REST",
        "Lógica de negocio",
        "Persistencia relacional",
      ],
      en: [
        "Web applications",
        "REST APIs",
        "Business logic",
        "Relational persistence",
      ],
    },
    technologies: [
      "Java",
      "Spring Boot",
      "PHP",
      "Laravel",
      "PostgreSQL",
      "MySQL",
    ],
  },
  {
    id: "data",
    kicker: { es: "RLP / SKILLS / 002", en: "RLP / SKILLS / 002" },
    title: { es: "Data", en: "Data" },
    description: {
      es: "Trabajo con datos relacionales, SQL y análisis para que los procesos y decisiones del sistema se apoyen en información fiable.",
      en: "I work with relational data, SQL, and analysis so that system processes and decisions are based on reliable information.",
    },
    capabilities: {
      es: [
        "Modelado relacional",
        "Consultas SQL",
        "Exploración de datos",
        "Visualización",
        "Machine learning",
      ],
      en: [
        "Relational modelling",
        "SQL queries",
        "Data exploration",
        "Visualization",
        "Machine learning",
      ],
    },
    technologies: [
      "PostgreSQL",
      "MySQL",
      "Python",
      "Machine Learning",
      "Visualización de datos",
      "Business Intelligence",
    ],
  },
  {
    id: "systems",
    kicker: { es: "RLP / SKILLS / 003", en: "RLP / SKILLS / 003" },
    title: { es: "Systems", en: "Systems" },
    description: {
      es: "Es la capa donde backend y datos tienen que funcionar de verdad: sistemas, redes, automatización, dispositivos y continuidad.",
      en: "This is where backend and data have to work in practice: systems, networks, automation, devices, and continuity.",
    },
    capabilities: {
      es: [
        "Soporte técnico",
        "Entornos Windows y Linux",
        "Automatización",
        "Continuidad sin conexión",
      ],
      en: [
        "Technical support",
        "Windows and Linux environments",
        "Automation",
        "Offline continuity",
      ],
    },
    technologies: [
      "Bash / Shell",
      "PowerShell",
      "Git",
      "Docker",
      "MQTT",
      "Node-RED",
      "SQLite",
    ],
  },
  {
    id: "applied-ai",
    kicker: { es: "RLP / SKILLS / 004", en: "RLP / SKILLS / 004" },
    title: { es: "IA aplicada", en: "Applied AI" },
    description: {
      es: "Uso agentes como herramientas de ingeniería: yo mantengo el criterio y los límites; el agente ejecuta tareas delimitadas que después pueden validarse.",
      en: "I use agents as engineering tools: I retain judgment and boundaries; the agent executes bounded tasks whose results can then be validated.",
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
        es: "Workflows de desarrollo asistido por agentes con routing explícito, ciclos SDD, validación automatizada y controles para evitar fallbacks silenciosos.",
        en: "Development workflows with explicit routing, SDD cycles, automated validation, and safeguards against silent fallbacks.",
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
      linkLabel: {
        es: "Ver repositorio ↗",
        en: "View repository ↗",
      },
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
