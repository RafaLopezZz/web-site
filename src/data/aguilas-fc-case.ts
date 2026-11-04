import type { ProductionCaseCopy } from "./quinta-bella-case";

export const aguilasFcCase: Record<"es" | "en", ProductionCaseCopy> = {
  es: {
    title: "Águilas FC",
    description: "Web oficial del club, con noticias, calendario de partidos, crónicas y patrocinadores. El contenido se publica o se programa desde un panel propio.",
    eyebrow: "RLP / PROD / 001",
    subtitle: "La web oficial de un club de fútbol, preparada para publicar contenido a diario.",
    stack: "Laravel 12 · MySQL · Blade",
    sections: [
      { title: "Qué es", body: "La web oficial del Águilas FC. Reúne noticias, calendario, partidos, crónicas, patrocinadores y un acceso a la venta de entradas." },
      { title: "El reto", body: "Un club publica contenido de muchos tipos, y la portada tiene que reflejarlo sin que cada cambio dependa de un programador." },
      { title: "Mi papel", body: "Desarrollé la nueva web. El gestor de contenidos parte del CMS de la empresa, adaptado al club." },
      { title: "Resultado", body: "El club gestiona desde un panel su contenido y lo que destaca en portada, y puede dejar publicaciones programadas. Un partido también puede enlazarse con su crónica." },
      { title: "Lo que aprendí", body: "Ordenar cómo llega cada contenido a la portada simplifica mucho la web, pero esa pieza debe evolucionar cuando cambian los contenidos o su presentación." },
      { title: "Detalles técnicos", body: "HeroSlideResolver y HeroSlideViewData unifican los datos de la portada. Una tarea de Laravel publica lo programado, y hay pruebas automáticas de portada, publicación, calendario y crónicas." },
    ],
    sourcesTitle: "Fuentes del caso",
    publicSite: "Visitar Águilas FC ↗",
  },
  en: {
    title: "Águilas FC",
    description: "The club's official website, with news, a match calendar, match reports, and sponsors. Content is published or scheduled from its own panel.",
    eyebrow: "RLP / PROD / 001",
    subtitle: "The official website of a football club, ready to publish content every day.",
    stack: "Laravel 12 · MySQL · Blade",
    sections: [
      { title: "What it is", body: "The official Águilas FC website. It brings together news, the calendar, matches, match reports, sponsors, and access to ticket sales." },
      { title: "The challenge", body: "A club publishes many kinds of content, and the home page has to reflect it without every change depending on a programmer." },
      { title: "My role", body: "I developed the new website. The content manager builds on the company's CMS, adapted to the club." },
      { title: "Outcome", body: "The club manages its content and home page highlights from a panel, and can schedule publications. A match can also link to its report." },
      { title: "What I learned", body: "Organizing how each kind of content reaches the home page greatly simplifies the site, but that piece has to evolve when the content or its presentation changes." },
      { title: "Technical details", body: "HeroSlideResolver and HeroSlideViewData unify the home page data. A Laravel task publishes scheduled content, and there are automated tests for the home page, publishing, the calendar, and match reports." },
    ],
    sourcesTitle: "Case sources",
    publicSite: "Visit Águilas FC ↗",
  },
};
