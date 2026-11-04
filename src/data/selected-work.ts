import type { ImageMetadata } from "astro";
import aguilasImage from "../assets/projects/aguilasfc.png";
import cosechaImage from "../assets/projects/cosecha-en-cope.png";
import fincasVictoriaImage from "../assets/projects/fincas-victoria.png";
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
  id: "prod001" | "prod002" | "prod003" | "prod004";
  title: "Águilas FC" | "La Ola Art Gallery" | "Quinta Bella" | "Fincas Victoria";
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
      summary: "Programa de escritorio que pasa datos de Excel a una base de datos. Antes de cargarlos, permite revisarlos y decidir dónde va cada columna.",
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
       action: { href: "work/importador-db/", label: "Ver ImportadorDB →" },
    }, {
      id: "work002",
      category: "work",
      eyebrow: "RLP / WORK / 002",
      title: "Cosecha en Cope",
      summary: "Mi proyecto final de DAM: una tienda online donde productores agrícolas publican sus productos y los clientes hacen pedidos. Es un prototipo académico.",
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
      action: { href: "work/cosecha-en-cope/", label: "Ver Cosecha en Cope →" },
    }, {
      id: "lab001",
      category: "lab",
      eyebrow: "RLP / LAB / 001",
      title: "Glea-Nexo",
      summary: "Proyecto de pruebas en curso sobre cómo guardar y recuperar datos agrícolas cuando se corta la conexión. Por ahora usa datos simulados.",
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
       action: { href: "work/glea-nexo/", label: "Ver Glea-Nexo →" },
    }],
    productionItems: [{
      id: "prod001",
      title: "Águilas FC",
      summary: "Web oficial del club, con noticias, calendario de partidos, crónicas y patrocinadores. El contenido se publica o se programa desde un panel propio.",
      techHighlights: "Laravel 12 · MySQL · Blade",
      media: {
        image: aguilasImage,
        alt: {
          es: "Captura de la página de inicio del Águilas FC.",
          en: "Screenshot of the Águilas FC home page.",
        },
        caption: { es: "Captura del sitio público.", en: "Public site screenshot." },
      },
      action: { href: "production/aguilas-fc/", label: "Ver Águilas FC →" },
     }, {
      id: "prod002",
      title: "La Ola Art Gallery",
      summary: "Web de una galería de arte que reúne tienda online y un calendario de exposiciones y talleres con reserva y pago. Todo se gestiona desde un mismo panel.",
      techHighlights: "Laravel 12 · MySQL · Redsys",
      media: {
        image: laOlaImage,
        alt: {
          es: "Captura de la página de inicio de La Ola Art Gallery.",
          en: "Screenshot of the La Ola Art Gallery home page.",
        },
        caption: { es: "Captura del sitio público.", en: "Public site screenshot." },
      },
      action: { href: "production/la-ola-art-gallery/", label: "Ver La Ola Art Gallery →" },
     }, {
      id: "prod003",
      title: "Quinta Bella",
      summary: "Web de un camping en Águilas (Murcia) que presenta sus parcelas y experiencias, muestra las tarifas y da acceso a la reserva.",
      techHighlights: "Laravel 12 · MySQL · Blade",
      media: {
        image: quintaBellaImage,
        alt: {
          es: "Captura de la página de inicio de Quinta Bella.",
          en: "Screenshot of the Quinta Bella home page.",
        },
        caption: { es: "Captura del sitio público.", en: "Public site screenshot." },
      },
      action: { href: "production/quinta-bella/", label: "Ver Quinta Bella →" },
    }, {
      id: "prod004",
      title: "Fincas Victoria",
      summary: "Web de una inmobiliaria de Águilas (Murcia) que muestra sus inmuebles en venta y alquiler. El catálogo se actualiza a partir de un archivo externo, sin copiar los anuncios a mano.",
      techHighlights: "PHP 8.3 · MariaDB · XML Kyero",
      media: {
        image: fincasVictoriaImage,
        alt: {
          es: "Captura del catálogo de inmuebles de Fincas Victoria.",
          en: "Screenshot of the Fincas Victoria property catalog.",
        },
        caption: { es: "Captura del sitio público.", en: "Public site screenshot." },
      },
      action: { href: "production/fincas-victoria/", label: "Ver Fincas Victoria →" },
    }],
  },
  en: {
    workItems: [{
      id: "work001",
      category: "work",
      eyebrow: "RLP / WORK / 001",
      title: "ImportadorDB",
      summary: "Desktop program that moves Excel data into a database. Before loading it, you can review the data and decide where each column goes.",
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
       action: { href: "en/work/importador-db/", label: "View ImportadorDB →" },
    }, {
      id: "work002",
      category: "work",
      eyebrow: "RLP / WORK / 002",
      title: "Cosecha en Cope",
      summary: "My final DAM project: an online shop where farm producers publish their products and customers place orders. It is an academic prototype.",
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
      action: { href: "en/work/cosecha-en-cope/", label: "View Cosecha en Cope →" },
    }, {
      id: "lab001",
      category: "lab",
      eyebrow: "RLP / LAB / 001",
      title: "Glea-Nexo",
      summary: "Ongoing testing project on how to store and recover farm data when the connection drops. It uses simulated data for now.",
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
       action: { href: "en/work/glea-nexo/", label: "View Glea-Nexo →" },
    }],
    productionItems: [{
      id: "prod001",
      title: "Águilas FC",
      summary: "The club's official website, with news, a match calendar, match reports, and sponsors. Content is published or scheduled from its own panel.",
      techHighlights: "Laravel 12 · MySQL · Blade",
      media: {
        image: aguilasImage,
        alt: {
          es: "Captura de la página de inicio del Águilas FC.",
          en: "Screenshot of the Águilas FC home page.",
        },
        caption: { es: "Captura del sitio público.", en: "Public site screenshot." },
      },
      action: { href: "en/production/aguilas-fc/", label: "View Águilas FC →" },
     }, {
      id: "prod002",
      title: "La Ola Art Gallery",
      summary: "Website for an art gallery that combines an online shop with a calendar of exhibitions and workshops, including booking and payment. Everything is managed from one panel.",
      techHighlights: "Laravel 12 · MySQL · Redsys",
      media: {
        image: laOlaImage,
        alt: {
          es: "Captura de la página de inicio de La Ola Art Gallery.",
          en: "Screenshot of the La Ola Art Gallery home page.",
        },
        caption: { es: "Captura del sitio público.", en: "Public site screenshot." },
      },
      action: { href: "en/production/la-ola-art-gallery/", label: "View La Ola Art Gallery →" },
     }, {
      id: "prod003",
      title: "Quinta Bella",
      summary: "Website for a campsite in Águilas (Murcia) that presents its pitches and experiences, shows its rates, and gives access to booking.",
      techHighlights: "Laravel 12 · MySQL · Blade",
      media: {
        image: quintaBellaImage,
        alt: {
          es: "Captura de la página de inicio de Quinta Bella.",
          en: "Screenshot of the Quinta Bella home page.",
        },
        caption: { es: "Captura del sitio público.", en: "Public site screenshot." },
      },
      action: { href: "en/production/quinta-bella/", label: "View Quinta Bella →" },
    }, {
      id: "prod004",
      title: "Fincas Victoria",
      summary: "Website for a real estate agency in Águilas (Murcia) showing its properties for sale and rent. The catalog updates from an external file, with no listings copied by hand.",
      techHighlights: "PHP 8.3 · MariaDB · XML Kyero",
      media: {
        image: fincasVictoriaImage,
        alt: {
          es: "Captura del catálogo de inmuebles de Fincas Victoria.",
          en: "Screenshot of the Fincas Victoria property catalog.",
        },
        caption: { es: "Captura del sitio público.", en: "Public site screenshot." },
      },
      action: { href: "en/production/fincas-victoria/", label: "View Fincas Victoria →" },
    }],
  },
};
