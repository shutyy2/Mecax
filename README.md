# Mecax · Manual de Taller + Diagnóstico Inteligente

Sitio web estático (HTML + CSS + JavaScript puro, sin frameworks ni pasos de build) con:

- Fichas técnicas de **mecánica** y **electrónica** de 6 modelos populares en Argentina (VW Gol Trend, Fiat Cronos, Chevrolet Onix, Peugeot 208, Toyota Hilux, Ford Ka).
- Minijuego **"Armá el motor"**: armado del motor en el orden correcto de banco.
- Minijuego **"Diagnóstico de taller"**: resolución de fallas comunes por auto, armando la secuencia de revisión correcta.
- **Diagnóstico Inteligente** (página aparte): el usuario elige un síntoma general (no arranca, pierde potencia, humo negro, etc.) y un árbol de decisiones de preguntas simples lo guía hasta las causas más probables y qué revisar, con nivel de urgencia y herramienta sugerida.

## Estructura

```
index.html                      → página principal (fichas técnicas + minijuegos por auto)
diagnostico-inteligente.html    → página del diagnóstico inteligente por síntomas
style.css                       → estilos de todo el sitio
data.js                         → datos técnicos de cada auto
app.js                          → lógica de fichas técnicas y minijuegos
diag-data.js                    → árboles de decisión por síntoma
diag-app.js                     → lógica del diagnóstico inteligente
```

## Cómo subirlo a GitHub

1. Creá un repositorio nuevo en GitHub (por ejemplo `mecax`).
2. Subí estos 7 archivos a la raíz del repositorio (podés arrastrarlos desde la web de GitHub en "Add file → Upload files", o por consola):

```bash
git init
git add .
git commit -m "Manual de taller + diagnóstico inteligente"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/mecax.git
git push -u origin main
```

## Cómo publicarlo como web con GitHub Pages (gratis)

1. En tu repositorio, andá a **Settings → Pages**.
2. En "Source", elegí la rama `main` y la carpeta `/ (root)`.
3. Guardá. En un par de minutos tu web va a estar disponible en:

```
https://TU_USUARIO.github.io/mecax/
```

No hace falta instalar nada ni compilar: al ser HTML/CSS/JS puro, funciona directo en el navegador.

## Para editar o ampliar

- Sumar un auto nuevo: agregá un objeto más al array `CARS` en `data.js`, siguiendo la misma estructura (mechanical, electrical, failures).
- Sumar un síntoma nuevo al Diagnóstico Inteligente: agregá una entrada en `SYMPTOMS` dentro de `diag-data.js`, con un nodo `root`, y nodos de tipo `question` (con `options` que apuntan a otro nodo) o `result` (con `causes`, `recommendation` y `severity`: `alta` | `media` | `baja`).
- Cambiar colores: están centralizados en `:root` en `style.css` (`--mech` y `--elec`).
- El minijuego de armado usa la misma secuencia (`ASSEMBLY_SEQUENCE`) para todos los autos; si querés una secuencia distinta por modelo, se puede mover ese array adentro de cada auto en `data.js` y ajustar `app.js` para leerlo de ahí.

## Próximos pasos sugeridos

Según lo conversado, las siguientes secciones quedan pendientes para futuras iteraciones: Inyección electrónica, Turbo, Transmisión, Suspensión, Frenos (ABS/ESP), Dirección, Sistema de carga/arranque como sección propia, Herramientas, y los extras (calculadora de torque, tabla de fusibles, tabla de códigos OBD2, comparador de sensores, simulador de circuitos, glosario, mantenimiento por kilometraje).

