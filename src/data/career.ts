export type CareerLocale = "es" | "en";
export type CareerRecordKind = "experience" | "education" | "certification" | "project";
export type CareerSide = "experience" | "education";

type LocalizedText = {
  es: string;
  en: string;
};

type CareerCopy = {
  title: string;
  organization: string;
  period: LocalizedText | null;
  summary?: string;
  context?: string;
  details: readonly string[];
  marks?: string;
  links?: readonly { label: string; href: string; external?: boolean }[];
  certificate?: { label: string; file: string };
};

export type CareerRecord = {
  id: string;
  kind: CareerRecordKind;
  side: CareerSide;
  period: LocalizedText | null;
  relativeAfter?: string;
  startYear?: number;
  endYear?: number;
  ongoing?: boolean;
  es: CareerCopy;
  en: CareerCopy;
};

export const careerChronology: readonly CareerRecord[] = [
  {
    id: "experience-leovinci",
    kind: "experience",
    side: "experience",
    period: { es: "2024 - Actualmente", en: "2024 - Present" },
    startYear: 2024,
    ongoing: true,
    es: {
      title: "Desarrollador Fullstack y Técnico de Sistemas",
      organization: "Leovinci Consulting S.L.",
      period: { es: "2024 - Actualmente", en: "2024 - Present" },
      summary: "Trabajo entre desarrollo web, automatización y soporte técnico en entorno de consultoría.",
      details: [
        "Desarrollo aplicaciones y mejoras internas con PHP, Laravel, Bootstrap, MySQL, Java y scripts en Bash y PowerShell.",
        "Implanto y configuro ERP y programas de gestión para empresas, intentando dejar procesos más claros y repetibles.",
        "Mantengo entornos Windows y Linux y resuelvo incidencias con una visión práctica de negocio y soporte.",
        "Algunos ejemplos de mi trabajo profesional con PHP/Laravel y MySQL:",
      ],
      links: [
        { label: "Águilas FC", href: "https://www.aguilasfc.es/" },
        { label: "La Ola Art Gallery", href: "https://www.laolaart.com" },
        { label: "Quinta Bella", href: "https://www.quintabella.com" },
        { label: "Fincas Victoria", href: "https://www.victoriafincas.es/" },
      ],
    },
    en: {
      title: "Fullstack Developer and Systems Technician",
      organization: "Leovinci Consulting S.L.",
      period: { es: "2024 - Actualmente", en: "2024 - Present" },
      summary: "I work across web development, automation, and technical support in a consulting environment.",
      details: [
        "I develop applications and internal improvements with PHP, Laravel, Bootstrap, MySQL, Java, and Bash and PowerShell scripts.",
        "I deploy and configure ERP and management software for companies, aiming to leave processes clearer and more repeatable.",
        "I maintain Windows and Linux environments and resolve incidents with a practical business and support perspective.",
        "Some examples of my professional work with PHP/Laravel and MySQL:",
      ],
      links: [
        { label: "Águilas FC", href: "https://www.aguilasfc.es/" },
        { label: "La Ola Art Gallery", href: "https://www.laolaart.com" },
        { label: "Quinta Bella", href: "https://www.quintabella.com" },
        { label: "Fincas Victoria", href: "https://www.victoriafincas.es/" },
      ],
    },
  },
  {
    id: "education-ai-big-data",
    kind: "education",
    side: "education",
    period: { es: "Cursando", en: "In progress" },
    ongoing: true,
    es: {
      title: "Curso de especialización FP en Inteligencia Artificial y Big Data",
      organization: "iLERNA Online",
      period: { es: "Cursando", en: "In progress" },
      summary: "Especialización orientada a ampliar base en datos e IA aplicada.",
      details: [
        "Estoy reforzando fundamentos de Python, datos y técnicas de machine learning.",
        "Me interesa entender bien cómo integrar automatización e IA en herramientas útiles.",
        "Completa mi perfil actual sin perder la base de desarrollo de software.",
      ],
    },
    en: {
      title: "FP specialization course in Artificial Intelligence and Big Data",
      organization: "iLERNA Online",
      period: { es: "Cursando", en: "In progress" },
      summary: "A specialization course focused on strengthening my foundation in data and applied AI.",
      details: [
        "I am strengthening my foundations in Python, data, and machine learning techniques.",
        "I want to understand how to integrate automation and AI into useful tools.",
        "It complements my current profile without losing my software development foundation.",
      ],
    },
  },
  {
    id: "certification-bash-2026",
    kind: "certification",
    side: "education",
    period: { es: "2026", en: "2026" },
    startYear: 2026,
    endYear: 2026,
    es: {
      title: "Bash/Shell",
      organization: "Mouredev PRO",
      period: { es: "2026", en: "2026" },
      details: [],
      certificate: { label: "Ver certificado", file: "certificates/Certificado BASH - Rafael López - 2026-01-11.pdf" },
    },
    en: {
      title: "Bash/Shell",
      organization: "Mouredev PRO",
      period: { es: "2026", en: "2026" },
      details: [],
      certificate: { label: "View certificate", file: "certificates/Certificado BASH - Rafael López - 2026-01-11.pdf" },
    },
  },
  {
    id: "experience-blazquez-liria",
    kind: "experience",
    side: "experience",
    period: { es: "2023 - 2024", en: "2023 - 2024" },
    startYear: 2023,
    endYear: 2024,
    es: {
      title: "Técnico en ruta",
      organization: "Blázquez Liria S.L.",
      period: { es: "2023 - 2024", en: "2023 - 2024" },
      summary: "Puesto centrado en soporte técnico y resolución de incidencias en cliente.",
      details: [
        "Diagnostiqué y resolví incidencias de hardware, software y conectividad en equipos de uso profesional.",
        "Trabajé con tiempos de respuesta ajustados y atención directa a usuarios en ruta.",
        "Me ayudó a reforzar base de sistemas, redes y trato técnico con cliente final.",
      ],
    },
    en: {
      title: "Field Technician",
      organization: "Blázquez Liria S.L.",
      period: { es: "2023 - 2024", en: "2023 - 2024" },
      summary: "A role focused on technical support and resolving incidents at customer sites.",
      details: [
        "I diagnosed and resolved hardware, software, and connectivity incidents on professional equipment.",
        "I worked with tight response times and direct support for users on the road.",
        "The role strengthened my foundation in systems, networks, and technical customer support.",
      ],
    },
  },
  {
    id: "education-dam",
    kind: "education",
    side: "education",
    period: { es: "2023 - 2025", en: "2023 - 2025" },
    startYear: 2023,
    endYear: 2025,
    es: {
      title: "FP Grado Superior en Desarrollo de Aplicaciones Multiplataforma",
      organization: "IES Alfonso X El Sabio - Murcia (A distancia)",
      period: { es: "2023 - 2025", en: "2023 - 2025" },
      marks: "Nota media: 7.93",
      summary: "La etapa donde consolidé la parte de programación y desarrollo de aplicaciones.",
      details: [
        "Trabajé Java, POO, bases de datos, interfaces y control de versiones.",
        "Me ayudó a construir proyectos completos y a ordenar mejor la parte técnica.",
        "Es la base más directa del perfil fullstack que enseño en el portfolio.",
      ],
    },
    en: {
      title: "Higher Vocational Training in Multiplatform Application Development",
      organization: "IES Alfonso X El Sabio - Murcia (Distance learning)",
      period: { es: "2023 - 2025", en: "2023 - 2025" },
      marks: "Average grade: 7.93",
      summary: "The stage where I consolidated my programming and application development foundation.",
      details: [
        "I worked with Java, OOP, databases, interfaces, and version control.",
        "It helped me build complete projects and organize the technical side more clearly.",
        "It is the most direct foundation of the fullstack profile I present in this portfolio.",
      ],
    },
  },
  {
    id: "certification-ai-2025",
    kind: "certification",
    side: "education",
    period: { es: "2025", en: "2025" },
    startYear: 2025,
    endYear: 2025,
    es: {
      title: "Curso de inicialización al desarrollo con IA",
      organization: "BIG School - Mouredev",
      period: { es: "2025", en: "2025" },
      details: [],
      certificate: { label: "Ver certificado", file: "certificates/Certificado_IA.pdf" },
    },
    en: {
      title: "Introduction to AI-assisted development course",
      organization: "BIG School - Mouredev",
      period: { es: "2025", en: "2025" },
      details: [],
      certificate: { label: "View certificate", file: "certificates/Certificado_IA.pdf" },
    },
  },
  {
    id: "experience-hospitality",
    kind: "experience",
    side: "experience",
    period: { es: "2004 - 2023", en: "2004 - 2023" },
    startYear: 2004,
    endYear: 2023,
    es: {
      title: "Experiencia Transferible",
      organization: "Otros cargos en Hostelería",
      period: { es: "2004 - 2023", en: "2004 - 2023" },
      summary: "Antes de dedicarme al desarrollo trabajé años en atención al cliente, coordinación y gestión de equipos.",
      details: [
        "Aprendí a tratar con clientes, detectar problemas rápidos y explicar soluciones de forma clara.",
        "Trabajé durante años bajo presión real, algo que hoy me ayuda cuando una aplicación falla o hay que resolver una incidencia.",
        "Esa etapa me dejó una forma de trabajar más ordenada y cercana a lo que necesita quien usa el producto.",
      ],
    },
    en: {
      title: "Transferable Experience",
      organization: "Other hospitality roles",
      period: { es: "2004 - 2023", en: "2004 - 2023" },
      summary: "Before moving into development, I spent years in customer service, coordination, and team management.",
      details: [
        "I learned to work with customers, spot problems quickly, and explain solutions clearly.",
        "I worked for years under real pressure, which now helps when an application fails or an incident needs resolving.",
        "That stage gave me a more organized and user-centered way of working.",
      ],
    },
  },
  {
    id: "education-smr",
    kind: "education",
    side: "education",
    period: { es: "2021 - 2023", en: "2021 - 2023" },
    startYear: 2021,
    endYear: 2023,
    es: {
      title: "FP Grado Medio en Sistemas Microinformáticos y Redes",
      organization: "IES Europa - Águilas (Murcia)",
      period: { es: "2021 - 2023", en: "2021 - 2023" },
      marks: "Nota media: 9.6 - Mención Honorífica",
      summary: "Formación que me dio base sólida en sistemas, redes y soporte técnico.",
      details: [
        "Aprendí hardware, software, redes y resolución de incidencias desde una base práctica.",
        "Me dio soltura para entender mejor entornos reales y no solo escribir código.",
        "Fue el punto de partida del cambio hacia desarrollo y consultoría tecnológica.",
      ],
    },
    en: {
      title: "Intermediate Vocational Training in Microcomputer Systems and Networks",
      organization: "IES Europa - Águilas (Murcia)",
      period: { es: "2021 - 2023", en: "2021 - 2023" },
      marks: "Average grade: 9.6 - Honorary Mention",
      summary: "Training that gave me a solid foundation in systems, networks, and technical support.",
      details: [
        "I learned hardware, software, networks, and incident resolution from a practical foundation.",
        "It gave me confidence to understand real environments, not only write code.",
        "It was the starting point for my move toward development and technology consulting.",
      ],
    },
  },
  {
    id: "certification-support-2022",
    kind: "certification",
    side: "education",
    period: { es: "2022", en: "2022" },
    startYear: 2022,
    endYear: 2022,
    es: {
      title: "Aspectos básicos de la asistencia técnica",
      organization: "Coursera - Google",
      period: { es: "2022", en: "2022" },
      details: [],
      certificate: { label: "Ver certificado", file: "certificates/Certificado Coursera W38TVAPHFLSL.pdf" },
    },
    en: {
      title: "Technical Support Fundamentals",
      organization: "Coursera - Google",
      period: { es: "2022", en: "2022" },
      details: [],
      certificate: { label: "View certificate", file: "certificates/Certificado Coursera W38TVAPHFLSL.pdf" },
    },
  },
  {
    id: "certification-networking-2022",
    kind: "certification",
    side: "education",
    period: { es: "2022", en: "2022" },
    startYear: 2022,
    endYear: 2022,
    es: {
      title: "Los bits y bytes de las redes informáticas",
      organization: "Coursera - Google",
      period: { es: "2022", en: "2022" },
      details: [],
      certificate: { label: "Ver certificado", file: "certificates/Certificado2 Coursera 9KWEUX3HNPQM.pdf" },
    },
    en: {
      title: "The Bits and Bytes of Computer Networking",
      organization: "Coursera - Google",
      period: { es: "2022", en: "2022" },
      details: [],
      certificate: { label: "View certificate", file: "certificates/Certificado2 Coursera 9KWEUX3HNPQM.pdf" },
    },
  },
  {
    id: "project-importador-db",
    kind: "project",
    side: "experience",
    period: { es: "01/2026", en: "01/2026" },
    startYear: 2026,
    es: {
      title: "ImportadorDB",
      organization: "RLP / WORK / 001",
      period: { es: "01/2026", en: "01/2026" },
      context: "Después del DAM y antes de la especialización en IA y Big Data.",
      details: ["Aplicación de escritorio para importar datos desde Excel a bases de datos relacionales mediante un flujo guiado de revisión, mapeo y carga."],
      links: [{ label: "Ver caso de ImportadorDB ↗", href: "work/importador-db/" }],
    },
    en: {
      title: "ImportadorDB",
      organization: "RLP / WORK / 001",
      period: { es: "01/2026", en: "01/2026" },
      context: "After DAM and before the AI and Big Data specialization.",
      details: ["Desktop application for importing Excel data into relational databases through a guided review, mapping, and loading workflow."],
      links: [{ label: "View ImportadorDB case ↗", href: "en/work/importador-db/" }],
    },
  },
  {
    id: "project-cosecha-en-cope",
    kind: "project",
    side: "education",
    period: { es: "12/2025", en: "12/2025" },
    startYear: 2025,
    es: {
      title: "Cosecha en Cope",
      organization: "RLP / WORK / 002",
      period: { es: "12/2025", en: "12/2025" },
      context: "Proyecto final del DAM.",
      details: ["Marketplace para productores y consumidores: catálogo, autenticación y compra."],
      links: [{ label: "Ver caso de Cosecha en Cope ↗", href: "work/cosecha-en-cope/" }],
    },
    en: {
      title: "Cosecha en Cope",
      organization: "RLP / WORK / 002",
      period: { es: "12/2025", en: "12/2025" },
      context: "DAM final project.",
      details: ["Marketplace for producers and consumers: catalog, authentication, and purchase."],
      links: [{ label: "View Cosecha en Cope case ↗", href: "en/work/cosecha-en-cope/" }],
    },
  },
  {
    id: "project-glea-nexo",
    kind: "project",
    side: "experience",
    period: null,
    relativeAfter: "experience-leovinci",
    es: {
      title: "Glea-Nexo",
      organization: "RLP / LAB / 001",
      period: null,
      context: "Crecimiento reciente, con dirección hacia IA y Big Data, en contexto LAB.",
      details: ["Laboratorio de ingeniería para explorar telemetría agrícola, continuidad sin conexión y límites de fiabilidad."],
      links: [{ label: "Ver caso de Glea-Nexo ↗", href: "work/glea-nexo/" }],
    },
    en: {
      title: "Glea-Nexo",
      organization: "RLP / LAB / 001",
      period: null,
      context: "Recent growth toward AI and Big Data, in a LAB context.",
      details: ["Engineering lab for exploring agricultural telemetry, offline continuity, and reliability boundaries."],
      links: [{ label: "View Glea-Nexo case ↗", href: "en/work/glea-nexo/" }],
    },
  },
] as const;

export function getCareerRecords(locale: CareerLocale) {
  return careerChronology.map(({ es, en, ...record }) => {
    const localized = { es, en }[locale];

    return {
      ...record,
      ...localized,
      period: localized.period?.[locale] ?? null,
    };
  });
}
