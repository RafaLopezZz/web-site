import type { ProductionCaseCopy } from "./quinta-bella-case";

export const laOlaCase: Record<"es" | "en", ProductionCaseCopy> = {
  es: {
    title: "La Ola Art Gallery",
    description: "Web de una galería de arte que reúne tienda online y un calendario de exposiciones y talleres con reserva y pago. Todo se gestiona desde un mismo panel.",
    eyebrow: "RLP / PROD / 002",
    subtitle: "Tienda online y reservas de talleres y exposiciones, en una sola web.",
    stack: "Laravel 12 · MySQL · Redsys",
    sections: [
      { title: "Qué es", body: "La web de La Ola Art Gallery. Permite comprar obras y artículos, ver el portfolio de la galería y reservar plaza en exposiciones y talleres desde un calendario." },
      { title: "El reto", body: "Vender piezas con unidades limitadas y plazas contadas exige que dos personas no se queden con lo mismo, aunque paguen casi a la vez. Además, la galería debía poder gestionarlo todo sin depender de un programador." },
      { title: "Mi papel", body: "Desarrollé la web, la tienda, las reservas y el pago. El gestor de contenidos parte del CMS de la empresa, adaptado a este proyecto." },
      { title: "Resultado", body: "Desde un mismo panel se gestionan artículos, exposiciones, pedidos y reservas. Los clientes tienen su área de usuario, y el pago se hace con la pasarela Redsys." },
      { title: "Lo que aprendí", body: "Un pago correcto no garantiza que quede disponibilidad. Por eso la web vuelve a comprobarla al confirmar el cobro y, si ya no queda nada, deja el caso marcado para gestionar la devolución." },
      { title: "Detalles técnicos", body: "Laravel 12, MySQL y Redsys por redirección, con firma de notificaciones y bloqueos en la base de datos para stock y plazas. Hay pruebas de stock, de la segunda compra del último artículo y de la integración con Redsys." },
    ],
    sourcesTitle: "Fuentes del caso",
    publicSite: "Visitar La Ola Art Gallery ↗",
  },
  en: {
    title: "La Ola Art Gallery",
    description: "Website for an art gallery that combines an online shop with a calendar of exhibitions and workshops, including booking and payment. Everything is managed from one panel.",
    eyebrow: "RLP / PROD / 002",
    subtitle: "Online shop and workshop and exhibition bookings on a single website.",
    stack: "Laravel 12 · MySQL · Redsys",
    sections: [
      { title: "What it is", body: "The La Ola Art Gallery website. It lets people buy works and items, see the gallery's portfolio, and book a place at exhibitions and workshops from a calendar." },
      { title: "The challenge", body: "Selling limited pieces and limited places requires that two people do not end up with the same thing, even if they pay almost at once. The gallery also had to be able to manage everything without depending on a programmer." },
      { title: "My role", body: "I developed the website, shop, bookings, and payment. The content manager builds on the company's CMS, adapted to this project." },
      { title: "Outcome", body: "Items, exhibitions, orders, and bookings are managed from one panel. Customers have their own user area, and payment goes through the Redsys gateway." },
      { title: "What I learned", body: "A successful payment does not guarantee availability. So the site checks it again when confirming the charge and, if nothing is left, flags the case so the refund can be handled." },
      { title: "Technical details", body: "Laravel 12, MySQL, and Redsys by redirect, with signed notifications and database locks for stock and places. There are tests for stock, the second purchase of the last item, and the Redsys integration." },
    ],
    sourcesTitle: "Case sources",
    publicSite: "Visit La Ola Art Gallery ↗",
  },
};
