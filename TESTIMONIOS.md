# Testimonios automáticos — cómo funciona y cómo configurarlo

## Qué hace

Las clientas abren un link, llenan un formulario corto (nombre, servicio,
estrellas y comentario) y su testimonio **aparece solo en la web** unos minutos
después. No hay que tocar código ni copiar mensajes.

```
Clienta llena /testimonio
        │
        ▼
POST /api/testimonios  ──►  commit a src/data/testimonials.json en GitHub
                                    │
                                    ▼
                     Vercel detecta el push y redespliega
                                    │
                                    ▼
                  El testimonio aparece en la sección Testimonios
```

## El link que se comparte

- Sin código de invitación: `https://tu-dominio.com/testimonio`
- Con código (recomendado): `https://tu-dominio.com/testimonio?c=TU_CODIGO`

Compártelo por WhatsApp después de cada cita, por ejemplo:

> ¡Gracias por tu visita! 💕 ¿Nos regalas tu opinión? Solo toma un minuto:
> https://tu-dominio.com/testimonio?c=TU_CODIGO

## Configuración en producción (una sola vez)

1. **Crear el token de GitHub** (dueño del repo `joshuascott0521/chaila`):
   - Ir a https://github.com/settings/personal-access-tokens/new
   - Repository access → *Only select repositories* → elegir `chaila`
   - Permissions → *Contents* → **Read and write** (nada más)
   - Generar y copiar el token.
2. **En Vercel** → proyecto → *Settings* → *Environment Variables*, agregar:
   - `GITHUB_TOKEN` = el token del paso 1
   - `GITHUB_REPO` = `joshuascott0521/chaila`
   - `GITHUB_BRANCH` = `main`
   - `TESTIMONIOS_CODE` = una palabra secreta (opcional pero recomendado;
     define el `?c=` del link)
3. Redesplegar el proyecto para que tome las variables.

## Moderación / borrar un testimonio

Cada testimonio es una entrada en `src/data/testimonials.json` (y un commit
con el nombre de la clienta). Para quitar uno: borrar su bloque del JSON,
commitear y push — o revertir el commit `Nuevo testimonio de <nombre>`.

Protecciones incluidas: campo honeypot anti-bots, límites de longitud,
código de invitación opcional y tope de 60 testimonios (los más nuevos
aparecen primero).

## En desarrollo local

Sin `GITHUB_TOKEN`, el formulario escribe directo en
`src/data/testimonials.json` y el dev server recarga la página al instante.
