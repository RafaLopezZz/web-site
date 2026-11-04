export type GleaLocale = "es" | "en";

export const gleaNexoIndex: Record<GleaLocale, {
  id: "lab001";
  eyebrow: "RLP / LAB / 001";
  status: "Trabajo actual" | "Current work";
  title: "Glea-Nexo";
  summary: string;
  techHighlights: string;
  action: { href: string; label: string };
}> = {
  es: {
    id: "lab001",
    eyebrow: "RLP / LAB / 001",
    status: "Trabajo actual",
    title: "Glea-Nexo",
    summary: "Proyecto de pruebas en curso sobre cómo guardar y recuperar datos agrícolas cuando se corta la conexión. Por ahora usa datos simulados.",
    techHighlights: "Python · MQTT · Node-RED · SQLite · Spring Boot · PostgreSQL",
    action: { href: "work/glea-nexo/", label: "Ver Glea-Nexo →" },
  },
  en: {
    id: "lab001",
    eyebrow: "RLP / LAB / 001",
    status: "Current work",
    title: "Glea-Nexo",
    summary: "Ongoing testing project on how to store and recover farm data when the connection drops. It uses simulated data for now.",
    techHighlights: "Python · MQTT · Node-RED · SQLite · Spring Boot · PostgreSQL",
    action: { href: "en/work/glea-nexo/", label: "View Glea-Nexo →" },
  },
};

export const gleaNexoCase = {
  es: {
    title: "Glea-Nexo",
    description: "Proyecto de pruebas en curso sobre cómo guardar y recuperar datos agrícolas cuando se corta la conexión. Por ahora usa datos simulados.",
    eyebrow: "RLP / LAB / 001",
    subtitle: "Un laboratorio para probar qué pasa con los datos agrícolas cuando falla la conexión.",
    stack: "Python · MQTT · Node-RED · SQLite · Spring Boot · PostgreSQL · API",
    sections: [
      ["Qué es", "Un laboratorio técnico en curso, no un producto ni una investigación académica terminada. Un simulador en una Raspberry Pi genera datos agrícolas para probar cómo viajan y se guardan."],
      ["El reto", "En el campo, la conexión puede fallar. Los datos no deberían perderse ni contarse dos veces al volver a enviarlos."],
      ["Mi papel", "Diseñé la arquitectura y hago yo mismo los experimentos."],
      ["Resultado", "He comprobado con datos simulados el recorrido completo, la acumulación durante un corte y el envío posterior al recuperar la conexión. Quedan por validar varios casos de fallo, y no hay mediciones de escala."],
      ["Lo que aprendí", "Probar el caso ideal no basta. Node-RED acelera los experimentos, pero reparte la lógica en varios sitios, y detectar reenvíos no garantiza que el contenido sea idéntico."],
      ["Detalles técnicos", "Python, MQTT, Node-RED, SQLite, Spring Boot, PostgreSQL y una API, con outbox en SQLite, entrega al menos una vez y deduplicación parcial. La IA y el Big Data son una dirección futura: aún no hay nada implementado."],
    ] as const,
    source: "Ver código ↗",
    blog: "Ver prueba: recorrido completo ↗",
    relatedLinks: [
      { href: "https://github.com/RafaLopezZz/glea-nexo/pull/5", label: "Ver prueba: reenvío sin conexión ↗" },
      { href: "https://github.com/RafaLopezZz/glea-nexo/pull/7", label: "Ver prueba: duplicados ↗" },
    ],
  },
  en: {
    title: "Glea-Nexo",
    description: "Ongoing testing project on how to store and recover farm data when the connection drops. It uses simulated data for now.",
    eyebrow: "RLP / LAB / 001",
    subtitle: "A lab for testing what happens to farm data when the connection fails.",
    stack: "Python · MQTT · Node-RED · SQLite · Spring Boot · PostgreSQL · API",
    sections: [
      ["What it is", "An ongoing technical lab, not a product or a finished academic study. A simulator on a Raspberry Pi generates farm data to test how it travels and is stored."],
      ["The challenge", "In the field, the connection can fail. Data should not be lost or counted twice when it is sent again."],
      ["My role", "I designed the architecture and run the experiments myself."],
      ["Outcome", "With simulated data, I have verified the full journey, accumulation during an outage, and sending after the connection returns. Several failure cases remain to be validated, and there are no scale measurements."],
      ["What I learned", "Testing the ideal case is not enough. Node-RED speeds up experiments but spreads logic across several places, and detecting resends does not guarantee identical content."],
      ["Technical details", "Python, MQTT, Node-RED, SQLite, Spring Boot, PostgreSQL, and an API, with a SQLite outbox, at-least-once delivery, and partial deduplication. AI and Big Data are a future direction: nothing is implemented yet."],
    ] as const,
    source: "View code ↗",
    blog: "View proof: full journey ↗",
    relatedLinks: [
      { href: "https://github.com/RafaLopezZz/glea-nexo/pull/5", label: "View proof: offline resend ↗" },
      { href: "https://github.com/RafaLopezZz/glea-nexo/pull/7", label: "View proof: duplicates ↗" },
    ],
  },
} as const;
