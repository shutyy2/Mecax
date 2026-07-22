/* ---------------------------------------------------------
   DIAGRAMAS ELÉCTRICOS
   Esquemas simplificados y educativos por sistema (arranque/carga,
   iluminación, red CAN), armados con los valores reales de cada
   auto (batería, alternador, tipo de faro, sistema de ECU, etc.).
   No son diagramas de fábrica: son material didáctico propio.
--------------------------------------------------------- */

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const DIAGRAM_DEFS = {
  arranque_carga: {
    label: "Arranque y carga",
    build(car) {
      const enc = car.electrical.encendido.specs;
      return {
        components: [
          { id: "bateria", x: 30, y: 140, w: 140, h: 70, label: "BATERÍA", sub: enc["Batería"] || "—", info: `Acumula la energía eléctrica del auto y entrega la corriente inicial para mover el motor de arranque. En este modelo: ${enc["Batería"] || "sin dato"}.` },
          { id: "llave", x: 225, y: 55, w: 130, h: 55, label: "LLAVE DE CONTACTO", sub: "", info: "Cierra el circuito de arranque cuando se gira la llave o se presiona el botón de encendido, dejando pasar la corriente hacia el motor de arranque." },
          { id: "arranque", x: 405, y: 55, w: 160, h: 60, label: "MOTOR DE ARRANQUE", sub: enc["Arranque"] || "—", info: `Convierte la corriente de la batería en movimiento para hacer girar el motor hasta que arranca. En este modelo: ${enc["Arranque"] || "sin dato"}.` },
          { id: "alternador", x: 405, y: 225, w: 160, h: 60, label: "ALTERNADOR", sub: enc["Alternador"] || "—", info: `Genera electricidad mientras el motor está en marcha, recargando la batería y alimentando los consumos del auto. En este modelo: ${enc["Alternador"] || "sin dato"}.` },
          { id: "regulador", x: 225, y: 225, w: 130, h: 55, label: "REGULADOR", sub: "", info: "Controla la tensión que entrega el alternador para que la batería se cargue de forma constante, sin sobrecargarse." },
        ],
        connections: [
          { from: "bateria", to: "llave", thick: true },
          { from: "llave", to: "arranque", thick: true },
          { from: "alternador", to: "regulador", thick: false },
          { from: "regulador", to: "bateria", thick: false },
        ],
      };
    },
  },
  iluminacion: {
    label: "Iluminación",
    build(car) {
      const il = car.electrical.iluminacion.specs;
      return {
        components: [
          { id: "bateria2", x: 30, y: 140, w: 130, h: 60, label: "BATERÍA", sub: "12V", info: "Alimenta todo el circuito de luces del auto." },
          { id: "fusible", x: 200, y: 140, w: 140, h: 60, label: "FUSIBLE GENERAL", sub: il["Fusibles"] || "Caja de fusibles", info: "Protege el circuito: si hay un cortocircuito, se corta antes de que se dañen los cables o los componentes." },
          { id: "rele", x: 380, y: 55, w: 140, h: 60, label: "RELÉ DE LUCES", sub: "", info: "Permite manejar la corriente alta de los faros usando un mando de baja corriente (la llave de luces), protegiendo el interruptor del tablero." },
          { id: "llave_luces", x: 380, y: 225, w: 140, h: 60, label: "LLAVE DE LUCES", sub: "", info: "Es el interruptor que acciona el conductor; envía solo una señal de baja corriente al relé, no la corriente real de los faros." },
          { id: "faro", x: 570, y: 55, w: 160, h: 60, label: "FARO DELANTERO", sub: il["Baja"] || "—", info: `Es donde efectivamente se enciende la luz. En este modelo: ${il["Baja"] || "sin dato"}.` },
        ],
        connections: [
          { from: "bateria2", to: "fusible", thick: true },
          { from: "fusible", to: "rele", thick: true },
          { from: "fusible", to: "llave_luces", thick: false },
          { from: "llave_luces", to: "rele", thick: false },
          { from: "rele", to: "faro", thick: true },
        ],
      };
    },
  },
  can_bus: {
    label: "Red CAN",
    build(car) {
      const ecu = car.electrical.ecu.specs;
      return {
        components: [
          { id: "ecu", x: 30, y: 140, w: 160, h: 70, label: "ECU / MÓDULO DE MOTOR", sub: ecu["Sistema"] || "—", info: `Es la computadora que gestiona el motor. En este modelo: ${ecu["Sistema"] || "sin dato"}, con protocolo ${ecu["Protocolo"] || "OBD-II"}.` },
          { id: "bus", x: 230, y: 168, w: 340, h: 24, label: "BUS CAN", sub: "", info: "Es un par de cables por donde todos los módulos del auto se envían información entre sí, en lugar de tener un cable dedicado para cada dato." },
          { id: "tablero", x: 610, y: 50, w: 150, h: 60, label: "TABLERO (CLUSTER)", sub: "", info: "Recibe datos de la ECU y de otros módulos por el bus CAN para mostrar velocidad, temperatura y testigos de falla." },
          { id: "abs", x: 610, y: 140, w: 150, h: 60, label: "MÓDULO ABS", sub: "", info: "Comparte por el mismo bus la información de velocidad de ruedas y frenado con la ECU y el resto de los módulos." },
          { id: "obd", x: 610, y: 230, w: 150, h: 60, label: "CONECTOR OBD-II", sub: "", info: "Es el punto donde se conecta un escáner para leer todos los datos que circulan por el bus CAN, incluidos los códigos de falla (DTC)." },
        ],
        connections: [
          { from: "ecu", to: "bus", thick: true },
          { from: "bus", to: "tablero", thick: false },
          { from: "bus", to: "abs", thick: false },
          { from: "bus", to: "obd", thick: false },
        ],
      };
    },
  },
};

function connectionAnchor(box) {
  return { x: box.x + box.w / 2, y: box.y + box.h / 2 };
}

function renderDiagramSVG(def, accent, w = 760, h = 320) {
  let svg = `<svg viewBox="0 0 ${w} ${h}" class="diagram-svg" xmlns="http://www.w3.org/2000/svg">`;

  (def.connections || []).forEach((conn) => {
    const from = def.components.find((c) => c.id === conn.from);
    const to = def.components.find((c) => c.id === conn.to);
    const a = connectionAnchor(from);
    const b = connectionAnchor(to);
    const strokeWidth = conn.thick ? 3 : 1.5;
    svg += `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${accent}" stroke-width="${strokeWidth}" opacity="0.5" />`;
  });

  def.components.forEach((c) => {
    const midY = c.y + c.h / 2;
    const labelY = c.sub ? midY - 6 : midY + 4;
    svg += `
      <g class="diagram-component" data-comp-id="${c.id}">
        <rect x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="4" fill="rgba(255,255,255,0.04)" stroke="${accent}" stroke-width="1.5" />
        <text x="${c.x + c.w / 2}" y="${labelY}" text-anchor="middle" fill="#F2EDE4" font-size="10.5" font-family="'IBM Plex Mono', monospace" font-weight="600">${escapeXml(c.label)}</text>
        ${
          c.sub
            ? `<text x="${c.x + c.w / 2}" y="${midY + 14}" text-anchor="middle" fill="${accent}" font-size="9.5" font-family="'IBM Plex Mono', monospace">${escapeXml(c.sub)}</text>`
            : ""
        }
      </g>
    `;
  });

  svg += `</svg>`;
  return svg;
}

/* ---------------------------------------------------------
   RENDER
--------------------------------------------------------- */

function renderDiagramas() {
  const car = currentCar();
  if (!state.diagramType) state.diagramType = "arranque_carga";
  const defBuilder = DIAGRAM_DEFS[state.diagramType];
  const def = defBuilder.build(car);
  const accent = ELEC_ACCENT;
  const selected = state.diagramSelectedComponent ? def.components.find((c) => c.id === state.diagramSelectedComponent) : null;

  const container = document.getElementById("view-container");
  container.innerHTML = `
    <h3 class="game-title">DIAGRAMAS ELÉCTRICOS — ${car.brand.toUpperCase()} ${car.model.toUpperCase()}</h3>
    <p class="game-desc">Esquemas simplificados con fines educativos, armados con los valores reales de este modelo. No reemplazan el diagrama de fábrica: sirven para entender cómo se conectan los sistemas.</p>

    <div class="diagram-tabs">
      ${Object.entries(DIAGRAM_DEFS)
        .map(
          ([key, d]) => `
        <button class="diagram-tab-btn" data-diagram="${key}" style="border-color:${state.diagramType === key ? accent : "var(--border)"}; color:${state.diagramType === key ? accent : "var(--text-dimmer)"}">
          ${d.label}
        </button>
      `
        )
        .join("")}
    </div>

    <div class="diagram-box">
      ${renderDiagramSVG(def, accent)}
    </div>

    ${
      selected
        ? `<div class="diagram-info-box" style="border-color:${accent}">
            <div class="box-label" style="color:${accent}">${selected.label}${selected.sub ? " · " + selected.sub : ""}</div>
            <p>${selected.info}</p>
          </div>`
        : `<p class="hint-note">Tocá cualquier componente del esquema para ver qué función cumple.</p>`
    }
  `;

  container.querySelectorAll("[data-diagram]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.diagramType = btn.dataset.diagram;
      state.diagramSelectedComponent = null;
      renderDiagramas();
    });
  });
  container.querySelectorAll("[data-comp-id]").forEach((el) => {
    el.addEventListener("click", () => {
      state.diagramSelectedComponent = el.dataset.compId;
      renderDiagramas();
    });
  });
}
