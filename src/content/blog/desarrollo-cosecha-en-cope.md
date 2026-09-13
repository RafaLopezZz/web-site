---
title: "Cosecha en Cope: Documentando el proceso"
excerpt: "Así desarrollé mi proyecto final de DAM: un prototipo académico full-stack con Java 17, Spring Boot 3.5.2, Angular 20, PostgreSQL y AWS S3."
date: "2026-03-15"
cover: "./images/cosecha-en-cope.png"
coverAlt: "Portada del proyecto Cosecha en Cope, un marketplace agrícola"
tags:
  - "Marketplace agrícola"
  - "Spring Boot"
  - "Angular"
  - "PostgreSQL"
  - "AWS S3"
  - "Desarrollo fullstack"
  - "Arquitectura híbrida"
  - "Modelo de pedidos"
  - "Proyecto académico"
gallery:
  - image: "./images/cosechaencope_arquitectura.png"
    alt: "Arquitectura híbrida de Cosecha en Cope"
    caption: "Arquitectura híbrida del proyecto"
---

## Cosecha en Cope: cómo desarrollé mi proyecto final de DAM

Cosecha en Cope fue mi proyecto final de DAM, presentado y aprobado. Lo diseñé y desarrollé desde cero como un prototipo académico full-stack de marketplace agrícola. En este artículo conservo el recorrido técnico con el foco puesto en tres decisiones: separar el renderizado público de la aplicación, representar un pedido para varios productores y distinguir la autenticación de la autorización.

[Ver el caso de Cosecha en Cope →](/web-site/work/cosecha-en-cope/)

## El punto de partida

El dominio debía cubrir un catálogo de artículos agrícolas, productores, clientes, carrito y pedidos. No quería que el pedido perdiera su unidad cuando reuniera artículos de más de un productor, pero cada productor necesitaba reconocer su propia parte de la operación. Esa tensión definió buena parte del modelo y de los servicios.

Mi trabajo no consistió solo en escribir clases. Preparé diagramas de flujo, arquitectura, patrones y casos de uso; después llevé esas decisiones a la lógica de negocio, los endpoints y las interfaces. Documentar el proceso me ayudó a explicar por qué cada parte existía y qué límites conservaba.

## La decisión más importante: una arquitectura híbrida SSR + SPA

La decisión central fue combinar dos formas de renderizado. Las páginas públicas se sirven con Spring Boot y Thymeleaf, mientras que la aplicación Angular 20 queda bajo `/app`. Así mantuve una frontera clara entre el recorrido informativo del sitio y el área de interacción continua.

Esta separación tiene un coste: hay dos modelos de navegación, una configuración de build y una coordinación de rutas. A cambio, la aplicación conserva páginas públicas sencillas y una interfaz Angular para autenticación, carrito, checkout y paneles. No presento esta decisión como una métrica de posicionamiento; la explico como una elección de arquitectura y de experiencia.

El diagrama de arquitectura que acompaña al artículo representa esa relación entre Spring Boot, Thymeleaf, Angular y la API. Es una pieza documental de la solución, no una promesa sobre un entorno distinto del proyecto académico.

## Backend y persistencia

El backend está construido con Java 17 y Spring Boot 3.5.2, con JPA/Hibernate y PostgreSQL. Organicé la implementación por controladores, servicios y repositorios, manteniendo la lógica del dominio fuera de las vistas. OpenAPI/Swagger documenta la API y Actuator forma parte de la configuración disponible.

La elección relacional encaja con las relaciones entre cliente, productor, artículo, carrito, pedido, detalle y orden específica. También deja visibles los costes que debo vigilar: límites transaccionales, carga perezosa, serialización y consistencia entre operaciones relacionadas.

## El modelo de pedidos por productor

El reto más interesante apareció en el checkout. Un cliente puede reunir artículos de varios productores en un único carrito. Al confirmar, el sistema conserva el pedido del cliente y lo descompone en **órdenes específicas por productor**.

Este diseño permite que el cliente mantenga una visión global, mientras cada productor trabaja con su parte. La decisión se refleja en las entidades del dominio y en la lógica de creación. También introduce una responsabilidad importante: la transacción debe mantener coherentes el pedido global, sus detalles y las órdenes derivadas.

No lo describo como una abstracción genérica para cualquier marketplace. Es el modelo que necesitaba este proyecto y el que puedo defender recorriendo un carrito con artículos de dos productores desde la confirmación hasta sus órdenes específicas.

## JWT: autenticación no es autorización

Implementé la capacidad de autenticación con JWT. El token permite reconocer una sesión, pero eso no significa que la autorización esté resuelta de forma completa en todos los recorridos.

Esa diferencia es parte del aprendizaje que quiero dejar explícito. Los guards del cliente pueden ordenar la navegación, pero las restricciones relevantes también necesitan enforcement en el servidor. Por eso no presento Cosecha en Cope como una aplicación con autorización robusta: el estado documentado conserva límites que deben evaluarse endpoint por endpoint y método por método.

## Imágenes con AWS S3

Integré AWS S3 para el ciclo de vida de las imágenes. La validación que puedo afirmar es concreta: realicé manualmente operaciones de subida y borrado y comprobé ese recorrido.

Esto acredita una integración implementada y operaciones manuales observadas. No lo convierto en una afirmación sobre disponibilidad, operación continua o comportamiento ante todos los fallos. Entre los puntos que requieren atención quedan las credenciales, los permisos, los objetos huérfanos y la consistencia entre S3 y la base de datos.

## Qué evidencia conserva el proyecto

El repositorio conserva código de backend y frontend, configuración, modelos, servicios, controladores y pruebas. Hay pruebas en varias capas, incluyendo backend, Angular y Cypress. Las pruebas muestran escenarios que fueron considerados; su presencia no equivale por sí sola a una validación general del proyecto.

Esta distinción es importante en un caso técnico. Puedo señalar qué comportamiento intenta cubrir cada prueba, pero no debo convertir la existencia de archivos en una afirmación más amplia. La evidencia útil es la que puedo asociar a una ruta, una decisión y un límite.

## Lo que aprendí

Este proyecto me enseñó tres cosas que siguen siendo centrales en mi forma de trabajar. Primero, una arquitectura híbrida exige declarar con precisión quién renderiza cada ruta y cómo se entrega la aplicación Angular bajo `/app`. Segundo, un pedido con artículos de varios productores necesita un modelo explícito de órdenes específicas, no solo una lista plana de líneas. Tercero, JWT no resuelve por sí solo la autorización: identificar una sesión y hacer cumplir permisos son responsabilidades distintas.

También aprendí a leer la evidencia con más cuidado. Una integración implementada no es automáticamente una integración operada en cualquier contexto; una prueba escrita no equivale por sí sola a una validación general; y una configuración no es automáticamente un resultado medido.

## Cierre

Cosecha en Cope resume mi trabajo académico de full-stack alrededor de un dominio concreto. Lo valioso del caso no es enumerar tecnologías, sino explicar cómo conecté Thymeleaf y Angular, cómo convertí un pedido global en órdenes específicas por productor y cómo reconozco los límites de la autenticación JWT frente a la autorización.

El proyecto fue presentado y aprobado como mi entrega final de DAM. En este artículo dejo el contexto histórico con más profundidad; el [caso de trabajo resume las decisiones y la evidencia principal](/web-site/work/cosecha-en-cope/).

## Tecnologías utilizadas

- **Java 17**
- **Spring Boot 3.5.2**
- **JPA/Hibernate**
- **PostgreSQL**
- **Thymeleaf**
- **Angular 20**
- **AWS S3**
- **OpenAPI/Swagger**
- **Actuator**
- **Pruebas backend, Angular y Cypress**

[Ver el repositorio en GitHub](https://github.com/RafaLopezZz/CosechaEnCope)
