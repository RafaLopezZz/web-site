import type { ProductionCaseCopy } from "./quinta-bella-case";

export const aguilasFcCase: Record<"es" | "en", ProductionCaseCopy> = {
  es: {
    title: "Águilas FC",
    description: "Caso de producción de Águilas FC por Rafael López.",
    eyebrow: "RLP / PROD / 001",
    subtitle: "Una frontera de traducción modelo-vista para estabilizar el hero del sitio.",
    stack: "PHP · Laravel · Eloquent · Blade",
    sections: [
      {
        title: "Contexto",
        body: "El sitio oficial del Águilas FC reunía contenido de varias fuentes Eloquent en su hero. Antes, HomeController seleccionaba datos específicos y Blade mantenía ramas para Noticia, Evento y Partido, junto con diferencias de campos, rutas, fallback y presentación.",
      },
      {
        title: "Problema real",
        body: "La vista recibía decisiones propias de cada entidad. Eso hacía que añadir o ajustar una fuente exigiera coordinar selección, normalización y render en más de un lugar.",
      },
      {
        title: "Decisión técnica",
        body: "Diseñé e implementé HeroSlideResolver como una frontera enfocada de traducción modelo-vista. Recibe HeroSlide y sus fuentes Eloquent relacionadas y devuelve un readonly HeroSlideViewData con una forma estable para renderizar.",
      },
      {
        title: "Implementación y resultado",
        body: "El flujo queda HeroSlide y fuentes relacionadas → HeroSlideResolver → readonly HeroSlideViewData → componentes Blade genéricos. Centralicé comprobaciones de publicación, orden, mapeo por fuente, herencia y overrides, fallbacks, CTA opcional, resolución de media, omisión de slides inválidos y la conversión de un Partido finalizado elegible en Crónica. Blade deja de depender de la entidad concreta, sin eliminar la lógica de presentación que le corresponde.",
      },
      {
        title: "Pruebas",
        body: "Las pruebas cubren slides manuales, herencia y overrides, imagen obligatoria ausente, publicación futura, prioridad de fallback del CTA de Evento, Partido → Crónica, slides sin CTA, herencia y overrides de highlights, normalización de CTA incompleto y carga diferida o por lote de Crónica.",
      },
      {
        title: "Trade-off de ingeniería",
        body: "La capa de mapeo explícito hace visible el contrato y mantiene el render estable, pero debe evolucionar cuando cambien los modelos fuente o las necesidades de presentación del hero.",
      },
      {
        title: "Evidencia pública",
        body: "El resultado publicado y la referencia de producción están disponibles en el sitio oficial del Águilas FC.",
      },
    ],
    sourcesTitle: "Fuentes del caso",
    publicSite: "Abrir Águilas FC ↗",
  },
  en: {
    title: "Águilas FC",
    description: "Águilas FC production case by Rafael López.",
    eyebrow: "RLP / PROD / 001",
    subtitle: "A focused model-to-view boundary for a stable site hero.",
    stack: "PHP · Laravel · Eloquent · Blade",
    sections: [
      {
        title: "Context",
        body: "The official Águilas FC site brought hero content together from several Eloquent sources. Before this change, HomeController selected source-specific data while Blade kept branches for Noticia, Evento, and Partido, including field, route, fallback, and presentation differences.",
      },
      {
        title: "Real problem",
        body: "The view received decisions tied to each entity. Adding or adjusting a source therefore required coordinating selection, normalization, and rendering in more than one place.",
      },
      {
        title: "Technical decision",
        body: "I designed and implemented HeroSlideResolver as a focused model-to-view translation boundary. It receives HeroSlide and its related Eloquent sources and returns a readonly HeroSlideViewData with one stable rendering shape.",
      },
      {
        title: "Implementation and result",
        body: "The flow is HeroSlide and related sources → HeroSlideResolver → readonly HeroSlideViewData → generic Blade components. I centralized publication checks, ordering, source-specific mapping, inheritance and overrides, fallbacks, optional CTA handling, media resolution, invalid-slide omission, and eligible finalized Partido → Crónica conversion. Blade no longer depends on the concrete source entity, while retaining the presentation logic that belongs in the view.",
      },
      {
        title: "Tests",
        body: "The tests cover manual slides, inheritance and overrides, a missing required image, future publication, Evento CTA fallback priority, Partido → Crónica, CTA-less slides, highlight inheritance and overrides, incomplete CTA normalization, and lazy or batched Crónica loading.",
      },
      {
        title: "Engineering trade-off",
        body: "The explicit mapping layer makes the contract visible and keeps rendering stable, but it must evolve when source models or hero presentation requirements change.",
      },
      {
        title: "Public evidence",
        body: "The published result and production reference are available on the official Águilas FC site.",
      },
    ],
    sourcesTitle: "Case sources",
    publicSite: "Open Águilas FC ↗",
  },
};
