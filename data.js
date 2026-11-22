// Retos originales basados en los contenidos del resumen de gramática de 5.º y 6.º.
const choice=(id,prompt,options,answer,explain)=>({id,type:'choice',prompt,options,answer,explain});
const multi=(id,prompt,options,answer,explain)=>({id,type:'multi',prompt,options,answer,explain});
const build=(id,prompt,words,explain)=>({id,type:'build',prompt,words,answer:words.join(' '),explain});

const ZONES=[
 {id:'nombres',name:'El bosque de los nombres',short:'Los nombres',icon:'🌳',label:'ZONA 1',color:'#36bc8f',start:'#167d76',end:'#244d84',description:'Comunes, propios, individuales, colectivos, concretos y abstractos.',questions:[
  choice('n01','¿Qué palabra es un nombre propio?',['montaña','Daniela','bosque','ciudad'],1,'«Daniela» nombra a una persona concreta y se escribe con mayúscula inicial.'),
  choice('n02','¿Cuál es un nombre colectivo?',['abeja','enjambre','ala','flor'],1,'«Enjambre» nombra un conjunto de abejas.'),
  choice('n03','¿Qué nombre es abstracto?',['esperanza','ventana','bicicleta','manzana'],0,'La esperanza es una idea o sentimiento; no se percibe como un objeto material.'),
  choice('n04','En «El equipo celebró la victoria», «equipo» es un nombre…',['propio','colectivo','abstracto','no contable'],1,'«Equipo» designa un grupo de personas.'),
  choice('n05','¿Cuál es un nombre no contable en este contexto?',['cuaderno','arena','lápiz','árbol'],1,'La arena se mide por cantidades; no se cuentan sus unidades de forma habitual.'),
  choice('n06','¿Qué palabra nombra algo concreto?',['paciencia','alegría','tambor','justicia'],2,'Un tambor es un objeto que se puede percibir.'),
  choice('n07','¿Qué pareja contiene solo nombres comunes?',['Luna y Marta','río y puente','Sevilla y río','Marta y puente'],1,'«Río» y «puente» nombran seres u objetos de una clase, no individuos concretos.'),
  choice('n08','«Archipiélago» es colectivo porque nombra…',['una sola isla','un conjunto de islas','una emoción','un nombre propio'],1,'Un archipiélago reúne varias islas.'),
  multi('n09','Selecciona todos los nombres abstractos.',['amistad','mesa','valentía','zapato'],[0,2],'«Amistad» y «valentía» son ideas o cualidades.'),
  build('n10','Ordena una oración con un nombre colectivo.',['La','manada','cruzó','el','valle.'],'«Manada» nombra un conjunto de animales.')
 ]},
 {id:'adjetivos',name:'La ciudad de los detalles',short:'Adjetivos y determinantes',icon:'🏙️',label:'ZONA 2',color:'#ffd46b',start:'#9f6a21',end:'#7f3b81',description:'Grados del adjetivo, artículos, demostrativos, posesivos y numerales.',questions:[
  choice('a01','En «El castillo antiguo destaca», ¿cuál es el adjetivo?',['El','castillo','antiguo','destaca'],2,'«Antiguo» expresa una cualidad de «castillo».'),
  choice('a02','¿Qué oración usa un adjetivo comparativo de igualdad?',['Es más alto que yo.','Es tan alto como yo.','Es altísimo.','Es menos alto que yo.'],1,'La estructura «tan… como» compara en igualdad.'),
  choice('a03','¿Cuál es un superlativo?',['feliz','más feliz','tan feliz','felicísimo'],3,'«Felicísimo» expresa la cualidad en grado máximo.'),
  choice('a04','En «aquellas montañas», «aquellas» es un determinante…',['posesivo','numeral','demostrativo','artículo'],2,'Un demostrativo indica cercanía o lejanía respecto de quien habla.'),
  choice('a05','¿Cuál es un artículo determinado?',['un','una','la','unas'],2,'«La» presenta un nombre conocido o identificado.'),
  choice('a06','En «mis libros», «mis» indica…',['cantidad exacta','posesión','lejanía','duda'],1,'Es un determinante posesivo.'),
  choice('a07','¿Qué determinante expresa orden?',['cuatro','primero','varios','ese'],1,'«Primero» es un numeral ordinal.'),
  choice('a08','En «alguna respuesta», «alguna» es…',['un artículo','un numeral','un indefinido','un verbo'],2,'Indica una cantidad imprecisa.'),
  multi('a09','Selecciona todos los determinantes demostrativos.',['este','nuestro','aquellos','dos'],[0,2],'«Este» y «aquellos» sitúan elementos a diferente distancia.'),
  build('a10','Ordena una comparación de superioridad.',['Mi','cometa','es','más','grande','que','el','tuyo.'],'El comparativo de superioridad usa «más… que».')
 ]},
 {id:'verbos',name:'La torre del tiempo',short:'Pronombres y verbos',icon:'⏳',label:'ZONA 3',color:'#8cbdff',start:'#335fa8',end:'#5440a0',description:'Pronombres personales, conjugaciones, tiempos, formas y modos verbales.',questions:[
  choice('v01','En «Nosotros llegamos temprano», «nosotros» es…',['un nombre','un pronombre personal','un adjetivo','un adverbio'],1,'Sustituye a los nombres de las personas que hablan.'),
  choice('v02','¿Qué forma verbal es compuesta?',['cantaban','cantaré','hemos cantado','cantar'],2,'Una forma compuesta usa «haber» y un participio.'),
  choice('v03','¿A qué conjugación pertenece «aprender»?',['primera','segunda','tercera','ninguna'],1,'Los infinitivos terminados en -er son de la segunda conjugación.'),
  choice('v04','En «Mañana viajaremos», la acción se sitúa en…',['presente','pasado','futuro','imperativo'],2,'«Viajaremos» indica una acción futura.'),
  choice('v05','¿Qué oración usa el modo imperativo?',['Cierra el libro.','Cerraría el libro.','Ojalá cierre el libro.','Cerré el libro.'],0,'El imperativo expresa una orden o instrucción.'),
  choice('v06','En «Te envié una nota», «te» es un pronombre…',['tónico','átono','demostrativo','posesivo'],1,'Los pronombres átonos acompañan a un verbo.'),
  choice('v07','¿Cuál es el lexema de «vivimos»?',['viv-','-imos','-mos','vivimos'],0,'El lexema aporta el significado básico; «-imos» es la desinencia.'),
  choice('v08','En «Ojalá llueva», el verbo está en modo…',['indicativo','subjuntivo','imperativo','infinitivo'],1,'El subjuntivo puede expresar deseos.'),
  multi('v09','Selecciona todos los pronombres personales.',['ella','ellos','su','nos'],[0,1,3],'«Ella», «ellos» y «nos» son pronombres; «su» acompaña a un nombre.'),
  build('v10','Ordena una oración con verbo en futuro.',['Mañana','visitaremos','el','museo.'],'«Visitaremos» expresa una acción futura.')
 ]},
 {id:'invariables',name:'El portal de los enlaces',short:'Palabras invariables',icon:'🌀',label:'ZONA 4',color:'#eb9dff',start:'#8d3b9b',end:'#344a98',description:'Adverbios, preposiciones, conjunciones e interjecciones.',questions:[
  choice('i01','En «Quizá vengamos», «quizá» es un adverbio de…',['lugar','tiempo','duda','cantidad'],2,'«Quizá» indica posibilidad o duda.'),
  choice('i02','¿Qué palabra es una preposición?',['aunque','desde','ayer','¡eh!'],1,'«Desde» relaciona palabras o grupos de palabras.'),
  choice('i03','En «Canta y baila», «y» es una conjunción…',['disyuntiva','adversativa','copulativa','subordinada'],2,'Une elementos y añade información.'),
  choice('i04','¿Qué conjunción ofrece una alternativa?',['pero','o','y','porque'],1,'«O» es una conjunción disyuntiva.'),
  choice('i05','En «Camina lentamente», «lentamente» indica…',['modo','lugar','afirmación','negación'],0,'Explica cómo se realiza la acción.'),
  choice('i06','¿Cuál es una interjección?',['bajo','muy','¡Ay!','aunque'],2,'Una interjección puede expresar una emoción por sí sola.'),
  choice('i07','En «Fuimos al parque, pero llovió», «pero» expresa…',['suma','oposición','orden','lugar'],1,'«Pero» es una conjunción adversativa.'),
  choice('i08','En «El libro está encima», «encima» es un adverbio de…',['tiempo','lugar','cantidad','duda'],1,'Indica dónde está el libro.'),
  multi('i09','Selecciona todas las preposiciones.',['hacia','entre','porque','sin'],[0,1,3],'«Hacia», «entre» y «sin» son preposiciones.'),
  build('i10','Ordena una oración con conjunción adversativa.',['Quería','salir,','pero','empezó','a','llover.'],'«Pero» une dos ideas con oposición.')
 ]},
 {id:'final',name:'El dragón de tinta',short:'Batalla final',icon:'🐉',label:'RETO FINAL',color:'#fa85da',start:'#79308f',end:'#273886',description:'Una mezcla de todos los contenidos para demostrar tu dominio.',questions:[
  choice('f01','«Biblioteca» es un nombre…',['abstracto','concreto','colectivo','propio'],1,'Nombra un lugar que puede percibirse.'),
  choice('f02','En «las tres llaves», «tres» es…',['un adverbio','un numeral cardinal','un pronombre','un verbo'],1,'Un cardinal expresa cantidad exacta.'),
  choice('f03','En «Ellos dibujaron ayer», «ayer» es un adverbio de…',['modo','cantidad','tiempo','lugar'],2,'Indica cuándo ocurrió la acción.'),
  choice('f04','¿Qué forma verbal está en primera persona del plural?',['cantas','corremos','saltan','escribe'],1,'«Corremos» concuerda con «nosotros».'),
  choice('f05','¿Qué forma está en superlativo?',['menos claro','tan claro','clarísimo','más claro'],2,'«Clarísimo» expresa una cualidad en grado máximo.'),
  choice('f06','En «aunque llueva, iremos», «aunque» es…',['una conjunción','una preposición','un adverbio','una interjección'],0,'Une dos ideas estableciendo una relación entre ellas.'),
  choice('f07','¿Cuál es un pronombre personal átono?',['mí','conmigo','me','nosotros'],2,'«Me» acompaña a un verbo: «me llamó».'),
  choice('f08','¿Qué nombre es colectivo?',['músico','orquesta','violín','melodía'],1,'«Orquesta» designa un grupo de músicos.'),
  multi('f09','Selecciona todos los adverbios de tiempo.',['hoy','mañana','aquí','ayer'],[0,1,3],'«Hoy», «mañana» y «ayer» indican tiempo.'),
  build('f10','Ordena una oración con pronombre y verbo compuesto.',['Ella','ha','descubierto','la','respuesta.'],'«Ella» es pronombre personal y «ha descubierto» es forma verbal compuesta.')
 ]}
];
