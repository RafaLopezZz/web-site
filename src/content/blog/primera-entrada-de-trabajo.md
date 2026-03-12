---
title: "Primera entrada de trabajo"
excerpt: "Cómo planteo un portfolio estático que documenta decisiones, evolución visual y entregas reales sin añadir complejidad innecesaria."
date: "2026-03-10"
cover: "./images/blog-cover-01.jpg"
coverAlt: "Portada abstracta del artículo sobre proceso de trabajo"
tags:
  - "Astro"
  - "Frontend"
  - "Proceso"
gallery:
  - image: "./images/blog-gallery-01.jpg"
    alt: "Visual abstracto sobre arquitectura inicial"
    caption: "La primera iteración sirve para fijar estructura, jerarquía visual y tono editorial."
  - image: "./images/blog-gallery-02.jpg"
    alt: "Visual abstracto sobre refinamiento de interfaz"
    caption: "La segunda pasada ajusta ritmo, lectura, contraste y consistencia entre bloques."
---

Un blog útil no necesita un stack complejo. Necesita una estructura clara, un flujo de edición simple y una presentación que acompañe el contenido en lugar de competir con él.

En este proyecto he dejado el blog conectado a `astro:content`, de modo que cada entrada vive como un archivo independiente en `src/content/blog/`. Eso permite versionar el contenido junto al código y mantener un flujo de publicación muy directo.

Para crear una nueva entrada puedes duplicar este archivo, cambiar el `slug`, actualizar metadatos y asociar imágenes locales. La portada se renderiza optimizada con `Image`, y además puedes añadir una galería desde el frontmatter sin tocar componentes.

Esta base también deja margen para evolucionar más adelante con categorías, lectura estimada, drafts o paginación, pero sin introducir ahora dependencias ni complejidad que no aportan valor inmediato.
