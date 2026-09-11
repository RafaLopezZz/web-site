---
title: "ImportadorDB: documentando una herramienta real para pasar de Excel a SQL"
excerpt: "Cómo diseñé y desarrollé una aplicación Java 21 de escritorio para revisar, mapear e importar datos Excel a bases de datos relacionales."
date: "2026-04-12"
cover: "./images/importador-db_old.png"
coverAlt: "Captura de ImportadorDB con selección de MySQL, opciones de importación y datos de demostración"
tags:
  - "Java 21"
  - "JavaFX"
  - "Apache POI"
  - "JDBC"
  - "Importación de datos"
  - "Excel a SQL"
  - "Caso de estudio"
---

## ImportadorDB: cómo desarrollé una herramienta de escritorio para importar datos desde Excel a bases de datos relacionales

ImportadorDB nació para un trabajo recurrente: incorporar datos que clientes mantenían en Excel a las bases de datos de soluciones implantadas por Leovinci Consulting en proyectos de Kit Digital. Un ejemplo anonimizado es un inventario de libros mantenido en una hoja y preparado para una solución de venta online.

Diseñé y desarrollé la aplicación desde cero. Asumí las decisiones, las revisiones y las validaciones. El resultado es una herramienta de escritorio que abre archivos `.xls` y `.xlsx`, permite revisar la información, ajustar el mapeo y ejecutar una carga hacia una base de datos relacional.

## El problema: los datos no llegan con un esquema perfecto

Una hoja de cálculo no siempre coincide con el destino. Los nombres de las columnas pueden cambiar, los tipos no encajar y una misma plantilla puede tener hojas o datos que requieren revisión antes de persistirlos. Además, el trabajo ocurre con archivos locales y conexiones a bases de datos, por lo que una aplicación desktop ofrecía un punto de control directo para la persona que prepara la importación.

La secuencia que implementé fue deliberadamente guiada:

1. Seleccionar el archivo Excel y la hoja.
2. Revisar una previsualización de los datos.
3. Inferir y ajustar el mapeo de columnas y tipos.
4. Configurar la conexión de destino.
5. Elegir las opciones de importación y ejecutar la carga.
6. Generar un reporte del resultado.

La revisión humana antes de cargar es parte del flujo: la herramienta ayuda a preparar la importación, pero no presupone que el origen y el destino coincidan por completo.

## Stack y decisiones de implementación

La versión usada profesionalmente se construyó con **Java 21**, **JavaFX** y **JDBC**. JavaFX encajaba con un flujo local de selección, previsualización y configuración; JDBC permitía concentrar la conectividad de los motores en una misma aplicación.

Para leer Excel utilicé Apache POI con su modelo en memoria. Es una elección cómoda cuando se necesita acceder a hojas y celdas durante la previsualización y el mapeo, pero tiene un coste: el libro se carga en memoria. No presento este enfoque como lectura en streaming; para archivos muy grandes habría que evaluar un lector orientado a eventos y otro pipeline de carga.

La capa de conexión reúne MySQL, MariaDB, PostgreSQL y Firebird mediante JDBC. La abstracción centraliza drivers, URLs y tipos básicos, sin pretender sustituir adaptadores completos para todas las diferencias de dialecto.

## Escritura SQL, lotes y resultados parciales

La importación genera SQL para la tabla y utiliza `PreparedStatement` para los valores de los `INSERT`. Eso es importante, pero tiene un límite concreto: los valores se parametrizan; los identificadores como tabla y columnas requieren su propia validación y tratamiento por dialecto.

Los inserts se agrupan en lotes configurables. También existe una opción transaccional alrededor de la fase de inserción. El comportamiento no equivale a prometer atomicidad total: los errores por fila pueden registrarse y permitir que la importación continúe, por lo que una ejecución puede dejar un resultado parcial. Una herramienta de este tipo necesita mostrar ese estado de forma explícita, no resumirlo como un éxito sin matices.

El modo de prueba genera el SQL de creación de tabla y requiere una conexión, pero no simula toda la carga ni valida todas las filas de inserción. Es útil como parte de la revisión, no como sustituto de la ejecución completa.

## Motores y alcance de validación

MySQL y Firebird se utilizaron profesionalmente con clientes. MariaDB y PostgreSQL también se implementaron y se validaron manualmente contra bases de datos de prueba. Esa diferencia importa: que un motor esté incluido en el código no significa que haya tenido el mismo contexto de uso o el mismo nivel de validación.

La aplicación genera reportes en TXT, JSON y HTML para registrar el resultado de cada importación. Son mecanismos del flujo implementado; no los convierto en una afirmación de rendimiento, reducción de errores o mejora cuantificada porque no dispongo de métricas verificadas para ello.

## Lo que aprendí al construirla

ImportadorDB me dejó varias lecciones prácticas:

- Parametrizar valores SQL no resuelve el tratamiento de identificadores.
- Implementar, validar manualmente y usar un motor en un contexto profesional son niveles distintos.
- Una carga que admite resultados parciales debe comunicar sus estados con precisión.
- El acceso cómodo de Apache POI tiene que equilibrarse con el coste de memoria de su modelo.

Es una herramienta centrada en un flujo reconocible: convertir una hoja revisada por una persona en una carga relacional controlada, con sus decisiones y límites visibles.

<a href="/web-site/work/importador-db/" class="action action--text">Ver el caso de ImportadorDB →</a>

[Ver en GitHub](https://github.com/RafaLopezZz/importador-db)
