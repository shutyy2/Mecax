/* ---------------------------------------------------------
   ELECTRICIDAD + ELECTRÓNICA — contenido de fondo
   Conocimiento universal (Ley de Ohm, masas, fusibles/relés,
   ECU, CAN Bus, OBD-II/DTC) + un circuito interactivo de Ley
   de Ohm + referencia verificada de sensores comunes (tipo de
   señal, cantidad de hilos, rango de voltaje) + tabla de
   estructura y ejemplos de códigos DTC.

   Los rangos de voltaje/resistencia de esta página fueron
   verificados contra fuentes públicas especializadas en julio
   de 2026 (ver README). No son pinouts de un auto específico
   — son el comportamiento típico de cada TIPO de sensor,
   válido para cualquier auto que lo use.
--------------------------------------------------------- */

const ELEC_KNOW_ACCENT = "#4FB6BE";

/* ---------- Contenido conceptual (universal) ---------- */

const ELEC_FUNDAMENTOS = [
  {
    id: "ley-ohm",
    title: "Ley de Ohm aplicada al auto",
    icon: "🔢",
    body: [
      "La Ley de Ohm dice que la tensión es igual a la corriente multiplicada por la resistencia (V = I × R). En un auto, esto es la base de casi todo diagnóstico eléctrico: si conocés dos de las tres variables, podés calcular o predecir la tercera.",
      "En la práctica, la aplicación más común no es calcular sino comparar: medir la tensión que debería llegar a un componente (según el circuito) contra la que realmente llega. Si hay una diferencia, hay una resistencia de más en el medio que no debería estar — un empalme corroído, un cable dañado, un conector sucio.",
      "Tres estados básicos que se distinguen con un multímetro: circuito abierto (resistencia infinita, no pasa corriente — por ejemplo un cable cortado), cortocircuito (resistencia casi nula donde no debería haberla — por ejemplo un cable pelado tocando masa), y alta resistencia anómala (el circuito funciona pero 'pierde' tensión en el camino, sin llegar completa al componente).",
    ],
  },
  {
    id: "masa",
    title: "La masa: el cable que todos olvidan",
    icon: "⏚",
    body: [
      "En el auto, el chasis y la carrocería metálica funcionan como el cable de retorno de la mayoría de los circuitos — así se ahorra la mitad del cableado que haría falta si cada componente tuviera un cable de ida y otro de vuelta hasta la batería.",
      "Una masa floja, sucia o corroída no corta el circuito por completo (por eso es tan difícil de diagnosticar a simple vista), pero agrega una resistencia extra en el camino de retorno. El síntoma típico es justamente eso: comportamiento errático, intermitente, que empeora con vibración o humedad y no tiene una causa obvia a la vista.",
      "Por eso, ante cualquier falla eléctrica rara sin explicación, revisar los puntos de masa (generalmente tornillos que conectan un cable negro a la carrocería o al bloque del motor) es un paso barato y rápido que conviene hacer temprano, no al final.",
    ],
  },
  {
    id: "fusibles-reles",
    title: "Fusibles y relés: la diferencia",
    icon: "🔌",
    body: [
      "Un fusible es un elemento de protección: contiene un filamento calibrado para cortarse antes de que la corriente exceda lo que el cableado puede soportar sin dañarse. No enciende ni apaga nada — solo corta si algo anda mal.",
      "Un relé es un interruptor accionado eléctricamente: una señal de baja corriente (por ejemplo, la que sale de una llave o botón en el tablero) activa una bobina interna que cierra un contacto capaz de manejar mucha más corriente (la que realmente necesita un faro, una bocina o un motor eléctrico). Así, el cableado fino del tablero no tiene que soportar la corriente real del componente.",
      "Con el multímetro: un fusible se prueba en continuidad (sano = 0Ω, cortado = circuito abierto). Un relé se prueba activándolo (aplicando tensión a la bobina) y confirmando con continuidad que el contacto de salida efectivamente cierra.",
    ],
  },
  {
    id: "ecu-sensores-actuadores",
    title: "ECU, sensores y actuadores: quién decide y quién ejecuta",
    icon: "🧠",
    body: [
      "La ECU (unidad de control del motor) es la computadora que recibe información, decide, y da órdenes. No mide nada por sí misma ni mueve nada por sí misma — depende completamente de los sensores para saber qué está pasando y de los actuadores para hacer algo al respecto.",
      "Un sensor es una entrada (input): convierte una magnitud física (temperatura, presión, posición, concentración de oxígeno) en una señal eléctrica que la ECU puede leer.",
      "Un actuador es una salida (output): la ECU le manda una orden eléctrica y el actuador produce un efecto físico (el inyector abre, la válvula IAC deja pasar más aire, el relé del electroventilador se activa).",
      "Diagnosticar 'a ciegas' cambiando piezas suele fallar porque no distingue estos dos roles: un actuador que no responde puede estar roto él mismo, o puede estar recibiendo una orden equivocada por un sensor que está informando mal a la ECU.",
    ],
  },
  {
    id: "can-bus",
    title: "CAN Bus: cómo se hablan los módulos entre sí",
    icon: "🔗",
    body: [
      "Los autos modernos tienen muchos módulos (ECU de motor, ABS, tablero, airbag, confort) que necesitan compartir información constantemente. En vez de tender un cable dedicado entre cada par de módulos, comparten un mismo par de cables — el bus CAN (CAN High y CAN Low) — por donde circulan todos los mensajes.",
      "Cada módulo 'escucha' el bus y toma solo los mensajes que le interesan, identificados por un código. Así, por ejemplo, el dato de velocidad de rueda que mide el módulo ABS puede llegar al mismo tiempo a la ECU de motor (para el control de tracción) y al tablero (para el velocímetro), sin necesidad de un cable para cada uno.",
      "Cuando un módulo deja de comunicarse en el bus (por un problema propio o de cableado), los demás módulos pueden generar códigos de falla relacionados con 'pérdida de comunicación', aunque el problema real esté en un solo módulo o conector.",
    ],
  },
  {
    id: "obd-dtc",
    title: "OBD-II y códigos DTC: cómo se lee un código",
    icon: "🔎",
    body: [
      "El conector OBD-II (obligatorio en autos nafteros desde mediados de los 2000 y en diésel poco después, según el mercado) da acceso estandarizado a los datos y códigos de falla de la ECU, sin importar la marca del auto.",
      "Un código DTC (Diagnostic Trouble Code) sigue una estructura fija de 5 caracteres: una letra que indica el sistema (P = Powertrain/motor y transmisión, B = Body/carrocería, C = Chassis/chasis, U = red de comunicación), un dígito que indica si es un código genérico estandarizado (0) o específico del fabricante (1), y tres dígitos más que identifican el subsistema y la falla puntual.",
      "Por ejemplo, P0301 se lee así: P (motor/transmisión) + 0 (código genérico, igual en cualquier marca) + 3 (sistema de encendido/fallo de combustión) + 01 (cilindro número 1). Es 'fallo de encendido detectado en el cilindro 1' — no te dice la causa (puede ser bujía, bobina, inyector, compresión), solo dónde está el síntoma.",
      "Por eso un código nunca es la respuesta final: es el punto de partida para investigar, no una pieza para comprar directamente.",
    ],
  },
];

/* ---------- Circuito interactivo: Ley de Ohm en un circuito básico ---------- */

const OHM_CIRCUIT = {
  connections: [
    { from: "bateria-ohm", to: "fusible-ohm", thick: true },
    { from: "fusible-ohm", to: "interruptor-ohm", thick: true },
    { from: "interruptor-ohm", to: "carga-ohm", thick: true },
    { from: "carga-ohm", to: "masa-ohm", thick: false },
  ],
  components: [
    { id: "bateria-ohm", x: 20, y: 130, w: 130, h: 60, label: "BATERÍA", sub: "≈12-14V", info: "Es la fuente de tensión del circuito. Es el punto de partida de cualquier medición: sin confirmar primero que hay una buena tensión acá, cualquier otra lectura del circuito puede llevar a un diagnóstico equivocado." },
    { id: "fusible-ohm", x: 190, y: 130, w: 130, h: 60, label: "FUSIBLE", sub: "", info: "Protege limitando la corriente máxima. Con el multímetro en continuidad: sano marca 0Ω (paso directo), cortado marca circuito abierto (sin continuidad)." },
    { id: "interruptor-ohm", x: 360, y: 130, w: 140, h: 60, label: "INTERRUPTOR", sub: "", info: "Abre o cierra el circuito a voluntad. Con el multímetro en continuidad se puede confirmar que realmente conecta al accionarlo y desconecta al soltarlo." },
    { id: "carga-ohm", x: 540, y: 130, w: 130, h: 60, label: "CARGA", sub: "ej: lamparita", info: "Es la resistencia del circuito. Según V = I × R, para una misma tensión de batería, cuanto mayor es la resistencia de la carga, menor es la corriente que circula." },
    { id: "masa-ohm", x: 360, y: 250, w: 140, h: 55, label: "MASA (RETORNO)", sub: "", info: "Cierra el circuito de vuelta a la batería a través del chasis. Una masa floja o corroída agrega una resistencia extra acá que le 'roba' tensión útil a la carga, aunque el resto del circuito esté perfecto — por eso conviene medir la caída de tensión en la masa, no solo en la alimentación." },
  ],
};

/* ---------- Referencia verificada de sensores comunes ---------- */
/* Rangos de voltaje/resistencia según el TIPO de sensor — conocimiento
   de ingeniería general, no atado a un auto ni un año en particular. */

const SENSOR_REFERENCE = [
  {
    id: "tps",
    nombre: "TPS (posición del acelerador)",
    hilos: "3 hilos: alimentación 5V, masa, señal",
    senal: "Analógica (potenciométrica)",
    rango: "≈0.5V (acelerador cerrado) a ≈4.5V (acelerador a fondo), en rampa lineal y sin saltos",
    nota: "Códigos típicos si falla: P0120 a P0124.",
  },
  {
    id: "map",
    nombre: "MAP (presión del colector)",
    hilos: "3 hilos: alimentación 5V, masa, señal",
    senal: "Analógica (piezorresistiva)",
    rango: "≈0.5V a ≈4.5V, variando con la presión de vacío del colector (motor en ralentí da menor voltaje que a plena carga)",
    nota: "El mismo principio de señal que el TPS, aunque mide presión en vez de posición.",
  },
  {
    id: "ckp-inductivo",
    nombre: "CKP/CMP inductivo (magnético)",
    hilos: "2 hilos, sin alimentación externa (genera su propia señal)",
    senal: "Alterna (AC), sinusoidal",
    rango: "≈0.5-2V AC en el arranque, subiendo hasta 5-12V AC a mayor régimen (la amplitud sube con las RPM). Resistencia de la bobina entre 200 y 2.000Ω según el fabricante.",
    nota: "Se mide en AC con el motor girando. Códigos típicos si falla: P0335 a P0339 (cigüeñal).",
  },
  {
    id: "ckp-hall",
    nombre: "CKP/CMP de efecto Hall (digital)",
    hilos: "3 o 4 hilos: alimentación (5V o 12V), señal, masa",
    senal: "Digital, onda cuadrada (DC pulsante)",
    rango: "Conmuta entre 0V y 5V (algunos sistemas hasta 12V), de forma estable, independiente de las RPM",
    nota: "Se mide en DC. Requiere alimentación externa, a diferencia del inductivo.",
  },
  {
    id: "o2",
    nombre: "Sonda de oxígeno (zirconio, banda estrecha)",
    hilos: "Al menos 1 hilo de señal + masa (las calefactadas suman 2 hilos más de alimentación del calefactor)",
    senal: "Analógica, oscilante",
    rango: "Entre 0.1V (mezcla pobre, exceso de oxígeno) y 0.9V (mezcla rica, poco oxígeno), oscilando varias veces por segundo en un motor sano",
    nota: "Una señal fija (sin oscilar) suele indicar sonda vieja o contaminada. Código típico: P0131 (señal baja/fija).",
  },
  {
    id: "ect-iat",
    nombre: "ECT / IAT (temperatura de refrigerante / aire)",
    hilos: "2 hilos: alimentación de referencia y señal (comparten masa con el circuito)",
    senal: "Resistiva (termistor NTC)",
    rango: "Es un termistor NTC: su resistencia BAJA a medida que la temperatura SUBE (comportamiento inverso al de una resistencia común). El valor exacto en ohmios varía mucho según el fabricante del sensor, por eso acá no se da un número — se compara contra la tabla del fabricante.",
    nota: "Con el motor frío, la resistencia es alta; con el motor caliente, es baja.",
  },
];

/* ---------- Estructura y ejemplos de códigos DTC ---------- */

const DTC_EXAMPLES = [
  { codigo: "P0301", significado: "Fallo de encendido (misfire) detectado en el cilindro 1 — el último dígito indica el cilindro" },
  { codigo: "P0120–P0124", significado: "Circuito del sensor TPS (posición del acelerador): rango, señal alta, baja o intermitente" },
  { codigo: "P0335–P0339", significado: "Circuito del sensor CKP (posición del cigüeñal): señal ausente, errática o fuera de rango" },
  { codigo: "P0131", significado: "Sonda de oxígeno banco 1 sensor 1: señal de voltaje anormalmente baja o fija" },
];
