# Testimonios automáticos — guía de configuración paso a paso

## Qué hace esta función

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

Para que el servidor pueda hacer ese commit necesita un **token de GitHub**
guardado en **Vercel**. Eso se configura UNA sola vez, tarda ~5 minutos, y es
lo que explica esta guía.

---

## Paso 1 — Crear el token de GitHub

> Hazlo con la cuenta dueña del repo (`joshuascott0521`).

1. Entra a **github.com** e inicia sesión.
2. Clic en tu **foto de perfil** (arriba a la derecha) → **Settings**.
3. En el menú izquierdo, baja hasta el final → **Developer settings**.
4. **Personal access tokens** → **Fine-grained tokens** → botón
   **Generate new token**.
5. Llena el formulario así:
   - **Token name:** `chaila-testimonios`
   - **Expiration:** `Custom` → elige la fecha más lejana posible
     (o `No expiration` si te aparece la opción).
   - **Repository access:** marca **Only select repositories** y en el
     desplegable elige **chaila**.
   - **Permissions** → **Repository permissions** → busca **Contents** y
     cámbialo a **Read and write**. (No toques ningún otro permiso.)
6. Botón verde **Generate token**.
7. **Copia el token ya** (empieza por `github_pat_...`). GitHub solo lo
   muestra una vez — guárdalo en un lugar seguro mientras haces el paso 2.

⚠️ Ese token permite editar el repo del sitio. No lo compartas ni lo pegues
en el código: solo va en Vercel (paso 2).

---

## Paso 2 — Poner las variables en Vercel

1. Entra a **vercel.com** e inicia sesión.
2. Abre el **proyecto del sitio** (chaila).
3. Pestaña **Settings** → menú izquierdo **Environment Variables**.
4. Agrega estas variables una por una (botón **Add / Save**). En
   **Environments** deja marcado al menos **Production**:

   | Name | Value |
   |---|---|
   | `GITHUB_TOKEN` | el token `github_pat_...` del paso 1 |
   | `GITHUB_REPO` | `joshuascott0521/chaila` |
   | `GITHUB_BRANCH` | `main` |
   | `TESTIMONIOS_CODE` | una palabra secreta que tú elijas, ej: `chaila2026` |

   > `TESTIMONIOS_CODE` es opcional pero **recomendado**: con él, solo quien
   > tenga el link completo con `?c=chaila2026` puede publicar. Sin esta
   > variable, cualquiera que descubra la página podría enviar testimonios.

5. **Redesplegar** para que tome las variables: pestaña **Deployments** →
   en el deploy más reciente, botón de los **tres puntos (⋯)** → **Redeploy**.

---

## Paso 3 — Probar que funciona

1. Abre `https://TU-DOMINIO/testimonio?c=chaila2026` (con tu dominio y tu
   código reales).
2. Envía un testimonio de prueba.
3. Verifica:
   - En **github.com/joshuascott0521/chaila** → pestaña *Commits* debe
     aparecer `Nuevo testimonio de <nombre>`.
   - En **Vercel** → *Deployments* arranca un deploy nuevo automáticamente.
   - Al terminar (1-2 min), el testimonio está en la sección Testimonios
     de la página.
4. Borra la prueba (ver "Borrar un testimonio" abajo).

---

## Paso 4 — Compartir el link con tus clientas

El link a compartir es:

```
https://TU-DOMINIO/testimonio?c=chaila2026
```

Mensaje sugerido para WhatsApp después de cada cita:

> ¡Gracias por tu visita! 💕 ¿Nos regalas tu opinión? Solo toma un minuto
> y aparece en nuestra página: https://TU-DOMINIO/testimonio?c=chaila2026

---

## Borrar un testimonio

Cada testimonio es una entrada en `src/data/testimonials.json` y un commit
propio (`Nuevo testimonio de <nombre>`). Dos formas de quitarlo:

- **Desde GitHub (sin instalar nada):** abre
  `src/data/testimonials.json` en github.com → botón del lápiz (editar) →
  borra el bloque `{ ... }` de ese testimonio (cuidando las comas) →
  **Commit changes**. Vercel redespliega solo.
- **Desde el computador:** edita el mismo archivo, guarda, `git commit` y
  `git push`.

---

## Si algo falla

| Síntoma | Causa probable | Solución |
|---|---|---|
| "La publicación automática no está configurada" | Falta `GITHUB_TOKEN` en Vercel | Paso 2 y redesplegar |
| "El link de invitación no es válido" | El link no lleva `?c=...` o el código no coincide | Comparte el link completo con el código de `TESTIMONIOS_CODE` |
| "No se pudo publicar el testimonio" | Token vencido o sin permiso *Contents: Read and write* sobre `chaila` | Genera un token nuevo (paso 1) y actualízalo en Vercel |
| El commit aparece pero la web no cambia | El deploy de Vercel falló | Revisa la pestaña *Deployments* en Vercel |

**Cuando el token expire**, GitHub te avisa por correo: genera uno nuevo
(paso 1) y reemplaza el valor de `GITHUB_TOKEN` en Vercel (paso 2).

---

## En desarrollo local

Sin `GITHUB_TOKEN`, el formulario escribe directo en
`src/data/testimonials.json` y el dev server recarga la página al instante.

Protecciones incluidas: campo honeypot anti-bots, límites de longitud,
código de invitación opcional y tope de 60 testimonios (los más nuevos
aparecen primero).
