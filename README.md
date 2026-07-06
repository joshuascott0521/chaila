# Chaila — Beauty Nails

Sitio web de **Chaila Beauty Nails**, construido con Next.js 16 (App Router),
React 19, TypeScript y Tailwind CSS v4.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
```

## Producción

```bash
npm run build
npm run start
```

## Estructura

```
src/
  app/            # Rutas (home + /about) y estilos globales
  components/     # Componentes de la interfaz
  lib/content.ts  # Todo el contenido y textos del sitio
  lib/utils.ts    # Utilidad cn()
public/
  images/         # Imágenes (hero, servicios, equipo, etc.)
  seo/            # Favicons / OG
```

## Notas

- El botón "Reservar ahora" y las tarjetas de la galería abren WhatsApp.
  El número está en `src/lib/content.ts` (`WHATSAPP_NUMBER` / `whatsappHref`).
- Paleta y tipografías definidas en `src/app/globals.css`.
