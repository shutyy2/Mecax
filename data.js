/* ---------------------------------------------------------
   DATOS TÉCNICOS
   Fichas de referencia estilo "manual de taller" con
   especificaciones y procedimientos de diagnóstico típicos
   para modelos de alta circulación en Argentina.
--------------------------------------------------------- */

const ICONS = {
  motor: "⚙️",
  settings: "🔩",
  car: "🚗",
  circle: "🛑",
  gauge: "🎛️",
  cpu: "🧠",
  zap: "⚡",
  key: "🔑",
  bulb: "💡",
  fan: "❄️",
};

const ASSEMBLY_SEQUENCE = [
  "Bloque de cilindros",
  "Cigüeñal y bancada",
  "Pistones y bielas",
  "Tapa de cilindros (culata)",
  "Sistema de distribución",
  "Tapa de válvulas",
];

const CARS = [
  {
    id: "gol",
    brand: "Volkswagen",
    model: "Gol Trend",
    tag: "El más vendido de la última década",
    mechanical: {
      motor: {
        title: "Motor", icon: "motor",
        desc: "Motor de cuatro cilindros en línea, aspiración natural, con bloque de hierro fundido y culata de aluminio.",
        specs: { Código: "EA111 1.6", Potencia: "101 CV a 5250 rpm", Cilindrada: "1598 cm³", Distribución: "Correa dentada", Combustible: "Nafta" },
      },
      transmision: {
        title: "Transmisión", icon: "settings",
        desc: "Caja manual de 5 marchas con embrague monodisco en seco, comando por cable.",
        specs: { Tipo: "Manual 5 vel.", Embrague: "Monodisco seco 200mm", "Relación final": "3.94:1" },
      },
      suspension: {
        title: "Suspensión", icon: "car",
        desc: "Delantera McPherson con barra estabilizadora; trasera eje torsional semi-independiente.",
        specs: { Delantera: "McPherson", Trasera: "Eje torsional", Amortiguadores: "Hidráulicos telescópicos" },
      },
      frenos: {
        title: "Frenos", icon: "circle",
        desc: "Discos ventilados adelante, tambores atrás, con servofreno a depresión.",
        specs: { Delanteros: "Discos ventilados 256mm", Traseros: "Tambores 200mm", Asistencia: "Servofreno" },
      },
      direccion: {
        title: "Dirección", icon: "gauge",
        desc: "Cremallera y piñón con asistencia hidráulica.",
        specs: { Tipo: "Cremallera", Asistencia: "Hidráulica", "Vueltas volante": "3.1" },
      },
    },
    electrical: {
      ecu: {
        title: "Módulo de inyección (ECU)", icon: "cpu",
        desc: "Gestión electrónica Marelli/Bosch integrando inyección y encendido, con autodiagnóstico OBD-II.",
        specs: { Sistema: "Magneti Marelli IAW", Protocolo: "OBD-II", Conector: "16 pines" },
      },
      sensores: {
        title: "Sensores", icon: "zap",
        desc: "Red de sensores de posición, temperatura y oxígeno que alimentan a la ECU en tiempo real.",
        specs: { Principales: "MAP, TPS, sonda lambda, temperatura de agua, rotativo (fase/giro)" },
      },
      encendido: {
        title: "Sistema de arranque y carga", icon: "key",
        desc: "Motor de arranque de imanes permanentes y alternador con regulador incorporado.",
        specs: { Batería: "12V 45Ah", Alternador: "70A", Arranque: "1.1 kW" },
      },
      iluminacion: {
        title: "Iluminación", icon: "bulb",
        desc: "Óptica halógena H4, luces traseras con bombillas convencionales y relés centralizados en la caja de fusibles.",
        specs: { Baja: "H4 60/55W", Fusibles: "Caja bajo tablero" },
      },
      climatizacion: {
        title: "Climatización", icon: "fan",
        desc: "Aire acondicionado manual con compresor de accionamiento por correa y control de habitáculo por cables o electrónico según versión.",
        specs: { Refrigerante: "R134a", Compresor: "A accionamiento por correa" },
      },
    },
    failures: [
      {
        id: "gol-mec-1", system: "mecanica",
        title: "Ruido metálico al arrancar en frío",
        symptom: "Se escucha un traqueteo metálico durante los primeros segundos después de arrancar, que desaparece al entrar en temperatura.",
        correctSteps: [
          "Verificar el nivel y la calidad del aceite motor",
          "Revisar la presión de aceite con manómetro",
          "Inspeccionar el tensor de la correa de distribución",
          "Comprobar el juego de los taqués hidráulicos",
        ],
        distractors: ["Purgar el circuito de frenos", "Revisar la presión de los neumáticos", "Cambiar la sonda lambda"],
      },
      {
        id: "gol-elec-1", system: "electronica",
        title: "Check engine intermitente",
        symptom: "La luz de falla del motor se enciende al acelerar y se apaga sola después de un rato.",
        correctSteps: [
          "Conectar el escáner OBD-II y leer códigos de falla",
          "Inspeccionar conectores y masas de la ECU",
          "Revisar el estado de la sonda lambda",
          "Verificar el sensor MAP y sus mangueras de vacío",
        ],
        distractors: ["Cambiar las pastillas de freno", "Purgar el sistema de refrigeración", "Ajustar la alineación"],
      },
    ],
  },
  {
    id: "cronos",
    brand: "Fiat",
    model: "Cronos",
    tag: "Sedán líder de fabricación nacional",
    mechanical: {
      motor: {
        title: "Motor", icon: "motor",
        desc: "Motor Firefly de tres cilindros, bloque de aluminio, con doble árbol de levas en culata.",
        specs: { Código: "Firefly 1.3", Potencia: "99 CV a 6250 rpm", Cilindrada: "1332 cm³", Distribución: "Cadena", Combustible: "Nafta" },
      },
      transmision: {
        title: "Transmisión", icon: "settings",
        desc: "Disponible con caja manual de 5 marchas o automática CVT.",
        specs: { Tipo: "Manual 5 vel. / CVT", Embrague: "Monodisco seco" },
      },
      suspension: {
        title: "Suspensión", icon: "car",
        desc: "Delantera McPherson, trasera eje torsional con muelles helicoidales.",
        specs: { Delantera: "McPherson", Trasera: "Eje torsional" },
      },
      frenos: {
        title: "Frenos", icon: "circle",
        desc: "Discos adelante, tambores atrás, con ABS y EBD de serie.",
        specs: { Delanteros: "Discos ventilados", Traseros: "Tambores", Asistencia: "ABS + EBD" },
      },
      direccion: {
        title: "Dirección", icon: "gauge",
        desc: "Cremallera con asistencia eléctrica variable según velocidad.",
        specs: { Tipo: "Cremallera", Asistencia: "Eléctrica (EPS)" },
      },
    },
    electrical: {
      ecu: {
        title: "Módulo de inyección (ECU)", icon: "cpu",
        desc: "Central Bosch con gestión integrada de motor y control de emisiones, comunicación en red CAN.",
        specs: { Sistema: "Bosch ME17", Protocolo: "OBD-II / CAN", Conector: "16 pines" },
      },
      sensores: {
        title: "Sensores", icon: "zap",
        desc: "Sensores de posición de cigüeñal y árbol de levas, MAP, TPS y sonda lambda de banda ancha.",
        specs: { Principales: "CKP, CMP, MAP, TPS, sonda lambda" },
      },
      encendido: {
        title: "Sistema de arranque y carga", icon: "key",
        desc: "Arranque por botón (start-stop en algunas versiones) con inmovilizador electrónico.",
        specs: { Batería: "12V 50Ah", Alternador: "90A", Inmovilizador: "Por transponder" },
      },
      iluminacion: {
        title: "Iluminación", icon: "bulb",
        desc: "Faros con guías LED de luz diurna y ópticas halógenas o full LED según versión.",
        specs: { Baja: "Halógena / LED", DRL: "LED" },
      },
      climatizacion: {
        title: "Climatización", icon: "fan",
        desc: "Aire acondicionado manual o climatizador automático, con compresor de desplazamiento variable.",
        specs: { Refrigerante: "R134a", Control: "Manual / automático" },
      },
    },
    failures: [
      {
        id: "cronos-mec-1", system: "mecanica",
        title: "Vibración fuerte al ralentí",
        symptom: "El auto tiembla notablemente con el motor en marcha mínima y mejora al acelerar.",
        correctSteps: [
          "Revisar el estado de los soportes (bujes) del motor",
          "Verificar la sincronización del ralentí en el escáner",
          "Inspeccionar bujías y bobinas",
          "Comprobar fugas de vacío en mangueras del colector",
        ],
        distractors: ["Cambiar el líquido de frenos", "Revisar el filtro de habitáculo", "Ajustar el espejo retrovisor"],
      },
      {
        id: "cronos-elec-1", system: "electronica",
        title: "No arranca pese a que el tablero enciende",
        symptom: "Al girar la llave o presionar start, las luces del tablero encienden pero el motor de arranque no gira.",
        correctSteps: [
          "Verificar el estado y carga de la batería",
          "Revisar el relé y fusible del motor de arranque",
          "Comprobar la señal del inmovilizador/transponder",
          "Inspeccionar el conector del motor de arranque",
        ],
        distractors: ["Revisar el nivel de refrigerante", "Cambiar los amortiguadores", "Purgar el embrague hidráulico"],
      },
    ],
  },
  {
    id: "onix",
    brand: "Chevrolet",
    model: "Onix",
    tag: "Referente del segmento B",
    mechanical: {
      motor: {
        title: "Motor", icon: "motor",
        desc: "Motor turbo de tres cilindros con inyección directa, o naftero atmosférico de 1.0 según versión.",
        specs: { Código: "1.0 Turbo / 1.0 Atmosférico", Potencia: "116 CV (turbo) / 82 CV (atmosférico)", Distribución: "Cadena", Combustible: "Nafta" },
      },
      transmision: {
        title: "Transmisión", icon: "settings",
        desc: "Manual de 5 marchas o automática de 6 velocidades (turbo).",
        specs: { Tipo: "Manual 5 vel. / Automática 6 vel." },
      },
      suspension: {
        title: "Suspensión", icon: "car",
        desc: "Delantera McPherson, trasera eje de torsión.",
        specs: { Delantera: "McPherson", Trasera: "Eje de torsión" },
      },
      frenos: {
        title: "Frenos", icon: "circle",
        desc: "Discos ventilados adelante y tambores o discos atrás según versión, con ABS.",
        specs: { Delanteros: "Discos ventilados", Traseros: "Tambores/Discos", Asistencia: "ABS + EBD" },
      },
      direccion: {
        title: "Dirección", icon: "gauge",
        desc: "Asistencia eléctrica con columna colapsable.",
        specs: { Tipo: "Cremallera", Asistencia: "Eléctrica (EPS)" },
      },
    },
    electrical: {
      ecu: {
        title: "Módulo de inyección (ECU)", icon: "cpu",
        desc: "Central Bosch/Delco con control de turbo (en versión turbo) y comunicación en red multiplexada.",
        specs: { Sistema: "Bosch MED17", Protocolo: "OBD-II / CAN" },
      },
      sensores: {
        title: "Sensores", icon: "zap",
        desc: "Sensor de presión de sobrealimentación (turbo), MAP, CKP, CMP y sonda lambda.",
        specs: { Principales: "MAP/Boost, CKP, CMP, sonda lambda" },
      },
      encendido: {
        title: "Sistema de arranque y carga", icon: "key",
        desc: "Arranque convencional con llave o botón según versión, batería de mayor capacidad en turbo.",
        specs: { Batería: "12V 50-60Ah", Alternador: "90-100A" },
      },
      iluminacion: {
        title: "Iluminación", icon: "bulb",
        desc: "Faros halógenos de serie, proyector LED en versiones altas.",
        specs: { Baja: "Halógena / LED", DRL: "LED opcional" },
      },
      climatizacion: {
        title: "Climatización", icon: "fan",
        desc: "Aire acondicionado manual con mandos rotativos.",
        specs: { Refrigerante: "R134a", Control: "Manual" },
      },
    },
    failures: [
      {
        id: "onix-mec-1", system: "mecanica",
        title: "Pérdida de potencia (versión turbo)",
        symptom: "El auto se siente 'lento', como si el turbo no entregara empuje, sobre todo en subidas.",
        correctSteps: [
          "Revisar fugas de aire en mangueras del turbo",
          "Verificar el estado del filtro de aire",
          "Comprobar la válvula wastegate con el escáner",
          "Inspeccionar el intercooler por obstrucciones",
        ],
        distractors: ["Cambiar las escobillas del limpiaparabrisas", "Revisar el nivel de líquido de dirección", "Purgar los frenos traseros"],
      },
      {
        id: "onix-elec-1", system: "electronica",
        title: "Falla intermitente del tablero digital",
        symptom: "El cuadro de instrumentos parpadea o se apaga por segundos mientras se conduce.",
        correctSteps: [
          "Revisar el conector y masa del cluster",
          "Verificar la tensión de la batería bajo carga",
          "Inspeccionar el bus de comunicación (red CAN)",
          "Comprobar el fusible dedicado del tablero",
        ],
        distractors: ["Cambiar las pastillas de freno", "Revisar el nivel de aceite de caja", "Ajustar la convergencia"],
      },
    ],
  },
  {
    id: "208",
    brand: "Peugeot",
    model: "208",
    tag: "Referente en diseño y equipamiento",
    mechanical: {
      motor: {
        title: "Motor", icon: "motor",
        desc: "Motor PureTech turbo de tres cilindros con inyección directa de alta presión.",
        specs: { Código: "PureTech 1.2 Turbo", Potencia: "130 CV a 5500 rpm", Distribución: "Cadena", Combustible: "Nafta" },
      },
      transmision: {
        title: "Transmisión", icon: "settings",
        desc: "Manual de 6 marchas o automática de 6 velocidades tipo torque converter.",
        specs: { Tipo: "Manual 6 vel. / Automática 6 vel." },
      },
      suspension: {
        title: "Suspensión", icon: "car",
        desc: "Delantera McPherson con brazo triangulado, trasera eje flexible con barra estabilizadora integrada.",
        specs: { Delantera: "McPherson", Trasera: "Eje flexible" },
      },
      frenos: {
        title: "Frenos", icon: "circle",
        desc: "Discos adelante y atrás en versiones altas, con ABS, ESP y asistencia de frenado de emergencia.",
        specs: { Delanteros: "Discos ventilados", Traseros: "Discos/Tambores", Asistencia: "ABS + ESP" },
      },
      direccion: {
        title: "Dirección", icon: "gauge",
        desc: "Dirección eléctrica de relación directa (i-Cockpit), muy asistida a baja velocidad.",
        specs: { Tipo: "Cremallera", Asistencia: "Eléctrica (EPS)" },
      },
    },
    electrical: {
      ecu: {
        title: "Módulo de inyección (ECU)", icon: "cpu",
        desc: "Central Continental/Bosch con gestión de turbo e inyección directa, integrada a la red multiplexada del vehículo.",
        specs: { Sistema: "Continental EMS3", Protocolo: "OBD-II / CAN" },
      },
      sensores: {
        title: "Sensores", icon: "zap",
        desc: "Sensores de alta presión de riel, CKP, CMP, presión de sobrealimentación y sonda lambda de banda ancha.",
        specs: { Principales: "Riel de alta presión, MAP/Boost, CKP, CMP, sonda lambda" },
      },
      encendido: {
        title: "Sistema de arranque y carga", icon: "key",
        desc: "Acceso y arranque por manos libres en versiones altas, con tarjeta inteligente.",
        specs: { Batería: "12V 60Ah", Alternador: "110A" },
      },
      iluminacion: {
        title: "Iluminación", icon: "bulb",
        desc: "Faros full LED con firma lumínica de tres garras, característicos de la marca.",
        specs: { Baja: "Full LED", DRL: "LED integrado" },
      },
      climatizacion: {
        title: "Climatización", icon: "fan",
        desc: "Climatizador automático bizona en versiones altas.",
        specs: { Refrigerante: "R134a", Control: "Automático bizona" },
      },
    },
    failures: [
      {
        id: "208-mec-1", system: "mecanica",
        title: "Golpeteo metálico agudo en frío",
        symptom: "Se escucha un sonido tipo 'diesel' en los primeros minutos, típico de motores PureTech.",
        correctSteps: [
          "Verificar nivel y viscosidad correcta del aceite",
          "Revisar el tensor y la cadena de distribución",
          "Comprobar el estado de la bomba de aceite",
          "Inspeccionar los inyectores de alta presión",
        ],
        distractors: ["Revisar el filtro de polen", "Cambiar la correa de accesorios", "Purgar el circuito de embrague"],
      },
      {
        id: "208-elec-1", system: "electronica",
        title: "El Stop & Start deja de funcionar",
        symptom: "El motor ya no se apaga solo en los semáforos como lo hacía antes.",
        correctSteps: [
          "Verificar el estado de salud de la batería reforzada (AGM/EFB)",
          "Revisar el sensor de posición de embrague o freno",
          "Leer los códigos de falla relacionados al sistema Stop & Start",
          "Comprobar la temperatura del motor y del habitáculo (condiciones de bloqueo)",
        ],
        distractors: ["Cambiar el filtro de aceite", "Revisar el nivel de líquido de frenos", "Ajustar los faros"],
      },
    ],
  },
  {
    id: "hilux",
    brand: "Toyota",
    model: "Hilux",
    tag: "La pick-up más elegida del país",
    mechanical: {
      motor: {
        title: "Motor", icon: "motor",
        desc: "Motor turbodiésel de cuatro cilindros con inyección common rail e intercooler.",
        specs: { Código: "1GD-FTV / 2GD-FTV 2.4-2.8", Potencia: "150-204 CV", Distribución: "Correa/Cadena según versión", Combustible: "Diésel" },
      },
      transmision: {
        title: "Transmisión", icon: "settings",
        desc: "Manual de 6 marchas o automática de 6 velocidades, con caja transfer 4x4.",
        specs: { Tipo: "Manual 6 vel. / Automática 6 vel.", Tracción: "4x2 / 4x4" },
      },
      suspension: {
        title: "Suspensión", icon: "car",
        desc: "Delantera independiente por doble triángulo, trasera de eje rígido con ballestas.",
        specs: { Delantera: "Doble triángulo", Trasera: "Eje rígido con ballestas" },
      },
      frenos: {
        title: "Frenos", icon: "circle",
        desc: "Discos ventilados adelante, tambores atrás, con ABS y control de estabilidad.",
        specs: { Delanteros: "Discos ventilados", Traseros: "Tambores", Asistencia: "ABS + VSC" },
      },
      direccion: {
        title: "Dirección", icon: "gauge",
        desc: "Cremallera con asistencia hidráulica o eléctrica según año de fabricación.",
        specs: { Tipo: "Cremallera", Asistencia: "Hidráulica / Eléctrica" },
      },
    },
    electrical: {
      ecu: {
        title: "Módulo de inyección (ECU / EDU diésel)", icon: "cpu",
        desc: "Unidad de control diésel Denso que gestiona el riel común, EGR y el turbo de geometría variable.",
        specs: { Sistema: "Denso common rail", Protocolo: "OBD-II / CAN" },
      },
      sensores: {
        title: "Sensores", icon: "zap",
        desc: "Sensores de presión de riel, EGR, presión de sobrealimentación y caudal de aire (MAF).",
        specs: { Principales: "Riel de presión, MAF, EGR, CKP, CMP" },
      },
      encendido: {
        title: "Sistema de arranque y precalentamiento", icon: "key",
        desc: "Bujías incandescentes (glow plugs) para el arranque en frío, motor de arranque reforzado.",
        specs: { Batería: "12V 65-80Ah", Alternador: "130A", Precalentamiento: "Bujías incandescentes" },
      },
      iluminacion: {
        title: "Iluminación", icon: "bulb",
        desc: "Faros halógenos o full LED con luces de circulación diurna, según versión.",
        specs: { Baja: "Halógena / LED", DRL: "LED" },
      },
      climatizacion: {
        title: "Climatización", icon: "fan",
        desc: "Aire acondicionado manual o climatizador automático con salidas para segunda fila.",
        specs: { Refrigerante: "R134a", Control: "Manual / automático" },
      },
    },
    failures: [
      {
        id: "hilux-mec-1", system: "mecanica",
        title: "Humo negro al acelerar a fondo",
        symptom: "Al pisar el acelerador a fondo sale humo negro por el escape, sobre todo con carga.",
        correctSteps: [
          "Revisar el estado del filtro de aire",
          "Verificar la presión de sobrealimentación del turbo",
          "Comprobar el funcionamiento de la válvula EGR",
          "Inspeccionar los inyectores por sobre-inyección",
        ],
        distractors: ["Cambiar las pastillas de freno traseras", "Revisar el nivel de líquido de dirección", "Ajustar el espejo"],
      },
      {
        id: "hilux-elec-1", system: "electronica",
        title: "Arranque difícil en frío con humo blanco",
        symptom: "Por las mañanas cuesta arrancar y sale humo blanco los primeros segundos.",
        correctSteps: [
          "Verificar el funcionamiento de las bujías incandescentes",
          "Revisar el relé de precalentamiento",
          "Comprobar el estado de la batería en frío",
          "Inspeccionar el sensor de temperatura del refrigerante",
        ],
        distractors: ["Revisar el filtro de habitáculo", "Cambiar el líquido de frenos", "Purgar el embrague hidráulico"],
      },
    ],
  },
  {
    id: "ka",
    brand: "Ford",
    model: "Ka",
    tag: "Clásico urbano de bajo mantenimiento",
    mechanical: {
      motor: {
        title: "Motor", icon: "motor",
        desc: "Motor Ti-VCT de cuatro cilindros con distribución variable, bloque de aluminio.",
        specs: { Código: "Ti-VCT 1.5", Potencia: "101-136 CV según versión", Distribución: "Correa dentada", Combustible: "Nafta" },
      },
      transmision: {
        title: "Transmisión", icon: "settings",
        desc: "Manual de 5 o 6 marchas según versión.",
        specs: { Tipo: "Manual 5-6 vel." },
      },
      suspension: {
        title: "Suspensión", icon: "car",
        desc: "Delantera McPherson, trasera eje de torsión.",
        specs: { Delantera: "McPherson", Trasera: "Eje de torsión" },
      },
      frenos: {
        title: "Frenos", icon: "circle",
        desc: "Discos adelante, tambores atrás, con ABS de serie.",
        specs: { Delanteros: "Discos ventilados", Traseros: "Tambores", Asistencia: "ABS" },
      },
      direccion: {
        title: "Dirección", icon: "gauge",
        desc: "Cremallera con asistencia eléctrica.",
        specs: { Tipo: "Cremallera", Asistencia: "Eléctrica (EPS)" },
      },
    },
    electrical: {
      ecu: {
        title: "Módulo de inyección (ECU)", icon: "cpu",
        desc: "Central Bosch/Ford con gestión de fase variable (VCT) y diagnóstico integrado.",
        specs: { Sistema: "Bosch MED17", Protocolo: "OBD-II / CAN" },
      },
      sensores: {
        title: "Sensores", icon: "zap",
        desc: "Sensores de fase (VCT), CKP, TPS, MAP y sonda lambda.",
        specs: { Principales: "VCT, CKP, TPS, MAP, sonda lambda" },
      },
      encendido: {
        title: "Sistema de arranque y carga", icon: "key",
        desc: "Arranque convencional por llave, alternador de gestión inteligente de carga.",
        specs: { Batería: "12V 50Ah", Alternador: "90A" },
      },
      iluminacion: {
        title: "Iluminación", icon: "bulb",
        desc: "Faros halógenos H4 de serie.",
        specs: { Baja: "H4 60/55W" },
      },
      climatizacion: {
        title: "Climatización", icon: "fan",
        desc: "Aire acondicionado manual con mandos rotativos simples.",
        specs: { Refrigerante: "R134a", Control: "Manual" },
      },
    },
    failures: [
      {
        id: "ka-mec-1", system: "mecanica",
        title: "Marcha mínima inestable",
        symptom: "En ralentí las revoluciones suben y bajan solas, a veces al punto de calarse.",
        correctSteps: [
          "Limpiar el cuerpo de aceleración (mariposa)",
          "Revisar fugas de vacío en mangueras",
          "Verificar la válvula de control de ralentí (IAC)",
          "Comprobar bujías y cables de encendido",
        ],
        distractors: ["Cambiar el líquido de dirección", "Revisar el nivel de refrigerante", "Purgar los frenos"],
      },
      {
        id: "ka-elec-1", system: "electronica",
        title: "El tablero titila al usar accesorios",
        symptom: "Al prender los faros o el aire acondicionado, el brillo del tablero parpadea.",
        correctSteps: [
          "Revisar el estado y bornes de la batería",
          "Verificar la correa y tensión del alternador",
          "Comprobar la masa general de carrocería",
          "Inspeccionar el fusible general del circuito eléctrico",
        ],
        distractors: ["Cambiar las pastillas de freno", "Revisar el nivel de aceite de caja", "Ajustar la dirección"],
      },
    ],
  },
];
