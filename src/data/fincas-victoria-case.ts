import type { ProductionCaseCopy } from "./quinta-bella-case";

export const fincasVictoriaCase: Record<"es" | "en", ProductionCaseCopy> = {
  es: {
    title: "Fincas Victoria",
    description: "Web de una inmobiliaria de Águilas (Murcia) que muestra sus inmuebles en venta y alquiler. El catálogo se actualiza a partir de un archivo externo, sin copiar los anuncios a mano.",
    eyebrow: "RLP / PROD / 004",
    subtitle: "Una web inmobiliaria con un catálogo que se actualiza a partir de un archivo externo.",
    stack: "PHP 8.3 · MariaDB · XML Kyero",
    sections: [
      { title: "Qué es", body: "La web de Fincas Victoria, una inmobiliaria de Águilas. Permite buscar pisos, chalets, obra nueva, locales, terrenos y garajes, filtrar los resultados y consultar cada inmueble." },
      { title: "El reto", body: "Los inmuebles llegan en un archivo XML con formato Kyero. Había que publicarlos sin copiarlos a mano y evitar que un archivo incorrecto estropeara el catálogo." },
      { title: "Mi papel", body: "Desarrollé toda la web, incluida la importación de inmuebles." },
      { title: "Resultado", body: "La web está publicada y su catálogo muestra los inmuebles disponibles con sus datos, filtros y páginas de resultados. Antes de importar un archivo, el sistema comprueba su origen, tamaño y formato." },
      { title: "Lo que aprendí", body: "Importar datos no es solo leerlos. Hay que decidir qué ocurre si algo falla y qué se publica. Por ejemplo, un inmueble con un bloqueo de publicación no pasa a estar disponible, y los que se ocultaron se mantienen ocultos." },
      { title: "Detalles técnicos", body: "PHP 8.3, MariaDB y PHPMailer. El XML se valida con el esquema Kyero 3.0 guardado en el proyecto, y la descarga se limita a orígenes HTTPS autorizados. Una tarea diaria lanza la sincronización, y las pruebas de publicación no necesitan una base de datos real." },
    ],
    sourcesTitle: "Fuentes del caso",
    publicSite: "Visitar Fincas Victoria ↗",
  },
  en: {
    title: "Fincas Victoria",
    description: "Website for a real estate agency in Águilas (Murcia) showing its properties for sale and rent. The catalog updates from an external file, with no listings copied by hand.",
    eyebrow: "RLP / PROD / 004",
    subtitle: "A real estate website with a catalog that updates from an external file.",
    stack: "PHP 8.3 · MariaDB · XML Kyero",
    sections: [
      { title: "What it is", body: "The website of Fincas Victoria, a real estate agency in Águilas. It lets people search flats, houses, new builds, commercial premises, land, and garages, filter results, and view each property." },
      { title: "The challenge", body: "Properties arrive in an XML file in Kyero format. They had to be published without copying them by hand, and an incorrect file must not damage the catalog." },
      { title: "My role", body: "I developed the whole website, including the property import." },
      { title: "Outcome", body: "The website is live, and its catalog shows available properties with their details, filters, and results pages. Before importing a file, the system checks its origin, size, and format." },
      { title: "What I learned", body: "Importing data is not just reading it. You have to decide what happens when something fails and what gets published. For example, a property with a publication block does not become available, and hidden ones stay hidden." },
      { title: "Technical details", body: "PHP 8.3, MariaDB, and PHPMailer. The XML is validated against the Kyero 3.0 schema stored in the project, and downloads are limited to authorized HTTPS origins. A daily task runs the sync, and the publication tests do not need a real database." },
    ],
    sourcesTitle: "Case sources",
    publicSite: "Visit Fincas Victoria ↗",
  },
};
