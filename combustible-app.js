/* ---------------------------------------------------------
   COMBUSTIBLE + ADMISIÓN/ESCAPE — lógica de render
--------------------------------------------------------- */

const fuelState = {
  openFundamento: null,
  fuelCircuitSelected: null,
  intakeCircuitSelected: null,
};

function renderFuelFundamentos() {
  const container = document.getElementById("fuel-fundamentos-list");
  container.innerHTML = FUEL_FUNDAMENTOS.map((f) => {
    const isOpen = fuelState.openFundamento === f.id;
    return `
      <div class="info-card" style="border-color:${isOpen ? FUEL_ACCENT : "var(--border)"}">
        <button class="info-card-header" data-fund-id="${f.id}">
          <div class="info-card-left">
            <div class="icon-badge" style="background:${FUEL_ACCENT}22; color:${FUEL_ACCENT}">${f.icon}</div>
            <span class="info-card-title">${f.title.toUpperCase()}</span>
          </div>
          <span class="chevron ${isOpen ? "open" : ""}">▸</span>
        </button>
        ${
          isOpen
            ? `<div class="info-card-body fundamento-body">
                ${f.body.map((p) => `<p>${p}</p>`).join("")}
              </div>`
            : ""
        }
      </div>
    `;
  }).join("");

  container.querySelectorAll("[data-fund-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.fundId;
      fuelState.openFundamento = fuelState.openFundamento === id ? null : id;
      renderFuelFundamentos();
    });
  });
}

function renderFuelDiagram(def, containerId, stateKey, w, h) {
  const container = document.getElementById(containerId);
  const selected = fuelState[stateKey] ? def.components.find((c) => c.id === fuelState[stateKey]) : null;

  container.innerHTML = `
    <div class="diagram-box">
      ${renderDiagramSVG(def, FUEL_ACCENT, w, h)}
    </div>
    ${
      selected
        ? `<div class="diagram-info-box" style="border-color:${FUEL_ACCENT}">
            <div class="box-label" style="color:${FUEL_ACCENT}">${selected.label}${selected.sub ? " · " + selected.sub : ""}</div>
            <p>${selected.info}</p>
          </div>`
        : `<p class="hint-note">Tocá cualquier parte del esquema para ver qué es y qué función cumple.</p>`
    }
  `;

  container.querySelectorAll("[data-comp-id]").forEach((el) => {
    el.addEventListener("click", () => {
      fuelState[stateKey] = el.dataset.compId;
      renderFuelDiagram(def, containerId, stateKey, w, h);
    });
  });
}

function renderFuelTable() {
  const container = document.getElementById("fuel-table");
  const rows = buildFuelTable();
  container.innerHTML = `
    <table class="compare-table">
      <thead>
        <tr><th>MODELO</th><th>COMBUSTIBLE</th><th>SOBREALIMENTACIÓN</th></tr>
      </thead>
      <tbody>
        ${rows
          .map((r) => `<tr><td>${r.brand} ${r.model}</td><td>${r.combustible}</td><td>${r.sobrealimentacion}</td></tr>`)
          .join("")}
      </tbody>
    </table>
  `;
}

function renderCombustible() {
  renderFuelFundamentos();
  renderFuelDiagram(FUEL_CIRCUIT, "fuel-circuit-container", "fuelCircuitSelected", 700, 380);
  renderFuelDiagram(INTAKE_EXHAUST_CIRCUIT, "intake-circuit-container", "intakeCircuitSelected", 700, 300);
  renderFuelTable();
}

document.addEventListener("DOMContentLoaded", renderCombustible);
