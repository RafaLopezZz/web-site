# Project copy normalization

Objective: rewrite portfolio project copy for non-technical readers, normalize project presentation and actions, and add Fincas Victoria without design changes.
Branch: `content/project-copy-normalization`. Delivery: local work-unit commits, no push or PR without explicit authorization. Test runner: Playwright through `scripts/run-e2e.mjs`.

## Specs

- S1. No design changes: reuse existing components, styles, and variants.
- S2. Actions follow one rule: "Página del portfolio: Ver {proyecto} →", "Web en funcionamiento: Visitar {proyecto} ↗", "Código: Ver código ↗", "Artículo: Leer artículo →", "Prueba técnica: Ver prueba: {qué demuestra} ↗", "Archivo: Descargar {archivo}", "Volver: ← Volver a {sección}". URLs and `rel` are unified.
- S3. Case structure: "Qué es · El reto · Mi papel · Resultado · Lo que aprendí · Detalles técnicos".
- S4. ImportadorDB, approved verbatim.
  - Card: "Programa de escritorio que pasa datos de Excel a una base de datos. Antes de cargarlos, permite revisarlos y decidir dónde va cada columna."
  - Subtitle: "Pasar datos de Excel a una base de datos, revisándolos antes de cargarlos."
  - Qué es: "un programa de escritorio para importar archivos de Excel a una base de datos, con una revisión humana antes de la carga."
  - El reto: "los nombres, columnas y tipos de datos de un Excel no siempre coinciden con los de la base de datos de destino. Además, un error en una fila no debería pasar inadvertido."
  - Mi papel: "lo diseñé y desarrollé desde cero, desde la interfaz y la lectura del Excel hasta la conexión con la base de datos, la carga y los informes."
  - Resultado: "la versión profesional se usó con MySQL y Firebird para importar datos de clientes de Leovinci Consulting en soluciones de Kit Digital. También funciona con MariaDB y PostgreSQL, aunque esos dos solo los probé con bases de datos de prueba."
  - Lo que aprendí: "si una importación termina a medias, debe quedar claro qué se cargó y qué no. También aprendí que no es lo mismo que algo esté programado, probado o usado de verdad."
  - Detalles técnicos: "Java 21, JavaFX, Apache POI y JDBC, con consultas parametrizadas y carga por lotes configurables. Leer el Excel completo en memoria facilita el trabajo, pero consume más memoria. El modo de prueba genera el SQL de creación de la tabla y necesita conexión; no simula toda la carga."
- S5. Cosecha en Cope, approved verbatim.
  - Card: "Mi proyecto final de DAM: una tienda online donde productores agrícolas publican sus productos y los clientes hacen pedidos. Es un prototipo académico."
  - Subtitle: "Mi proyecto final de DAM: un prototipo de tienda online para productores agrícolas."
  - Qué es: "un prototipo académico, presentado y aprobado, donde los productores publican artículos y los clientes consultan el catálogo, preparan el carrito y hacen pedidos."
  - El reto: "un cliente puede comprar a varios productores a la vez. Debe ver un único pedido, y cada productor debe gestionar solo su parte."
  - Mi papel: "lo diseñé y desarrollé desde cero, incluidos los diagramas, la arquitectura, las reglas de negocio y la programación completa."
  - Resultado: "un proyecto presentado y aprobado, con el catálogo, el carrito y los pedidos divididos por productor. El inicio de sesión está implementado, pero los permisos no están completos en todos los recorridos."
  - Lo que aprendí: "identificar a un usuario no es lo mismo que controlar lo que puede hacer. También a combinar páginas públicas sencillas con una aplicación más interactiva."
  - Detalles técnicos: "Java 17, Spring Boot 3.5.2, JPA/Hibernate, PostgreSQL, Angular 20, Thymeleaf y OpenAPI/Swagger. Las imágenes se guardan en AWS S3; subirlas y borrarlas se validó manualmente."
- S6. Glea-Nexo, approved verbatim. Status stays "Trabajo actual".
  - Card: "Proyecto de pruebas en curso sobre cómo guardar y recuperar datos agrícolas cuando se corta la conexión. Por ahora usa datos simulados."
  - Subtitle: "Un laboratorio para probar qué pasa con los datos agrícolas cuando falla la conexión."
  - Qué es: "un laboratorio técnico en curso, no un producto ni una investigación académica terminada. Un simulador en una Raspberry Pi genera datos agrícolas para probar cómo viajan y se guardan."
  - El reto: "en el campo, la conexión puede fallar. Los datos no deberían perderse ni contarse dos veces al volver a enviarlos."
  - Mi papel: "diseñé la arquitectura y hago yo mismo los experimentos."
  - Resultado: "he comprobado con datos simulados el recorrido completo, la acumulación durante un corte y el envío posterior al recuperar la conexión. Quedan por validar varios casos de fallo, y no hay mediciones de escala."
  - Lo que aprendí: "probar el caso ideal no basta. Node-RED acelera los experimentos, pero reparte la lógica en varios sitios, y detectar reenvíos no garantiza que el contenido sea idéntico."
  - Detalles técnicos: "Python, MQTT, Node-RED, SQLite, Spring Boot, PostgreSQL y una API, con outbox en SQLite, entrega al menos una vez y deduplicación parcial. La IA y el Big Data son una dirección futura: aún no hay nada implementado."
  - Actions: "Ver código ↗ · Ver prueba: recorrido completo ↗ · Ver prueba: reenvío sin conexión ↗ · Ver prueba: duplicados ↗".
- S7. Águilas FC, approved verbatim. Technologies: "Laravel 12 · MySQL · Blade".
  - Card: "Web oficial del club, con noticias, calendario de partidos, crónicas y patrocinadores. El contenido se publica o se programa desde un panel propio."
  - Subtitle: "La web oficial de un club de fútbol, preparada para publicar contenido a diario."
  - Qué es: "la web oficial del Águilas FC. Reúne noticias, calendario, partidos, crónicas, patrocinadores y un acceso a la venta de entradas."
  - El reto: "un club publica contenido de muchos tipos, y la portada tiene que reflejarlo sin que cada cambio dependa de un programador."
  - Mi papel: "desarrollé la nueva web. El gestor de contenidos parte del CMS de la empresa, adaptado al club."
  - Resultado: "el club gestiona desde un panel su contenido y lo que destaca en portada, y puede dejar publicaciones programadas. Un partido también puede enlazarse con su crónica."
  - Lo que aprendí: "ordenar cómo llega cada contenido a la portada simplifica mucho la web, pero esa pieza debe evolucionar cuando cambian los contenidos o su presentación."
  - Detalles técnicos: "`HeroSlideResolver` y `HeroSlideViewData` unifican los datos de la portada. Una tarea de Laravel publica lo programado, y hay pruebas automáticas de portada, publicación, calendario y crónicas."
- S8. La Ola Art Gallery, approved verbatim. Technologies: "Laravel 12 · MySQL · Redsys". Gets a case page.
  - Card: "Web de una galería de arte que reúne tienda online y un calendario de exposiciones y talleres con reserva y pago. Todo se gestiona desde un mismo panel."
  - Subtitle: "Tienda online y reservas de talleres y exposiciones, en una sola web."
  - Qué es: "la web de La Ola Art Gallery. Permite comprar obras y artículos, ver el portfolio de la galería y reservar plaza en exposiciones y talleres desde un calendario."
  - El reto: "vender piezas con unidades limitadas y plazas contadas exige que dos personas no se queden con lo mismo, aunque paguen casi a la vez. Además, la galería debía poder gestionarlo todo sin depender de un programador."
  - Mi papel: "desarrollé la web, la tienda, las reservas y el pago. El gestor de contenidos parte del CMS de la empresa, adaptado a este proyecto."
  - Resultado: "desde un mismo panel se gestionan artículos, exposiciones, pedidos y reservas. Los clientes tienen su área de usuario, y el pago se hace con la pasarela Redsys."
  - Lo que aprendí: "un pago correcto no garantiza que quede disponibilidad. Por eso la web vuelve a comprobarla al confirmar el cobro y, si ya no queda nada, deja el caso marcado para gestionar la devolución."
  - Detalles técnicos: "Laravel 12, MySQL y Redsys por redirección, con firma de notificaciones y bloqueos en la base de datos para stock y plazas. Hay pruebas de stock, de la segunda compra del último artículo y de la integración con Redsys."
- S9. Quinta Bella, approved verbatim. Technologies: "Laravel 12 · MySQL · Blade".
  - Card: "Web de un camping en Águilas (Murcia) que presenta sus parcelas y experiencias, muestra las tarifas y da acceso a la reserva."
  - Subtitle: "Una web para conocer el camping, consultar precios y reservar estancia."
  - Qué es: "la web de La Quinta Bella, un camping en Águilas. Presenta el lugar, sus experiencias y las tarifas de sus parcelas."
  - El reto: "pasar una web sencilla a una base gestionable y añadir reservas, con el precio correcto según las noches y sin aceptar más estancias que la disponibilidad."
  - Mi papel: "desarrollé la parte pública y las reservas. El gestor de contenidos parte del CMS de la empresa, adaptado a este cliente."
  - Resultado: "el camping gestiona sus contenidos y tarifas desde un panel, y sus clientes pueden consultar precios y empezar una reserva desde la web. El cobro online todavía no está activo."
  - Lo que aprendí: "una reserva pendiente de pago también debe contar, durante un tiempo, para la disponibilidad. Si no, dos personas podrían intentar reservar el mismo hueco."
  - Detalles técnicos: "Laravel 12 y MySQL, con precio por noche según la duración y reservas pendientes que caducan. La integración con Redsys está desarrollada, pero aún no cobra en producción. Hay pruebas de precios y disponibilidad."
- S10. Fincas Victoria, approved verbatim, as `RLP / PROD / 004`. No CMS mention and no code link. Technologies: "PHP 8.3 · MariaDB · XML Kyero". Uses a catalog screenshot without people.
  - Card: "Web de una inmobiliaria de Águilas (Murcia) que muestra sus inmuebles en venta y alquiler. El catálogo se actualiza a partir de un archivo externo, sin copiar los anuncios a mano."
  - Subtitle: "Una web inmobiliaria con un catálogo que se actualiza a partir de un archivo externo."
  - Qué es: "la web de Fincas Victoria, una inmobiliaria de Águilas. Permite buscar pisos, chalets, obra nueva, locales, terrenos y garajes, filtrar los resultados y consultar cada inmueble."
  - El reto: "los inmuebles llegan en un archivo XML con formato Kyero. Había que publicarlos sin copiarlos a mano y evitar que un archivo incorrecto estropeara el catálogo."
  - Mi papel: "desarrollé toda la web, incluida la importación de inmuebles."
  - Resultado: "la web está publicada y su catálogo muestra los inmuebles disponibles con sus datos, filtros y páginas de resultados. Antes de importar un archivo, el sistema comprueba su origen, tamaño y formato."
  - Lo que aprendí: "importar datos no es solo leerlos. Hay que decidir qué ocurre si algo falla y qué se publica. Por ejemplo, un inmueble con un bloqueo de publicación no pasa a estar disponible, y los que se ocultaron se mantienen ocultos."
  - Detalles técnicos: "PHP 8.3, MariaDB y PHPMailer. El XML se valida con el esquema Kyero 3.0 guardado en el proyecto, y la descarga se limita a orígenes HTTPS autorizados. Una tarea diaria lanza la sincronización, y las pruebas de publicación no necesitan una base de datos real."
- S11. Career copy stops listing Fincas Victoria under Laravel.
- S12. English mirrors the approved Spanish meaning, because `DESIGN.md` requires equivalent locales. Assumption: English wording is reviewed in the diff.
- S13. Remove unused case fields and run the full checks at 320, 390, 768, and 1024 px.

## Tasks

- [x] T1 S2 inline: actions and links. Commit 6e19a56.
- [x] T2 S4-S11 inline: cards and career correction. Commit 5060ccb.
- [x] T3 S3-S6 inline: Work cases. Commit 9fcd92f.
- [x] T4 S3 S7-S9 inline: Production cases and La Ola page. Commit c05250d.
- [x] T5 S3 S10 inline: Fincas Victoria. Commit 0fa6d05.
- [x] T6 S13 inline: cleanup and verification. Commit: refactor(cases): remove unused project fields.

Route evidence: one sequential content change with shared tests, so no Writer trigger applies.

## Log

- L1, 2026-11-04, original request: "Haz un análisis profundo de mi portfolio. El objetivo será: 1. Actualizar los textos de proyectos de manera sencilla y natural para personas no técnicas. 2. Normalizar presentación de proyectos, semántica y naturalidad. 3. Analizar nuevo proyecto y darle presentación. 4. Normalizar botones y enlaces. 5. Que no hacer: Modificar el diseño. De momento tocar código sin un plan."
- L2, 2026-11-04: "Fincas Victoria no tiene gestor de contenidos, es el único proyecto que no lo tiene."
- L3, 2026-11-04: Quinta Bella "Aún no cobra".
- L4, 2026-11-04, implementation request: "Aprobado, comienza con la implementación".
- L5, 2026-11-04, verification: `npm run verify:green -- tests/project-actions.spec.ts` passed (2, 23, and 129 Playwright tests). Status, overflow, and console checks passed on 22 routes at 320, 390, 768, and 1024 px. `npm run test:unit` found no unit test files. Screenshots were reviewed for the Production index and the Fincas Victoria case.
- L6, 2026-11-04, advisory: rapid clicks on the Home carousel can lose a step at 390 px because scroll events reset its index. `EvidenceCarousel.astro` is unchanged in this feature.
