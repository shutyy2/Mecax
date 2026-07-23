/* ---------------------------------------------------------
   COMBUSTIBLE + ADMISIÓN/ESCAPE — contenido de fondo
   Conocimiento universal (bomba de combustible, presión de
   inyección, turbo, intercooler, sistema de emisiones) + dos
   circuitos interactivos (alimentación, y admisión/escape) +
   una tabla de sobrealimentación construida sobre los datos
   ya verificados de los 6 autos.

   Contenido verificado contra fuentes públicas especializadas
   en julio de 2026 (ver README).
--------------------------------------------------------- */

const FUEL_ACCENT = "#E8871E";

/* ---------- Contenido conceptual (universal) ---------- */

const FUEL_FUNDAMENTOS = [
  {
    id: "bomba-regulador",
    title: "Cómo llega el combustible al motor",
    icon: "⛽",
    body: [
      "En los autos con carburador (prácticamente en desuso hoy) el combustible lo movía una bomba mecánica accionada por el árbol de levas, con una presión baja, de apenas 10 a 15 PSI — suficiente para un carburador, pero no para un inyector moderno.",
      "Con la inyección electrónica se pasó a una bomba eléctrica, generalmente sumergida dentro del tanque (el propio combustible la refrigera), que trabaja de forma constante apenas se da contacto, con presiones bastante más altas.",
      "El regulador de presión mantiene esa presión constante sin importar cuánto combustible esté consumiendo el motor en cada momento: lo que sobra, vuelve al tanque por una línea de retorno. En muchos sistemas modernos esta regulación ya no es una pieza mecánica separada, sino que la maneja directamente la ECU variando la velocidad de la bomba.",
    ],
  },
  {
    id: "presion-inyeccion",
    title: "Presión de inyección: por qué varía tanto entre motores",
    icon: "📈",
    body: [
      "Inyección indirecta (MPFI) a nafta: el inyector pulveriza en el colector de admisión, antes de la válvula, no directamente en el cilindro. Como el combustible tiene 'tiempo' de mezclarse con el aire antes de entrar, alcanza con una presión relativamente baja, del orden de 2.5 a 3.5 bar (35-50 PSI aproximadamente).",
      "Inyección directa a nafta (GDI): el inyector pulveriza directamente dentro de la cámara de combustión, con muchísimo menos tiempo para mezclarse. Por eso necesita mucha más presión para atomizar bien el combustible: entre 150 y 200 bar, generada por una bomba mecánica de alta presión (accionada por el árbol de levas) que trabaja en conjunto con la bomba eléctrica de baja presión del tanque.",
      "Common rail diésel: como se explica en la sección de Motores, trabaja con presiones aún mayores — de 300 bar en ralentí hasta 1.600-2.000 bar a plena carga en los sistemas más comunes, con generaciones recientes que llegan a 2.500 bar.",
      "La regla general: cuanto menos tiempo tiene el combustible para mezclarse con el aire antes de quemarse, más presión hace falta para pulverizarlo en gotas lo suficientemente finas.",
    ],
  },
  {
    id: "turbo-wastegate-vgt",
    title: "Turbo: wastegate vs. geometría variable",
    icon: "🌀",
    body: [
      "Un turbo aprovecha la energía de los gases de escape (que de otra forma se perdería) para mover una turbina, que a su vez mueve un compresor que empuja más aire hacia los cilindros de lo que entraría por aspiración natural.",
      "Turbo de geometría fija: la única forma de limitar la presión máxima es desviar parte de los gases de escape para que no pasen por la turbina, tarea que hace la válvula wastegate. Es un diseño más simple y económico, pero menos eficiente a bajas revoluciones (el clásico 'turbo lag': hay que esperar a que haya suficiente caudal de gases para que la turbina tome velocidad).",
      "Turbo de geometría variable (VGT/VNT): en vez de desviar gases, unos álabes móviles cambian la sección de entrada a la turbina según el régimen del motor. A bajas revoluciones la sección se achica (los gases entran más rápido y hacen girar antes la turbina); a altas revoluciones se agranda. Así se reduce mucho el turbo lag, y muchos diseños VGT ya ni siquiera llevan wastegate. Es el tipo más común en motores diésel modernos.",
    ],
  },
  {
    id: "intercooler",
    title: "Intercooler: por qué el aire se enfría antes de entrar",
    icon: "❄️",
    body: [
      "Al comprimir el aire, el turbo también lo calienta — y el aire caliente es menos denso, es decir, tiene menos oxígeno por unidad de volumen. Eso significa menos oxígeno disponible para quemar combustible, justo lo contrario de lo que se busca al sobrealimentar el motor.",
      "El intercooler es un radiador de aire (no de líquido) ubicado entre el turbo y el colector de admisión: el aire caliente y comprimido pasa por sus conductos delgados y se enfría con el aire exterior antes de llegar a los cilindros, recuperando densidad y, con ella, la ganancia real de oxígeno que se buscaba con el turbo.",
    ],
  },
  {
    id: "emisiones-egr-cat-dpf",
    title: "Sistema de emisiones: EGR, catalizador y DPF",
    icon: "🌫️",
    body: [
      "La válvula EGR (recirculación de gases de escape) toma una porción de los gases ya quemados y los reintroduce en la admisión. Al ocupar espacio con gas inerte en vez de aire fresco, baja la temperatura máxima de combustión, y con ella la formación de óxidos de nitrógeno (NOx). Se ensucia con carbonilla con el tiempo, sobre todo en uso urbano de trayectos cortos.",
      "El catalizador transforma, mediante una reacción química con un recubrimiento de metales preciosos, los hidrocarburos sin quemar (HC) y el monóxido de carbono (CO) en agua (H₂O) y dióxido de carbono (CO₂), mucho menos nocivos.",
      "El filtro de partículas diésel (DPF o FAP) retiene físicamente el hollín de los gases de escape. Como se va tapando, necesita 'regenerarse' periódicamente: quemar ese hollín acumulado. La regeneración pasiva ocurre sola en viajes largos a velocidad sostenida, cuando los gases de escape alcanzan naturalmente temperaturas altas (aproximadamente 350-600°C). Si el auto se usa solo en trayectos cortos urbanos, esa temperatura nunca se sostiene el tiempo suficiente, y la ECU tiene que forzar una regeneración activa (inyectando combustible extra para elevar la temperatura de los gases) — y si tampoco eso alcanza, el filtro se satura, con pérdida de potencia y testigo de falla encendido.",
    ],
  },
];

/* ---------- Circuito interactivo: alimentación de combustible ---------- */

const FUEL_CIRCUIT = {
  connections: [
    { from: "tanque", to: "bomba-comb", thick: true },
    { from: "bomba-comb", to: "filtro-comb", thick: true },
    { from: "filtro-comb", to: "riel", thick: true },
    { from: "riel", to: "inyectores", thick: true },
    { from: "riel", to: "regulador-comb", thick: false },
    { from: "regulador-comb", to: "tanque", thick: false },
  ],
  components: [
    { id: "tanque", x: 20, y: 190, w: 130, h: 60, label: "TANQUE", sub: "", info: "Depósito de combustible del auto. De acá sale la línea de alimentación hacia la bomba, y a él vuelve el combustible sobrante por la línea de retorno." },
    { id: "bomba-comb", x: 190, y: 190, w: 130, h: 60, label: "BOMBA ELÉCTRICA", sub: "", info: "Generalmente sumergida dentro del tanque, empieza a trabajar apenas se da contacto. Envía el combustible a presión hacia el motor de forma constante." },
    { id: "filtro-comb", x: 360, y: 190, w: 130, h: 60, label: "FILTRO DE COMBUSTIBLE", sub: "", info: "Retiene impurezas antes de que lleguen a los inyectores, que tienen orificios muy finos y se tapan fácil con la más mínima suciedad." },
    { id: "riel", x: 530, y: 100, w: 140, h: 55, label: "RIEL / RAMPA", sub: "", info: "Es el conducto común que distribuye el combustible a presión hacia todos los inyectores por igual, con un solo punto de entrada." },
    { id: "inyectores", x: 530, y: 220, w: 140, h: 55, label: "INYECTORES", sub: "", info: "Válvulas de alta precisión comandadas eléctricamente por la ECU: se abren durante milésimas de segundo para pulverizar la cantidad exacta de combustible en cada ciclo." },
    { id: "regulador-comb", x: 190, y: 300, w: 200, h: 55, label: "REGULADOR DE PRESIÓN", sub: "", info: "Mantiene la presión del sistema constante sin importar cuánto combustible esté consumiendo el motor. El excedente vuelve al tanque por la línea de retorno." },
  ],
};

/* ---------- Circuito interactivo: admisión, turbo y escape ---------- */

const INTAKE_EXHAUST_CIRCUIT = {
  connections: [
    { from: "filtro-aire", to: "turbo-compresor", thick: true },
    { from: "turbo-compresor", to: "intercooler", thick: true },
    { from: "intercooler", to: "cuerpo-acel", thick: true },
    { from: "cuerpo-acel", to: "cilindros", thick: true },
    { from: "cilindros", to: "turbo-turbina", thick: true },
    { from: "turbo-turbina", to: "catalizador", thick: true },
    { from: "catalizador", to: "dpf", thick: true },
    { from: "cilindros", to: "egr", thick: false },
    { from: "egr", to: "cuerpo-acel", thick: false },
  ],
  components: [
    { id: "filtro-aire", x: 20, y: 30, w: 130, h: 55, label: "FILTRO DE AIRE", sub: "", info: "Retiene polvo y partículas antes de que entren al motor. Un filtro tapado restringe el caudal de aire disponible y afecta tanto la potencia como el consumo." },
    { id: "turbo-compresor", x: 190, y: 30, w: 130, h: 55, label: "TURBO (COMPRESOR)", sub: "", info: "El lado del turbo que empuja aire hacia el motor, movido por la turbina del lado del escape a través de un eje común." },
    { id: "intercooler", x: 360, y: 30, w: 130, h: 55, label: "INTERCOOLER", sub: "", info: "Enfría el aire que se calentó al comprimirse en el turbo, para recuperar densidad antes de que entre a los cilindros." },
    { id: "cuerpo-acel", x: 530, y: 30, w: 140, h: 55, label: "CUERPO DE ACELERACIÓN", sub: "", info: "Regula, mediante una válvula tipo mariposa, la cantidad de aire que finalmente entra al motor según lo que pide el conductor (o la ECU, en los sistemas de acelerador electrónico)." },
    { id: "cilindros", x: 530, y: 130, w: 140, h: 55, label: "CILINDROS", sub: "", info: "Acá ocurre la combustión. El aire y el combustible se transforman en los gases de escape que salen hacia el otro lado del sistema." },
    { id: "egr", x: 360, y: 130, w: 130, h: 55, label: "VÁLVULA EGR", sub: "", info: "Recircula una porción de los gases de escape hacia la admisión para bajar la temperatura de combustión y reducir la formación de óxidos de nitrógeno (NOx)." },
    { id: "turbo-turbina", x: 530, y: 220, w: 140, h: 55, label: "TURBO (TURBINA)", sub: "", info: "El lado del turbo que aprovecha la energía de los gases de escape para girar y mover, a través del eje común, el compresor del lado de admisión." },
    { id: "catalizador", x: 360, y: 220, w: 130, h: 55, label: "CATALIZADOR", sub: "", info: "Transforma químicamente los hidrocarburos sin quemar (HC) y el monóxido de carbono (CO) en agua y dióxido de carbono, mucho menos nocivos." },
    { id: "dpf", x: 190, y: 220, w: 130, h: 55, label: "FILTRO DPF/FAP", sub: "Solo diésel", info: "Retiene físicamente las partículas de hollín. Necesita 'regenerarse' (quemar ese hollín) periódicamente, algo que puede no completarse si el auto se usa solo en trayectos cortos urbanos." },
  ],
};

/* ---------- Comparativa real de sobrealimentación por modelo ---------- */
/* Construida sobre los datos ya verificados en data.js. */

function buildFuelTable() {
  return CARS.map((car) => {
    const specs = car.mechanical.motor.specs;
    const desc = car.mechanical.motor.desc || "";
    const combustible = specs["Combustible"] || "Sin dato";
    // Algunos autos (como el 208) documentan más de un motor real según versión,
    // con claves de spec que empiezan con "Motor ..." en vez de una sola ficha.
    const motorVariantKeys = Object.keys(specs).filter((k) => k.toLowerCase().startsWith("motor"));
    let sobrealimentacion;
    if (motorVariantKeys.length >= 2) {
      const values = motorVariantKeys.map((k) => String(specs[k]).toLowerCase());
      const turboCount = values.filter((v) => v.includes("turbo")).length;
      sobrealimentacion =
        turboCount === values.length ? "Turbo" : turboCount === 0 ? "Aspiración natural" : "Mixta (según versión)";
    } else {
      const blob = (desc + " " + JSON.stringify(specs)).toLowerCase();
      sobrealimentacion = blob.includes("turbo") ? "Turbo" : "Aspiración natural";
    }
    return {
      id: car.id,
      brand: car.brand,
      model: car.model,
      combustible,
      sobrealimentacion,
    };
  });
}
