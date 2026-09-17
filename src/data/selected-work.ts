import type { ImageMetadata } from "astro";
import aguilasImage from "../assets/projects/aguilasfc.png";
import cosechaImage from "../assets/projects/cosecha-en-cope.png";
import gleaNexoImage from "../assets/projects/glea-nexo.png";
import importadorDbImage from "../assets/projects/importador-db_old.png";
import laOlaImage from "../assets/projects/la-ola-art-gallery.png";
import quintaBellaImage from "../assets/projects/quintabella.png";

export type SelectedWorkLocale = "es" | "en";

type LocalizedText = { es: string; en: string };

type EvidenceMedia = {
  image: ImageMetadata;
  alt: LocalizedText;
  caption: LocalizedText;
};

type Action = {
  href: string;
  label: string;
  external?: boolean;
};

type WorkItem = {
  id: "work001" | "work002" | "lab001";
  category: "work" | "lab";
  eyebrow: string;
  title: "ImportadorDB" | "Cosecha en Cope" | "Glea-Nexo";
  summary: string;
  techHighlights: string;
  facts?: string;
  showMediaSlot: boolean;
  media?: EvidenceMedia;
  action: Action;
};

type ProductionItem = {
  id: "prod001" | "prod002" | "prod003";
  title: "Águilas FC" | "La Ola Art Gallery" | "Quinta Bella";
  summary: string;
  techHighlights: string;
  media: EvidenceMedia;
  action?: Action;
};

export const selectedWork: Record<SelectedWorkLocale, {
  workItems: WorkItem[];
  productionItems: ProductionItem[];
}> = {
  es: {
    workItems: [{
      id: "work001",
      category: "work",
      eyebrow: "RLP / WORK / 001",
      title: "ImportadorDB",
      summary: "Aplicación de escritorio para importar datos desde Excel a bases de datos relacionales mediante un flujo guiado de revisión, mapeo y carga.",
      techHighlights: "Java 21 · JavaFX · JDBC",
       facts: "Java 21 · JavaFX · JDBC · .xlsx / .xls · MySQL · PostgreSQL · MariaDB · Firebird",
       showMediaSlot: true,
       media: {
         image: importadorDbImage,
         alt: {
           es: "Captura de ImportadorDB con selección de MySQL, opciones de importación y datos de demostración",
           en: "ImportadorDB screenshot showing MySQL selection, import options, and demonstration data",
         },
         caption: { es: "Captura documental de la interfaz con datos de demostración no sensibles.", en: "Documentary interface screenshot with non-sensitive demonstration data." },
       },
       action: { href: "work/importador-db/", label: "Ver caso →" },
    }, {
      id: "work002",
      category: "work",
      eyebrow: "RLP / WORK / 002",
      title: "Cosecha en Cope",
      summary: "Marketplace para productores y consumidores: catálogo, autenticación y compra.",
      techHighlights: "Java · Angular · PostgreSQL",
      facts: "Spring Boot · Spring Security · Hibernate · PostgreSQL · Angular · Thymeleaf · Swagger",
      showMediaSlot: true,
      media: {
        image: cosechaImage,
        alt: {
          es: "Captura de la portada de Cosecha en Cope sobre un paisaje costero.",
          en: "Cosecha en Cope project cover over a coastal landscape.",
        },
        caption: { es: "Portada del proyecto.", en: "Project cover." },
      },
      action: { href: "work/cosecha-en-cope/", label: "Ver caso →" },
    }, {
      id: "lab001",
      category: "lab",
      eyebrow: "RLP / LAB / 001",
      title: "Glea-Nexo",
      summary: "Laboratorio de ingeniería para explorar telemetría agrícola, continuidad sin conexión y límites de fiabilidad.",
       techHighlights: "Python · MQTT · Node-RED · SQLite · Spring Boot · PostgreSQL",
       showMediaSlot: true,
       media: {
         image: gleaNexoImage,
         alt: {
           es: "Flujo de Node-RED de Glea-Nexo que conecta MQTT con el almacenamiento y la respuesta del backend",
           en: "Glea-Nexo Node-RED flow connecting MQTT with storage and the backend response",
         },
         caption: { es: "Flujo técnico documentado del laboratorio.", en: "Documented technical flow from the lab." },
       },
       action: { href: "work/glea-nexo/", label: "Ver caso →" },
    }],
    productionItems: [{
      id: "prod001",
      title: "Águilas FC",
      summary: "Web oficial del Águilas FC.",
      techHighlights: "PHP · Laravel · Blade",
      media: {
        image: aguilasImage,
        alt: {
          es: "Captura de la página de inicio del Águilas FC.",
          en: "Screenshot of the Águilas FC home page.",
        },
        caption: { es: "Captura del sitio público.", en: "Public site screenshot." },
      },
      action: { href: "production/aguilas-fc/", label: "Ver Águilas FC ↗" },
     }, {
      id: "prod002",
      title: "La Ola Art Gallery",
      summary: "Ecommerce de arte y decoración.",
      techHighlights: "Laravel · Livewire · MySQL",
      media: {
        image: laOlaImage,
        alt: {
          es: "Captura de la página de inicio de La Ola Art Gallery.",
          en: "Screenshot of the La Ola Art Gallery home page.",
        },
        caption: { es: "Captura del sitio público.", en: "Public site screenshot." },
      },
      action: { href: "https://www.laolaart.com/", label: "Ver La Ola Art Gallery ↗", external: true },
     }, {
      id: "prod003",
      title: "Quinta Bella",
      summary: "Web pública y reservas para un camping rural.",
      techHighlights: "Laravel · Livewire · MySQL",
      media: {
        image: quintaBellaImage,
        alt: {
          es: "Captura de la página de inicio de Quinta Bella.",
          en: "Screenshot of the Quinta Bella home page.",
        },
        caption: { es: "Captura del sitio público.", en: "Public site screenshot." },
      },
      action: { href: "production/quinta-bella/", label: "Ver Quinta Bella ↗" },
    }],
  },
  en: {
    workItems: [{
      id: "work001",
      category: "work",
      eyebrow: "RLP / WORK / 001",
      title: "ImportadorDB",
      summary: "Desktop application for importing Excel data into relational databases through a guided review, mapping, and loading workflow.",
      techHighlights: "Java 21 · JavaFX · JDBC",
       facts: "Java 21 · JavaFX · JDBC · .xlsx / .xls · MySQL · PostgreSQL · MariaDB · Firebird",
       showMediaSlot: true,
       media: {
         image: importadorDbImage,
         alt: {
           es: "Captura de ImportadorDB con selección de MySQL, opciones de importación y datos de demostración",
           en: "ImportadorDB screenshot showing MySQL selection, import options, and demonstration data",
         },
         caption: { es: "Captura documental de la interfaz con datos de demostración no sensibles.", en: "Documentary interface screenshot with non-sensitive demonstration data." },
       },
       action: { href: "en/work/importador-db/", label: "View case →" },
    }, {
      id: "work002",
      category: "work",
      eyebrow: "RLP / WORK / 002",
      title: "Cosecha en Cope",
      summary: "Marketplace for producers and consumers: catalog, authentication, and purchase.",
      techHighlights: "Java · Angular · PostgreSQL",
      facts: "Spring Boot · Spring Security · Hibernate · PostgreSQL · Angular · Thymeleaf · Swagger",
      showMediaSlot: true,
      media: {
        image: cosechaImage,
        alt: {
          es: "Captura de la portada de Cosecha en Cope sobre un paisaje costero.",
          en: "Cosecha en Cope project cover over a coastal landscape.",
        },
        caption: { es: "Portada del proyecto.", en: "Project cover." },
      },
      action: { href: "en/work/cosecha-en-cope/", label: "View case →" },
    }, {
      id: "lab001",
      category: "lab",
      eyebrow: "RLP / LAB / 001",
      title: "Glea-Nexo",
      summary: "Engineering lab for exploring agricultural telemetry, offline continuity, and reliability boundaries.",
       techHighlights: "Python · MQTT · Node-RED · SQLite · Spring Boot · PostgreSQL",
       showMediaSlot: true,
       media: {
         image: gleaNexoImage,
         alt: {
           es: "Flujo de Node-RED de Glea-Nexo que conecta MQTT con el almacenamiento y la respuesta del backend",
           en: "Glea-Nexo Node-RED flow connecting MQTT with storage and the backend response",
         },
         caption: { es: "Flujo técnico documentado del laboratorio.", en: "Documented technical flow from the lab." },
       },
       action: { href: "en/work/glea-nexo/", label: "View case →" },
    }],
    productionItems: [{
      id: "prod001",
      title: "Águilas FC",
      summary: "Official Águilas FC website.",
      techHighlights: "PHP · Laravel · Blade",
      media: {
        image: aguilasImage,
        alt: {
          es: "Captura de la página de inicio del Águilas FC.",
          en: "Screenshot of the Águilas FC home page.",
        },
        caption: { es: "Captura del sitio público.", en: "Public site screenshot." },
      },
      action: { href: "en/production/aguilas-fc/", label: "View Águilas FC ↗" },
     }, {
      id: "prod002",
      title: "La Ola Art Gallery",
      summary: "Art and décor ecommerce.",
      techHighlights: "Laravel · Livewire · MySQL",
      media: {
        image: laOlaImage,
        alt: {
          es: "Captura de la página de inicio de La Ola Art Gallery.",
          en: "Screenshot of the La Ola Art Gallery home page.",
        },
        caption: { es: "Captura del sitio público.", en: "Public site screenshot." },
      },
      action: { href: "https://www.laolaart.com/", label: "View La Ola Art Gallery ↗", external: true },
     }, {
      id: "prod003",
      title: "Quinta Bella",
      summary: "Public website and booking flow for a rural campsite.",
      techHighlights: "Laravel · Livewire · MySQL",
      media: {
        image: quintaBellaImage,
        alt: {
          es: "Captura de la página de inicio de Quinta Bella.",
          en: "Screenshot of the Quinta Bella home page.",
        },
        caption: { es: "Captura del sitio público.", en: "Public site screenshot." },
      },
      action: { href: "en/production/quinta-bella/", label: "View Quinta Bella ↗" },
    }],
  },
};
