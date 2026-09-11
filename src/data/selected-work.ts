export type SelectedWorkLocale = "es" | "en";

type Action = {
  href: string;
  label: string;
  external?: boolean;
};

type WorkItem = {
  id: "work001" | "work002";
  title: "ImportadorDB" | "Cosecha en Cope";
  summary: string;
  techHighlights: string;
  facts: string;
  action: Action;
};

type ProductionItem = {
  id: "prod001" | "prod002" | "prod003";
  title: "Águilas FC" | "La Ola Art Gallery" | "Quinta Bella";
  summary: string;
  techHighlights: string;
  action?: Action;
};

export const selectedWork: Record<SelectedWorkLocale, {
  workItems: WorkItem[];
  productionItems: ProductionItem[];
}> = {
  es: {
    workItems: [{
      id: "work001",
      title: "ImportadorDB",
      summary: "Aplicación de escritorio para importar datos desde Excel a bases de datos relacionales mediante un flujo guiado de revisión, mapeo y carga.",
      techHighlights: "Java 21 · JavaFX · JDBC",
      facts: "Java 21 · JavaFX · JDBC · .xlsx / .xls · MySQL · PostgreSQL · MariaDB · Firebird",
      action: { href: "work/importador-db/", label: "Ver caso →" },
    }, {
      id: "work002",
      title: "Cosecha en Cope",
      summary: "Marketplace para productores y consumidores: catálogo, autenticación y compra.",
      techHighlights: "Java · Angular · PostgreSQL",
      facts: "Spring Boot · Spring Security · Hibernate · PostgreSQL · Angular · Thymeleaf · Swagger",
      action: { href: "work/cosecha-en-cope/", label: "Ver caso →" },
    }],
    productionItems: [{
      id: "prod001",
      title: "Águilas FC",
      summary: "Web oficial del Águilas FC.",
      techHighlights: "PHP · Laravel · Blade",
    }, {
      id: "prod002",
      title: "La Ola Art Gallery",
      summary: "Ecommerce de arte y decoración.",
      techHighlights: "Laravel · Livewire · MySQL",
      action: { href: "https://www.laolaart.com/", label: "Ver La Ola Art Gallery ↗", external: true },
    }, {
      id: "prod003",
      title: "Quinta Bella",
      summary: "Web pública y reservas para un camping rural.",
      techHighlights: "Laravel · Livewire · MySQL",
      action: { href: "production/quinta-bella/", label: "Ver Quinta Bella ↗" },
    }],
  },
  en: {
    workItems: [{
      id: "work001",
      title: "ImportadorDB",
      summary: "Desktop application for importing Excel data into relational databases through a guided review, mapping, and loading workflow.",
      techHighlights: "Java 21 · JavaFX · JDBC",
      facts: "Java 21 · JavaFX · JDBC · .xlsx / .xls · MySQL · PostgreSQL · MariaDB · Firebird",
      action: { href: "en/work/importador-db/", label: "View case →" },
    }, {
      id: "work002",
      title: "Cosecha en Cope",
      summary: "Marketplace for producers and consumers: catalog, authentication, and purchase.",
      techHighlights: "Java · Angular · PostgreSQL",
      facts: "Spring Boot · Spring Security · Hibernate · PostgreSQL · Angular · Thymeleaf · Swagger",
      action: { href: "en/work/cosecha-en-cope/", label: "View case →" },
    }],
    productionItems: [{
      id: "prod001",
      title: "Águilas FC",
      summary: "Official Águilas FC website.",
      techHighlights: "PHP · Laravel · Blade",
    }, {
      id: "prod002",
      title: "La Ola Art Gallery",
      summary: "Art and décor ecommerce.",
      techHighlights: "Laravel · Livewire · MySQL",
      action: { href: "https://www.laolaart.com/", label: "View La Ola Art Gallery ↗", external: true },
    }, {
      id: "prod003",
      title: "Quinta Bella",
      summary: "Public website and booking flow for a rural campsite.",
      techHighlights: "Laravel · Livewire · MySQL",
      action: { href: "en/production/quinta-bella/", label: "View Quinta Bella ↗" },
    }],
  },
};
