# Portfolio de Rafael López

Portfolio personal estático construido con Astro 6 y Tailwind CSS. Presenta perfil profesional, proyectos destacados, experiencia, formación, habilidades, blog técnico, CV descargable y formulario de contacto.

## Estado actual

- Sitio estático configurado para GitHub Pages en `https://rafalopezzz.github.io/web-site`.
- Home con secciones de presentación, proyectos, experiencia, formación, habilidades y contacto.
- Blog técnico generado desde contenido Markdown en `src/content/blog`.
- Proyectos destacados generados desde `src/content/projects`:
  - Cosecha en Cope
  - ImportadorDB
  - Glea Nexo
- Formulario de contacto con Web3Forms, hCaptcha, validación cliente y honeypot anti-bot.
- SEO básico con canonical, Open Graph, Twitter Card, favicon y `lang="es"`.
- Deploy automático a GitHub Pages mediante GitHub Actions al hacer push a `master`.

## Stack

- Astro 6
- TypeScript
- Tailwind CSS 3
- Astro Content Collections
- `astro:assets` para imágenes optimizadas
- Web3Forms
- hCaptcha

## Requisitos

- Node.js `24` o superior
- npm

## Configuración local

Instala dependencias:

```bash
npm install
```

Crea un archivo `.env` desde `.env.example`:

```env
PUBLIC_WEB3FORMS_KEY=
PUBLIC_HCAPTCHA_SITEKEY=
```

Estas variables usan el prefijo `PUBLIC_` porque Astro solo expone al cliente las variables públicas. Sin ellas, el build falla de forma intencional desde `src/config/env.ts`.

## Comandos

```bash
npm run dev      # servidor local
npm run build    # build estático en dist/
npm run preview  # previsualizar el build
```

## Estructura principal

```text
src/
  components/        Componentes Astro reutilizables
  config/env.ts      Lectura y validación mínima de variables públicas
  content/blog/      Entradas del blog en Markdown
  content/projects/  Proyectos destacados en Markdown
  data/              Experiencia, formación, habilidades y certificados
  layouts/           Layout base con SEO y estilos globales
  pages/             Rutas del sitio
public/
  certificates/      Certificados públicos
  cv/                CV descargable
.github/workflows/   Deploy a GitHub Pages
```

## Formulario de contacto

El formulario envía el `POST` a `https://api.web3forms.com/submit` con:

- `access_key` de Web3Forms
- validación cliente de campos obligatorios, email y longitud
- honeypot anti-bot
- hCaptcha con `@hcaptcha/vanilla-hcaptcha`

El email destinatario se configura exclusivamente en el dashboard de Web3Forms, nunca en el código fuente.

## Deploy

Antes del primer deploy en GitHub Pages, añade estos secrets en `Settings -> Secrets and variables -> Actions`:

- `PUBLIC_WEB3FORMS_KEY`
- `PUBLIC_HCAPTCHA_SITEKEY`

El workflow usa Node 24, `npm ci`, `npm run build`, sube `dist/` como artifact y despliega con `actions/deploy-pages@v4`.
