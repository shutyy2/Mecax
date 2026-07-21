/* ---------------------------------------------------------
   DIAGNÓSTICO INTELIGENTE
   Árboles de decisión por síntoma. Cada síntoma tiene un nodo
   raíz y un diccionario de nodos: 'question' (con opciones que
   llevan a otro nodo) o 'result' (causas probables + qué hacer).
--------------------------------------------------------- */

const SYMPTOMS = {
  "no-arranca": {
    label: "No arranca",
    icon: "🔑",
    root: "q1",
    nodes: {
      q1: {
        type: "question",
        text: "¿Se encienden las luces del tablero al girar la llave o presionar el botón de arranque?",
        options: [
          { label: "Sí, todo enciende normal", next: "q2" },
          { label: "Encienden muy débiles o parpadean", next: "r_bateria_debil" },
          { label: "No enciende nada", next: "q3" },
        ],
      },
      q2: {
        type: "question",
        text: "Al intentar arrancar, ¿el motor de arranque gira?",
        options: [
          { label: "Sí, gira pero el motor no prende", next: "q4" },
          { label: "Se escucha un clic pero no gira", next: "r_solenoide" },
          { label: "No se escucha nada", next: "r_arranque_masa" },
        ],
      },
      q3: {
        type: "question",
        text: "¿Los bornes de la batería están limpios y bien ajustados?",
        options: [
          { label: "Sí, están en buen estado", next: "r_bateria_agotada" },
          { label: "No, están sucios o flojos", next: "r_bornes" },
        ],
      },
      q4: {
        type: "question",
        text: "¿Sentís olor a nafta al intentar arrancar?",
        options: [
          { label: "Sí, huele a nafta", next: "r_encendido" },
          { label: "No, no huele a nada", next: "r_combustible" },
        ],
      },
      r_bateria_debil: {
        type: "result",
        title: "Batería con carga baja",
        severity: "media",
        causes: [
          { cause: "Batería descargada o al final de su vida útil", detail: "Pierde tensión bajo la exigencia del motor de arranque." },
          { cause: "Alternador no está cargando correctamente", detail: "La batería se va descargando de a poco en cada viaje." },
          { cause: "Terminal flojo o corroído", detail: "Genera caída de tensión justo en el momento de mayor consumo." },
        ],
        recommendation: "Medí el voltaje de la batería en reposo con el multímetro (debería estar por encima de 12.4V). Con el motor en marcha, la lectura debería subir a 13.5-14.5V; si no sube, revisá el alternador.",
        tool: "Multímetro",
      },
      r_solenoide: {
        type: "result",
        title: "Falla en el solenoide o motor de arranque",
        severity: "alta",
        causes: [
          { cause: "Solenoide del motor de arranque no hace buen contacto", detail: "El clic es el solenoide intentando accionar sin lograr mover el motor." },
          { cause: "Motor de arranque desgastado", detail: "Las escobillas o el bendix pueden estar gastados." },
        ],
        recommendation: "Se puede probar el solenoide puenteando directamente los bornes correspondientes (con precaución) o llevar el motor de arranque a un banco de prueba.",
        tool: "Multímetro",
      },
      r_arranque_masa: {
        type: "result",
        title: "Sin alimentación al motor de arranque",
        severity: "media",
        causes: [
          { cause: "Fusible o relé de arranque en mal estado", detail: "Corta la alimentación antes de llegar al motor de arranque." },
          { cause: "Falla de masa entre motor y carrocería", detail: "El circuito no cierra correctamente aunque haya tensión disponible." },
        ],
        recommendation: "Revisá el fusible y el relé de arranque en la caja de fusibles, y el cable de masa entre el bloque motor y la carrocería.",
        tool: "Multímetro",
      },
      r_bateria_agotada: {
        type: "result",
        title: "Batería agotada",
        severity: "media",
        causes: [{ cause: "Batería sin carga suficiente para arrancar", detail: "Puede estar descargada por uso o al final de su vida útil." }],
        recommendation: "Cargá la batería y probala con un probador de baterías. Si no retiene la carga, hay que reemplazarla.",
        tool: "Probador de baterías",
      },
      r_bornes: {
        type: "result",
        title: "Mala conexión en los bornes",
        severity: "baja",
        causes: [{ cause: "Terminales sucios, corroídos o flojos", detail: "Impiden que pase la corriente necesaria para arrancar." }],
        recommendation: "Limpiá los bornes, ajustalos bien y aplicá grasa dieléctrica para prevenir la corrosión.",
        tool: "Cepillo para bornes",
      },
      r_encendido: {
        type: "result",
        title: "Posible falla en el sistema de encendido",
        severity: "media",
        causes: [
          { cause: "Bujías o bobinas sin generar chispa", detail: "El motor recibe combustible pero no se produce la combustión." },
          { cause: "Motor 'ahogado' por exceso de combustible", detail: "Demasiada nafta sin quemar en los cilindros." },
        ],
        recommendation: "Revisá si hay chispa en la bujía y el estado de las bobinas y cables de encendido.",
        tool: "Multímetro / probador de chispa",
      },
      r_combustible: {
        type: "result",
        title: "Falta de combustible en el riel de inyección",
        severity: "media",
        causes: [
          { cause: "Bomba de combustible débil o sin funcionar", detail: "No genera la presión necesaria para inyectar." },
          { cause: "Corte por inmovilizador", detail: "El sistema antirrobo puede estar bloqueando el arranque." },
        ],
        recommendation: "Verificá la presión de combustible con un manómetro y comprobá si el testigo del inmovilizador parpadea en el tablero.",
        tool: "Manómetro de combustible",
      },
    },
  },

  "se-cala": {
    label: "Arranca pero se cala",
    icon: "🌀",
    root: "q1",
    nodes: {
      q1: {
        type: "question",
        text: "¿Se cala con más frecuencia en frío o en caliente?",
        options: [
          { label: "En frío", next: "q_frio" },
          { label: "En caliente", next: "q_caliente" },
          { label: "Siempre, sin importar la temperatura", next: "r_ralenti" },
        ],
      },
      q_frio: {
        type: "question",
        text: "¿Se estabiliza si acelerás levemente?",
        options: [
          { label: "Sí, se estabiliza", next: "r_frio_sensor" },
          { label: "No, sigue calándose", next: "r_frio_combustible" },
        ],
      },
      q_caliente: {
        type: "question",
        text: "¿El electroventilador del radiador está siempre funcionando?",
        options: [
          { label: "Sí, casi siempre está andando", next: "r_termostato" },
          { label: "No especialmente", next: "r_vapor_lock" },
        ],
      },
      r_ralenti: {
        type: "result",
        title: "Problema en el control de ralentí",
        severity: "media",
        causes: [
          { cause: "Cuerpo de aceleración sucio", detail: "Ensucia el paso de aire mínimo y desestabiliza el ralentí." },
          { cause: "Válvula IAC en mal estado", detail: "No regula bien el aire de marcha mínima." },
          { cause: "Fuga de vacío", detail: "Entra aire no medido por la ECU." },
        ],
        recommendation: "Limpiá el cuerpo de aceleración y revisá las mangueras de vacío en busca de fugas o rajaduras.",
        tool: "Limpiador de cuerpo de aceleración",
      },
      r_frio_sensor: {
        type: "result",
        title: "Sensor de temperatura con lectura incorrecta",
        severity: "media",
        causes: [{ cause: "Sensor ECT (temperatura de refrigerante) da una lectura errónea", detail: "La ECU no enriquece la mezcla en frío como corresponde." }],
        recommendation: "Compará con el escáner la temperatura que reporta el sensor ECT contra la temperatura real del motor.",
        tool: "Escáner OBD-II",
      },
      r_frio_combustible: {
        type: "result",
        title: "Baja presión de combustible en frío",
        severity: "media",
        causes: [
          { cause: "Presión de combustible insuficiente", detail: "La bomba no logra la presión necesaria al arrancar en frío." },
          { cause: "Inyectores sucios", detail: "Pulverizan mal el combustible en frío." },
        ],
        recommendation: "Medí la presión de combustible con el motor frío y compará con el valor especificado.",
        tool: "Manómetro de combustible",
      },
      r_termostato: {
        type: "result",
        title: "Termostato o sensor de temperatura fallando",
        severity: "media",
        causes: [{ cause: "Termostato pegado en posición abierta", detail: "El motor nunca llega a la temperatura óptima de trabajo." }],
        recommendation: "Revisá el termostato y el sensor ECT; si el motor tarda demasiado en calentar, conviene reemplazar el termostato.",
        tool: "Termómetro / escáner",
      },
      r_vapor_lock: {
        type: "result",
        title: "Vapor lock o bomba de combustible débil en caliente",
        severity: "baja",
        causes: [{ cause: "El combustible se calienta y forma vapor en la línea, o la bomba pierde caudal en caliente", detail: "Afecta la alimentación justo cuando el motor está caliente." }],
        recommendation: "Medí el caudal y la presión de la bomba de combustible con el motor caliente.",
        tool: "Manómetro de combustible",
      },
    },
  },

  "consume-mucho": {
    label: "Consume mucho combustible",
    icon: "⛽",
    root: "q1",
    nodes: {
      q1: {
        type: "question",
        text: "¿El consumo alto es algo reciente o siempre fue así?",
        options: [
          { label: "Es reciente", next: "q2" },
          { label: "Siempre fue alto", next: "r_manejo" },
        ],
      },
      q2: {
        type: "question",
        text: "¿Está encendido el testigo de check engine?",
        options: [
          { label: "Sí", next: "r_sonda_lambda" },
          { label: "No", next: "q3" },
        ],
      },
      q3: {
        type: "question",
        text: "¿La aguja de temperatura llega a la posición normal de funcionamiento?",
        options: [
          { label: "No, tarda mucho o no llega", next: "r_termostato_consumo" },
          { label: "Sí, normal", next: "q4" },
        ],
      },
      q4: {
        type: "question",
        text: "¿Además del consumo alto notás pérdida de potencia?",
        options: [
          { label: "Sí", next: "r_filtros" },
          { label: "No", next: "r_neumaticos_frenos" },
        ],
      },
      r_manejo: {
        type: "result",
        title: "Puede no ser una falla mecánica",
        severity: "baja",
        causes: [{ cause: "Estilo de manejo, tránsito o presión de neumáticos", detail: "Antes de intervenir el motor, conviene descartar factores externos." }],
        recommendation: "Revisá la presión de los neumáticos y las condiciones habituales de manejo antes de buscar una falla mecánica.",
        tool: "Manómetro de neumáticos",
      },
      r_sonda_lambda: {
        type: "result",
        title: "Sensor de oxígeno o MAF con lectura incorrecta",
        severity: "media",
        causes: [{ cause: "La sonda lambda o el sensor MAF engañan a la ECU", detail: "La ECU compensa inyectando más combustible del necesario." }],
        recommendation: "Leé los datos en vivo del sensor de oxígeno y del MAF con el escáner para comparar contra valores normales.",
        tool: "Escáner OBD-II",
      },
      r_termostato_consumo: {
        type: "result",
        title: "Termostato abierto",
        severity: "media",
        causes: [{ cause: "El motor no llega a temperatura de trabajo", detail: "La ECU mantiene una mezcla más rica de lo necesario mientras el motor está 'frío'." }],
        recommendation: "Reemplazá el termostato si el motor tarda demasiado en alcanzar la temperatura normal.",
        tool: "Termómetro",
      },
      r_filtros: {
        type: "result",
        title: "Filtro de aire o inyectores sucios",
        severity: "media",
        causes: [
          { cause: "Filtro de aire tapado", detail: "Restringe el ingreso de aire y desbalancea la mezcla." },
          { cause: "Inyectores sucios", detail: "Pulverizan mal y afectan el consumo y la potencia." },
        ],
        recommendation: "Revisá el estado del filtro de aire y hacé una limpieza de inyectores.",
        tool: "Kit de limpieza de inyectores",
      },
      r_neumaticos_frenos: {
        type: "result",
        title: "Resistencia mecánica al rodamiento",
        severity: "baja",
        causes: [
          { cause: "Neumáticos desinflados", detail: "Aumentan la resistencia y el consumo sin afectar al motor." },
          { cause: "Pastillas de freno rozando", detail: "Frenan levemente la rueda de forma constante." },
        ],
        recommendation: "Revisá la presión de los neumáticos y que las cuatro ruedas giren libremente al levantar el auto.",
        tool: "Manómetro de neumáticos",
      },
    },
  },

  "humo-negro": {
    label: "Humo negro en el escape",
    icon: "💨",
    root: "q1",
    nodes: {
      q1: {
        type: "question",
        text: "¿El humo negro aparece solo al acelerar a fondo, o todo el tiempo?",
        options: [
          { label: "Solo al acelerar a fondo", next: "q2" },
          { label: "Todo el tiempo, incluso en ralentí", next: "r_inyector_pegado" },
        ],
      },
      q2: {
        type: "question",
        text: "¿El auto es diésel o nafta?",
        options: [
          { label: "Diésel", next: "q_diesel" },
          { label: "Nafta", next: "r_nafta_rica" },
        ],
      },
      q_diesel: {
        type: "question",
        text: "¿Tiene turbo?",
        options: [
          { label: "Sí", next: "r_diesel_turbo" },
          { label: "No", next: "r_diesel_inyectores" },
        ],
      },
      r_inyector_pegado: {
        type: "result",
        title: "Inyector abierto o pegado",
        severity: "alta",
        causes: [{ cause: "Un inyector queda inyectando combustible de forma constante", detail: "Genera mezcla rica y humo negro incluso en marcha mínima." }],
        recommendation: "Hacé una prueba de balance de inyectores o revisá con el escáner qué cilindro no aporta correctamente.",
        tool: "Escáner OBD-II",
      },
      r_nafta_rica: {
        type: "result",
        title: "Mezcla demasiado rica (nafta)",
        severity: "media",
        causes: [{ cause: "Sensor MAF/MAP con lectura errónea o presión de combustible alta", detail: "La ECU calcula mal la cantidad de combustible a inyectar." }],
        recommendation: "Revisá los datos en vivo de MAF/MAP y la presión del riel de combustible.",
        tool: "Escáner OBD-II / manómetro",
      },
      r_diesel_turbo: {
        type: "result",
        title: "Falta de aire de sobrealimentación (diésel turbo)",
        severity: "media",
        causes: [{ cause: "El turbo no alcanza la presión que la ECU espera", detail: "Puede ser por fuga en el sistema de admisión o wastegate mal calibrada." }],
        recommendation: "Comparar la presión de sobrealimentación real contra la esperada por la ECU con el escáner.",
        tool: "Escáner OBD-II / manómetro de presión",
      },
      r_diesel_inyectores: {
        type: "result",
        title: "Inyectores diésel desgastados",
        severity: "media",
        causes: [{ cause: "Pulverización deficiente del combustible", detail: "Genera combustión incompleta y humo negro." }],
        recommendation: "Hacer una prueba de caudal y patrón de pulverización en banco de inyectores.",
        tool: "Banco de prueba de inyectores",
      },
    },
  },

  "humo-blanco": {
    label: "Humo blanco en el escape",
    icon: "🌫️",
    root: "q1",
    nodes: {
      q1: {
        type: "question",
        text: "¿Cuándo aparece el humo blanco?",
        options: [
          { label: "Solo al arrancar en frío, y desaparece rápido", next: "r_condensacion" },
          { label: "Es constante y con olor dulzón", next: "r_junta_culata" },
          { label: "Es diésel y tarda en arrancar en frío", next: "r_bujias_incandescentes" },
        ],
      },
      r_condensacion: {
        type: "result",
        title: "Condensación normal",
        severity: "baja",
        causes: [{ cause: "Vapor de agua condensado en el escape", detail: "Es normal en climas fríos y desaparece a los pocos segundos de arrancar." }],
        recommendation: "Si el humo desaparece rápido y no vuelve a aparecer, no representa una falla.",
        tool: "—",
      },
      r_junta_culata: {
        type: "result",
        title: "Posible falla de junta de culata",
        severity: "alta",
        causes: [{ cause: "Pérdida de líquido refrigerante hacia la cámara de combustión", detail: "El refrigerante se quema junto con el combustible, generando humo blanco constante." }],
        recommendation: "Revisá el nivel de refrigerante y hacé una prueba de gases en el radiador para detectar CO2 en el líquido.",
        tool: "Kit de prueba de gases en refrigerante",
      },
      r_bujias_incandescentes: {
        type: "result",
        title: "Bujías incandescentes débiles (diésel)",
        severity: "media",
        causes: [{ cause: "Bujías de precalentamiento o su relé fallando", detail: "El motor arranca en frío sin la temperatura adecuada, generando combustión incompleta." }],
        recommendation: "Revisá el funcionamiento de las bujías incandescentes con el escáner o multímetro.",
        tool: "Escáner OBD-II / multímetro",
      },
    },
  },

  "humo-azul": {
    label: "Humo azul en el escape",
    icon: "🔵",
    root: "q1",
    nodes: {
      q1: {
        type: "question",
        text: "¿El humo azul aparece más al arrancar después de estar parado un rato, o en cualquier momento?",
        options: [
          { label: "Al arrancar después de estar parado", next: "r_retenes" },
          { label: "En cualquier momento, sobre todo acelerando", next: "r_aros" },
        ],
      },
      r_retenes: {
        type: "result",
        title: "Retenes de válvulas desgastados",
        severity: "media",
        causes: [{ cause: "Los retenes dejan pasar aceite hacia los cilindros con el motor apagado", detail: "Al arrancar, ese aceite se quema y genera humo azul." }],
        recommendation: "Hacé una prueba de compresión y revisá el estado de los retenes de válvulas.",
        tool: "Compresómetro",
      },
      r_aros: {
        type: "result",
        title: "Aros de pistón o cilindros desgastados",
        severity: "alta",
        causes: [{ cause: "El motor quema aceite en cualquier régimen de funcionamiento", detail: "Indica desgaste interno del motor." }],
        recommendation: "Hacé una prueba de compresión y una prueba de fugas (leak-down test) para confirmar el desgaste.",
        tool: "Compresómetro",
      },
    },
  },

  "pierde-potencia": {
    label: "Pierde potencia",
    icon: "📉",
    root: "q1",
    nodes: {
      q1: {
        type: "question",
        text: "¿La pérdida de potencia viene con el testigo de check engine encendido?",
        options: [
          { label: "Sí", next: "r_leer_dtc" },
          { label: "No", next: "q2" },
        ],
      },
      q2: {
        type: "question",
        text: "¿El auto tiene turbo?",
        options: [
          { label: "Sí", next: "q_turbo" },
          { label: "No", next: "q3" },
        ],
      },
      q_turbo: {
        type: "question",
        text: "¿Notás un silbido o sensación de pérdida de presión al acelerar?",
        options: [
          { label: "Sí", next: "r_fuga_turbo" },
          { label: "No", next: "r_filtro_combustible" },
        ],
      },
      q3: {
        type: "question",
        text: "¿El filtro de aire o de combustible llevan más de 15.000 km sin cambiarse?",
        options: [
          { label: "Sí", next: "r_filtros_vencidos" },
          { label: "No", next: "r_bujias_bobinas" },
        ],
      },
      r_leer_dtc: {
        type: "result",
        title: "Hay un código de falla guardado",
        severity: "media",
        causes: [{ cause: "La ECU detectó una falla y activó modo de protección o bajo rendimiento", detail: "El código guardado apunta directamente a la causa real." }],
        recommendation: "Conectá un escáner OBD-II y leé los códigos DTC antes de cambiar piezas al azar.",
        tool: "Escáner OBD-II",
      },
      r_fuga_turbo: {
        type: "result",
        title: "Fuga de aire en el circuito de sobrealimentación",
        severity: "media",
        causes: [{ cause: "Manguera o abrazadera floja en el turbo o intercooler", detail: "El motor no logra la presión de sobrealimentación necesaria." }],
        recommendation: "Revisá mangueras y abrazaderas del circuito de admisión con el motor en marcha, buscando silbidos.",
        tool: "Inspección visual / humo de prueba",
      },
      r_filtro_combustible: {
        type: "result",
        title: "Filtro de combustible parcialmente tapado",
        severity: "baja",
        causes: [{ cause: "Restringe el caudal de combustible a altas revoluciones", detail: "Se nota como pérdida de potencia progresiva." }],
        recommendation: "Medí la presión de combustible bajo carga y compará con el valor de referencia.",
        tool: "Manómetro de combustible",
      },
      r_filtros_vencidos: {
        type: "result",
        title: "Filtros de aire o combustible saturados",
        severity: "baja",
        causes: [{ cause: "Restringen el funcionamiento normal del motor", detail: "Es la causa más común y más simple de descartar primero." }],
        recommendation: "Reemplazá los filtros de aire y combustible según el kilometraje indicado por el fabricante.",
        tool: "—",
      },
      r_bujias_bobinas: {
        type: "result",
        title: "Bujías o bobinas desgastadas",
        severity: "media",
        causes: [{ cause: "Fallos de encendido intermitentes", detail: "Se sienten como pérdida de potencia, sobre todo en aceleración." }],
        recommendation: "Revisá el estado de las bujías y hacé una prueba de bobinas.",
        tool: "Multímetro / escáner",
      },
    },
  },

  "sobrecalienta": {
    label: "El motor se calienta",
    icon: "🌡️",
    root: "q1",
    nodes: {
      q1: {
        type: "question",
        text: "¿La aguja de temperatura sube de golpe o de a poco?",
        options: [
          { label: "De golpe", next: "r_perdida_refrigerante" },
          { label: "De a poco, en tránsito lento o parado", next: "q2" },
        ],
      },
      q2: {
        type: "question",
        text: "¿El electroventilador se activa cuando la temperatura sube?",
        options: [
          { label: "No se activa", next: "r_electroventilador" },
          { label: "Sí se activa pero la temperatura no baja", next: "r_radiador_bomba" },
        ],
      },
      r_perdida_refrigerante: {
        type: "result",
        title: "Pérdida repentina de refrigerante",
        severity: "alta",
        causes: [{ cause: "Manguera rota o pérdida en radiador/bomba de agua", detail: "El motor se queda sin líquido para disipar el calor." }],
        recommendation: "No sigas circulando. Revisá el nivel de refrigerante y buscá la pérdida visualmente antes de continuar el viaje.",
        tool: "Inspección visual",
      },
      r_electroventilador: {
        type: "result",
        title: "Electroventilador sin funcionar",
        severity: "alta",
        causes: [{ cause: "Fusible, relé o sensor de temperatura fallado", detail: "Sin el ventilador, el motor no se enfría en tránsito lento o detenido." }],
        recommendation: "Revisá el fusible y relé del electroventilador, y probá activarlo manualmente para descartar el motor del ventilador.",
        tool: "Multímetro",
      },
      r_radiador_bomba: {
        type: "result",
        title: "Radiador obstruido o bomba de agua débil",
        severity: "alta",
        causes: [
          { cause: "Radiador obstruido internamente", detail: "No logra disipar el calor aunque el ventilador funcione." },
          { cause: "Bomba de agua con impulsor desgastado", detail: "No genera suficiente circulación de refrigerante." },
        ],
        recommendation: "Revisá la diferencia de temperatura entre la entrada y la salida del radiador para detectar obstrucciones.",
        tool: "Termómetro infrarrojo",
      },
    },
  },

  "vibra-frenar": {
    label: "Vibra al frenar",
    icon: "🛑",
    root: "q1",
    nodes: {
      q1: {
        type: "question",
        text: "¿La vibración se siente en el volante o en el pedal/todo el auto?",
        options: [
          { label: "En el volante", next: "r_discos_delanteros" },
          { label: "En el pedal o en todo el auto", next: "r_discos_traseros" },
        ],
      },
      r_discos_delanteros: {
        type: "result",
        title: "Discos delanteros alabeados",
        severity: "media",
        causes: [{ cause: "Deformación por sobrecalentamiento o desgaste desparejo", detail: "Genera vibración que se transmite directo a la dirección." }],
        recommendation: "Medí el espesor y la planitud de los discos; según el estado, se rectifican o se reemplazan.",
        tool: "Micrómetro / reloj comparador",
      },
      r_discos_traseros: {
        type: "result",
        title: "Discos o tambores traseros en mal estado",
        severity: "media",
        causes: [{ cause: "Discos traseros alabeados o tambores ovalados", detail: "Genera vibración que se siente más en el pedal que en el volante." }],
        recommendation: "Revisá discos o tambores traseros y el estado de pastillas o campanas.",
        tool: "Micrómetro / reloj comparador",
      },
    },
  },

  "testigo-check-engine": {
    label: "Testigo check engine encendido",
    icon: "⚠️",
    root: "q1",
    nodes: {
      q1: {
        type: "question",
        text: "¿El testigo está fijo o parpadea?",
        options: [
          { label: "Parpadea", next: "r_misfire" },
          { label: "Está fijo", next: "r_leer_escaner" },
        ],
      },
      r_misfire: {
        type: "result",
        title: "Fallo de encendido activo (misfire)",
        severity: "alta",
        causes: [{ cause: "Uno o más cilindros no están quemando correctamente en este momento", detail: "El combustible sin quemar puede dañar el catalizador si se sigue manejando con exigencia." }],
        recommendation: "Evitá acelerar a fondo y llevá el auto a escanear cuanto antes.",
        tool: "Escáner OBD-II",
      },
      r_leer_escaner: {
        type: "result",
        title: "Código guardado de menor urgencia",
        severity: "media",
        causes: [{ cause: "La ECU guardó un código de falla que no es de emergencia", detail: "Puede afectar el consumo o las emisiones sin poner en riesgo el motor." }],
        recommendation: "Conectá el escáner OBD-II, leé los códigos DTC y los datos en vivo relacionados antes de decidir qué reparar.",
        tool: "Escáner OBD-II",
      },
    },
  },

  "bateria-descarga": {
    label: "La batería se descarga sola",
    icon: "🔋",
    root: "q1",
    nodes: {
      q1: {
        type: "question",
        text: "¿Se descarga en un día o menos, o tarda varios días estacionado?",
        options: [
          { label: "En un día o menos", next: "r_consumo_parasitario" },
          { label: "Tarda varios días", next: "q2" },
        ],
      },
      q2: {
        type: "question",
        text: "¿La batería tiene más de 3 años de uso?",
        options: [
          { label: "Sí", next: "r_bateria_vieja" },
          { label: "No", next: "r_alternador" },
        ],
      },
      r_consumo_parasitario: {
        type: "result",
        title: "Consumo parasitario",
        severity: "media",
        causes: [{ cause: "Algo sigue consumiendo corriente con el auto apagado", detail: "Puede ser una luz que no apaga bien o un módulo que no entra en reposo." }],
        recommendation: "Medí el consumo parasitario con el multímetro en serie con la batería, auto cerrado y en reposo por unos minutos.",
        tool: "Multímetro",
      },
      r_bateria_vieja: {
        type: "result",
        title: "Batería al final de su vida útil",
        severity: "baja",
        causes: [{ cause: "Ya no retiene la carga plena", detail: "Es normal después de varios años de uso." }],
        recommendation: "Probala con un probador de baterías (prueba de carga) para confirmar su estado real.",
        tool: "Probador de baterías",
      },
      r_alternador: {
        type: "result",
        title: "Alternador no está cargando lo suficiente",
        severity: "media",
        causes: [{ cause: "La batería no se recarga completamente durante la marcha", detail: "Con el tiempo llega cada vez con menos carga." }],
        recommendation: "Medí el voltaje con el motor en marcha: debería estar entre 13.5V y 14.5V aproximadamente.",
        tool: "Multímetro",
      },
    },
  },
};

const SEVERITY_LABEL = {
  alta: "Atención alta",
  media: "Atención media",
  baja: "Atención baja",
};
