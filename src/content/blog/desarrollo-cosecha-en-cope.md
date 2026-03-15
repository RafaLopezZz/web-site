---
title: "Cosecha en Cope: Documentando el proceso"
excerpt: "Así desarrollé Cosecha en Cope, un marketplace agrícola B2B2C con Spring Boot, Angular, PostgreSQL y AWS S3, resolviendo retos reales de arquitectura, SEO, seguridad y escalabilidad."
date: "2026-03-15"
cover: "./images/cosecha-en-cope.png"
coverAlt: "Portada del proyecto Cosecha en Cope, un marketplace agrícola"
tags:
  - "Marketplace agrícola"
  - "Spring Boot"
  - "Angular"
  - "PostgreSQL"
  - "AWS S3"
  - "SEO técnico"
  - "Desarrollo fullstack"
  - "Arquitectura híbrida"
  - "Proyecto web"
  - "Caso de estudio"
gallery:
  - image: "./images/cosechaencope_arquitectura.png"
    alt: "Arquitectura híbrida de Cosecha en Cope"
    caption: "Arquitectura Cosecha en Cope"
  - image: "./images/cosechaencope_ER.png"
    alt: "Modelo entidad-relación de la base de datos de Cosecha en Cope"
    caption: "Modelo entidad-relación de la base de datos de Cosecha en Cope"
---

## Cosecha en Cope: cómo desarrollé un marketplace agrícola pensado para productores, distribuidores y consumidor final

Hay proyectos que nacen para practicar, otros para aprobar el Proyecto fin de curso, y hay otros que además intentan responder a un problema real. **Cosecha en Cope** pertenece a ese tercer grupo.

Este proyecto surge como una propuesta de **marketplace agrícola B2B2C** centrado en productos de proximidad, con una idea muy clara desde el principio: construir una plataforma capaz de conectar **productores locales, distribuidores y consumidores finales** en un mismo entorno digital, sin perder de vista tres pilares fundamentales: **usabilidad, visibilidad online y escalabilidad técnica**.

Pero detrás de esa idea había un reto mucho mayor de lo que puede parecer a simple vista. No se trataba solo de montar una tienda online. El verdadero desafío era diseñar una solución que respondiera a necesidades distintas, con una arquitectura sólida y preparada para crecer.

## El problema real: vender producto agrícola en internet no es solo publicar artículos

Uno de los puntos de partida de **Cosecha en Cope** fue entender bien el problema que quería resolver.

Muchos pequeños productores agrícolas siguen dependiendo de intermediarios para vender su producto. Eso reduce márgenes, dificulta el control sobre la comercialización y, en muchos casos, limita su presencia en mercados digitales. A eso se suma otro obstáculo importante: la gestión técnica.

No todo productor necesita ni puede mantener una solución compleja para vender online. Por eso el proyecto tenía que hacer algo más que mostrar productos. Tenía que ofrecer una experiencia clara para varios perfiles a la vez:

- El **cliente final** que quiere comprar producto local de forma sencilla.
- El **productor** que necesita gestionar catálogo, pedidos e imágenes sin fricción.
- El posible **distribuidor** o comprador profesional que requiere una estructura más robusta.
- Y, además, un sistema interno capaz de dividir correctamente la operativa cuando en un mismo pedido participan varios productores.

Ahí es donde el proyecto empezó a adquirir profundidad.

## El objetivo del proyecto: un marketplace agrícola fullstack útil, escalable y bien planteado

La meta no era solo construir una aplicación funcional, sino desarrollar una solución web completa que resolviera problemas reales de negocio y, al mismo tiempo, sirviera como proyecto técnico serio.

**Cosecha en Cope** se planteó como una plataforma fullstack con:

- **Backend en Spring Boot**
- **Frontend SPA en Angular**
- **Base de datos PostgreSQL**
- **Almacenamiento de imágenes en AWS S3**
- **Autenticación y autorización con JWT**
- **Documentación de API con Swagger/OpenAPI**
- **Testing end to end con Cypress**

A nivel funcional, el proyecto debía cubrir una serie de flujos clave: autenticación, catálogo, carrito, checkout, gestión de artículos, segmentación por productor y generación automática de órdenes derivadas.

## El gran reto técnico: no era una tienda online simple

Uno de los mayores aciertos del proyecto fue asumir desde el principio que esto no era un ecommerce básico.

En una tienda convencional, un pedido suele pertenecer a un único flujo comercial. Aquí no. En **Cosecha en Cope**, un mismo pedido podía incluir productos de diferentes productores. Eso obligaba a diseñar una lógica de negocio más elaborada, especialmente en el momento de confirmar compras y repartir la operación.

De ahí nace uno de los elementos más interesantes del proyecto: las **OVP u órdenes de venta por productor**.

Cuando un cliente realiza un pedido, el sistema no solo guarda la compra global. También genera automáticamente órdenes independientes para cada productor implicado. Esto permite mantener una visión unificada para el cliente, pero una gestión fragmentada y clara para cada vendedor.

Este punto, que a nivel de usuario puede parecer invisible, fue uno de los desafíos más importantes del desarrollo, porque afecta a la estructura de datos, a la lógica de negocio y a cómo se interpreta cada pedido dentro del sistema.

## La decisión más importante: una arquitectura híbrida SSR + SPA

Uno de los aspectos más interesantes del proyecto fue la elección de arquitectura.

En lugar de optar por una SPA pura o por un enfoque completamente renderizado en servidor, decidí construir una **arquitectura híbrida SSR + SPA**.

La idea era sencilla en concepto, pero exigente en ejecución:

- Las **landings públicas** debían estar optimizadas para SEO.
- La **aplicación privada y autenticada** debía ofrecer una experiencia más fluida, reactiva y moderna.

Por eso el proyecto combina:

- **Thymeleaf y Spring Boot** para las páginas públicas orientadas a indexación.
- **Angular 20** para la parte de aplicación, especialmente donde hay interacción continua, autenticación, gestión de carrito, paneles de usuario y dashboards de productor.

Esta decisión respondió a una necesidad real: conseguir **visibilidad en buscadores sin sacrificar la experiencia de uso**.

En proyectos de catálogo, productos y contenidos públicos, el SEO importa. Y mucho. Pero en áreas autenticadas, donde el usuario trabaja dentro de la plataforma, la prioridad pasa a ser la agilidad y la interacción. La arquitectura híbrida permitió equilibrar ambos mundos.

## SEO técnico en un proyecto real: visibilidad sin renunciar a UX

El SEO no se trató como un añadido decorativo, sino como una parte estructural del proyecto.

Al trabajar con un **marketplace agrícola**, la capacidad de posicionar páginas públicas como categorías, páginas informativas o landings de acceso podía marcar una gran diferencia. Por eso el uso de renderizado del lado del servidor en las secciones públicas fue una decisión estratégica.

Esto permitió:

- Mejorar la **indexación por parte de buscadores**
- Ofrecer páginas públicas más claras y accesibles
- Separar el contenido orientado a captación del entorno de aplicación
- Mantener una base técnica más coherente entre posicionamiento y navegación

En términos de desarrollo, esto supuso pensar la plataforma en dos ritmos distintos: el de la visibilidad y el de la operativa.

## Backend con Spring Boot: estructura, seguridad y lógica de negocio

El backend del proyecto se desarrolló con **Java 17 y Spring Boot 3**, apoyándose en una arquitectura por capas con controladores, servicios, repositorios, DTOs y configuración específica para seguridad, almacenamiento y documentación.

Más allá del stack, el reto estuvo en que el backend debía actuar como núcleo real del sistema. No solo tenía que exponer endpoints REST, sino también garantizar reglas de negocio importantes:

- Gestión de usuarios según tipo y rol
- Relación entre cliente, productor y pedidos
- Cálculo de subtotales, IVA, gastos de envío y total
- División automática del pedido por productor
- Integración con almacenamiento de imágenes
- Protección de rutas y recursos mediante JWT

La parte de seguridad se resolvió con **Spring Security y autenticación JWT**, diferenciando roles como `CLIENTE`, `PRODUCTOR` y `ADMIN`. Esto permitió construir una aplicación donde cada perfil accede solo a las áreas y acciones que le corresponden.

## Frontend con Angular: una SPA orientada a flujo y organización

La aplicación SPA se desarrolló con **Angular 20, TypeScript, RxJS y Bootstrap**, con una estructura pensada para separar bien responsabilidades y facilitar el crecimiento del proyecto.

El frontend tenía un reto claro: soportar perfiles distintos dentro de una misma aplicación sin que todo acabara siendo difícil de mantener. Por eso se organizó por áreas funcionales, con bloques como:

- autenticación,
- artículos,
- carrito,
- checkout,
- panel de cliente,
- dashboard de productor,
- gestión de categorías,
- órdenes de venta.

Esta separación fue importante no solo a nivel técnico, sino también a nivel mental. Cuando un proyecto empieza a tener varios actores y varios flujos, la organización deja de ser un detalle y pasa a ser una necesidad.

Además, se implementaron **guards de autenticación y rol**, lo que refuerza la coherencia entre frontend y backend en el control de acceso.

## Modelo de datos: cuando el dominio obliga a pensar bien antes de programar

Otro de los puntos fuertes del proyecto fue el diseño del modelo de datos.

La base de datos, montada sobre **PostgreSQL**, no podía limitarse a guardar usuarios, artículos y pedidos de manera plana. La lógica del proyecto exigía relaciones más ricas entre entidades como:

- usuario,
- cliente,
- productor,
- carrito,
- detalle de carrito,
- pedido,
- detalle de pedido,
- artículo,
- categoría,
- orden de venta por productor,
- detalle de OVP.

Diseñar este modelo fue una parte clave del desarrollo, porque muchas de las decisiones posteriores dependen de él. Si la estructura de datos no representa bien el dominio, la lógica de negocio se complica, aparecen parches y el sistema pierde claridad.

En **Cosecha en Cope**, el modelo tenía que ser capaz de sostener tanto el flujo comercial como la segmentación operativa por productor. Ese equilibrio fue uno de los aprendizajes más valiosos del proyecto.

## Gestión de imágenes en AWS S3: preparar el sistema para un escenario real

En cualquier marketplace, las imágenes importan. Pero en un marketplace agrícola, todavía más. El producto entra por la vista, y la calidad con la que se presenta afecta directamente a la percepción del usuario.

Por eso se optó por integrar **AWS S3** como sistema de almacenamiento para imágenes, con una estructura organizada por productor. Esta decisión evitaba depender del sistema de archivos local y acercaba el proyecto a una solución más realista y escalable.

No era solo una mejora técnica. También era una forma de preparar el sistema para un crecimiento más natural, pensando desde el inicio en cómo se comportaría fuera de un entorno puramente local o académico.

## Testing end to end: validar lo importante de verdad

Un proyecto de este tipo no se sostiene solo con que “funcione en mi máquina”. Por eso se incorporaron **tests E2E con Cypress**, centrados en uno de los flujos más sensibles de toda la aplicación: el proceso de compra.

Este tipo de validación aporta mucho valor porque comprueba el sistema desde una perspectiva más cercana al usuario real. No se limita a verificar métodos aislados, sino que revisa el comportamiento completo del flujo:

- login,
- navegación,
- añadir productos al carrito,
- pasar por checkout,
- confirmar pedido.

Cuando trabajas con autenticación, carrito, pedidos y lógica de segmentación, tener automatizados los recorridos críticos ayuda a detectar errores donde más duele: en las partes que sostienen la experiencia principal.

## La dificultad real del proyecto: coordinar negocio, arquitectura y experiencia de usuario

Si tuviera que resumir la dificultad de **Cosecha en Cope**, no diría que estuvo en usar Spring Boot, Angular o PostgreSQL por separado. La verdadera complejidad estuvo en hacer que todo encajara con sentido.

Este proyecto me obligó a trabajar varios planos a la vez:

- el **plano funcional**, para que el marketplace tuviera lógica real;
- el **plano técnico**, para construir una arquitectura mantenible;
- el **plano de visibilidad**, para no dejar el SEO fuera;
- y el **plano de experiencia de usuario**, para que la aplicación siguiera siendo utilizable.

Ese equilibrio fue, seguramente, el mayor reto del proyecto.

Porque una cosa es desarrollar una funcionalidad. Otra muy distinta es desarrollar una plataforma en la que varias funcionalidades conviven, se condicionan entre sí y deben responder a usuarios distintos.

## Lo que demuestra este proyecto

**Cosecha en Cope** no es solo un ejercicio de desarrollo fullstack. Es también una demostración de cómo abordar un problema con criterio técnico y visión de producto.

A nivel práctico, el proyecto refleja experiencia en:

- **desarrollo fullstack con Java y Angular**,
- **diseño de arquitectura híbrida SSR + SPA**,
- **modelado de datos relacional**,
- **seguridad con JWT y control de roles**,
- **integración con AWS S3**,
- **testing end to end**,
- **documentación API con Swagger/OpenAPI**,
- y construcción de una base pensada para seguir creciendo.

Pero, sobre todo, demuestra algo importante: que detrás del código hubo decisiones razonadas.

## Conclusión: construir una solución útil también es parte del aprendizaje

Desarrollar **Cosecha en Cope** fue un reto técnico, pero también un ejercicio de análisis, estructura y enfoque.

Me obligó a pensar más allá de la implementación pura y a entender que una buena aplicación no depende solo de las tecnologías elegidas, sino de cómo se conectan entre sí para resolver un problema real.

Ese fue, probablemente, el mayor valor del proyecto: no se trataba solo de hacer un marketplace agrícola, sino de construir una solución coherente, mantenible y preparada para responder a necesidades distintas dentro de una misma plataforma.

Y precisamente ahí estuvo su dificultad. Y también su interés.

## Tecnologías utilizadas en Cosecha en Cope

Para el desarrollo de este marketplace agrícola se utilizó el siguiente stack tecnológico:

- **Java 17**
- **Spring Boot 3**
- **Spring Security**
- **JWT**
- **Spring Data JPA**
- **PostgreSQL**
- **Angular 20**
- **TypeScript**
- **RxJS**
- **Bootstrap 5**
- **AWS S3**
- **Swagger / OpenAPI**
- **Cypress**
- **JUnit**
