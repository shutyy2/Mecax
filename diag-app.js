/* ---------------------------------------------------------
   ESTADO
--------------------------------------------------------- */

const diagState = {
  symptomId: null,
  path: [], // historial de { nodeId, chosenLabel }
  currentNodeId: null,
};

function resetDiag() {
  diagState.symptomId = null;
  diagState.path = [];
  diagState.currentNodeId = null;
}

function selectSymptom(id) {
  diagState.symptomId = id;
  diagState.path = [];
  diagState.currentNodeId = SYMPTOMS[id].root;
  renderDiag();
}

function answerQuestion(nextId, chosenLabel) {
  diagState.path.push({ nodeId: diagState.currentNodeId, chosenLabel });
  diagState.currentNodeId = nextId;
  renderDiag();
}

function goBackOneStep() {
  if (diagState.path.length === 0) {
    resetDiag();
    renderDiag();
    return;
  }
  const last = diagState.path.pop();
  diagState.currentNodeId = last.nodeId;
  renderDiag();
}

function restartSymptom() {
  const id = diagState.symptomId;
  selectSymptom(id);
}

/* ---------------------------------------------------------
   RENDER: GRILLA DE SÍNTOMAS
--------------------------------------------------------- */

function renderSymptomGrid() {
  const container = document.getElementById("diag-app");
  const ids = Object.keys(SYMPTOMS);

  container.innerHTML = `
    <div class="diag-intro">
      <div class="label">DIAGNÓSTICO INTELIGENTE</div>
      <h2 class="diag-h2">¿Qué está haciendo el auto?</h2>
      <p class="diag-lead">Elegí el síntoma que más se parece a lo que notás. Te vamos a hacer un par de preguntas simples para llegar a las causas más probables, igual que lo pensaría un mecánico frente al auto.</p>
    </div>
    <div class="symptom-grid">
      ${ids
        .map((id) => {
          const s = SYMPTOMS[id];
          return `
          <button class="symptom-card" data-symptom-id="${id}">
            <span class="symptom-icon">${s.icon}</span>
            <span class="symptom-label">${s.label}</span>
          </button>
        `;
        })
        .join("")}
    </div>
  `;

  container.querySelectorAll("[data-symptom-id]").forEach((btn) => {
    btn.addEventListener("click", () => selectSymptom(btn.dataset.symptomId));
  });
}

/* ---------------------------------------------------------
   RENDER: BREADCRUMB (camino recorrido)
--------------------------------------------------------- */

function renderBreadcrumb() {
  const symptom = SYMPTOMS[diagState.symptomId];
  const steps = diagState.path.map((p) => p.chosenLabel);
  return `
    <div class="diag-breadcrumb">
      <span class="crumb-symptom">${symptom.icon} ${symptom.label}</span>
      ${steps.map((s) => `<span class="crumb-sep">›</span><span class="crumb-step">${s}</span>`).join("")}
    </div>
  `;
}

/* ---------------------------------------------------------
   RENDER: PREGUNTA
--------------------------------------------------------- */

function renderQuestionNode(node) {
  const container = document.getElementById("diag-app");
  container.innerHTML = `
    ${renderBreadcrumb()}
    <div class="diag-card">
      <div class="diag-step-count mono">PASO ${diagState.path.length + 1}</div>
      <h3 class="diag-question">${node.text}</h3>
      <div class="diag-options">
        ${node.options
          .map(
            (opt, i) => `<button class="diag-option-btn" data-next="${opt.next}" data-label="${encodeURIComponent(opt.label)}">${opt.label}</button>`
          )
          .join("")}
      </div>
    </div>
    <div class="actions-row">
      <button class="btn-ghost" id="diag-back">← Atrás</button>
      <button class="btn-ghost" id="diag-restart-symptom">↺ Reiniciar este síntoma</button>
      <button class="btn-ghost" id="diag-change-symptom">Elegir otro síntoma</button>
    </div>
  `;

  container.querySelectorAll(".diag-option-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      answerQuestion(btn.dataset.next, decodeURIComponent(btn.dataset.label));
    });
  });
  document.getElementById("diag-back").addEventListener("click", goBackOneStep);
  document.getElementById("diag-restart-symptom").addEventListener("click", restartSymptom);
  document.getElementById("diag-change-symptom").addEventListener("click", () => {
    resetDiag();
    renderDiag();
  });
}

/* ---------------------------------------------------------
   RENDER: RESULTADO
--------------------------------------------------------- */

const SEVERITY_COLOR = { alta: "#C0463C", media: "#E8871E", baja: "#5FA86A" };

function renderResultNode(node) {
  const container = document.getElementById("diag-app");
  const color = SEVERITY_COLOR[node.severity] || "#E8871E";

  container.innerHTML = `
    ${renderBreadcrumb()}
    <div class="diag-result-card" style="border-color:${color}">
      <div class="diag-result-header">
        <span class="severity-pill" style="background:${color}22; color:${color}; border-color:${color}">${SEVERITY_LABEL[node.severity] || ""}</span>
        <h3 class="diag-result-title">${node.title}</h3>
      </div>

      <div class="diag-result-block">
        <div class="box-label">CAUSAS PROBABLES</div>
        <ul class="cause-list">
          ${node.causes.map((c) => `<li><strong>${c.cause}.</strong> ${c.detail}</li>`).join("")}
        </ul>
      </div>

      <div class="diag-result-block">
        <div class="box-label">QUÉ HACER</div>
        <p class="diag-recommendation">${node.recommendation}</p>
      </div>

      ${
        node.tool && node.tool !== "—"
          ? `<div class="tool-tag">🧰 Herramienta sugerida: <strong>${node.tool}</strong></div>`
          : ""
      }
    </div>

    <div class="actions-row">
      <button class="btn-ghost" id="diag-back">← Atrás</button>
      <button class="btn-ghost" id="diag-restart-symptom">↺ Reiniciar este síntoma</button>
      <button class="btn-solid" id="diag-change-symptom" style="background:${color}">ELEGIR OTRO SÍNTOMA</button>
    </div>
  `;

  document.getElementById("diag-back").addEventListener("click", goBackOneStep);
  document.getElementById("diag-restart-symptom").addEventListener("click", restartSymptom);
  document.getElementById("diag-change-symptom").addEventListener("click", () => {
    resetDiag();
    renderDiag();
  });
}

/* ---------------------------------------------------------
   RENDER PRINCIPAL
--------------------------------------------------------- */

function renderDiag() {
  if (!diagState.symptomId) {
    renderSymptomGrid();
    return;
  }
  const symptom = SYMPTOMS[diagState.symptomId];
  const node = symptom.nodes[diagState.currentNodeId];
  if (node.type === "question") renderQuestionNode(node);
  else renderResultNode(node);
}

document.addEventListener("DOMContentLoaded", renderDiag);
