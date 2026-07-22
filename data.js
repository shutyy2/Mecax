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
        steps: [
          { text: "Verificar el nivel y la calidad del aceite motor", reason: "Es lo más simple y rápido de revisar, y la causa más común: un aceite bajo o degradado deja de lubricar bien apenas arranca el motor en frío." },
          { text: "Revisar la presión de aceite con manómetro", reason: "Si el nivel y la calidad están bien, hay que confirmar que la bomba de aceite realmente esté generando la presión necesaria antes de sospechar de piezas internas." },
          { text: "Inspeccionar el tensor de la correa de distribución", reason: "Un tensor gastado genera un golpeteo parecido al de aceite bajo; se revisa después porque implica destapar la tapa de distribución." },
          { text: "Comprobar el juego de los taqués hidráulicos", reason: "Es la revisión más laboriosa, por eso se deja para el final, cuando ya se descartaron las causas más simples." },
        ],
        distractors: [
          { text: "Purgar el circuito de frenos", reason: "Los frenos no tienen relación con un ruido de motor en frío; es un sistema completamente independiente." },
          { text: "Revisar la presión de los neumáticos", reason: "No influye en ruidos del motor, solo en manejo y consumo." },
          { text: "Cambiar la sonda lambda", reason: "La sonda lambda afecta la mezcla de combustible, no genera ruidos mecánicos como el descripto." },
        ],
      },
      {
        id: "gol-elec-1", system: "electronica",
        title: "Check engine intermitente",
        symptom: "La luz de falla del motor se enciende al acelerar y se apaga sola después de un rato.",
        steps: [
          { text: "Conectar el escáner OBD-II y leer códigos de falla", reason: "Es siempre el primer paso ante un testigo encendido: el código guardado indica en qué sistema buscar en vez de revisar a ciegas." },
          { text: "Inspeccionar conectores y masas de la ECU", reason: "Un falso contacto es una causa muy común de fallas intermitentes y es rápido de descartar antes de sospechar de un sensor específico." },
          { text: "Revisar el estado de la sonda lambda", reason: "Si el código apunta a mezcla de combustible, la sonda lambda es el sensor que más rápido se degrada con el uso y hay que revisarlo primero." },
          { text: "Verificar el sensor MAP y sus mangueras de vacío", reason: "Se revisa después porque implica desarmar mangueras; se deja para cuando ya se descartaron las causas más simples." },
        ],
        distractors: [
          { text: "Cambiar las pastillas de freno", reason: "Los frenos no tienen relación con el testigo de motor ni con la gestión de inyección." },
          { text: "Purgar el sistema de refrigeración", reason: "No afecta al testigo de check engine relacionado a mezcla de combustible." },
          { text: "Ajustar la alineación", reason: "Es un ajuste de suspensión/dirección, sin relación con la electrónica del motor." },
        ],
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
        desc: "Motor Firefly de cuatro cilindros y 8 válvulas, bloque de aluminio, con árbol de levas único y fase variable; cadena de distribución sin cambio programado ('for life').",
        specs: { Código: "Firefly 1.3", Potencia: "99 CV a 6.000 rpm", Torque: "127 Nm (13 kgm) a 4.000 rpm", Cilindrada: "1332 cm³", "Relación de compresión": "11.1:1", Distribución: "Cadena (sin mantenimiento programado)", Combustible: "Nafta" },
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
        steps: [
          { text: "Revisar el estado de los soportes (bujes) del motor", reason: "Es la causa más frecuente de este síntoma: un soporte roto o vencido deja que el motor transmita su vibración natural a la carrocería, y es visualmente fácil de chequear." },
          { text: "Verificar la sincronización del ralentí en el escáner", reason: "Si los soportes están bien, hay que confirmar que la ECU esté manteniendo un ralentí estable antes de sospechar de piezas de encendido." },
          { text: "Inspeccionar bujías y bobinas", reason: "Un fallo de encendido leve en algún cilindro genera vibración al ralentí; se revisa después de descartar lo mecánico y la sincronización." },
          { text: "Comprobar fugas de vacío en mangueras del colector", reason: "Requiere revisar varias mangueras una por una, por eso queda como último paso una vez descartadas las causas más directas." },
        ],
        distractors: [
          { text: "Cambiar el líquido de frenos", reason: "El circuito de frenos no genera vibraciones de motor en ralentí." },
          { text: "Revisar el filtro de habitáculo", reason: "Afecta la calidad del aire interior, no la estabilidad del motor." },
          { text: "Ajustar el espejo retrovisor", reason: "No tiene ninguna relación mecánica con el motor." },
        ],
      },
      {
        id: "cronos-elec-1", system: "electronica",
        title: "No arranca pese a que el tablero enciende",
        symptom: "Al girar la llave o presionar start, las luces del tablero encienden pero el motor de arranque no gira.",
        steps: [
          { text: "Verificar el estado y carga de la batería", reason: "Aunque el tablero encienda, la batería puede no tener la carga puntual necesaria para mover el motor de arranque; es lo primero y más rápido de medir." },
          { text: "Revisar el relé y fusible del motor de arranque", reason: "Si la batería está bien, el siguiente sospechoso más simple es que la corriente no esté llegando al motor de arranque por un relé o fusible cortado." },
          { text: "Comprobar la señal del inmovilizador/transponder", reason: "Es una causa común en autos con arranque por botón; se revisa después porque requiere leer datos específicos del sistema de seguridad." },
          { text: "Inspeccionar el conector del motor de arranque", reason: "Se dejó para el final porque implica acceso físico al motor de arranque, más laborioso que las revisiones anteriores." },
        ],
        distractors: [
          { text: "Revisar el nivel de refrigerante", reason: "No influye en el circuito eléctrico de arranque." },
          { text: "Cambiar los amortiguadores", reason: "Es parte de la suspensión, sin relación con el sistema de arranque." },
          { text: "Purgar el embrague hidráulico", reason: "Afecta el accionamiento del embrague, no la alimentación eléctrica del arranque." },
        ],
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
        desc: "Desde julio de 2024 toda la gama Onix en Argentina se vende únicamente con motor turbo de tres cilindros e inyección directa (antes también existía una versión 1.2 atmosférica de 90 CV, hoy discontinuada pero todavía circulando en unidades usadas).",
        specs: { Código: "1.0 Turbo (999 cm³)", Potencia: "116 CV a 5.500 rpm", Torque: "160 Nm a 2.000 rpm", Distribución: "Cadena", Combustible: "Nafta" },
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
        steps: [
          { text: "Revisar fugas de aire en mangueras del turbo", reason: "Es la causa más común y rápida de chequear: una manguera floja o rota hace que se pierda la presión antes de llegar al motor." },
          { text: "Verificar el estado del filtro de aire", reason: "Si las mangueras están bien, un filtro tapado restringe el aire que puede tomar el turbo; es sencillo de revisar visualmente." },
          { text: "Comprobar la válvula wastegate con el escáner", reason: "Requiere el escáner para ver si la ECU está pidiendo más presión de la que la wastegate permite lograr; se revisa cuando ya se descartó lo más simple." },
          { text: "Inspeccionar el intercooler por obstrucciones", reason: "Una obstrucción interna es menos común y más difícil de detectar, por eso queda como último paso." },
        ],
        distractors: [
          { text: "Cambiar las escobillas del limpiaparabrisas", reason: "No tiene relación con la potencia del motor." },
          { text: "Revisar el nivel de líquido de dirección", reason: "Afecta la asistencia de dirección, no la potencia del motor." },
          { text: "Purgar los frenos traseros", reason: "El circuito de frenos es independiente del sistema de admisión y turbo." },
        ],
      },
      {
        id: "onix-elec-1", system: "electronica",
        title: "Falla intermitente del tablero digital",
        symptom: "El cuadro de instrumentos parpadea o se apaga por segundos mientras se conduce.",
        steps: [
          { text: "Revisar el conector y masa del cluster", reason: "Un falso contacto en el conector del tablero es la causa más común y más rápida de descartar antes de sospechar de la red eléctrica." },
          { text: "Verificar la tensión de la batería bajo carga", reason: "Una caída momentánea de tensión puede reiniciar el tablero; se mide después de confirmar que el conector está bien." },
          { text: "Inspeccionar el bus de comunicación (red CAN)", reason: "Requiere el escáner para ver errores de comunicación entre módulos; se revisa cuando ya se descartaron las causas eléctricas simples." },
          { text: "Comprobar el fusible dedicado del tablero", reason: "Un fusible flojo (no cortado) puede generar cortes intermitentes; queda al final porque es menos frecuente que las causas anteriores." },
        ],
        distractors: [
          { text: "Cambiar las pastillas de freno", reason: "No tiene relación con el tablero digital." },
          { text: "Revisar el nivel de aceite de caja", reason: "Es mantenimiento de transmisión, no afecta al cuadro de instrumentos." },
          { text: "Ajustar la convergencia", reason: "Es un ajuste de alineación de las ruedas, sin relación con el sistema eléctrico." },
        ],
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
        desc: "La gama argentina se vende con dos motorizaciones distintas según versión: un 1.6L naftero atmosférico en las versiones de entrada, y un 1.0L turbo (T200) en las versiones tope de gama.",
        specs: { "Motor Active/Allure": "1.6L atmosférico, 115 CV a 6.000 rpm, 150 Nm a 4.000 rpm", "Motor Allure T200/GT": "1.0L Turbo (999 cm³), 120 CV a 5.750 rpm, 200 Nm a 1.750 rpm", Combustible: "Nafta" },
      },
      transmision: {
        title: "Transmisión", icon: "settings",
        desc: "El motor 1.6 atmosférico usa caja manual de 5 marchas o automática de 6; el motor 1.0 Turbo usa exclusivamente caja CVT de 7 velocidades simuladas.",
        specs: { "Con motor 1.6": "Manual 5 vel. / Automática 6 vel.", "Con motor 1.0 Turbo": "CVT 7 vel. simuladas" },
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
        desc: "Faros halógenos en las versiones Active y Allure; solo la versión GT tope de gama trae ópticas Full LED con corrección automática de altura y firma de tres garras DRL.",
        specs: { "Active/Allure": "Halógenos + DRL Tri-LED", GT: "Full LED con corrección automática de altura" },
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
        steps: [
          { text: "Verificar nivel y viscosidad correcta del aceite", reason: "Es la revisión más simple y la causa más común: un aceite de viscosidad incorrecta tarda más en lubricar la cadena en frío." },
          { text: "Revisar el tensor y la cadena de distribución", reason: "Es una falla conocida en este motor; se revisa después de confirmar que el aceite no es la causa, ya que requiere destapar la tapa delantera." },
          { text: "Comprobar el estado de la bomba de aceite", reason: "Si la cadena está bien pero el ruido persiste, hay que confirmar que la bomba genere la presión necesaria en el arranque en frío." },
          { text: "Inspeccionar los inyectores de alta presión", reason: "Es la causa menos probable para este síntoma puntual, por eso se revisa al final." },
        ],
        distractors: [
          { text: "Revisar el filtro de polen", reason: "Afecta la calidad del aire de la cabina, no genera ruidos de motor." },
          { text: "Cambiar la correa de accesorios", reason: "Genera otro tipo de ruido (chillido), no un golpeteo metálico interno." },
          { text: "Purgar el circuito de embrague", reason: "El embrague no tiene relación con ruidos internos del motor." },
        ],
      },
      {
        id: "208-elec-1", system: "electronica",
        title: "El Stop & Start deja de funcionar",
        symptom: "El motor ya no se apaga solo en los semáforos como lo hacía antes.",
        steps: [
          { text: "Verificar el estado de salud de la batería reforzada (AGM/EFB)", reason: "El sistema Stop & Start se bloquea automáticamente si la batería no tiene la carga suficiente para el reencendido; es la causa más frecuente y la primera en revisar." },
          { text: "Revisar el sensor de posición de embrague o freno", reason: "Si la batería está bien, el sistema necesita confirmar que se pisó el pedal correcto; un sensor con falla también bloquea el Stop & Start." },
          { text: "Leer los códigos de falla relacionados al sistema Stop & Start", reason: "El escáner ayuda a confirmar cuál de las condiciones de bloqueo está activa, una vez descartado lo más simple." },
          { text: "Comprobar la temperatura del motor y del habitáculo (condiciones de bloqueo)", reason: "Es lo último porque son condiciones normales de diseño (frío extremo, aire acondicionado muy exigido) y no necesariamente una falla." },
        ],
        distractors: [
          { text: "Cambiar el filtro de aceite", reason: "Es mantenimiento del motor, sin relación con el sistema Stop & Start." },
          { text: "Revisar el nivel de líquido de frenos", reason: "No está vinculado al bloqueo del sistema de arranque automático." },
          { text: "Ajustar los faros", reason: "Es un ajuste de iluminación, sin relación con este sistema." },
        ],
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
        desc: "Motor turbodiésel de cuatro cilindros con inyección common rail e intercooler; toda la familia GD usa cadena de distribución, no correa.",
        specs: { Código: "2GD-FTV 2.4 / 1GD-FTV 2.8", Potencia: "150 CV (2.4) / 204 CV a 3.400 rpm (2.8)", Torque: "400 Nm (2.4) / 420-500 Nm según caja (2.8)", Distribución: "Cadena", Combustible: "Diésel" },
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
        steps: [
          { text: "Revisar el estado del filtro de aire", reason: "Es la causa más común y la más rápida de descartar: un filtro tapado no deja entrar suficiente aire para quemar bien el combustible." },
          { text: "Verificar la presión de sobrealimentación del turbo", reason: "Si el filtro está bien, hay que confirmar que el turbo esté entregando la presión de aire esperada por la ECU." },
          { text: "Comprobar el funcionamiento de la válvula EGR", reason: "Una EGR pegada altera la mezcla de aire y combustible; se revisa con el escáner después de descartar filtro y turbo." },
          { text: "Inspeccionar los inyectores por sobre-inyección", reason: "Requiere una prueba de banco, por eso se deja como último paso una vez descartadas las causas más simples." },
        ],
        distractors: [
          { text: "Cambiar las pastillas de freno traseras", reason: "No tiene relación con la combustión ni el humo del escape." },
          { text: "Revisar el nivel de líquido de dirección", reason: "Afecta la asistencia de dirección, no la combustión del motor." },
          { text: "Ajustar el espejo", reason: "No tiene ninguna relación con el sistema de combustión." },
        ],
      },
      {
        id: "hilux-elec-1", system: "electronica",
        title: "Arranque difícil en frío con humo blanco",
        symptom: "Por las mañanas cuesta arrancar y sale humo blanco los primeros segundos.",
        steps: [
          { text: "Verificar el funcionamiento de las bujías incandescentes", reason: "Son la pieza diseñada específicamente para el arranque en frío diésel; es lo primero a revisar porque es la causa más directa del síntoma." },
          { text: "Revisar el relé de precalentamiento", reason: "Si las bujías están bien, el relé que las alimenta es el siguiente sospechoso más simple de comprobar." },
          { text: "Comprobar el estado de la batería en frío", reason: "Una batería débil no logra sostener el precalentamiento el tiempo necesario; se revisa después de confirmar bujías y relé." },
          { text: "Inspeccionar el sensor de temperatura del refrigerante", reason: "Si da una lectura incorrecta, la ECU no calcula bien el tiempo de precalentamiento; queda al final por ser menos frecuente." },
        ],
        distractors: [
          { text: "Revisar el filtro de habitáculo", reason: "No influye en el arranque del motor." },
          { text: "Cambiar el líquido de frenos", reason: "No tiene relación con el sistema de precalentamiento diésel." },
          { text: "Purgar el embrague hidráulico", reason: "Afecta el accionamiento del embrague, no el arranque en frío." },
        ],
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
        desc: "Desde 2018 el Ka usa el motor Dragon: tres cilindros, aspirado, bloque y tapa de aluminio, con distribución variable independiente en admisión y escape (la generación anterior, 2014-2018, usaba un 4 cilindros de 105 CV).",
        specs: { Código: "Ti-VCT 1.5 'Dragon'", Potencia: "123 CV a 6.500 rpm", Torque: "151 Nm a 4.500 rpm", Distribución: "Correa dentada en baño de aceite", Combustible: "Nafta" },
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
        steps: [
          { text: "Limpiar el cuerpo de aceleración (mariposa)", reason: "Es la causa más común y la revisión más simple: la suciedad en la mariposa desestabiliza el aire mínimo que necesita el motor para sostener el ralentí." },
          { text: "Revisar fugas de vacío en mangueras", reason: "Si la limpieza no resuelve el problema, una manguera rajada deja entrar aire no controlado por la ECU." },
          { text: "Verificar la válvula de control de ralentí (IAC)", reason: "Es la pieza que regula específicamente el aire de marcha mínima; se revisa después porque implica desmontarla para inspeccionarla." },
          { text: "Comprobar bujías y cables de encendido", reason: "Un fallo de encendido leve también genera inestabilidad en ralentí; queda al final porque es menos frecuente que las causas anteriores en este síntoma." },
        ],
        distractors: [
          { text: "Cambiar el líquido de dirección", reason: "No tiene relación con la estabilidad del ralentí." },
          { text: "Revisar el nivel de refrigerante", reason: "No afecta directamente a las revoluciones de marcha mínima." },
          { text: "Purgar los frenos", reason: "El circuito de frenos es independiente del control de ralentí del motor." },
        ],
      },
      {
        id: "ka-elec-1", system: "electronica",
        title: "El tablero titila al usar accesorios",
        symptom: "Al prender los faros o el aire acondicionado, el brillo del tablero parpadea.",
        steps: [
          { text: "Revisar el estado y bornes de la batería", reason: "Una batería débil o con bornes flojos provoca caídas de tensión notorias apenas se suma un consumo extra; es lo primero y más simple de chequear." },
          { text: "Verificar la correa y tensión del alternador", reason: "Si la batería está bien, hay que confirmar que el alternador esté generando la carga suficiente para sostener los consumos adicionales." },
          { text: "Comprobar la masa general de carrocería", reason: "Una masa floja genera caídas de tensión que se notan justo al activar accesorios; se revisa después de descartar batería y alternador." },
          { text: "Inspeccionar el fusible general del circuito eléctrico", reason: "Es la causa menos común, por eso se revisa al final, cuando ya se descartaron las fuentes más probables de caída de tensión." },
        ],
        distractors: [
          { text: "Cambiar las pastillas de freno", reason: "No tiene relación con el sistema eléctrico general." },
          { text: "Revisar el nivel de aceite de caja", reason: "Es mantenimiento de transmisión, sin relación con el tablero." },
          { text: "Ajustar la dirección", reason: "No influye en el comportamiento eléctrico del vehículo." },
        ],
      },
    ],
  },
];
