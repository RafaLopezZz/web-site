# ImportadorDB - Authority Packet v2

**Fecha de corte:** 2026-09-11
**Estado:** Fuente canónica del proyecto para portfolio y defensa técnica; publicación sujeta a las restricciones indicadas
**Settlement de autoridad:** 2026-09-11, declaración directa de Rafael López
**Repositorio auditado:** [`RafaLopezZz/importador-db`](https://github.com/RafaLopezZz/importador-db)
**HEAD auditado:** [`7e978012`](https://github.com/RafaLopezZz/importador-db/commit/7e978012e23b1a2919a043a660018c66d7201c74) (`master`)
**Política:** ningún repositorio, issue, PR o documento fuente fue modificado.

## Dictamen ejecutivo

ImportadorDB contiene una aplicación JavaFX real y sustancial, no solo una descripción: abre `.xlsx` y `.xls`, presenta hojas y previsualizaciones, infiere un mapeo de columnas, construye DDL/INSERT, parametriza valores, agrupa inserciones en lotes, usa JDBC/HikariCP, ofrece transacciones y genera reportes TXT/JSON/HTML.

Rafael declara como mantenedor y creador que diseñó y desarrolló ImportadorDB desde cero con un agente de IA como herramienta de apoyo, y que Git se inicializó cuando el proyecto ya estaba avanzado. Esta declaración resuelve la procedencia funcional a nivel `MAINTAINER_ATTESTED`, aunque no convierte el trabajo previo a Git en evidencia directa de nivel A. La anotación `@author Alberto` de `MainApp.java` queda como anomalía documental pendiente de explicación, no como autoridad superior a la declaración del creador.

La versión profesional se creó para importar datos mantenidos por clientes en Excel hacia bases de datos de soluciones implantadas en proyectos de Kit Digital. Se utilizó realmente con MySQL y Firebird. MariaDB y PostgreSQL fueron implementados y validados mediante importaciones manuales contra bases de prueba, sin uso profesional conocido. El resultado profesional está atestiguado, pero no existen métricas cuantitativas verificadas.

Tres afirmaciones públicas son técnicamente incorrectas o excesivas en el HEAD actual:

1. **“Streaming para archivos Excel grandes”**: el código usa `XSSFWorkbook`/`HSSFWorkbook`, que cargan el workbook en memoria; no aparece `SXSSFWorkbook` ni un lector SAX/event-based.
2. **“AES-256 para credenciales”**: el servicio trunca el hash de la clave a 16 bytes (128 bits), usa una clave fija incluida en el código, invoca el modo implícito de `Cipher.getInstance("AES")` y no está conectado al flujo de credenciales.
3. **“PreparedStatements anti-SQL injection”**: los valores del `INSERT` sí están parametrizados, pero nombres de tabla y columna se concatenan en SQL. La formulación general no es defendible.

El `pom.xml` actual exige **Java 25 y JavaFX 25.0.1**, mientras README, ficha del portfolio y CV afirman Java 21. La declaración del mantenedor resuelve el significado: **Java 21 es la versión profesional con autoridad de producto**; Java 17 es histórica; Java 25 es un estado posterior del repositorio introducido mediante una actualización automática de Copilot y no representa una decisión profesional deliberada. La versión debe expresarse siempre con ámbito: `PROFESSIONAL_VERSION = Java 21` y `REPOSITORY_HEAD = Java 25`.

No se ha encontrado CI, release, tag, PR o issue en ImportadorDB. Existen **19 métodos de test unitario** repartidos entre `DatabaseConfig`, `DatabaseEngine` y `EncryptionService`, pero no pruebas automatizadas del lector Excel, la importación, transacciones, reportes, UI ni motores reales. No se pudo ejecutar el build en el entorno de auditoría: dispone de Java 17 y carece de Maven, mientras el HEAD requiere Java 25. En consecuencia, “los tests pasan en el HEAD” y “el JAR actual funciona” permanecen **UNKNOWN**; esto no invalida la validación manual y el uso profesional atestiguados para la versión Java 21.

## Cambios de autoridad respecto a v1

| Área | v1 | Settlement v2 |
|---|---|---|
| Autoría | CONFLICTING D/E | MAINTAINER_ATTESTED B: desarrollo desde cero con apoyo de IA; Git tardío |
| Uso profesional | SELF_REPORTED C | MAINTAINER_ATTESTED B: Leovinci, soluciones de Kit Digital |
| Java | Conflicto 21/25 sin resolver | Java 21 profesional; Java 25 solo HEAD posterior automático |
| MySQL / Firebird | Capacidad en código | Uso profesional con clientes, nivel B |
| MariaDB / PostgreSQL | Capacidad sin validación conocida | Validación manual contra BBDD de prueba, nivel B |
| Cifrado | Claim técnico dudoso | Fuera del relato profesional; no fue utilizado |
| Captura UI | Procedencia pendiente | Creada por Rafael, demo no sensible, candidata pública |
| Outcome | Uso no confirmado | Uso profesional cualitativo confirmado; sin métricas |

---

## Convenciones probatorias

### Tipo de conclusión

- **FACT:** aparece directamente en Git, código, tests, configuración o un artefacto inspeccionado.
- **INFERENCE:** interpretación técnica razonable derivada de uno o más hechos; no prueba uso real ni intención personal.
- **MAINTAINER_ATTESTED:** declaración directa de Rafael como creador/mantenedor sobre hechos no preservados en evidencia pública. Tiene autoridad de proyecto, pero no equivale a evidencia independiente de Git/tests.
- **MAINTAINER INPUT REQUIRED:** solo Rafael o una fuente privada/autorizada puede resolverlo.

### Clasificación de claims

- `VERIFIED_CURRENT`: demostrado en el HEAD.
- `VERIFIED_HISTORICAL`: demostrado en una revisión anterior.
- `SUPPORTED`: evidencia suficiente, pero falta validación directa o de extremo a extremo.
- `MAINTAINER_ATTESTED`: confirmado directamente por Rafael; publicable con nivel B cuando sea técnicamente coherente con el repositorio.
- `SELF_REPORTED`: afirmado en CV/blog/memoria, sin evidencia independiente.
- `CONFLICTING`: fuentes relevantes discrepan.
- `UNKNOWN`: las fuentes no permiten determinarlo.
- `UNSUPPORTED`: el claim no está respaldado o el código lo desmiente.
- `INTERNAL_ONLY`: no publicable sin autorización o sanitización.

### Nivel de defensa

- **A:** demostrable directamente con código/Git/tests.
- **B:** evidencia suficiente y explicación técnica defendible.
- **C:** depende principalmente de memoria o fuente autoafirmada.
- **D:** existen fuentes contradictorias.
- **E:** no debe publicarse todavía.

---

# 1. IDENTITY

| Campo | Resultado | Tipo |
|---|---|---|
| Nombre | ImportadorDB | FACT |
| Tipo de producto | Aplicación de escritorio JavaFX para importar Excel a bases relacionales | FACT |
| Repositorio | Público, licencia MIT, rama por defecto `master` | FACT |
| Versión declarada actual | `1.0.0` en `pom.xml` y footer FXML | FACT |
| Último commit | 2026-01-18, `7e978012` | FACT |
| Versión profesional | Java 21; utilizada en Leovinci Consulting | MAINTAINER_ATTESTED |
| Estado HEAD remoto | Java 25/JavaFX 25.0.1; actualización posterior automática de Copilot | FACT + MAINTAINER_ATTESTED |
| Estado operativo real | Uso profesional confirmado con MySQL y Firebird | MAINTAINER_ATTESTED |
| Propiedad/autorización empresarial | No determinada pese al paquete `com.lc` y al contexto Leovinci | MAINTAINER INPUT REQUIRED |

# 2. WHAT

## Problema demostrable

**FACT:** el software implementa el paso de hojas Excel `.xlsx`/`.xls` a tablas relacionales desde una interfaz de escritorio. El flujo visible es: seleccionar archivo, enumerar hojas, previsualizar, inferir/editar mapeo, configurar conexión, escoger opciones e importar.

**MAINTAINER_ATTESTED:** la herramienta se creó para importar datos mantenidos por clientes en Excel hacia las bases de datos de soluciones implantadas en proyectos de Kit Digital. Un caso anonimizable es un inventario de libros mantenido en Excel e incorporado a una solución de venta online.

**Conclusión segura:** puede afirmarse que ImportadorDB **resolvió profesionalmente importaciones recurrentes Excel -> SQL**. No debe afirmarse que redujo errores o ahorró una cantidad concreta de tiempo porque no hay métricas verificadas.

# 3. ROLE

## Lo que Git sí atribuye a Rafael

- **FACT:** los seis commits públicos tienen como autor/committer a `RafaLopezZz`.
- **FACT:** Rafael publicó el snapshot inicial, eliminó un test duplicado, ejecutó/documentó la migración Java 17 -> 21 con OpenRewrite y publicó los cambios posteriores registrados en su cuenta.
- **MAINTAINER_ATTESTED:** Rafael diseñó y desarrolló ImportadorDB desde cero con apoyo de un agente de IA. Git se inicializó cuando el proyecto ya estaba avanzado. La actualización posterior a Java 25 fue introducida automáticamente por Copilot y no fue una evolución profesional deliberada.
- **FACT:** no hay commits de otros usuarios, PR ni discusión que permitan reconstruir colaboración dentro del repositorio público.

## Lo que Git no demuestra

- El snapshot inicial ya contiene casi toda la aplicación, documentación extensa, ejemplos y tests.
- `MainApp.java` contiene `@author Alberto`.
- El historial público no muestra la creación incremental del núcleo funcional.

**Dictamen de rol:** es defendible decir que Rafael **diseñó y desarrolló ImportadorDB desde cero, usando un agente de IA como apoyo, y que publicó el repositorio cuando el proyecto ya estaba avanzado**. En entrevista debe distinguir autoría/decisión humana de asistencia generativa y reconocer que Git no conserva el desarrollo inicial incremental.

**Clasificación:** `MAINTAINER_ATTESTED`, defensa **B**. La anotación `@author Alberto` debe corregirse o poder explicarse antes de buscar defensa A.

# 4. CONTEXT

| Contexto | Estado | Comentario |
|---|---|---|
| Herramienta de escritorio | VERIFIED_CURRENT / A | JavaFX + FXML + CSS + `Application` |
| Uso en Leovinci Consulting | MAINTAINER_ATTESTED / B | Uso profesional confirmado por el creador; sin evidencia pública independiente |
| Proyectos de Kit Digital | MAINTAINER_ATTESTED / B | Importación hacia BBDD de soluciones implantadas |
| Inventario de libros -> venta online | MAINTAINER_ATTESTED / B | Ejemplo anonimizable; no aporta identidad ni datos de cliente |
| Datos de clientes | INTERNAL_ONLY / E | No se auditaron datasets reales; nunca publicables sin autorización |
| Alternativa a procesos manuales de carga | MAINTAINER_ATTESTED / B | Contexto profesional confirmado; ahorro no medido |
| Proyecto formativo/portfolio | SUPPORTED / B | Repositorio público, README/tutorial histórico y ficha del portfolio |

# 5. CONSTRAINTS

## Restricciones observables

- **FACT:** entrada heterogénea `.xls` y `.xlsx`.
- **FACT:** cuatro dialectos/drivers objetivo: MySQL, MariaDB, PostgreSQL y Firebird.
- **FACT:** necesidad de interacción local con ficheros y credenciales, coherente con una app desktop.
- **FACT:** diferencias de tipos/autoincremento entre motores, modeladas en `DatabaseEngine` y `SqlDataType`.
- **FACT:** ejecución orientada a Windows mediante `build.bat` y `run.bat`, aunque Maven/JavaFX son multiplataforma.
- **FACT:** mapeos imperfectos o variables: inferencia por muestra y edición manual.
- **INFERENCE:** el batch configurable y el pool sugieren preocupación por volumen/rendimiento; no prueban que existiera una carga concreta.
- **MAINTAINER_ATTESTED:** plantillas mantenidas por clientes y bases de datos de soluciones de Kit Digital como contexto real.

# 6. KEY DECISIONS

| Decisión observada | Evidencia | Estado |
|---|---|---|
| JavaFX/FXML/CSS para aplicación desktop | `MainApp`, `main-view.fxml`, CSS | VERIFIED_CURRENT / A |
| Organización MVC-like por `controller`, `model`, `service`, `resources` | árbol y paquetes | SUPPORTED / B |
| Apache POI con `XSSFWorkbook`/`HSSFWorkbook` | `ExcelReaderService`, `ImportService` | VERIFIED_CURRENT / A |
| Abstracción de cuatro motores mediante enum + drivers JDBC | `DatabaseEngine`, `pom.xml` | VERIFIED_CURRENT como capacidad / A |
| Uso profesional de MySQL y Firebird | declaración directa del creador | MAINTAINER_ATTESTED / B |
| Validación manual de MariaDB y PostgreSQL contra BBDD de prueba | declaración directa del creador | MAINTAINER_ATTESTED / B |
| HikariCP con pool 2..10, timeouts y cache de prepared statements | `DatabaseConnectionService` | VERIFIED_CURRENT / A |
| Inserciones por lotes configurables, 1000 por defecto | `ImportOptions`, `ImportService` | VERIFIED_CURRENT / A |
| Parametrización de valores con `PreparedStatement` | `ImportService` | VERIFIED_CURRENT / A |
| Transacción opcional alrededor de la fase de inserción | `ImportService` | VERIFIED_CURRENT / A |
| Errores de conversión/fila se registran y se continúa | `ImportService` | VERIFIED_CURRENT / A |
| Inferencia de tipo por votación sobre muestra, 200 filas por defecto | `ExcelReaderService`, `ImportOptions` | VERIFIED_CURRENT / A |
| Reportes TXT, JSON y HTML | `ReportService` | VERIFIED_CURRENT / A |
| Tarea JavaFX en segundo plano para no bloquear UI | `MainController` | VERIFIED_CURRENT / A |
| Fat JAR con Maven Shade y wrapper `Main` | `pom.xml`, `Main.java`, commit `dc0e1232` | VERIFIED_CURRENT / A |

# 7. TRADE-OFFS

| Decisión | Ventaja | Coste/riesgo observado |
|---|---|---|
| Desktop JavaFX | Acceso directo a archivos/red local; flujo guiado | Distribución de runtime/JavaFX; UI difícil de automatizar; acoplamiento de plataforma |
| POI usermodel en memoria | Implementación simple y API cómoda | No escala como streaming; riesgo de memoria con libros grandes |
| Enum multi-motor | Centraliza URL, driver, puerto y tipos básicos | Dialectos reducidos a casos parciales; faltan tests de integración por motor |
| Batch inserts | Reduce round-trips respecto a insertar fila a fila | Fallos de batch pueden ser difíciles de atribuir; no hay benchmark |
| Continuar ante error de fila | Permite importación best-effort | Rompe una semántica de atomicidad total; una importación parcial puede marcarse exitosa |
| Transacción opcional | Permite rollback de fallos propagados durante inserts | DDL ocurre antes de desactivar autocommit; errores capturados por fila no disparan rollback |
| HikariCP | Configuración homogénea y reutilización de conexiones | Para un flujo secuencial puede ser complejidad innecesaria; el pool no se cierra al salir de la app |
| Inferencia por muestra | Reduce configuración manual | Mayoría simple y heurísticas pueden elegir un tipo erróneo; no se valida el dataset completo |
| Identificadores SQL generados/editables | Flexibilidad para tabla y columnas | Tabla/columnas se concatenan y no se validan/citan por dialecto |
| Fat JAR | Arranque/distribución más simple | Tamaño, compatibilidad JavaFX y dependencias nativas; no hay release ejecutable verificable |
| Servicio AES actual | Demuestra round-trip criptográfico básico | Clave fija, AES-128 efectivo, modo implícito determinista, sin IV/autenticación e integración inexistente |

# 8. VERSION HISTORY

No es un listado exhaustivo: son los milestones técnicos demostrables.

## M0 - Snapshot inicial público (2026-01-17)

**Evidencia:** [`63e4a42`](https://github.com/RafaLopezZz/importador-db/commit/63e4a42a6eb08abfbb3a8a653cdf9859c61dc652).

- Aplicación, tests, ejemplos y documentación entran casi completos.
- Build Java 17; JavaFX 21.0.1.
- Ya están presentes las capacidades principales.
- La creación anterior al snapshot no está preservada en Git; Rafael confirma que el desarrollo ya estaba avanzado al inicializarlo.

## M1 - Limpieza de test duplicado (2026-01-17)

**Evidencia:** [`382cfdda`](https://github.com/RafaLopezZz/importador-db/commit/382cfdda8ac6174b6dc74d768a933288c4470642).

- Elimina una segunda copia de `DatabaseConfigTest` situada en otro paquete.

## M2 - Migración Java 17 -> 21 con OpenRewrite (2026-01-17)

**Evidencia:** [`78288b2`](https://github.com/RafaLopezZz/importador-db/commit/78288b2bef5acefb10bc3eff7b88e9c63ff39e35).

- Cambia compiler source/target/release a 21.
- Actualiza `maven-compiler-plugin`.
- El mensaje identifica OpenRewrite como mecanismo.

## M3 - Actualización automática posterior del repositorio: Java 21 -> 25 (2026-01-18)

**Evidencia:** [`dc0e123`](https://github.com/RafaLopezZz/importador-db/commit/dc0e1232f382c9b7b0f8d3d7be22109c855004f3).

- Build a Java 25 y JavaFX 25.0.1.
- Actualiza POI, drivers JDBC, HikariCP, logging, Gson, JUnit y Mockito.
- Cambia el main class del Shade JAR de `MainApp` a `Main`.
- Ajusta tareas/UI y compatibilidad de código.
- Reduce drásticamente la documentación/tutoriales y elimina ejemplos de datos.
- Introduce una presentación temporal `v1.2.5` en FXML pese a `pom` 1.0.0.
- **MAINTAINER_ATTESTED:** la actualización fue introducida por Copilot y no representa la versión profesional ni una decisión deliberada de evolución del producto.

## M4 - README reescrito con metadatos históricos (2026-01-18)

**Evidencia:** [`f566f1e`](https://github.com/RafaLopezZz/importador-db/commit/f566f1e3b96e3e4be9acbfeca5ebd41700a664d5).

- Cambia solo README: Java/JavaFX 25 -> 21 y rebaja versiones de dependencias.
- No revierte `pom.xml`; mantiene una divergencia técnica, pero recupera Java 21 como versión comunicada y profesional.

## M5 - Alineación de versión visible a 1.0.0 (2026-01-18)

**Evidencia:** [`7e978012`](https://github.com/RafaLopezZz/importador-db/commit/7e978012e23b1a2919a043a660018c66d7201c74).

- Footer `v1.2.5` -> `v1.0.0`.
- Añade al README la motivación Excel -> sistemas relacionales.
- Estado actual remoto; sin actividad posterior visible, tags o releases.

## Autoridad de versiones

| Elemento | Versión profesional | HEAD remoto | Histórica / autoridad |
|---|---|---|---|
| Java | 21 | 25 (`pom`) | 17 histórica; 21 `MAINTAINER_ATTESTED`; 25 `CURRENT_REPOSITORY_ONLY` |
| JavaFX | 21 | 25.0.1 (`pom`) | 21 `MAINTAINER_ATTESTED`; 25 no representa producto profesional |
| Apache POI | Línea asociada a versión Java 21 | 5.4.0 | La versión profesional exacta debe fijarse desde artefacto/build si se necesita publicarla |
| HikariCP | Línea asociada a versión Java 21 | 6.2.1 | La versión profesional exacta debe fijarse desde artefacto/build si se necesita publicarla |
| Versión app | Versión profesional nominal no resuelta | 1.0.0 | `1.2.5` fue visible brevemente, sin tag/release; no usar públicamente |
| Motores | MySQL y Firebird usados; MariaDB/PostgreSQL validados manualmente | Cuatro configurados | `MAINTAINER_ATTESTED` con alcance distinto por motor |

# 9. EVIDENCE

## Fuentes primarias

| ID | Fuente | Qué prueba | Limitación |
|---|---|---|---|
| E01 | [`pom.xml`](https://github.com/RafaLopezZz/importador-db/blob/master/pom.xml) | Java/JavaFX/dependencias/build actuales | No prueba que compile o se ejecute |
| E02 | [`ImportService`](https://github.com/RafaLopezZz/importador-db/blob/master/src/main/java/com/lc/importador/service/ImportService.java) | DDL, inserts, batches, transacción, cancelación, conversiones | Sin tests unitarios/integración |
| E03 | [`ExcelReaderService`](https://github.com/RafaLopezZz/importador-db/blob/master/src/main/java/com/lc/importador/service/ExcelReaderService.java) | Lectura, preview, inferencia; ausencia de streaming | Sin datasets límite |
| E04 | [`DatabaseEngine`](https://github.com/RafaLopezZz/importador-db/blob/master/src/main/java/com/lc/importador/model/DatabaseEngine.java) | cuatro motores, URLs, puertos, ID types | No prueba conexión real |
| E05 | [`DatabaseConnectionService`](https://github.com/RafaLopezZz/importador-db/blob/master/src/main/java/com/lc/importador/service/DatabaseConnectionService.java) | JDBC/HikariCP y parámetros | No prueba carga/beneficio del pool |
| E06 | [`EncryptionService`](https://github.com/RafaLopezZz/importador-db/blob/master/src/main/java/com/lc/importador/service/EncryptionService.java) | implementación criptográfica real | Demuestra debilidades y falta de integración |
| E07 | [`MainController`](https://github.com/RafaLopezZz/importador-db/blob/master/src/main/java/com/lc/importador/controller/MainController.java) | coordinación UI/tareas/flujo | Controlador grande; estados de éxito problemáticos |
| E08 | [`tests`](https://github.com/RafaLopezZz/importador-db/tree/master/src/test/java/com/lc/importador) | 19 tests presentes | No hay resultado de ejecución/CI; cobertura estrecha |
| E09 | [`README`](https://github.com/RafaLopezZz/importador-db/blob/master/README.md) | intención y claims del mantenedor | Contiene versiones/funciones inconsistentes |
| E10 | [`ARCHITECTURE.md`](https://github.com/RafaLopezZz/importador-db/blob/master/docs/ARCHITECTURE.md) | documentación declarativa | Afirma streaming/AES-256 que el código no sostiene |
| E11 | historial de commits M0-M5 | evolución pública | Comienza demasiado tarde para probar creación original |

## Settlement directo del mantenedor

| ID | Declaración asentada | Clasificación |
|---|---|---|
| A01 | Rafael diseñó y desarrolló el proyecto desde cero con un agente de IA como apoyo; Git se inicializó tarde | MAINTAINER_ATTESTED / B |
| A02 | Uso profesional en Leovinci para soluciones de Kit Digital | MAINTAINER_ATTESTED / B |
| A03 | Java 21 fue la versión profesional; Java 25 fue una actualización automática posterior de Copilot | MAINTAINER_ATTESTED / B |
| A04 | MySQL y Firebird se usaron con clientes reales | MAINTAINER_ATTESTED / B |
| A05 | MariaDB y PostgreSQL se validaron manualmente contra BBDD de prueba | MAINTAINER_ATTESTED / B |
| A06 | Preview, mapping, conexión, importación, operaciones SQL, dry-run y reportes formaron parte del uso profesional | MAINTAINER_ATTESTED / B, limitado por el comportamiento real del código |
| A07 | El cifrado existía en código, pero no se utilizó profesionalmente | MAINTAINER_ATTESTED / B |
| A08 | `importador-db_old.png` fue creada por Rafael y solo contiene datos demo/no sensibles | MAINTAINER_ATTESTED / B; inspección visual A para el contenido visible |

## Fuentes secundarias/autodeclaradas

| Fuente | Claims | Tratamiento |
|---|---|---|
| CV adjunto, junio de 2026 | uso profesional, Java 21, cuatro motores, batch, prepared statements, AES | Corroboración autodeclarada; el settlement resuelve uso/versión y retira AES del relato profesional |
| ficha portfolio | Java 21/JavaFX 21, menos trabajo y menos errores | Java 21 queda alineado con versión profesional; la reducción de errores sigue sin medición |
| artículo portfolio | “cómo desarrollé”, problema real, Java 25, solidez, uso práctico | Autoría/uso quedan asentados; Java 25 y adjetivos de calidad deben corregirse |
| SDD portfolio B-003 | reconoce conflicto de versión | Conflicto resuelto por separación `PROFESSIONAL_VERSION` / `REPOSITORY_HEAD` |

## Evidencia ausente

- Repositorio/historia anterior al snapshot.
- Build reproducible o wrapper Maven.
- Ejecución de tests del HEAD y cobertura.
- CI, tags, releases o artefactos binarios.
- Tests de integración con MySQL/PostgreSQL/MariaDB/Firebird.
- Benchmarks de batch frente a inserción individual.
- Logs/reportes sanitizados de una importación real.
- Issues/PR/tickets que expliquen requisitos y decisiones.
- ADR/SDD propio de ImportadorDB.
- Evidencia pública independiente del uso profesional atestiguado.

# 10. OUTCOME

## Capability

Defendible: existe una aplicación con UI y una cadena implementada Excel -> mapeo -> JDBC/SQL, con batch, opciones transaccionales y reportes.

## Qualitative result

**MAINTAINER_ATTESTED:** se utilizó profesionalmente para importar datos mantenidos por clientes en Excel hacia bases de datos de soluciones implantadas en proyectos de Kit Digital. MySQL y Firebird tuvieron uso con clientes; MariaDB y PostgreSQL fueron validados manualmente contra bases de prueba.

## Measured result

**UNKNOWN:** no hay métricas verificables de tiempo, volumen, tasa de error, número de clientes, número de importaciones, rendimiento o disponibilidad.

No publicar “aceleró cargas grandes”, “redujo errores”, “ahorró X horas” o “alto rendimiento” como resultado. Puede decirse “usa batch inserts con el objetivo de reducir round-trips”, que es una decisión/capacidad, no una medición.

# 11. LEARNING

Aprendizajes técnicos atribuibles al trabajo según la declaración del creador y reforzables mediante la evidencia del código:

- Modelar diferencias de drivers, URLs, puertos y tipos SQL entre motores.
- Separar valores parametrizables de identificadores SQL, y comprender por qué `PreparedStatement` no resuelve ambos.
- Diseñar importaciones atómicas frente a best-effort y representar explícitamente resultados parciales.
- Comprender el coste de memoria de Apache POI usermodel frente a SAX/event streaming.
- Coordinar tareas de fondo JavaFX y estados de cancelación.
- Diferenciar presencia de tests, ejecución de tests y cobertura de riesgos.
- Gestionar versiones de Java/JavaFX y coherencia entre build, README, portfolio y CV.
- Evaluar criptografía aplicada: tamaño efectivo de clave, modo, IV/nonce, autenticación y key management.

# 12. MEDIA

| Artefacto | Qué demuestra | Versión aparente | Sensibilidad | Uso público |
|---|---|---|---|---|
| `src/assets/projects/importador-db.png` (1376x768) | Solo representa conceptualmente Excel -> cuatro BBDD | No vinculable a una versión | No se ve información sensible | Usable como ilustración si se confirma licencia/procedencia; **no usar como evidencia** |
| `importador-db_old.png` (1200x801), duplicado en assets/blog | UI con tabs, selector MySQL, host local, usuario `root`, password enmascarada, opciones create/overwrite/append/dry-run/transacción; footer v1.0.0 | Compatible con HEAD actual por textos/FXML | Rafael confirma que contiene solo datos demo/no sensibles | Candidata pública autorizada por procedencia; útil como evidencia visual de UI |
| Diagramas de arquitectura | Ninguno como asset; solo diagramas de texto en documentación | N/A | N/A | Conviene recrear uno desde código, claramente etiquetado como diagrama técnico |
| Screenshots de importación/resultados | No encontrados | N/A | Podrían contener datos de cliente | No publicar sin sanitización y autorización |

# 13. PUBLIC LINKS

- Repositorio: <https://github.com/RafaLopezZz/importador-db>
- Código de importación: <https://github.com/RafaLopezZz/importador-db/blob/master/src/main/java/com/lc/importador/service/ImportService.java>
- Lectura e inferencia Excel: <https://github.com/RafaLopezZz/importador-db/blob/master/src/main/java/com/lc/importador/service/ExcelReaderService.java>
- Motores soportados en código: <https://github.com/RafaLopezZz/importador-db/blob/master/src/main/java/com/lc/importador/model/DatabaseEngine.java>
- Historial público: <https://github.com/RafaLopezZz/importador-db/commits/master>
- Ficha de portfolio, fuente: <https://github.com/RafaLopezZz/web-site/blob/master/src/content/projects/importador-db.md>
- Artículo de portfolio, fuente: <https://github.com/RafaLopezZz/web-site/blob/master/src/content/blog/desarrollo-importador-db.md>

No se confirma en esta auditoría que las rutas desplegadas del portfolio sean autoridad actual, porque la rama pública `refactor/rlp-v2` disponible está por detrás del estado local descrito por el mantenedor.

# 14. SAFE PUBLIC CLAIMS

Estas frases son hechos candidatos; no constituyen todavía copy definitivo.

| Claim factual candidato | Clasificación | Defensa | ¿Defendible? | Respuesta breve “cómo sabes / qué hiciste” |
|---|---|---:|---|---|
| Diseñé y desarrollé ImportadorDB desde cero con un agente de IA como herramienta de apoyo; Git se incorporó cuando el proyecto ya estaba avanzado | MAINTAINER_ATTESTED | B | Sí | Explicar qué decisiones y validaciones asumió Rafael y por qué el historial público empieza como snapshot |
| La herramienta se utilizó profesionalmente para importar datos Excel hacia bases de soluciones implantadas en proyectos de Kit Digital | MAINTAINER_ATTESTED | B | Sí | Dar el ejemplo anonimizado del inventario de libros sin identificar al cliente ni inventar métricas |
| ImportadorDB es una aplicación de escritorio que lee `.xls` y `.xlsx` y prepara su importación a bases relacionales | VERIFIED_CURRENT | A | Sí, como capacidad | `ExcelReaderService` selecciona `HSSFWorkbook`/`XSSFWorkbook`; la UI encadena selección, mapeo e importación |
| El código contempla MySQL, MariaDB, PostgreSQL y Firebird mediante drivers y configuración JDBC específica | SUPPORTED | B | Sí, con matiz | Mostrar enum, dependencias y scripts; aclarar que no hay pruebas E2E por motor |
| La versión profesional utilizó MySQL y Firebird con clientes reales | MAINTAINER_ATTESTED | B | Sí | Distinguir uso profesional de la mera presencia del driver |
| MariaDB y PostgreSQL fueron implementados y validados manualmente contra bases de prueba | MAINTAINER_ATTESTED | B | Sí | No presentarlos como uso con clientes ni como test automatizado |
| La importación agrupa valores en batches configurables y usa 1000 filas por defecto | VERIFIED_CURRENT | A | Sí | `ImportOptions` + `addBatch/executeBatch` |
| Los valores de los INSERT se parametrizan con `PreparedStatement` | VERIFIED_CURRENT | A | Sí | Mostrar placeholders `?` y setters por tipo; no extender el claim a identificadores |
| La fase de inserción puede ejecutarse con transacción y rollback ante excepciones propagadas | VERIFIED_CURRENT | A | Sí, con matiz | Explicar el límite: errores de fila se capturan; DDL sucede antes |
| La herramienta ofrece preview e inferencia heurística del tipo SQL a partir de una muestra | VERIFIED_CURRENT | A | Sí | Hasta 100 filas de preview; 200 para inferencia por defecto |
| Puede generar reportes TXT, JSON y HTML del resultado | VERIFIED_CURRENT | A | Sí | Métodos explícitos en `ReportService` |
| La conexión usa HikariCP y cuatro drivers JDBC | VERIFIED_CURRENT | A | Sí | Mostrar configuración del datasource; no afirmar mejora medida |
| La versión utilizada profesionalmente fue Java 21 | MAINTAINER_ATTESTED | B | Sí | Separarla del HEAD posterior y del Java 17 histórico |
| El repositorio pasó técnicamente de Java 17 a 21 y después recibió una actualización automática a 25 | VERIFIED_HISTORICAL + MAINTAINER_ATTESTED | A/B | Sí | Git prueba los cambios; Rafael explica que el salto a 25 fue automático y no una decisión de producto |
| El HEAD remoto declara Java 25 y JavaFX 25.0.1 | VERIFIED_CURRENT | A | Sí, solo si es relevante | `pom.xml`; aclarar que no es la versión profesional |
| El repositorio contiene 19 tests unitarios para configuración, motores y cifrado | VERIFIED_CURRENT | A | Sí | Contar `@Test`; no decir que pasan ni que cubren la importación |
| Rafael publicó y mantuvo los seis commits del historial público | VERIFIED_HISTORICAL | A | Sí | Git prueba la publicación; la autoría del desarrollo anterior está asentada separadamente como `MAINTAINER_ATTESTED / B` |

# 15. DO NOT CLAIM

| Claim a evitar | Clasificación | Defensa | Motivo |
|---|---|---:|---|
| “Procesa archivos grandes con streaming/SXSSFWorkbook” | UNSUPPORTED | E | El código carga workbooks en memoria y no usa SXSSF/SAX |
| “Cifra las credenciales con AES-256” | UNSUPPORTED | E | 128 bits efectivos, clave fija, modo implícito y servicio no integrado |
| “Está protegido contra SQL injection” | UNSUPPORTED | E | Solo valores parametrizados; identificadores concatenados/editables |
| “Los cuatro motores se utilizaron con clientes” | UNSUPPORTED | E | Solo MySQL y Firebird tuvieron uso profesional; MariaDB/PostgreSQL fueron validaciones manuales |
| “Las transacciones hacen rollback ante cualquier error” | UNSUPPORTED | E | Los errores por fila se capturan y se puede confirmar parcial |
| “Dry-run simula toda la importación” | UNSUPPORTED | E | Solo genera CREATE TABLE, exige conexión y no valida filas/INSERT |
| “Crear tabla si no existe” | UNSUPPORTED | E | El SQL generado no contiene `IF NOT EXISTS` |
| “Append es un modo implementado” | UNSUPPORTED | E | La opción existe, pero `ImportService` no consulta `isAppend()` |
| “Importación cancelada no guarda cambios” | UNSUPPORTED | E | La cancelación puede salir del bucle y confirmar lo ya procesado |
| “Alto rendimiento / acelera cargas grandes” | UNSUPPORTED como outcome | E | Batch/pool son mecanismos; no hay benchmark |
| “Redujo el trabajo o los errores en X%” | UNSUPPORTED | E | Hay uso profesional, pero no medición cuantitativa |
| “La actualización a Java 25 fue una evolución profesional que decidí” | UNSUPPORTED | E | Fue una actualización automática posterior de Copilot |
| “Java 21 es el HEAD actual” | UNSUPPORTED | E | Java 21 es la versión profesional; el `pom.xml` remoto exige 25 |
| “Tests completos con Mockito y TestFX” | UNSUPPORTED | E | Dependencias presentes, pero no hay tests que las usen ni cobertura de UI/importación |
| “Arquitectura limpia/escalable/sólida” | UNSUPPORTED como juicio | E | Son valoraciones; controlador de 638 líneas y dependencias concretas limitan el claim |

# 16. ES CANONICAL MEANING

Significado factual aprobado por evidencia, pendiente de convertir en copy:

> ImportadorDB nació para resolver importaciones recurrentes de datos que clientes mantenían en hojas Excel hacia las bases de datos de soluciones implantadas en proyectos de Kit Digital. Rafael lo diseñó y desarrolló desde cero con un agente de IA como apoyo. La versión profesional se construyó con Java 21 y se utilizó con MySQL y Firebird; MariaDB y PostgreSQL también fueron implementados y validados manualmente contra bases de prueba. El código ofrece preview, mapping, parametrización de valores, batches, opciones transaccionales y reportes. El HEAD remoto posterior usa Java 25 por una actualización automática de Copilot y no es la autoridad profesional. No existen métricas cuantitativas verificadas.

# 17. EN CANONICAL MEANING

Evidence-safe factual meaning, not final marketing copy:

> ImportadorDB was created to handle recurring imports of customer-maintained Excel data into databases used by solutions delivered through Spain’s Kit Digital programme. Rafael designed and developed it from scratch with an AI agent as a supporting tool. The professional version targeted Java 21 and was used with MySQL and Firebird; MariaDB and PostgreSQL were also implemented and manually validated against test databases. The code provides preview and mapping, parameterized values, batching, transactional options, and reports. A later repository-only Copilot update moved the remote HEAD to Java 25; it is not the professional product authority. No verified quantitative metrics are available.

# 18. DEFENSE GAPS

## DG-01 - Autoría y procedencia - SETTLED

**RESOLUTION:** Rafael diseñó y desarrolló el proyecto desde cero con un agente de IA como apoyo; Git se inicializó cuando el proyecto ya estaba avanzado. Clasificación `MAINTAINER_ATTESTED / B`.
**INTERVIEW DEFENSE:** explicar con naturalidad qué decisiones, validaciones y responsabilidad asumió Rafael, qué aportó la herramienta de IA y por qué el historial público empieza con un snapshot.
**RESIDUAL ISSUE:** averiguar o corregir la anotación `@author Alberto`; mientras permanezca, puede provocar una pregunta legítima.
**PRACTICE (15 min):** preparar una respuesta de 60 segundos sobre el workflow humano+IA y señalar dos decisiones concretas que Rafael validó personalmente.

## DG-02 - PreparedStatement e identificadores SQL

**TOPIC:** parametrización, validación y quoting de identificadores.
**WHY:** el claim actual de seguridad es demasiado amplio.
**PROJECT EVIDENCE:** `buildInsertSQL`, `generateCreateTableSQL`, `createTable`, `setParameter`.
**MUST EXPLAIN:** qué puede parametrizar un `PreparedStatement`, qué no, por qué los nombres de tabla/columna son un vector distinto y cómo validarlos por dialecto.
**TRADE-OFF QUESTION:** whitelist estricta vs quoting específico del motor vs metadatos JDBC.
**INTERVIEW QUESTION:** “¿Tu uso de PreparedStatement elimina toda posibilidad de SQL injection?”
**EXPECTED ANSWER ELEMENTS:** valores sí; identificadores no; validación `[A-Za-z_][A-Za-z0-9_]*`; palabras reservadas; quoting; mínimo privilegio.
**PRACTICE (25 min):** diseñar, sin modificar el repo, cinco casos de tabla/columna maliciosos o inválidos y escribir el contrato de un `SqlIdentifier` seguro multi-motor.

## DG-03 - Atomicidad, errores parciales y cancelación

**TOPIC:** límites transaccionales y estados `SUCCESS/PARTIAL/FAILED/CANCELLED`.
**WHY:** el código puede confirmar filas pese a errores o cancelación y luego presentar éxito global.
**PROJECT EVIDENCE:** catches por fila, `commit`, `rollback`, `cancel`, `ImportResult.finish`, `Task.setOnSucceeded`.
**MUST EXPLAIN:** cuándo se hace commit, qué excepciones se propagan, qué ocurre con DDL, batches pendientes y cancelación.
**TRADE-OFF QUESTION:** importación all-or-nothing vs best-effort con reporte de rechazados.
**INTERVIEW QUESTION:** “Si falla la fila 501 de 1000, ¿qué queda persistido y qué ve el usuario?”
**EXPECTED ANSWER ELEMENTS:** comportamiento actual exacto, ambigüedades por driver, problema de estado y diseño alternativo.
**PRACTICE (30 min):** trazar tres secuencias: error de conversión, `executeBatch` fallido y cancelación tras 1200 filas; asignar estado final y contenido persistido.

## DG-04 - Apache POI y memoria

**TOPIC:** usermodel vs streaming/event model.
**WHY:** README/arquitectura afirman streaming, pero el código no lo implementa.
**PROJECT EVIDENCE:** `createWorkbook` en `ExcelReaderService` e `ImportService`.
**MUST EXPLAIN:** `XSSFWorkbook`, `HSSFWorkbook`, `SXSSFWorkbook` (escritura) y SAX/XSSF event API (lectura).
**TRADE-OFF QUESTION:** simplicidad y acceso aleatorio vs memoria constante y procesamiento secuencial.
**INTERVIEW QUESTION:** “¿Cómo procesarías un `.xlsx` de 2 GB sin cargarlo entero?”
**EXPECTED ANSWER ELEMENTS:** event-based parsing, límites de `.xls`, ventana/memoria, fórmulas/shared strings, backpressure hacia batches.
**PRACTICE (25 min):** dibujar el pipeline SAX -> normalización -> batch JDBC y definir dos métricas de memoria y throughput para compararlo con el diseño actual.

## DG-05 - Portabilidad multi-motor

**TOPIC:** dialectos SQL y estrategia de pruebas.
**WHY:** existe validación manual real con los cuatro motores, pero su nivel de uso es distinto y no hay automatización reproducible.
**PROJECT EVIDENCE:** `DatabaseEngine`, `SqlDataType`, scripts SQL, DDL dinámico; settlement A04/A05.
**MUST EXPLAIN:** autoincremento, boolean/text/date, quoting, DDL transaccional, códigos de batch y URLs JDBC.
**TRADE-OFF QUESTION:** enum centralizado vs estrategia/dialect adapter por motor.
**INTERVIEW QUESTION:** “¿Qué significa exactamente que soportas Firebird?”
**EXPECTED ANSWER ELEMENTS:** Firebird y MySQL usados profesionalmente; MariaDB/PostgreSQL validados manualmente; matriz de capacidades, diferencias de dialecto y límites conocidos.
**PRACTICE (30 min):** crear una matriz con los cuatro motores y ocho comportamientos; marcar `professional use / manually validated / automated / unknown`.

## DG-06 - Criptografía y gestión de secretos - SECONDARY

**TOPIC:** cifrado autenticado y key management.
**WHY:** el cifrado se retira del relato principal porque no se utilizó profesionalmente, pero debe poder explicarse si un entrevistador inspecciona el repositorio.
**PROJECT EVIDENCE:** `EncryptionService`, `DatabaseConfig.useEncryption`, ausencia de llamadas desde controller/services.
**MUST EXPLAIN:** 16 bytes = AES-128, ECB implícito/determinismo, IV/nonce, GCM, salt/KDF, almacenamiento seguro de claves y por qué Base64 no valida cifrado.
**TRADE-OFF QUESTION:** Windows Credential Manager/OS keychain vs fichero cifrado con passphrase.
**INTERVIEW QUESTION:** “Si la clave está en el mismo JAR, ¿qué amenaza mitiga el cifrado?”
**EXPECTED ANSWER ELEMENTS:** prácticamente ninguna frente a quien obtiene el artefacto; modelo de amenazas; secreto fuera del código; AES-GCM.
**PRACTICE (20 min):** escribir un threat model de una página con activo, atacante, superficies, claves y decisión recomendada; sin implementar.

## DG-07 - Batch, pool y rendimiento medible

**TOPIC:** rendimiento JDBC y benchmarking.
**WHY:** hay mecanismos de rendimiento, pero ningún resultado medido.
**PROJECT EVIDENCE:** batch size 1000; Hikari pool 2..10; flujo secuencial por hoja.
**MUST EXPLAIN:** round-trips, tamaño de batch, commits, memoria, prepared-statement cache y por qué un pool de 10 no acelera una única conexión secuencial.
**TRADE-OFF QUESTION:** una conexión transaccional vs paralelizar lotes/hojas.
**INTERVIEW QUESTION:** “¿Cómo sabes que HikariCP y batches mejoraron el rendimiento?”
**EXPECTED ANSWER ELEMENTS:** hoy no se sabe; plan de benchmark reproducible; p50/p95, filas/s, memoria, igualdad de dataset.
**PRACTICE (25 min):** definir benchmark 1/100/1000/5000 batch con 100k filas, warm-up, misma BD y métricas; anticipar hipótesis sin inventar resultados.

## DG-08 - Versionado y build reproducible - AUTHORITY SETTLED

**TOPIC:** autoridad de versión y coherencia documental.
**WHY:** la autoridad ya está resuelta, pero la divergencia Java 21/25 sigue siendo visible y debe explicarse con precisión.
**PROJECT EVIDENCE:** commits M0-M5, `pom`, README, CV, portfolio y SDD B-003.
**MUST EXPLAIN:** qué es runtime, source/target/release, compatibilidad JavaFX, versionado SemVer y qué fuente manda.
**TRADE-OFF QUESTION:** LTS Java 21 vs feature release Java 25 para una herramienta distribuida.
**INTERVIEW QUESTION:** “¿Por qué tu CV dice Java 21 si el build exige Java 25?”
**EXPECTED ANSWER ELEMENTS:** Java 21 fue la versión profesional; Java 17 fue histórica; Java 25 fue una actualización automática posterior de Copilot y no una decisión profesional; el HEAD remoto no define por sí solo la versión de producto usada.
**PRACTICE (20 min):** redactar una ficha de versión con `source SHA`, JDK, JavaFX, dependencias, comando de build, resultado y artefacto hash.

## DG-09 - JavaFX concurrency y ciclo de vida

**TOPIC:** `Task`, cancelación, thread interruption y cierre de recursos.
**WHY:** UI en background es una buena decisión, pero el contrato de cancelación/cierre es incompleto.
**PROJECT EVIDENCE:** `MainController` crea threads; `Platform.runLater`; `MainApp.stop()` no cierra el pool.
**MUST EXPLAIN:** qué corre en FX Application Thread, cómo se propaga cancelación y quién posee/cierra el datasource.
**TRADE-OFF QUESTION:** threads manuales vs `ExecutorService` administrado.
**INTERVIEW QUESTION:** “¿Qué recursos quedan vivos al cerrar la ventana durante una importación?”
**EXPECTED ANSWER ELEMENTS:** task/thread, workbook, connection, pool, hooks de cierre y estados de UI.
**PRACTICE (20 min):** diseñar el lifecycle `start -> import -> cancel/complete -> stop`, asignando owner y close a cada recurso.

## DG-10 - Arquitectura defendible sin adjetivos

**TOPIC:** MVC, service layer, acoplamiento y cohesión.
**WHY:** la estructura por paquetes existe, pero “arquitectura sólida/escalable” excede la prueba.
**PROJECT EVIDENCE:** `MainController` (638 líneas), servicios concretos instanciados directamente, modelos JavaFX properties.
**MUST EXPLAIN:** responsabilidades reales, dependencias, testabilidad y por qué el modelo está acoplado a JavaFX.
**TRADE-OFF QUESTION:** simplicidad de una app pequeña vs puertos/interfaces y presenter/view-model.
**INTERVIEW QUESTION:** “¿Qué extraerías primero del controlador y por qué?”
**EXPECTED ANSWER ELEMENTS:** casos de uso, validación, ownership de tareas, gateways DB/Excel, tests focales; evitar sobrearquitectura.
**PRACTICE (30 min):** clasificar cada método de `MainController` como UI, orchestration, validation o domain; proponer dos seams, sin reescribir código.

# 19. TRAINING PLAN

Plan prioritario derivado de los seis ejes que concentran la defensa del proyecto:

| Sesión | Tema | Evidencia final de aprendizaje |
|---:|---|---|
| 1 | Excel `.xls/.xlsx`, normalización y mapping | Explicar POI usermodel, inferencia y límites de memoria |
| 2 | Abstracción multi-motor | Matriz de MySQL/Firebird/MariaDB/PostgreSQL con nivel real de validación |
| 3 | SQL y parametrización | Contrato `SqlIdentifier` + cinco casos adversos |
| 4 | Batch y transacciones | Tres trazas de error/cancelación + protocolo de benchmark |
| 5 | JavaFX background tasks | Diagrama de lifecycle, threads, cancelación y cierre de recursos |
| 6 | Simulación de entrevista | Defender los claims A/B en 60-90 segundos con evidencia y límites |

Sesiones secundarias, solo si el entrevistador profundiza en el repositorio: criptografía no utilizada, coherencia Java 21/25 y refactor arquitectónico del controlador.

**Criterio de salida:** cada claim del apartado 14 debe poder defenderse con una respuesta de 60-90 segundos, una referencia concreta y un límite reconocido. Los claims D/E no se entrenan para “venderlos”: se corrigen, se evidencian o se eliminan.

# 20. QUESTIONS REQUIRING MY AUTHORITY

## Autoridad resuelta

- Autoría desde cero con apoyo de un agente de IA y Git inicializado tarde.
- Uso profesional en Leovinci/Kit Digital.
- Java 21 como versión profesional; Java 17 histórica; Java 25 posterior y automática.
- MySQL/Firebird usados con clientes; MariaDB/PostgreSQL validados manualmente.
- Cifrado no utilizado profesionalmente.
- Preview, mapping, conexión, importación, operaciones SQL, dry-run y reportes presentes en el uso profesional.
- Captura `importador-db_old.png` creada por Rafael, con datos demo/no sensibles.
- Resultado profesional cualitativo sin métricas cuantitativas verificadas.

## Autoridad todavía requerida

1. ¿De dónde procede exactamente `@author Alberto` y puede explicarse como metadato erróneo/heredado generado durante el desarrollo?
2. ¿Leovinci autorizó la publicación bajo MIT del código `com.lc` y de cualquier material asociado?
3. ¿Por qué apareció `v1.2.5` y se revirtió a `v1.0.0`? ¿Debe publicarse alguna versión nominal o conviene omitirla?
4. ¿Cuál es la procedencia/licencia de la ilustración 3D `importador-db.png`?
5. ¿Hay más capturas, reportes o diagramas autorizables? Todo material con datos de cliente seguirá `INTERNAL_ONLY`.
6. Si se desea elevar uso/validación de B a A, ¿existe algún artefacto profesional sanitizable: build Java 21, log, reporte, manual, ticket o checksum?

---

## Próxima decisión recomendada

La autoridad funcional necesaria para redactar el copy ES/EN y un Interview Defense Pack ya está asentada. El copy debe usar Java 21 como versión profesional, expresar el alcance distinto de cada motor, omitir cifrado y métricas, y evitar convertir el estado Java 25 del HEAD en una decisión de producto. Las seis preguntas residuales pueden resolverse en paralelo; solo la autorización empresarial/licencia podría bloquear la publicación del repositorio o de material corporativo.
