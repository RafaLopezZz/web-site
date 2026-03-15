# Portfolio Astro

Sitio estático en Astro 4 desplegado en GitHub Pages.

## Variables de entorno

Crea un archivo `.env` en la raíz a partir de `.env.example`:

```env
PUBLIC_WEB3FORMS_KEY=
PUBLIC_HCAPTCHA_SITEKEY=
```

Estas variables usan el prefijo `PUBLIC_` porque Astro solo expone al cliente las variables públicas.

## Formulario de contacto

El formulario de contacto envía el `POST` a `https://api.web3forms.com/submit` con:

- `access_key` de Web3Forms
- validación cliente
- honeypot anti-bot
- hCaptcha con `@hcaptcha/vanilla-hcaptcha`

El email destinatario se configura exclusivamente en el dashboard de Web3Forms, nunca en el código fuente.

## GitHub Actions Secrets

Antes del primer deploy en GitHub Pages, añade estos secrets en `Settings -> Secrets and variables -> Actions`:

- `PUBLIC_WEB3FORMS_KEY`
- `PUBLIC_HCAPTCHA_SITEKEY`

El workflow de deploy inyecta ambos secretos en el paso de build para que Astro pueda generar el sitio estático con la configuración correcta.

## Comandos

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`
