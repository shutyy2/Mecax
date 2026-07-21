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

function shuffleSteps(failure) {
  return shuffle([...failure.correctSteps, ...failure.distractors]);
}

function initDiagnostic() {
  const car = currentCar();
  const failure = car.failures[0];
  state.diagnostic = {
    carId: car.id,
    failure,
    candidates: shuffleSteps(failure),
    chosen: [],
    result: null,
  };
}

function selectFailure(failureId) {
  const car = currentCar();
  const failure = car.failures.find((f) => f.id === failureId);
  state.diagnostic = {
    carId: car.id,
    failure,
    candidates: shuffleSteps(failure),
    chosen: [],
    result: null,
  };
  renderDiagnostico();
}

function addDiagnosticStep(step) {
  const d = state.diagnostic;
  d.chosen.push(step);
  d.candidates = d.candidates.filter((c) => c !== step);
  d.result = null;
  renderDiagnostico();
}

function removeDiagnosticStep(index) {
  const d = state.diagnostic;
  const step = d.chosen[index];
  d.chosen = d.chosen.filter((_, i) => i !== index);
  d.candidates.push(step);
  d.result = null;
  renderDiagnostico();
}

function checkDiagnostic() {
  const d = state.diagnostic;
  const correct = d.failure.correctSteps;
  const chosenCorrectOnly = d.chosen.filter((s) => correct.includes(s));
  const hasWrong = d.chosen.some((s) => !correct.includes(s));
  const rightOrder = correct.every((s, i) => chosenCorrectOnly[i] === s);
  const complete = chosenCorrectOnly.length === correct.length;

  if (complete && rightOrder && !hasWrong) {
    d.result = { ok: true, text: "Diagnóstico resuelto: reparación completa y en el orden lógico de un taller." };
  } else if (hasWrong) {
    d.result = { ok: false, text: "Incluiste un paso que no corresponde a esta falla. Sacalo de la lista e intentá de nuevo." };
  } else if (!rightOrder) {
    d.result = { ok: false, text: "El orden no es el más eficiente para diagnosticar esta falla. Pensá qué se revisa primero." };
  } else {
    d.result = { ok: false, text: "Todavía falta algún paso para completar el diagnóstico." };
  }
  renderDiagnostico();
}

function renderDiagnostico() {
  const car = currentCar();
  if (!state.diagnostic || state.diagnostic.carId !== car.id) initDiagnostic();
  const d = state.diagnostic;
  const accent = accentColor();

  const container = document.getElementById("view-container");
  container.innerHTML = `
    <h3 class="game-title">DIAGNÓSTICO DE TALLER</h3>
    <p class="game-desc">Elegí una falla común, armá la secuencia de revisión y confirmá. Podés sacar pasos y volver a intentar las veces que quieras.</p>

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
        <p>${d.failure.symptom}</p>
      </div>
    </div>

    <div class="game-columns">
      <div class="game-box">
        <div class="box-label">POSIBLES REVISIONES</div>
        <div class="chip-list" id="diag-candidates" style="flex-direction:column; align-items:stretch;">
          ${
            d.candidates.length === 0
              ? `<span class="empty-note">No hay más opciones disponibles.</span>`
              : d.candidates.map((c) => `<button class="chip-btn" data-step="${encodeURIComponent(c)}">${c}</button>`).join("")
          }
        </div>
      </div>

      <div class="game-box">
        <div class="box-label">ORDEN DE TRABAJO</div>
        ${d.chosen.length === 0 ? `<span class="empty-note">Todavía no agregaste pasos.</span>` : ""}
        <ol class="seq-list">
          ${d.chosen
            .map(
              (c, i) => `
            <li class="step-row" style="background:${accent}14">
              <span><span class="seq-num" style="color:${accent}">${String(i + 1).padStart(2, "0")}</span> ${c}</span>
              <button class="remove-btn" data-remove-index="${i}">✕</button>
            </li>
          `
            )
            .join("")}
        </ol>
      </div>
    </div>

    ${
      d.result
        ? `<div class="msg-box ${d.result.ok ? "ok" : "err"}" style="${d.result.ok ? `color:${accent}; border-color:${accent}; background:${accent}14;` : ""}">
            ${d.result.ok ? "✅" : "⚠️"} ${d.result.text}
          </div>`
        : ""
    }

    <div class="actions-row">
      <button class="btn-solid" id="diag-check" ${d.chosen.length === 0 ? "disabled" : ""} style="background:${accent}">CONFIRMAR DIAGNÓSTICO</button>
      <button class="btn-ghost" id="diag-reset">↺ Reiniciar</button>
    </div>
  `;

  container.querySelectorAll("[data-step]").forEach((btn) => {
    btn.addEventListener("click", () => addDiagnosticStep(decodeURIComponent(btn.dataset.step)));
  });
  container.querySelectorAll("[data-remove-index]").forEach((btn) => {
    btn.addEventListener("click", () => removeDiagnosticStep(Number(btn.dataset.removeIndex)));
  });
  container.querySelectorAll("[data-failure-id]").forEach((btn) => {
    btn.addEventListener("click", () => selectFailure(btn.dataset.failureId));
  });
  const checkBtn = document.getElementById("diag-check");
  if (checkBtn) checkBtn.addEventListener("click", checkDiagnostic);
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
