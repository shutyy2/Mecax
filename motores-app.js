/* ---------------------------------------------------------
   MOTORES — lógica de render
--------------------------------------------------------- */

const motoresState = {
  openFundamento: null,
  cutawaySelected: null,
  oilSelected: null,
  coolingSelected: null,
};

function renderFundamentos() {
  const container = document.getElementById("fundamentos-list");
  container.innerHTML = MOTOR_FUNDAMENTOS.map((f) => {
    const isOpen = motoresState.openFundamento === f.id;
    return `
      <div class="info-card" style="border-color:${isOpen ? MOTOR_ACCENT : "var(--border)"}">
        <button class="info-card-header" data-fund-id="${f.id}">
          <div class="info-card-left">
            <div class="icon-badge" style="background:${MOTOR_ACCENT}22; color:${MOTOR_ACCENT}">${f.icon}</div>
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
      motoresState.openFundamento = motoresState.openFundamento === id ? null : id;
      renderFundamentos();
    });
  });
}

function renderInteractiveDiagram(def, containerId, stateKey, w, h) {
  const container = document.getElementById(containerId);
  const selected = motoresState[stateKey] ? def.components.find((c) => c.id === motoresState[stateKey]) : null;

  container.innerHTML = `
    <div class="diagram-box">
      ${renderDiagramSVG(def, MOTOR_ACCENT, w, h)}
    </div>
    ${
      selected
        ? `<div class="diagram-info-box" style="border-color:${MOTOR_ACCENT}">
            <div class="box-label" style="color:${MOTOR_ACCENT}">${selected.label}${selected.sub ? " · " + selected.sub : ""}</div>
            <p>${selected.info}</p>
          </div>`
        : `<p class="hint-note">Tocá cualquier parte del esquema para ver qué es y qué función cumple.</p>`
    }
  `;

  container.querySelectorAll("[data-comp-id]").forEach((el) => {
    el.addEventListener("click", () => {
      motoresState[stateKey] = el.dataset.compId;
      renderInteractiveDiagram(def, containerId, stateKey, w, h);
    });
  });
}

function renderDistributionTable() {
  const container = document.getElementById("distribution-table");
  const rows = buildDistributionTable();
  container.innerHTML = `
    <table class="compare-table">
      <thead>
        <tr><th>MODELO</th><th>DISTRIBUCIÓN VERIFICADA</th></tr>
      </thead>
      <tbody>
        ${rows.map((r) => `<tr><td>${r.brand} ${r.model}</td><td>${r.distribucion}</td></tr>`).join("")}
      </tbody>
    </table>
  `;
}

function renderMotores() {
  renderFundamentos();
  renderInteractiveDiagram(ENGINE_CUTAWAY, "cutaway-container", "cutawaySelected", 650, 460);
  renderInteractiveDiagram(OIL_CIRCUIT, "oil-container", "oilSelected", 600, 380);
  renderInteractiveDiagram(COOLING_CIRCUIT, "cooling-container", "coolingSelected", 600, 380);
  renderDistributionTable();
}

document.addEventListener("DOMContentLoaded", renderMotores);
