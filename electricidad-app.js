/* ---------------------------------------------------------
   ELECTRICIDAD + ELECTRÓNICA — lógica de render
--------------------------------------------------------- */

const elecState = {
  openFundamento: null,
  ohmSelected: null,
};

function renderElecFundamentos() {
  const container = document.getElementById("elec-fundamentos-list");
  container.innerHTML = ELEC_FUNDAMENTOS.map((f) => {
    const isOpen = elecState.openFundamento === f.id;
    return `
      <div class="info-card" style="border-color:${isOpen ? ELEC_KNOW_ACCENT : "var(--border)"}">
        <button class="info-card-header" data-fund-id="${f.id}">
          <div class="info-card-left">
            <div class="icon-badge" style="background:${ELEC_KNOW_ACCENT}22; color:${ELEC_KNOW_ACCENT}">${f.icon}</div>
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
      elecState.openFundamento = elecState.openFundamento === id ? null : id;
      renderElecFundamentos();
    });
  });
}

function renderOhmCircuit() {
  const container = document.getElementById("ohm-container");
  const selected = elecState.ohmSelected ? OHM_CIRCUIT.components.find((c) => c.id === elecState.ohmSelected) : null;

  container.innerHTML = `
    <div class="diagram-box">
      ${renderDiagramSVG(OHM_CIRCUIT, ELEC_KNOW_ACCENT, 720, 330)}
    </div>
    ${
      selected
        ? `<div class="diagram-info-box" style="border-color:${ELEC_KNOW_ACCENT}">
            <div class="box-label" style="color:${ELEC_KNOW_ACCENT}">${selected.label}${selected.sub ? " · " + selected.sub : ""}</div>
            <p>${selected.info}</p>
          </div>`
        : `<p class="hint-note">Tocá cualquier parte del circuito para ver qué se mediría ahí con un multímetro.</p>`
    }
  `;

  container.querySelectorAll("[data-comp-id]").forEach((el) => {
    el.addEventListener("click", () => {
      elecState.ohmSelected = el.dataset.compId;
      renderOhmCircuit();
    });
  });
}

function renderSensorReference() {
  const container = document.getElementById("sensor-reference-list");
  container.innerHTML = SENSOR_REFERENCE.map(
    (s) => `
    <div class="info-card" style="border-color:var(--border)">
      <div class="info-card-body" style="padding-top:16px;">
        <div class="info-card-title" style="margin-bottom:10px; display:block;">${s.nombre.toUpperCase()}</div>
        <table class="spec-table">
          <tbody>
            <tr><td>HILOS</td><td>${s.hilos}</td></tr>
            <tr><td>TIPO DE SEÑAL</td><td>${s.senal}</td></tr>
            <tr><td>RANGO TÍPICO</td><td>${s.rango}</td></tr>
            <tr><td>NOTA</td><td>${s.nota}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `
  ).join("");
}

function renderDtcTable() {
  const container = document.getElementById("dtc-table");
  container.innerHTML = `
    <table class="compare-table">
      <thead>
        <tr><th>CÓDIGO</th><th>SIGNIFICADO</th></tr>
      </thead>
      <tbody>
        ${DTC_EXAMPLES.map((d) => `<tr><td class="mono">${d.codigo}</td><td>${d.significado}</td></tr>`).join("")}
      </tbody>
    </table>
  `;
}

function renderElectricidad() {
  renderElecFundamentos();
  renderOhmCircuit();
  renderSensorReference();
  renderDtcTable();
}

document.addEventListener("DOMContentLoaded", renderElectricidad);
