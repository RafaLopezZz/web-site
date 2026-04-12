---
title: "ImportadorDB: documentando una herramienta real para pasar de Excel a SQL"
excerpt: "Así desarrollé ImportadorDB, una aplicación de escritorio en Java para importar datos desde Excel a bases de datos relacionales con JavaFX, Apache POI, JDBC y HikariCP, resolviendo un problema operativo real con una herramienta usable y técnicamente sólida."
date: "2026-04-12"
cover: "./images/importador-db_old.png"
coverAlt: "Portada del proyecto ImportadorDB, una herramienta para importar datos de Excel a SQL"
tags:
 - "Java"
 - "JavaFX"
 - "Apache POI"
 - "JDBC"
 - "HikariCP"
 - "Maven"
 - "Herramienta desktop"
 - "Importación de datos"
 - "Excel a SQL"
 - "Caso de estudio"
---

## ImportadorDB: cómo desarrollé una herramienta de escritorio para importar datos desde Excel a bases de datos relacionales

Esta aplicación nace de una situación bastante concreta que se repetía con clientes: estábamos perdiendo demasiado tiempo en una tarea tan poco glamurosa como necesaria, importar datos desde Excel a bases de datos SQL. Muchas veces ese proceso acababa resolviéndose de forma manual, con copy-paste, ajustes rápidos, correcciones sobre la marcha o scripts improvisados para salir del paso. El problema no era solo el tiempo que se iba ahí, sino también la cantidad de fricción, errores y dependencia del caso concreto.

Con **ImportadorDB** quise construir una solución más seria: una aplicación de escritorio capaz de cargar archivos `.xls` y `.xlsx`, permitir una revisión previa de la información, preparar el mapeo de columnas y ejecutar la importación contra motores SQL distintos desde una interfaz gráfica usable.

## El problema real: Excel sigue estando en medio de muchos flujos de trabajo

Aunque a nivel técnico muchas veces pensamos en APIs, pipelines o integraciones automatizadas, la realidad en muchas empresas sigue siendo otra: el dato entra, se corrige o se comparte en Excel.

Eso genera un problema muy concreto cuando luego hay que persistir esa información en una base de datos:

- Aparecen errores manuales.
- El proceso depende demasiado de quien lo ejecuta.
- Cada importación se convierte en una tarea artesanal.
- Y no suele existir una herramienta intermedia bien planteada.

El proyecto no intenta resolver todo el universo ETL, pero sí una parte importante y muy cotidiana: convertir ficheros Excel en inserciones SQL de forma más controlada, repetible y usable.

## El objetivo del proyecto: una herramienta desktop útil, no una demo vacía

La meta no era hacer una interfaz bonita sin fondo técnico, ni tampoco una librería sin capa de uso real. El objetivo era construir una herramienta que juntara varios bloques importantes en una sola pieza de software:

- Lectura de archivos Excel.
- Interfaz de escritorio.
- Conexión a distintos motores de base de datos.
- Importación por lotes.
- Soporte transaccional.
- Y generación de reportes del resultado.

Eso convierte a ImportadorDB en un proyecto interesante para portfolio porque no se queda en un CRUD genérico ni en una práctica académica aislada. Tiene una intención clara de resolver un problema operativo reconocible.

## Stack utilizado en ImportadorDB

Para desarrollar el proyecto se utilizó este stack principal:

- **Java 25**
- **JavaFX 25**
- **MaterialFX**
- **ControlsFX**
- **Apache POI**
- **JDBC**
- **HikariCP**
- **Maven**
- **JUnit 5**
- **Mockito**
- **TestFX**

A nivel de motores soportados, el proyecto está preparado para trabajar con:

- **MySQL**
- **PostgreSQL**
- **MariaDB**
- **Firebird**

Y está diseñado para ser extensible a otros motores relacionales con relativa facilidad, siempre que tengan un driver JDBC disponible.

## La parte interesante: integrar interfaz, ficheros y base de datos con criterio

Lo valioso de este proyecto no está solo en la lista de tecnologías, sino en cómo se conectan entre sí.

Por un lado, la aplicación ofrece una **interfaz de escritorio con JavaFX**, lo que permite trabajar el flujo desde una capa visual pensada para uso real. Por otro, la lectura de Excel se apoya en **Apache POI**, que es la pieza que permite abrir, interpretar y recorrer la información de entrada.

A partir de ahí, el proyecto construye la parte más importante: el paso de esos datos a la base de datos mediante **JDBC**, con pool de conexiones gestionado con **HikariCP** y una lógica de inserción basada en `PreparedStatement`, lotes, transacciones y rollback.

Ese punto es clave, porque ya no estamos hablando solo de “leer un Excel”, sino de montar una cadena de trabajo relativamente completa:

1. Cargar el fichero.
2. Revisar su estructura.
3. Preparar el mapeo.
4. Decidir opciones de importación.
5. Ejecutar la escritura.
6. Y devolver un resultado con trazabilidad.

## Decisiones técnicas que le dan valor al proyecto

Uno de los aspectos más interesantes es que ImportadorDB no se limita a un flujo rígido. En su diseño aparecen varias decisiones útiles para escenarios reales:

- Posibilidad de **crear la tabla** si hace falta.
- Opción de **sobrescribir** o **añadir** datos.
- Soporte de **dry-run** para validar antes de escribir.
- Uso de **batch inserts** para mejorar rendimiento.
- Soporte de **transacciones** para reducir incoherencias.
- Y generación de reportes en **TXT, JSON y HTML**.

Estas decisiones no convierten el proyecto en una plataforma enterprise ni pretenden hacerlo, pero sí muestran una forma de pensar el software bastante más útil que el típico prototipo que solo demuestra que “algo funciona”.

## Arquitectura y organización

A nivel estructural, el proyecto está organizado por capas bastante claras, con separación entre:

- `controller/`
- `model/`
- `service/`
- `resources/`

Dentro de esa estructura aparecen servicios específicos para:

- lectura de Excel,
- conexión a base de datos,
- importación,
- generación de reportes,
- y cifrado de credenciales.

No es una arquitectura rebuscada, y precisamente ahí está parte de su virtud: para una herramienta desktop de este tipo, el proyecto mantiene una organización suficientemente clara como para seguir creciendo sin convertirse enseguida en una maraña difícil de tocar.

## Lo que demuestra este proyecto

ImportadorDB refleja varias capacidades que me interesa enseñar:

- Convertir un problema operativo real en una herramienta concreta.
- Diseñar una aplicación desktop con utilidad profesional.
- Integrar parsing de ficheros, lógica de negocio y persistencia.
- Trabajar con distintos motores relacionales.
- Y construir una solución que no depende solo de una tecnología, sino del encaje entre varias capas.

No es el proyecto más vistoso del mundo en términos de moda tecnológica, y quizá precisamente por eso me parece más valioso. Es una herramienta que intenta resolver algo real, con una base técnica coherente y con decisiones que apuntan a usabilidad, mantenibilidad y ejecución práctica.

## Conclusión

Desarrollar **ImportadorDB** ha sido una forma muy clara de trabajar un tipo de software que a veces no luce tanto en redes, pero sí dice bastante sobre cómo piensa uno al construir.

Porque aquí no se trataba solo de abrir un Excel o conectar una base de datos. Se trataba de construir una herramienta intermedia, usable y técnica a la vez, capaz de reducir fricción en una tarea que sigue existiendo en muchísimos contextos reales.

Y para mí, ahí está precisamente su interés.

[Pincha aquí para ver en GitHub](https://github.com/RafaLopezZz/importador-db)
