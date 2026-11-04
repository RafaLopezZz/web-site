export type ProductionCaseLocale = "es" | "en";

export type ProductionCaseCopy = {
  title: string;
  description: string;
  eyebrow: string;
  subtitle: string;
  stack: string;
  sections: readonly { title: string; body: string }[];
  sourcesTitle: string;
  publicSite: string;
};

export const quintaBellaCase: Record<ProductionCaseLocale, ProductionCaseCopy> = {
  es: {
    title: "Quinta Bella",
    description: "Web de un camping en Águilas (Murcia) que presenta sus parcelas y experiencias, muestra las tarifas y da acceso a la reserva.",
    eyebrow: "RLP / PROD / 003",
    subtitle: "Una web para conocer el camping, consultar precios y reservar estancia.",
    stack: "Laravel 12 · MySQL · Blade",
    sections: [
      { title: "Qué es", body: "La web de La Quinta Bella, un camping en Águilas. Presenta el lugar, sus experiencias y las tarifas de sus parcelas." },
      { title: "El reto", body: "Pasar una web sencilla a una base gestionable y añadir reservas, con el precio correcto según las noches y sin aceptar más estancias que la disponibilidad." },
      { title: "Mi papel", body: "Desarrollé la parte pública y las reservas. El gestor de contenidos parte del CMS de la empresa, adaptado a este cliente." },
      { title: "Resultado", body: "El camping gestiona sus contenidos y tarifas desde un panel, y sus clientes pueden consultar precios y empezar una reserva desde la web. El cobro online todavía no está activo." },
      { title: "Lo que aprendí", body: "Una reserva pendiente de pago también debe contar, durante un tiempo, para la disponibilidad. Si no, dos personas podrían intentar reservar el mismo hueco." },
      { title: "Detalles técnicos", body: "Laravel 12 y MySQL, con precio por noche según la duración y reservas pendientes que caducan. La integración con Redsys está desarrollada, pero aún no cobra en producción. Hay pruebas de precios y disponibilidad." },
    ],
    sourcesTitle: "Fuentes del caso",
    publicSite: "Visitar Quinta Bella ↗",
  },
  en: {
    title: "Quinta Bella",
    description: "Website for a campsite in Águilas (Murcia) that presents its pitches and experiences, shows its rates, and gives access to booking.",
    eyebrow: "RLP / PROD / 003",
    subtitle: "A website to discover the campsite, check prices, and book a stay.",
    stack: "Laravel 12 · MySQL · Blade",
    sections: [
      { title: "What it is", body: "The website of La Quinta Bella, a campsite in Águilas. It presents the place, its experiences, and its pitch rates." },
      { title: "The challenge", body: "Moving a simple website onto a manageable base and adding bookings, with the right price for the number of nights and no more stays than availability allows." },
      { title: "My role", body: "I developed the public site and the bookings. The content manager builds on the company's CMS, adapted to this client." },
      { title: "Outcome", body: "The campsite manages its content and rates from a panel, and its guests can check prices and start a booking on the website. Online payment is not active yet." },
      { title: "What I learned", body: "A booking awaiting payment must also count towards availability for a while. Otherwise two people could try to book the same slot." },
      { title: "Technical details", body: "Laravel 12 and MySQL, with a nightly price based on length of stay and pending bookings that expire. The Redsys integration is built but does not charge in production yet. There are tests for prices and availability." },
    ],
    sourcesTitle: "Case sources",
    publicSite: "Visit Quinta Bella ↗",
  },
};
