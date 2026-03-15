export const ENV = {
  WEB3FORMS_KEY: import.meta.env.PUBLIC_WEB3FORMS_KEY,
  HCAPTCHA_SITEKEY: import.meta.env.PUBLIC_HCAPTCHA_SITEKEY,
} as const;

if (!ENV.WEB3FORMS_KEY || !ENV.HCAPTCHA_SITEKEY) {
  throw new Error("Faltan variables de entorno. Revisa .env.example");
}
