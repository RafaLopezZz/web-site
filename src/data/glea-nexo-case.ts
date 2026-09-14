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
    summary: "Laboratorio de ingeniería para explorar telemetría agrícola, continuidad sin conexión y límites de fiabilidad.",
    techHighlights: "Python · MQTT · Node-RED · SQLite · Spring Boot · PostgreSQL",
    action: { href: "work/glea-nexo/", label: "Ver caso →" },
  },
  en: {
    id: "lab001",
    eyebrow: "RLP / LAB / 001",
    status: "Current work",
    title: "Glea-Nexo",
    summary: "Engineering lab for exploring agricultural telemetry, offline continuity, and reliability boundaries.",
    techHighlights: "Python · MQTT · Node-RED · SQLite · Spring Boot · PostgreSQL",
    action: { href: "en/work/glea-nexo/", label: "View case →" },
  },
};

export const gleaNexoCase = {
  es: {
    title: "Glea-Nexo",
    description: "Laboratorio de ingeniería para explorar sistemas agrícolas conectados.",
    eyebrow: "RLP / LAB / 001",
    subtitle: "Laboratorio de ingeniería para explorar sistemas agrícolas conectados.",
    stack: "Python · MQTT · Node-RED · SQLite · Spring Boot · PostgreSQL · API",
    sections: [
      ["Qué estoy probando", "Trabajo actual: pruebo cómo capturar, transportar, persistir y recuperar telemetría agrícola cuando la conectividad falla. Diseñé la arquitectura y ejecuto personalmente los experimentos; presento el resultado como experimentación técnica trazable, no como una investigación académica completada."],
      ["Sistema bajo prueba", "Implementado: mi sistema bajo prueba combina un simulador Python en una Raspberry Pi 3, telemetría sintética, MQTT, Node-RED y SQLite en el borde con Spring Boot, PostgreSQL y una API. También separa el tiempo de evento del tiempo de recepción y procesamiento."],
      ["Decisiones y compensaciones", "Implementado: elegí un outbox SQLite para conservar capturas durante una interrupción y una entrega al menos una vez con deduplicación parcial por clave. Node-RED acelera la experimentación, a costa de repartir la lógica entre entornos de ejecución; PostgreSQL aporta contexto relacional, pero la escala y la retención no están medidas."],
      ["Evidencia actual", "Validado: validé un recorrido extremo a extremo controlado de MQTT → Node-RED → backend → PostgreSQL → API con datos sintéticos. También validé una acumulación sin conexión y un reprocesado exitoso después de recuperar la conexión. La deduplicación parcial por clave cubre reenvíos device/message y sensor/message; no demuestra equivalencia del contenido. El contrato distingue el tiempo de evento/recepción/procesamiento."],
      ["Límites y preguntas abiertas", "Trabajo actual: FAILED→retry→SENT, DEAD_LETTER, los fallos amplios de reprocesado y el reprocesado concurrente con nueva telemetría siguen sin validar. Límite / pregunta abierta: no presento seguridad completa, escala medida ni un conjunto de datos representativo; la evidencia está acotada al laboratorio."],
      ["Evidencia y enlaces", "Planificado: la IA/Big Data es una dirección futura central; no hay una capacidad IA/Big Data implementada hoy. Mi intención es evolucionar esta base hacia el proyecto final del curso de especialización FP en Inteligencia Artificial y Big Data, pero esa dirección todavía no ha sido aprobada, presentada ni completada. La evidencia pública se limita al repositorio y a PRs concretas: PR #4 para el recorrido extremo a extremo controlado, PR #5 para outbox/reprocesado y PR #7 para deduplicación por clave."],
    ] as const,
    source: "Ver repositorio ↗",
    blog: "PR #4 · recorrido extremo a extremo controlado ↗",
    relatedLinks: [
        { href: "https://github.com/RafaLopezZz/glea-nexo/pull/5", label: "PR #5 · outbox/reprocesado ↗" },
      { href: "https://github.com/RafaLopezZz/glea-nexo/pull/7", label: "PR #7 · deduplicación ↗" },
    ],
  },
  en: {
    title: "Glea-Nexo",
    description: "Engineering lab for exploring connected agricultural systems.",
    eyebrow: "RLP / LAB / 001",
    subtitle: "Engineering lab for exploring connected agricultural systems.",
    stack: "Python · MQTT · Node-RED · SQLite · Spring Boot · PostgreSQL · API",
    sections: [
      ["What I’m testing", "Current work: I am testing how agricultural telemetry can be captured, transported, persisted, and recovered when connectivity fails. I designed the architecture and personally run the experiments; I present the result as traceable technical experimentation, not as a completed academic research result."],
      ["System under test", "Implemented: my system under test combines a Python simulator on a Raspberry Pi 3, synthetic telemetry, MQTT, Node-RED, and SQLite at the edge with Spring Boot, PostgreSQL, and an API. It also separates event time from receive and process time."],
      ["Decisions / trade-offs", "Implemented: I chose a SQLite outbox to retain captures during an outage and at-least-once delivery with partial key-based deduplication. Node-RED accelerates experimentation at the cost of distributing logic across runtimes; PostgreSQL provides relational context, while scale and retention remain unmeasured."],
      ["Current evidence", "Validated: I validated a controlled MQTT → Node-RED → backend → PostgreSQL → API path with synthetic data. I also validated bounded offline accumulation and successful replay after connectivity recovered. Partial key-based deduplication covers device/message and sensor/message resends; it does not prove payload equivalence. The contract separates event/receive/process time."],
      ["Limits / open questions", "Current work: FAILED→retry→SENT, DEAD_LETTER, broader replay failures, and concurrent replay and new telemetry remain unvalidated. Limit / open question: I do not present complete security, measured scale, or a representative dataset; the evidence is bounded to the lab."],
      ["Evidence / links", "Planned: AI/Big Data is a central future direction; no AI/Big Data capability is implemented today. I intend to evolve this foundation into the final project for the FP specialization course in Artificial Intelligence and Big Data, but that direction is not yet approved, submitted, or completed. Public evidence is limited to the repository and selected PRs: PR #4 for the controlled E2E path, PR #5 for outbox/replay, and PR #7 for key-based deduplication."],
    ] as const,
    source: "View repository ↗",
    blog: "PR #4 · controlled E2E ↗",
    relatedLinks: [
      { href: "https://github.com/RafaLopezZz/glea-nexo/pull/5", label: "PR #5 · outbox/replay ↗" },
      { href: "https://github.com/RafaLopezZz/glea-nexo/pull/7", label: "PR #7 · deduplication ↗" },
    ],
  },
} as const;
