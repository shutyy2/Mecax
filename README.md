# Manual de Taller · Autos en Argentina

Sitio web estático (HTML + CSS + JavaScript puro, sin frameworks ni pasos de build) con:

- Fichas técnicas de **mecánica** y **electrónica** de 6 modelos populares en Argentina (VW Gol Trend, Fiat Cronos, Chevrolet Onix, Peugeot 208, Toyota Hilux, Ford Ka).
- Minijuego **"Armá el motor"**: armado del motor en el orden correcto de banco.
- Minijuego **"Diagnóstico de taller"**: resolución de fallas comunes armando la secuencia de revisión correcta.

## Estructura

```
index.html   → estructura de la página
style.css    → estilos
data.js      → datos técnicos de cada auto
app.js       → lógica de la aplicación (estado, render, minijuegos)
```

## Cómo subirlo a GitHub

1. Creá un repositorio nuevo en GitHub (por ejemplo `manual-argento`).
2. Subí estos 4 archivos a la raíz del repositorio (podés arrastrarlos desde la web de GitHub en "Add file → Upload files", o por consola):

```bash
git init
git add .
git commit -m "Primera versión del manual de taller"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/manual-argento.git
git push -u origin main
```

## Cómo publicarlo como web con GitHub Pages (gratis)

1. En tu repositorio, andá a **Settings → Pages**.
2. En "Source", elegí la rama `main` y la carpeta `/ (root)`.
3. Guardá. En un par de minutos tu web va a estar disponible en:

```
https://TU_USUARIO.github.io/manual-argento/
```

No hace falta instalar nada ni compilar: al ser HTML/CSS/JS puro, funciona directo en el navegador.

## Para editar o ampliar

- Sumar un auto nuevo: agregá un objeto más al array `CARS` en `data.js`, siguiendo la misma estructura (mechanical, electrical, failures).
- Cambiar colores: están centralizados en `:root` en `style.css` (`--mech` y `--elec`).
- El minijuego de armado usa la misma secuencia (`ASSEMBLY_SEQUENCE`) para todos los autos; si querés una secuencia distinta por modelo, se puede mover ese array adentro de cada auto en `data.js` y ajustar `app.js` para leerlo de ahí.
