/* ---------------------------------------------------------
   ESTADO GLOBAL
--------------------------------------------------------- */

const MECH_ACCENT = "#E8871E";
const ELEC_ACCENT = "#4FB6BE";

const state = {
  carId: CARS[0].id,
  system: "mecanica", // 'mecanica' | 'electronica'
  view: "ficha", // 'ficha' | 'armado' | 'diagnostico'
  openInfoKey: null,

  assembly: null, // se inicializa con initAssembly()
  diagnostic: null, // se inicializa con initDiagnostic()
};

function currentCar() {
  return CARS.find((c) => c.id === state.carId);
}

function accentColor() {
  return state.system === "mecanica" ? MECH_ACCENT : ELEC_ACCENT;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------------------------------------------------------
   RENDER: SELECTOR DE AUTO
--------------------------------------------------------- */

function renderCarSelector() {
  const el = document.getElementById("car-selector");
  el.innerHTML = CARS.map(
    (c) => `
    <button class="car-card ${c.id === state.carId ? "active" : ""}" data-car-id="${c.id}">
      <div class="name">${c.brand.toUpperCase()} ${c.model.toUpperCase()}</div>
      <div class="tag">${c.tag}</div>
    </button>
  `
  ).join("");

  el.querySelectorAll(".car-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.carId = btn.dataset.carId;
      state.openInfoKey = null;
      state.diagnostic = null;
      renderAll();
    });
  });
}

/* ---------------------------------------------------------
   RENDER: TABS DE SISTEMA Y VISTA
--------------------------------------------------------- */

function renderSystemTabs() {
  const el = document.getElementById("system-tabs");
  el.innerHTML = `
    <button class="tab-btn" id="tab-mecanica" style="border-color:${state.system === "mecanica" ? MECH_ACCENT : "var(--border)"}; color:${state.system === "mecanica" ? MECH_ACCENT : "var(--text-dim)"}">
      🔧 MECÁNICA
    </button>
    <button class="tab-btn" id="tab-electronica" style="border-color:${state.system === "electronica" ? ELEC_ACCENT : "var(--border)"}; color:${state.system === "electronica" ? ELEC_ACCENT : "var(--text-dim)"}">
      ⚡ ELECTRÓNICA
    </button>
  `;
  document.getElementById("tab-mecanica").addEventListener("click", () => {
    state.system = "mecanica";
    state.openInfoKey = null;
    renderAll();
  });
  document.getElementById("tab-electronica").addEventListener("click", () => {
    state.system = "electronica";
    state.openInfoKey = null;
    renderAll();
  });
}

function renderViewTabs() {
  const el = document.getElementById("view-tabs");
  const accent = accentColor();
  const views = [
    { id: "ficha", label: "FICHA TÉCNICA" },
    { id: "armado", label: "ARMÁ EL MOTOR" },
    { id: "diagnostico", label: "DIAGNÓSTICO" },
  ];
  el.innerHTML = views
    .map(
      (v) => `
      <button class="tab-btn" data-view="${v.id}" style="border-color:${state.view === v.id ? accent : "var(--border)"}; color:${state.view === v.id ? accent : "var(--text-dimmer)"}">
        ${v.label}
      </button>
    `
    )
    .join("");

  el.querySelectorAll("[data-view]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.view = btn.dataset.view;
      renderAll();
    });
  });
}

/* ---------------------------------------------------------
   RENDER: VISTA FICHA TÉCNICA
--------------------------------------------------------- */

function renderFicha() {
  const car = currentCar();
  const accent = accentColor();
  const data = state.system === "mecanica" ? car.mechanical : car.electrical;
  const entries = Object.entries(data);

  const html = `
    <div class="info-grid">
      ${entries
        .map(([key, item]) => {
          const isOpen = state.openInfoKey === key;
          return `
          <div class="info-card" style="border-color:${isOpen ? accent : "var(--border)"}">
            <button class="info-card-header" data-key="${key}">
              <div class="info-card-left">
                <div class="icon-badge" style="background:${accent}22; color:${accent}">${ICONS[item.icon] || "🔧"}</div>
                <span class="info-card-title">${item.title.toUpperCase()}</span>
              </div>
              <span class="chevron ${isOpen ? "open" : ""}">▸</span>
            </button>
            ${
              isOpen
                ? `<div class="info-card-body">
                    <p class="info-card-desc">${item.desc}</p>
                    <table class="spec-table">
                      <tbody>
                        ${Object.entries(item.specs)
                          .map(([k, v]) => `<tr><td>${k.toUpperCase()}</td><td>${v}</td></tr>`)
                          .join("")}
                      </tbody>
                    </table>
                  </div>`
                : ""
            }
          </div>
        `;
        })
        .join("")}
    </div>
  `;

  const container = document.getElementById("view-container");
  container.innerHTML = html;

  container.querySelectorAll(".info-card-header").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.key;
      state.openInfoKey = state.openInfoKey === key ? null : key;
      renderFicha();
    });
  });
}

/* ---------------------------------------------------------
   MINIJUEGO: ARMÁ EL MOTOR
--------------------------------------------------------- */

function initAssembly() {
  state.assembly = {
    built: [],
    pool: shuffle(ASSEMBLY_SEQUENCE),
    message: null,
    mistakes: 0,
  };
}

function placeAssemblyPart(part) {
  const g = state.assembly;
  const nextIndex = g.built.length;
  const expected = ASSEMBLY_SEQUENCE[nextIndex];

  if (part === expected) {
    g.built.push(part);
    g.pool = g.pool.filter((p) => p !== part);
    g.message = { ok: true, text: `Correcto: ${part} en su lugar.` };
    if (g.built.length === ASSEMBLY_SEQUENCE.length) {
      g.message = { ok: true, text: "¡Motor armado completo! Buen trabajo de banco." };
    }
  } else {
    g.mistakes += 1;
    g.message = { ok: false, text: `Todavía no. Antes de "${part}" falta otra pieza en la secuencia de armado.` };
  }
  renderArmado();
}

function renderArmado() {
  if (!state.assembly) initAssembly();
  const g = state.assembly;
  const accent = MECH_ACCENT;

  const container = document.getElementById("view-container");
  container.innerHTML = `
    <h3 class="game-title">ARMÁ EL MOTOR, PASO A PASO</h3>
    <p class="game-desc">Tocá las piezas en el orden correcto de armado de banco. Si te equivocás no pasa nada: probá otra vez, no hay límite de intentos.</p>

    <div class="game-columns">
      <div class="game-box">
        <div class="box-label">PIEZAS DISPONIBLES</div>
        <div class="chip-list" id="assembly-pool">
          ${
            g.pool.length === 0
              ? `<span class="empty-note">No quedan piezas.</span>`
              : g.pool.map((p) => `<button class="chip-btn" data-part="${p}">${p}</button>`).join("")
          }
        </div>
      </div>

      <div class="game-box">
        <div class="box-label">SECUENCIA DE ARMADO (${g.built.length}/${ASSEMBLY_SEQUENCE.length})</div>
        <ol class="seq-list">
          ${ASSEMBLY_SEQUENCE.map((step, i) => {
            const filled = i < g.built.length;
            return `
              <li class="seq-item ${filled ? "filled" : ""}" style="${filled ? `background:${accent}1a` : ""}">
                <span class="seq-num" style="color:${filled ? accent : ""}">${String(i + 1).padStart(2, "0")}</span>
                ${filled ? g.built[i] : "·  ·  ·  ·  ·  ·  ·"}
              </li>
            `;
          }).join("")}
        </ol>
      </div>
    </div>

    ${
      g.message
        ? `<div class="msg-box ${g.message.ok ? "ok" : "err"}" style="${g.message.ok ? `color:${accent}; border-color:${accent}; background:${accent}14;` : ""}">
            ${g.message.ok ? "✅" : "⚠️"} ${g.message.text}
          </div>`
        : ""
    }

    <div class="actions-row">
      <button class="btn-ghost" id="assembly-reset">↺ Desarmar y reiniciar</button>
      ${g.mistakes > 0 ? `<span class="hint-note">Intentos fallidos: ${g.mistakes}</span>` : ""}
    </div>
  `;

  container.querySelectorAll("[data-part]").forEach((btn) => {
    btn.addEventListener("click", () => placeAssemblyPart(btn.dataset.part));
  });
  document.getElementById("assembly-reset").addEventListener("click", () => {
    initAssembly();
    renderArmado();
  });
}

/* ---------------------------------------------------------
   MINIJUEGO: DIAGNÓSTICO DE TALLER
--------------------------------------------------------- */

function buildDiagnosticOptions(failure) {
  const combined = [
    ...failure.steps.map((s) => ({ text: s.text, reason: s.reason, kind: "step" })),
    ...failure.distractors.map((d) => ({ text: d.text, reason: d.reason, kind: "distractor" })),
  ];
  return shuffle(combined);
}

function initDiagnostic() {
  const car = currentCar();
  const failure = car.failures[0];
  state.diagnostic = {
    carId: car.id,
    failure,
    options: buildDiagnosticOptions(failure),
    chosen: [], // array de { text, reason }
    message: null,
    mistakes: 0,
  };
}

function selectFailure(failureId) {
  const car = currentCar();
  const failure = car.failures.find((f) => f.id === failureId);
  state.diagnostic = {
    carId: car.id,
    failure,
    options: buildDiagnosticOptions(failure),
    chosen: [],
    message: null,
    mistakes: 0,
  };
  renderDiagnostico();
}

function attemptDiagnosticStep(optionText) {
  const d = state.diagnostic;
  const failure = d.failure;
  const nextIndex = d.chosen.length;
  const expectedStep = failure.steps[nextIndex];
  const option = d.options.find((o) => o.text === optionText);

  if (option.text === expectedStep.text) {
    d.chosen.push({ text: expectedStep.text, reason: expectedStep.reason });
    d.options = d.options.filter((o) => o.text !== optionText);
    const isDone = d.chosen.length === failure.steps.length;
    d.message = {
      ok: true,
      text: isDone
        ? `Correcto: ${expectedStep.reason} Con esto, el diagnóstico queda completo.`
        : `Correcto: ${expectedStep.reason}`,
    };
  } else if (option.kind === "step") {
    d.mistakes += 1;
    d.message = {
      ok: false,
      text: `Ese paso es válido para esta falla, pero todavía no es el que sigue. Pensá qué conviene descartar primero.`,
    };
  } else {
    d.mistakes += 1;
    d.message = { ok: false, text: option.reason };
  }
  renderDiagnostico();
}

function renderDiagnostico() {
  const car = currentCar();
  if (!state.diagnostic || state.diagnostic.carId !== car.id) initDiagnostic();
  const d = state.diagnostic;
  const accent = accentColor();
  const failure = d.failure;
  const isDone = d.chosen.length === failure.steps.length;

  const container = document.getElementById("view-container");
  container.innerHTML = `
    <h3 class="game-title">DIAGNÓSTICO DE TALLER</h3>
    <p class="game-desc">Elegí una falla común y armá la secuencia de revisión, paso por paso. Cada vez que acertás un paso te explicamos por qué va ahí; si te equivocás, te explicamos por qué esa opción no corresponde todavía. Podés intentar las veces que quieras.</p>

    <div class="failure-picker">
      ${car.failures
        .map(
          (f) => `
        <button class="failure-chip" data-failure-id="${f.id}" style="border-color:${d.failure.id === f.id ? accent : "var(--border)"}; color:${d.failure.id === f.id ? accent : "var(--text-dimmer)"}">
          ${f.system === "mecanica" ? "🔧" : "⚡"} ${f.title}
        </button>
      `
        )
        .join("")}
    </div>

    <div class="symptom-box">
      <span class="sym-icon" style="color:${accent}">⚠️</span>
      <div>
        <div class="box-label">SÍNTOMA REPORTADO</div>
        <p>${failure.symptom}</p>
      </div>
    </div>

    ${
      d.message
        ? `<div class="msg-box ${d.message.ok ? "ok" : "err"}" style="${d.message.ok ? `color:${accent}; border-color:${accent}; background:${accent}14;` : ""}">
            ${d.message.ok ? "✅" : "⚠️"} ${d.message.text}
          </div>`
        : ""
    }

    <div class="game-columns">
      <div class="game-box">
        <div class="box-label">POSIBLES REVISIONES</div>
        <div class="chip-list" id="diag-options" style="flex-direction:column; align-items:stretch;">
          ${
            isDone
              ? `<span class="empty-note">Diagnóstico completo, no hace falta seguir revisando.</span>`
              : d.options.map((o) => `<button class="chip-btn" data-step="${encodeURIComponent(o.text)}">${o.text}</button>`).join("")
          }
        </div>
      </div>

      <div class="game-box">
        <div class="box-label">ORDEN DE TRABAJO (${d.chosen.length}/${failure.steps.length})</div>
        ${d.chosen.length === 0 ? `<span class="empty-note">Todavía no confirmaste ningún paso.</span>` : ""}
        <ol class="seq-list diag-order-list">
          ${d.chosen
            .map(
              (c, i) => `
            <li class="step-row-explained" style="background:${accent}14; border-left:3px solid ${accent}">
              <div class="step-row-text"><span class="seq-num" style="color:${accent}">${String(i + 1).padStart(2, "0")}</span> <strong>${c.text}</strong></div>
              <p class="step-reason">${c.reason}</p>
            </li>
          `
            )
            .join("")}
        </ol>
      </div>
    </div>

    <div class="actions-row">
      <button class="btn-ghost" id="diag-reset">↺ Reiniciar esta falla</button>
      ${d.mistakes > 0 ? `<span class="hint-note">Intentos fallidos: ${d.mistakes}</span>` : ""}
    </div>
  `;

  container.querySelectorAll("[data-step]").forEach((btn) => {
    btn.addEventListener("click", () => attemptDiagnosticStep(decodeURIComponent(btn.dataset.step)));
  });
  container.querySelectorAll("[data-failure-id]").forEach((btn) => {
    btn.addEventListener("click", () => selectFailure(btn.dataset.failureId));
  });
  document.getElementById("diag-reset").addEventListener("click", () => {
    selectFailure(d.failure.id);
  });
}

/* ---------------------------------------------------------
   RENDER PRINCIPAL
--------------------------------------------------------- */

function renderView() {
  if (state.view === "ficha") renderFicha();
  else if (state.view === "armado") renderArmado();
  else if (state.view === "diagnostico") renderDiagnostico();
}

function renderAll() {
  renderCarSelector();
  renderSystemTabs();
  renderViewTabs();
  renderView();
}

document.addEventListener("DOMContentLoaded", renderAll);
