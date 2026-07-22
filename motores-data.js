/* ---------------------------------------------------------
   MOTORES — contenido de fondo
   Conocimiento universal de ingeniería automotriz (ciclo Otto,
   ciclo Diésel, compresión, reglaje de válvulas) + diagramas
   interactivos (corte de motor, lubricación, refrigeración) +
   una comparativa real de distribución por modelo, construida
   sobre los datos ya verificados en data.js.
--------------------------------------------------------- */

const MOTOR_ACCENT = "#E8871E";

/* ---------- Contenido conceptual (universal, no requiere auto) ---------- */

const MOTOR_FUNDAMENTOS = [
  {
    id: "ciclo-otto",
    title: "Ciclo Otto: cómo funciona un motor a nafta en 4 tiempos",
    icon: "⚙️",
    body: [
      "Admisión: el pistón baja, la válvula de admisión se abre y entra la mezcla de aire y combustible (o solo aire, en los motores de inyección directa donde el combustible se suma después).",
      "Compresión: las dos válvulas se cierran y el pistón sube, comprimiendo esa mezcla. En motores a nafta la relación de compresión típica ronda 9:1 a 12:1.",
      "Explosión (tiempo motor): la bujía genera la chispa, la mezcla se enciende y la expansión de los gases empuja el pistón hacia abajo. Es el único de los cuatro tiempos que entrega trabajo útil; los otros tres 'lo consumen'.",
      "Escape: la válvula de escape se abre, el pistón vuelve a subir y expulsa los gases quemados hacia el sistema de escape.",
      "Un ciclo completo son 2 vueltas del cigüeñal (720°) pero solo 1 vuelta del árbol de levas — por eso la relación de distribución entre cigüeñal y árbol de levas siempre es 2:1.",
    ],
  },
  {
    id: "ciclo-diesel",
    title: "Ciclo Diésel: en qué se diferencia del Otto",
    icon: "🛢️",
    body: [
      "No hay bujía de encendido: el combustible se autoenciende por la temperatura que genera una compresión mucho más alta que en un motor a nafta, típicamente entre 14:1 y 22:1.",
      "En la admisión entra solo aire, nunca mezcla — el combustible no está presente todavía.",
      "El combustible se inyecta a alta presión (sistemas common rail: entre 300 bar al ralentí y hasta 1.800-2.000 bar a plena carga en los sistemas más comunes, con generaciones muy recientes que llegan a 2.500 bar) al final de la compresión, directamente en la cámara, y se autoenciende por el calor del aire comprimido.",
      "Las bujías incandescentes (precalentamiento) que llevan los diésel modernos no reemplazan a una bujía de encendido: solo ayudan a temperar la cámara para el arranque en frío, cuando el motor todavía no generó suficiente calor por compresión.",
    ],
  },
  {
    id: "compresion",
    title: "Compresión: qué mide y por qué importa",
    icon: "📊",
    body: [
      "La relación de compresión compara el volumen del cilindro con el pistón abajo del todo contra el volumen con el pistón arriba del todo.",
      "Se mide con un compresómetro, cilindro por cilindro, con el motor caliente, todas las bujías retiradas y el acelerador a fondo durante la prueba.",
      "Lo que más importa para diagnóstico no es tanto el valor absoluto sino que los cilindros den parejo entre sí: la referencia más citada es no superar el 10% de diferencia entre el cilindro más bajo y el más alto (algunas guías admiten hasta 15% en diésel); por encima de eso suele haber un problema real (aros de pistón gastados, válvula que no cierra bien, junta de culata soplada).",
      "Una compresión baja mejora al agregar una gota de aceite en el cilindro (prueba húmeda): si sube, el problema está en los aros; si no cambia, el problema está en las válvulas o en la junta de culata.",
    ],
  },
  {
    id: "reglaje",
    title: "Reglaje de válvulas: por qué el tiempo exacto importa",
    icon: "⏱️",
    body: [
      "Las válvulas de admisión y escape tienen que abrir y cerrar en el momento exacto del ciclo, perfectamente sincronizadas con la posición del pistón. A eso se le llama reglaje o puesta a punto de la distribución.",
      "Si la correa o cadena de distribución se salta uno o más dientes (por mala tensión, desgaste o rotura parcial), ese reglaje se pierde y el motor deja de funcionar como corresponde.",
      "En los motores 'de interferencia' — la gran mayoría de los modernos, donde pistón y válvulas comparten el mismo espacio en distintos momentos del ciclo — un salto de reglaje grande hace que el pistón choque físicamente contra las válvulas: daño interno serio, casi siempre con la culata incluida.",
      "En los motores 'no interferentes' hay margen de sobra entre pistón y válvulas, así que un salto de reglaje generalmente solo hace que el motor funcione mal o no arranque, sin rotura interna.",
    ],
  },
];

/* ---------- Corte de motor interactivo (esquema, un cilindro) ---------- */

const ENGINE_CUTAWAY = {
  connections: [],
  components: [
    { id: "culata", x: 210, y: 30, w: 220, h: 70, label: "CULATA", info: "Tapa el bloque por arriba y aloja las válvulas, las bujías (o inyectores) y, según el motor, el árbol de levas. Es de aluminio en casi todos los motores modernos porque disipa mejor el calor que el hierro fundido del bloque." },
    { id: "valvula-adm", x: 225, y: 105, w: 18, h: 55, label: "VA", info: "Válvula de admisión: se abre en el tiempo de admisión para dejar entrar aire (o mezcla) al cilindro, y se cierra herméticamente durante compresión y explosión." },
    { id: "valvula-esc", x: 395, y: 105, w: 18, h: 55, label: "VE", info: "Válvula de escape: se abre en el tiempo de escape para dejar salir los gases quemados. Trabaja a mayor temperatura que la de admisión porque está en contacto directo con los gases de la combustión." },
    { id: "arbol-levas", x: 250, y: 5, w: 140, h: 22, label: "ÁRBOL DE LEVAS", info: "Gira sincronizado con el cigüeñal (a la mitad de su velocidad) y sus lóbulos empujan las válvulas para abrirlas en el momento exacto del ciclo. Puede estar arriba de la culata (OHC) o, en diseños viejos, en el bloque." },
    { id: "piston", x: 255, y: 160, w: 90, h: 60, label: "PISTÓN", info: "Se desliza dentro del cilindro y transforma la presión de la combustión en movimiento. Lleva aros metálicos en su perímetro que sellan la cámara y controlan el paso de aceite." },
    { id: "biela", x: 275, y: 225, w: 50, h: 90, label: "BIELA", info: "Conecta el pistón con el cigüeñal y transforma el movimiento vertical (lineal) del pistón en movimiento rotativo. Trabaja sometida a esfuerzos muy altos, por eso suele ser de acero forjado." },
    { id: "ciguenal", x: 240, y: 320, w: 160, h: 60, label: "CIGÜEÑAL", info: "Recibe el empuje de todas las bielas y lo convierte en el giro que finalmente mueve las ruedas. De su extremo sale la polea que, por correa o cadena, sincroniza el árbol de levas." },
    { id: "carter", x: 190, y: 385, w: 260, h: 45, label: "CÁRTER", info: "Es el depósito de aceite del motor, ubicado en la parte más baja. La bomba de aceite toma el lubricante desde acá para distribuirlo por todo el motor." },
    { id: "bloque", x: 90, y: 100, w: 100, h: 285, label: "BLOQUE", info: "Es la estructura principal del motor: aloja los cilindros donde se mueven los pistones, y por dentro tiene las camisas de agua del sistema de refrigeración. Suele ser de hierro fundido o aluminio." },
    { id: "distribucion", x: 470, y: 20, w: 130, h: 340, label: "CORREA / CADENA", info: "Sincroniza el giro del cigüeñal con el árbol de levas, siempre en relación 2:1 (el árbol de levas gira a la mitad). Puede ser una correa dentada (con cambio programado) o una cadena metálica (generalmente sin mantenimiento programado, aunque también se estira con los años)." },
  ],
};

/* ---------- Circuito de lubricación ---------- */

const OIL_CIRCUIT = {
  components: [
    { id: "carter-oil", x: 30, y: 190, w: 140, h: 60, label: "CÁRTER", sub: "Depósito de aceite", info: "Es el reservorio de aceite del motor. La bomba de aceite toma el lubricante desde acá a través de una rejilla que filtra las partículas más grandes." },
    { id: "bomba-aceite", x: 210, y: 190, w: 140, h: 60, label: "BOMBA DE ACEITE", sub: "", info: "Impulsa el aceite a presión por todo el circuito. Suele estar accionada directamente por el cigüeñal, así que su caudal depende de las revoluciones del motor." },
    { id: "filtro-aceite", x: 390, y: 100, w: 140, h: 55, label: "FILTRO DE ACEITE", sub: "", info: "Retiene las partículas metálicas y de suciedad que el aceite va juntando, antes de que lleguen a las piezas móviles del motor. Se cambia en cada service." },
    { id: "galerias", x: 390, y: 220, w: 140, h: 55, label: "GALERÍAS PRINCIPALES", sub: "", info: "Son los conductos internos que llevan el aceite a presión hacia el cigüeñal, las bielas, el árbol de levas y, en muchos motores, hacia los taqués hidráulicos." },
    { id: "retorno", x: 210, y: 300, w: 140, h: 55, label: "RETORNO POR GRAVEDAD", sub: "", info: "Después de lubricar cada pieza, el aceite escurre por gravedad de vuelta al cárter, listo para ser bombeado otra vez. El circuito se repite en forma constante mientras el motor gira." },
  ],
  connections: [
    { from: "carter-oil", to: "bomba-aceite", thick: true },
    { from: "bomba-aceite", to: "filtro-aceite", thick: true },
    { from: "filtro-aceite", to: "galerias", thick: true },
    { from: "galerias", to: "retorno", thick: false },
    { from: "retorno", to: "carter-oil", thick: false },
  ],
};

/* ---------- Circuito de refrigeración ---------- */

const COOLING_CIRCUIT = {
  components: [
    { id: "bomba-agua", x: 30, y: 190, w: 140, h: 60, label: "BOMBA DE AGUA", sub: "", info: "Hace circular el líquido refrigerante por todo el motor. En la mayoría de los autos la mueve la misma correa de accesorios, o directamente la correa/cadena de distribución." },
    { id: "camisas", x: 210, y: 190, w: 140, h: 60, label: "CAMISAS DE AGUA", sub: "Bloque y culata", info: "Son los conductos internos que rodean los cilindros y la cámara de combustión, por donde circula el refrigerante para absorber el calor del motor." },
    { id: "termostato", x: 390, y: 100, w: 140, h: 55, label: "TERMOSTATO", sub: "", info: "Con el motor frío permanece cerrado y desvía el líquido de vuelta a la bomba sin pasar por el radiador (bypass), para que el motor llegue rápido a temperatura. Recién a partir de cierta temperatura empieza a abrirse y deja pasar el líquido hacia el radiador; el circuito de este diagrama muestra esa segunda etapa, con el termostato ya abierto." },
    { id: "radiador", x: 390, y: 220, w: 140, h: 55, label: "RADIADOR", sub: "", info: "Disipa hacia el aire exterior el calor que el líquido refrigerante juntó en el motor, gracias a sus conductos delgados y aletas." },
    { id: "electroventilador", x: 210, y: 300, w: 140, h: 55, label: "ELECTROVENTILADOR", sub: "", info: "Fuerza el paso de aire a través del radiador cuando la velocidad del auto no alcanza para enfriarlo por sí sola, típicamente en tránsito lento o con el auto detenido." },
  ],
  connections: [
    { from: "bomba-agua", to: "camisas", thick: true },
    { from: "camisas", to: "termostato", thick: true },
    { from: "termostato", to: "radiador", thick: true },
    { from: "radiador", to: "electroventilador", thick: false },
    { from: "electroventilador", to: "bomba-agua", thick: false },
  ],
};

/* ---------- Comparativa real de distribución por modelo ---------- */
/* Construida sobre los datos ya verificados en data.js — no repite
   números acá adentro, los toma directo de CARS para no desincronizarse. */

function buildDistributionTable() {
  return CARS.map((car) => ({
    id: car.id,
    brand: car.brand,
    model: car.model,
    distribucion: car.mechanical.motor.specs["Distribución"] || "Sin dato verificado",
  }));
}
