export type ProductionCaseLocale = "es" | "en";

export type ProductionCaseCopy = {
  title: string;
  description: string;
  eyebrow: string;
  subtitle: string;
  stack: string;
  sections: readonly { title: string; body: string }[];
  sourcesTitle: string;
  repository: string;
  publicSite: string;
};

export const quintaBellaCase: Record<ProductionCaseLocale, ProductionCaseCopy> = {
  es: {
    title: "Quinta Bella",
    description: "Caso de producción de Quinta Bella por Rafael López.",
    eyebrow: "RLP / PROD / 003",
    subtitle: "Web y reservas desarrolladas desde cero sobre el CMS corporativo LC-Cloud.",
    stack: "Laravel 12 · Livewire · MySQL · Tailwind CSS",
    sections: [
      { title: "Contexto", body: "Quinta Bella necesitaba una presencia pública para presentar el camping, sus experiencias y la estancia." },
      { title: "Reto", body: "Unificar contenido público, tarifas y una entrada a reservas sin exponer la gestión interna." },
      { title: "Ingeniería", body: "Adapté LC-Cloud y desarrollé el sitio en Laravel con Livewire. El repositorio documenta rutas públicas, administración protegida y pruebas para precios, disponibilidad y reservas." },
      { title: "Resultado", body: "El sitio público presenta el alojamiento, sus experiencias, tarifas y acceso a la reserva." },
      { title: "Aprendizaje", body: "La adaptación del CMS permitió conservar una base corporativa y concentrar la lógica específica de reservas en el producto." },
      { title: "Hablemos", body: "Disponible para conversar sobre productos web con contenido gestionable y flujos de reserva." },
      { title: "Evidencia", body: "Repositorio público, pruebas de flujo y sitio publicado. No se muestran administración, datos reales ni checkout." },
    ],
    sourcesTitle: "Fuentes del caso",
    repository: "Repositorio público ↗",
    publicSite: "Sitio público ↗",
  },
  en: {
    title: "Quinta Bella",
    description: "Quinta Bella production case by Rafael López.",
    eyebrow: "RLP / PROD / 003",
    subtitle: "Website and booking flow built from scratch on the LC-Cloud corporate CMS.",
    stack: "Laravel 12 · Livewire · MySQL · Tailwind CSS",
    sections: [
      { title: "Context", body: "Quinta Bella needed a public presence to present the campsite, its experiences, and stays." },
      { title: "Challenge", body: "Bring public content, pricing, and a booking entry point together without exposing internal management." },
      { title: "Engineering", body: "I adapted LC-Cloud and built the site with Laravel and Livewire. The repository documents public routes, protected administration, and tests for pricing, availability, and bookings." },
      { title: "Outcome", body: "The public site presents accommodation, experiences, pricing, and access to booking." },
      { title: "Learning", body: "Adapting the CMS retained a corporate base while keeping booking-specific logic within the product." },
      { title: "Discuss", body: "Available to discuss web products with managed content and booking flows." },
      { title: "Evidence", body: "Public repository, flow tests, and live site. No administration, real data, or checkout is shown." },
    ],
    sourcesTitle: "Case sources",
    repository: "Public repository ↗",
    publicSite: "Public site ↗",
  },
};
