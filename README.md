# Mecax · Manual de Taller + Diagnóstico Inteligente

Sitio web estático (HTML + CSS + JavaScript puro, sin frameworks ni pasos de build) con:

- Fichas técnicas de **mecánica** y **electrónica** de 6 modelos populares en Argentina (VW Gol Trend, Fiat Cronos, Chevrolet Onix, Peugeot 208, Toyota Hilux, Ford Ka).
- Minijuego **"Armá el motor"**: armado del motor en el orden correcto de banco.
- Minijuego **"Diagnóstico de taller"**: resolución de fallas comunes por auto, con validación paso a paso — cada acierto explica por qué ese paso va ahí, y cada error explica por qué esa opción no corresponde todavía.
- **Diagramas eléctricos**: por cada auto, 3 esquemas simplificados y clickeables (arranque/carga, iluminación, red CAN) armados con los valores reales de ese modelo (batería, alternador, tipo de faro, sistema de ECU). No son diagramas de fábrica: son material didáctico propio, pensado para entender cómo se conectan los sistemas.
- **Diagnóstico Inteligente** (página aparte): el usuario elige un síntoma general (no arranca, pierde potencia, humo negro, etc.) y un árbol de decisiones de preguntas simples lo guía hasta las causas más probables y qué revisar, con nivel de urgencia y herramienta sugerida.

## Estructura

```
index.html                      → página principal (fichas técnicas + minijuegos + diagramas por auto)
diagnostico-inteligente.html    → página del diagnóstico inteligente por síntomas
style.css                       → estilos de todo el sitio
data.js                         → datos técnicos de cada auto y sus fallas comunes (con explicaciones paso a paso)
diagrams.js                     → definiciones y render de los diagramas eléctricos por auto
app.js                          → lógica de fichas técnicas y minijuegos
diag-data.js                    → árboles de decisión por síntoma
diag-app.js                     → lógica del diagnóstico inteligente
```

## Cómo subirlo a GitHub

1. Creá un repositorio nuevo en GitHub (por ejemplo `mecax`).
2. Subí estos 8 archivos a la raíz del repositorio (podés arrastrarlos desde la web de GitHub en "Add file → Upload files", o por consola):

```bash
git init
git add .
git commit -m "Manual de taller + diagnóstico inteligente + diagramas eléctricos"
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

- Sumar un auto nuevo: agregá un objeto más al array `CARS` en `data.js`, siguiendo la misma estructura (mechanical, electrical, failures). Los diagramas eléctricos se generan solos a partir de esos mismos datos, no hace falta tocar `diagrams.js`.
- Sumar un síntoma nuevo al Diagnóstico Inteligente: agregá una entrada en `SYMPTOMS` dentro de `diag-data.js`, con un nodo `root`, y nodos de tipo `question` (con `options` que apuntan a otro nodo) o `result` (con `causes`, `recommendation` y `severity`: `alta` | `media` | `baja`).
- Sumar un paso o falla nueva al minijuego de diagnóstico por auto: en `data.js`, cada falla tiene `steps` (array de `{ text, reason }` en el orden correcto) y `distractors` (array de `{ text, reason }`); el `reason` es lo que se muestra al acertar o al elegir mal.
- Sumar un diagrama eléctrico nuevo: agregá una entrada en `DIAGRAM_DEFS` dentro de `diagrams.js`, con `components` (posición, tamaño, etiqueta y `info` explicativo) y `connections` (qué componente se conecta con cuál).
- Cambiar colores: están centralizados en `:root` en `style.css` (`--mech` y `--elec`).
- El minijuego de armado usa la misma secuencia (`ASSEMBLY_SEQUENCE`) para todos los autos; si querés una secuencia distinta por modelo, se puede mover ese array adentro de cada auto en `data.js` y ajustar `app.js` para leerlo de ahí.

## Aclaración sobre los diagramas eléctricos

Los diagramas incluidos son esquemas propios, simplificados y con fines educativos, construidos a partir de los datos técnicos ya cargados en el sitio (no son escaneos ni copias de manuales de fábrica, que están protegidos por derechos de autor). Sirven para entender cómo se conecta cada sistema, pero no reemplazan el diagrama oficial del fabricante para una reparación real.

## Próximos pasos sugeridos

Según lo conversado, las siguientes secciones quedan pendientes para futuras iteraciones: Inyección electrónica, Turbo, Transmisión, Suspensión, Frenos (ABS/ESP), Dirección, Sistema de carga/arranque como sección propia, Herramientas, y los extras (calculadora de torque, tabla de fusibles, tabla de códigos OBD2, comparador de sensores, simulador de circuitos, glosario, mantenimiento por kilometraje).

