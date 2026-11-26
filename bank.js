// Veinte retos nuevos por zona. Junto a los diez originales forman treinta
// situaciones distintas en cada nivel. Los niveles cambian las ayudas y las
// opciones; se mantiene el mismo objetivo curricular.
const EXTRA={
 nombres:[
 ['¿Qué nombre propio designa una ciudad?',['Málaga','ciudad','puerto','calle'],0,'«Málaga» identifica una ciudad concreta.'],
 ['¿Qué nombre propio designa un río?',['agua','río','Ebro','orilla'],2,'«Ebro» es el nombre de un río concreto.'],
 ['¿Cuál es un nombre común?',['Lucía','Pirineos','perro','Atlántico'],2,'«Perro» nombra a cualquier animal de esa clase.'],
 ['¿Qué palabra es un nombre colectivo?',['rebaño','oveja','lana','pastor'],0,'«Rebaño» nombra un conjunto de ovejas.'],
 ['¿Qué palabra nombra un conjunto de árboles?',['bosque','árbol','tronco','hoja'],0,'«Bosque» es un nombre colectivo.'],
 ['¿Cuál es un nombre individual?',['alumnado','ejército','soldado','manada'],2,'«Soldado» nombra a un solo miembro del conjunto.'],
 ['¿Qué nombre es abstracto?',['ternura','pelota','teclado','montaña'],0,'La ternura es una cualidad que no es un objeto material.'],
 ['¿Qué nombre es abstracto?',['silla','generosidad','cuchara','ventana'],1,'La generosidad es una cualidad.'],
 ['¿Qué nombre es concreto?',['miedo','bondad','lámpara','libertad'],2,'Una lámpara se puede percibir con los sentidos.'],
 ['¿Cuál es un nombre no contable?',['harina','galleta','plato','caja'],0,'La harina se mide por cantidades.'],
 ['¿Cuál es un nombre contable?',['agua','aire','arroz','botella'],3,'Podemos contar botellas: una, dos, tres...'],
 ['En «La bandada voló», ¿qué nombre es colectivo?',['La','bandada','voló','ninguno'],1,'«Bandada» nombra un grupo de aves.'],
 ['En «La alegría llenó la clase», ¿qué nombre es abstracto?',['alegría','clase','La','llenó'],0,'La alegría es un sentimiento.'],
 ['¿Qué nombre propio está bien escrito?',['granada','Granada','granAda','GRanada'],1,'Los nombres propios llevan mayúscula inicial.'],
 ['¿Qué pareja contiene dos nombres colectivos?',['oveja y perro','manada y rebaño','perro y manada','flor y bosque'],1,'«Manada» y «rebaño» nombran conjuntos.'],
 ['¿Qué pareja contiene dos nombres abstractos?',['paz y amistad','paz y mesa','libro y amistad','sol y mar'],0,'Paz y amistad son ideas o sentimientos.'],
 ['¿Qué palabra puede contarse por unidades?',['leche','azúcar','silla','arena'],2,'Podemos decir una silla o varias sillas.'],
 ['¿Cuál es el nombre común en «Sofía abrió la puerta»?',['Sofía','abrió','puerta','la'],2,'«Puerta» nombra un objeto de una clase.'],
 ['¿Qué nombre designa un conjunto de músicos?',['orquesta','músico','violín','melodía'],0,'Una orquesta reúne a varios músicos.'],
 ['¿Qué nombre designa un conjunto de alumnos?',['alumno','alumnado','pupitre','aula'],1,'«Alumnado» nombra al conjunto de alumnos.']
 ],
 adjetivos:[
 ['En «la casa azul», ¿cuál es el adjetivo?',['la','casa','azul','ninguno'],2,'«Azul» expresa una cualidad de la casa.'],
 ['En «un día luminoso», ¿cuál es el adjetivo?',['un','día','luminoso','ninguno'],2,'«Luminoso» describe al día.'],
 ['¿Qué palabra expresa una cualidad?',['rápido','este','tres','mi'],0,'«Rápido» es un adjetivo calificativo.'],
 ['¿Qué oración contiene un comparativo de superioridad?',['Es tan grande como yo.','Es más grande que yo.','Es grandísimo.','Es grande.'],1,'«Más... que» expresa superioridad.'],
 ['¿Qué oración contiene un comparativo de inferioridad?',['Es menos alto que Ana.','Es tan alto como Ana.','Es altísimo.','Es muy alto.'],0,'«Menos... que» expresa inferioridad.'],
 ['¿Qué adjetivo está en grado positivo?',['más dulce','tan dulce','dulce','dulcísimo'],2,'«Dulce» expresa la cualidad sin comparar ni intensificar.'],
 ['¿Qué adjetivo está en superlativo?',['muy pequeño','tan pequeño','menos pequeño','pequeño'],0,'«Muy pequeño» intensifica la cualidad al máximo.'],
 ['¿Qué determinante es un artículo indeterminado?',['el','las','una','los'],2,'«Una» presenta un nombre no identificado previamente.'],
 ['¿Qué determinante es un artículo determinado?',['unos','una','el','un'],2,'«El» es un artículo determinado.'],
 ['En «esta libreta», «esta» es...',['demostrativo','posesivo','numeral','artículo'],0,'Sitúa la libreta cerca de quien habla.'],
 ['En «aquellos barcos», «aquellos» indica...',['posesión','lejanía','cantidad','orden'],1,'Es un demostrativo de lejanía.'],
 ['En «nuestro colegio», «nuestro» es...',['posesivo','artículo','numeral','adverbio'],0,'Indica relación de posesión o pertenencia.'],
 ['¿Qué determinante posesivo acompaña a «casa»?',['esa','mi','dos','alguna'],1,'«Mi casa» indica posesión.'],
 ['En «cinco lápices», «cinco» es...',['numeral cardinal','numeral ordinal','demostrativo','posesivo'],0,'Indica una cantidad exacta.'],
 ['En «segunda fila», «segunda» es...',['numeral cardinal','numeral ordinal','indefinido','artículo'],1,'Indica el orden.'],
 ['¿Qué determinante indica cantidad imprecisa?',['tres','este','algunos','mi'],2,'«Algunos» es un indefinido.'],
 ['En «cada estudiante», «cada» es...',['indefinido','artículo','posesivo','numeral ordinal'],0,'«Cada» distribuye una cantidad sin fijar un número.'],
 ['¿Qué frase contiene un demostrativo?',['mis zapatos','dos zapatos','esos zapatos','unos zapatos'],2,'«Esos» señala cierta distancia.'],
 ['¿Qué frase contiene un posesivo?',['sus dibujos','estos dibujos','tres dibujos','los dibujos'],0,'«Sus» indica posesión.'],
 ['¿Qué pareja son numerales?',['primero y cuatro','este y cuatro','mi y primero','alguno y el'],0,'«Primero» es ordinal y «cuatro» cardinal.']
 ],
 verbos:[
 ['En «Yo leo», ¿cuál es el pronombre personal?',['Yo','leo','ambos','ninguno'],0,'«Yo» sustituye al nombre de quien habla.'],
 ['En «Ellas cantan», ¿cuál es el pronombre personal?',['Ellas','cantan','ambos','ninguno'],0,'«Ellas» es un pronombre personal.'],
 ['En «Lo vi ayer», «lo» es un pronombre...',['tónico','átono','demostrativo','posesivo'],1,'«Lo» acompaña al verbo sin acento propio.'],
 ['¿Cuál es un pronombre personal tónico?',['me','te','él','se'],2,'«Él» puede aparecer separado del verbo.'],
 ['¿Cuál es un pronombre personal átono?',['nosotros','vosotras','le','ella'],2,'«Le» acompaña a un verbo.'],
 ['¿Qué infinitivo pertenece a la primera conjugación?',['saltar','beber','vivir','salí'],0,'Los infinitivos en -ar son de primera conjugación.'],
 ['¿Qué infinitivo pertenece a la segunda conjugación?',['cantar','comer','partir','salté'],1,'Los infinitivos en -er son de segunda conjugación.'],
 ['¿Qué infinitivo pertenece a la tercera conjugación?',['pensar','tener','escribir','corre'],2,'Los infinitivos en -ir son de tercera conjugación.'],
 ['En «Ayer jugamos», la acción está en...',['pasado','presente','futuro','imperativo'],0,'«Ayer» sitúa la acción en el pasado.'],
 ['En «Ahora escribo», la acción está en...',['pasado','presente','futuro','infinitivo'],1,'«Ahora» sitúa la acción en el presente.'],
 ['En «Mañana leeré», la acción está en...',['pasado','presente','futuro','subjuntivo'],2,'«Leeré» expresa futuro.'],
 ['¿Qué forma verbal es compuesta?',['salí','saldré','he salido','salir'],2,'«He salido» une haber y participio.'],
 ['¿Qué forma verbal es simple?',['han venido','había leído','cantamos','habremos ido'],2,'«Cantamos» se escribe en una sola palabra.'],
 ['¿Qué oración expresa una orden?',['Abre la ventana.','Abrí la ventana.','Abriré la ventana.','Ojalá abra la ventana.'],0,'«Abre» está en imperativo.'],
 ['¿Qué oración expresa un deseo?',['Ojalá ganemos.','Ganamos ayer.','Ganaremos mañana.','Gana ahora.'],0,'«Ganemos» está en subjuntivo.'],
 ['¿Qué oración informa de un hecho?',['Quizá venga.','Vendrá mañana.','Ven ahora.','Ojalá venga.'],1,'«Vendrá» está en indicativo.'],
 ['En «caminábamos», el lexema es...',['camin-','-ábamos','-mos','caminábamos'],0,'«Camin-» aporta el significado básico.'],
 ['En «corrían», la desinencia es...',['corr-','-ían','cor-','corrían'],1,'«-ían» aporta información gramatical.'],
 ['¿Qué forma está en primera persona del plural?',['canto','cantáis','cantamos','cantan'],2,'«Cantamos» corresponde a nosotros.'],
 ['¿Qué forma está en tercera persona del plural?',['vivimos','vives','viven','vivo'],2,'«Viven» corresponde a ellos o ellas.']
 ],
 invariables:[
 ['¿Qué adverbio indica tiempo?',['ayer','aquí','bien','mucho'],0,'«Ayer» indica cuándo.'],
 ['¿Qué adverbio indica lugar?',['pronto','allí','despacio','quizá'],1,'«Allí» indica dónde.'],
 ['¿Qué adverbio indica modo?',['hoy','dentro','cuidadosamente','muy'],2,'«Cuidadosamente» indica cómo.'],
 ['¿Qué adverbio indica cantidad?',['bastante','mañana','afuera','quizá'],0,'«Bastante» indica cantidad.'],
 ['¿Qué adverbio indica duda?',['sí','no','tal vez','lejos'],2,'«Tal vez» expresa posibilidad.'],
 ['¿Qué adverbio indica afirmación?',['sí','nunca','quizá','cerca'],0,'«Sí» afirma.'],
 ['¿Qué adverbio indica negación?',['muy','no','ayer','bien'],1,'«No» niega.'],
 ['En «Llegó temprano», «temprano» es un adverbio de...',['lugar','tiempo','modo','cantidad'],1,'Indica cuándo llegó.'],
 ['En «Vive cerca», «cerca» es un adverbio de...',['lugar','tiempo','duda','afirmación'],0,'Indica dónde vive.'],
 ['En «Trabaja bien», «bien» es un adverbio de...',['modo','lugar','tiempo','cantidad'],0,'Indica cómo trabaja.'],
 ['¿Cuál de estas palabras es una preposición?',['ante','aunque','ayer','¡hola!'],0,'«Ante» es una preposición.'],
 ['¿Cuál de estas palabras es una preposición?',['pero','hasta','quizá','¡ay!'],1,'«Hasta» es una preposición.'],
 ['En «Voy con Marta», ¿cuál es la preposición?',['Voy','con','Marta','ninguna'],1,'«Con» relaciona palabras.'],
 ['¿Qué conjunción une sumando?',['y','o','pero','aunque'],0,'«Y» es copulativa.'],
 ['¿Qué conjunción plantea una elección?',['y','o','pero','porque'],1,'«O» es disyuntiva.'],
 ['¿Qué conjunción expresa oposición?',['ni','y','pero','o'],2,'«Pero» es adversativa.'],
 ['En «Lee y dibuja», «y» es...',['preposición','conjunción','adverbio','interjección'],1,'«Y» une dos verbos.'],
 ['En «¡Uf!, qué calor», «¡Uf!» es...',['adverbio','preposición','conjunción','interjección'],3,'Expresa una reacción por sí sola.'],
 ['¿Qué palabra puede expresar sorpresa por sí sola?',['¡Ah!','entre','aunque','ayer'],0,'«¡Ah!» es una interjección.'],
 ['¿Qué pareja contiene solo preposiciones?',['de y para','de y pero','para y quizá','y y para'],0,'«De» y «para» son preposiciones.']
 ]
};
// Retos de análisis para el nivel Maestro: contexto, contraste y corrección.
const HARD={
 nombres:[
 ['En «La esperanza creció», ¿qué análisis es correcto?',['esperanza: abstracto','esperanza: colectivo','esperanza: propio','esperanza: no contable'],0,'«Esperanza» nombra un sentimiento o idea.'],
 ['En «El alumnado eligió portavoz», ¿qué palabra es colectiva?',['alumnado','portavoz','eligió','El'],0,'«Alumnado» designa un conjunto de alumnos.'],
 ['¿En qué oración «Luna» es nombre propio?',['La Luna ilumina la noche.','Una luna brillaba.','La luna está llena.','Vi una luna roja.'],0,'Con mayúscula, «Luna» puede nombrar el satélite de la Tierra.'],
 ['¿Cuál de estas parejas contrapone individual y colectivo?',['oveja / rebaño','rebaño / manada','paz / alegría','mesa / silla'],0,'Una oveja es un individuo y un rebaño un conjunto.'],
 ['En «Compré tres botellas de agua», ¿qué nombre es contable?',['agua','botellas','Compré','de'],1,'Se pueden contar botellas, pero el agua se mide.'],
 ['¿Qué análisis de «azúcar» es más preciso?',['Es no contable en «un kilo de azúcar».','Es siempre un nombre propio.','Es colectivo.','Es abstracto.'],0,'En ese contexto, el azúcar se mide por cantidad.'],
 ['¿Qué oración contiene dos nombres abstractos?',['La valentía venció al miedo.','La niña cerró la puerta.','El bosque cubre la colina.','La orquesta tocó una canción.'],0,'«Valentía» y «miedo» son cualidades o sentimientos.'],
 ['¿Qué oración contiene un nombre colectivo y otro individual?',['La bandada siguió al ave.','La paz siguió al amor.','El río cruzó el valle.','Marta visitó Málaga.'],0,'«Bandada» es conjunto y «ave» es individuo.'],
 ['En «Sevilla recibe turistas», ¿qué análisis es correcto?',['Sevilla: propio; turistas: común','Sevilla: común; turistas: propio','ambos propios','ambos abstractos'],0,'Sevilla identifica una ciudad; turistas nombra una clase de personas.'],
 ['¿Qué corrección necesita «marta viajó a Cádiz»?',['Marta viajó a Cádiz.','marta viajó a cádiz.','Marta viajó a cádiz.','marta Viajó a Cádiz.'],0,'Los nombres propios «Marta» y «Cádiz» llevan mayúscula.'],
 ['¿Qué opción contiene solo nombres concretos?',['mesa, árbol, tambor','mesa, alegría, árbol','paz, tambor, mesa','paciencia, alegría, paz'],0,'Mesa, árbol y tambor pueden percibirse con los sentidos.'],
 ['En «La flota llegó al puerto», «flota» es...',['colectivo y concreto','individual y abstracto','propio y abstracto','abstracto y no contable'],0,'Nombra un conjunto de barcos, que son entidades materiales.'],
 ['En «La justicia importa», ¿por qué «justicia» es abstracto?',['Nombra una idea.','Nombra un conjunto.','Es un nombre propio.','Se puede tocar.'],0,'La justicia es una idea, no un objeto material.'],
 ['¿Qué pareja está correctamente clasificada?',['ejército: colectivo; soldado: individual','ejército: individual; soldado: colectivo','ejército: abstracto; soldado: propio','ambos abstractos'],0,'Un ejército reúne soldados.'],
 ['¿Cuál contiene un nombre no contable y otro contable?',['leche y vaso','vaso y taza','libro y cuaderno','niño y niña'],0,'La leche se mide; los vasos se cuentan.'],
 ['En «La orquesta mostró entusiasmo», ¿qué análisis es correcto?',['orquesta: colectivo; entusiasmo: abstracto','orquesta: abstracto; entusiasmo: colectivo','ambos propios','ambos individuales'],0,'Una orquesta es un conjunto y el entusiasmo una emoción.'],
 ['¿Qué palabra cambia de común a propio al escribirla con mayúscula en este contexto?',['rosa / Rosa','mesa / Mesa','silla / Silla','puerta / Puerta'],0,'«Rosa» puede ser nombre de persona; «rosa», una flor.'],
 ['¿Qué oración contiene un nombre propio y uno colectivo?',['Laura observó la manada.','La niña observó un perro.','La alegría llegó pronto.','Un río atraviesa el bosque.'],0,'Laura es propio y manada es colectivo.'],
 ['En «Compramos dos panes», ¿qué sucede con «pan»?',['Aquí se cuentan piezas o tipos de pan.','Es un nombre propio.','Es abstracto.','Es una conjunción.'],0,'El contexto permite contar unidades de pan.'],
 ['¿Cuál es la clasificación más completa de «amistad»?',['común y abstracto','propio y concreto','colectivo y concreto','individual y propio'],0,'No identifica una amistad única por nombre y expresa una relación abstracta.']
 ],
 adjetivos:[
 ['En «Estas flores son bellísimas», ¿qué análisis es correcto?',['Estas: demostrativo; bellísimas: superlativo','Estas: posesivo; bellísimas: positivo','Estas: artículo; bellísimas: comparativo','ambas palabras son verbos'],0,'«Estas» señala y «bellísimas» intensifica la cualidad.'],
 ['¿Qué oración expresa comparación de inferioridad?',['Ana es menos alta que Luis.','Ana es tan alta como Luis.','Ana es altísima.','Ana es más alta que Luis.'],0,'«Menos... que» indica inferioridad.'],
 ['¿Qué oración expresa comparación de igualdad?',['Su libro es tan largo como el mío.','Su libro es larguísimo.','Su libro es más largo.','Su libro es menos largo.'],0,'«Tan... como» expresa igualdad.'],
 ['En «Mis dos mejores amigos», ¿cuántos determinantes aparecen?',['Dos: mis y dos.','Uno: mejores.','Tres: mis, dos y mejores.','Ninguno.'],0,'«Mis» es posesivo y «dos» numeral; «mejores» es adjetivo.'],
 ['¿Qué análisis de «tercer» en «tercer puesto» es correcto?',['Numeral ordinal.','Numeral cardinal.','Demostrativo.','Artículo determinado.'],0,'«Tercer» indica orden.'],
 ['¿Qué análisis de «cien» en «cien páginas» es correcto?',['Numeral cardinal.','Numeral ordinal.','Posesivo.','Adjetivo superlativo.'],0,'Indica cantidad exacta.'],
 ['En «aquella montaña lejana», ¿qué pareja es correcta?',['aquella: demostrativo; lejana: adjetivo','aquella: adjetivo; lejana: artículo','ambas son posesivos','ambas son verbos'],0,'«Aquella» señala distancia y «lejana» expresa cualidad.'],
 ['¿Qué oración contiene artículo indeterminado y adjetivo?',['Una idea brillante surgió.','La idea surgió.','Mis ideas surgieron.','Tres ideas surgieron.'],0,'«Una» es artículo indeterminado y «brillante» adjetivo.'],
 ['¿Qué frase contiene un posesivo y un numeral?',['Nuestros tres cuentos.','Estos cuentos.','Un cuento bonito.','Aquellos cuentos.'],0,'«Nuestros» indica posesión y «tres» cantidad.'],
 ['¿Qué opción corrige la concordancia?',['Las montañas altas.','Las montañas alto.','El montañas altas.','La montañas alto.'],0,'El adjetivo concuerda con el nombre en género y número.'],
 ['En «un día muy frío», «muy» modifica a...',['frío','día','un','ninguno'],0,'«Muy» intensifica el adjetivo «frío».'],
 ['¿Qué expresión está en superlativo?',['Sumamente difícil.','Tan difícil como ayer.','Menos difícil que ayer.','Difícil.'],0,'«Sumamente» intensifica el adjetivo.'],
 ['¿Qué análisis es correcto en «algunas respuestas»?',['algunas: indefinido','algunas: numeral cardinal','algunas: artículo','algunas: verbo'],0,'Indica una cantidad imprecisa.'],
 ['¿En qué frase «mi» funciona como determinante?',['Mi mochila pesa mucho.','La mochila es para mí.','Ven conmigo.','Pensó en mí.'],0,'Acompaña al nombre «mochila».'],
 ['¿Qué frase contiene un demostrativo de cercanía?',['Esta mesa.','Esa mesa.','Aquella mesa.','Mi mesa.'],0,'«Esta» señala cercanía respecto de quien habla.'],
 ['¿Qué frase contiene un demostrativo de lejanía?',['Aquellos árboles.','Estos árboles.','Mis árboles.','Unos árboles.'],0,'«Aquellos» indica lejanía.'],
 ['¿Qué opción ordena correctamente los grados?',['alto, más alto, altísimo','altísimo, alto, más alto','más alto, altísimo, alto','alto, altísimo, más alto'],0,'Positivo, comparativo y superlativo.'],
 ['En «la primera carrera», ¿qué determinantes hay?',['la y primera','solo carrera','solo la','ninguno'],0,'«La» es artículo y «primera» numeral ordinal.'],
 ['¿Qué expresión combina cantidad imprecisa y cualidad?',['Varios libros interesantes.','Dos libros.','Mi libro.','El libro.'],0,'«Varios» es indefinido e «interesantes» adjetivo.'],
 ['¿Qué clasificación de «más rápido que» es correcta?',['Comparativo de superioridad.','Superlativo absoluto.','Comparativo de igualdad.','Grado positivo.'],0,'La estructura «más... que» compara en superioridad.']
 ],
 verbos:[
 ['En «Nosotros habíamos leído», ¿qué análisis es correcto?',['Pronombre personal y forma compuesta.','Demostrativo y forma simple.','Posesivo y modo imperativo.','Artículo y forma no personal.'],0,'«Nosotros» es pronombre y «habíamos leído» usa haber y participio.'],
 ['¿Qué forma combina futuro y primera persona del plural?',['viajaremos','viajaron','viajo','viajabas'],0,'«Viajaremos» corresponde a nosotros en futuro.'],
 ['En «Ojalá vengas», el modo es...',['subjuntivo','indicativo','imperativo','infinitivo'],0,'«Ojalá» introduce un deseo.'],
 ['En «Venid pronto», el modo es...',['imperativo','subjuntivo','indicativo','participio'],0,'Da una instrucción.'],
 ['¿Qué forma verbal es simple y de pasado?',['canté','he cantado','cantaré','había cantado'],0,'«Canté» se escribe en una palabra y expresa pasado.'],
 ['¿Qué forma verbal es compuesta y de pasado?',['habían llegado','llegaron','llegarán','llegar'],0,'«Habían llegado» combina haber y participio.'],
 ['En «Me lo explicó», ¿cuántos pronombres átonos hay?',['Dos: me y lo.','Uno: me.','Uno: lo.','Ninguno.'],0,'«Me» y «lo» acompañan al verbo.'],
 ['¿Cuál separa correctamente lexema y desinencia de «saltamos»?',['salt- / -amos','sal- / -tamos','saltam- / -os','saltamos / nada'],0,'«Salt-» aporta el significado básico.'],
 ['¿Qué infinitivo y conjugación están bien emparejados?',['partir: tercera','beber: primera','cantar: segunda','vivir: primera'],0,'Los infinitivos en -ir pertenecen a la tercera conjugación.'],
 ['En «Ellas escribirán», ¿qué persona y número aparecen?',['Tercera persona del plural.','Primera del singular.','Segunda del plural.','Tercera del singular.'],0,'«Ellas» corresponde a tercera persona plural.'],
 ['¿Qué oración contiene indicativo y pasado?',['Ayer terminamos el mural.','Ojalá terminemos el mural.','Termina el mural.','Quizá terminemos.'],0,'Informa de un hecho pasado.'],
 ['¿Qué oración contiene subjuntivo?',['Espero que llegues.','Llegas temprano.','Llegaste ayer.','Llega ya.'],0,'«Llegues» aparece en una expresión de deseo o expectativa.'],
 ['¿Qué oración contiene imperativo?',['Guardad silencio.','Guardaron silencio.','Guardarán silencio.','Ojalá guarden silencio.'],0,'«Guardad» expresa una orden.'],
 ['¿Cuál contiene un pronombre tónico?',['Hablaron conmigo.','Me hablaron.','Te vieron.','Lo llamaron.'],0,'«Conmigo» puede aparecer separado del verbo.'],
 ['¿Cuál contiene dos pronombres personales?',['Ella nos saludó.','Mi amiga saludó.','Ese libro cayó.','Los niños salieron.'],0,'«Ella» y «nos» son pronombres personales.'],
 ['¿Qué transformación conserva persona y número?',['Yo canto → yo cantaré.','Yo canto → ellos cantan.','Yo canto → tú cantas.','Yo canto → nosotros cantamos.'],0,'Ambas formas corresponden a primera persona singular.'],
 ['¿Qué transformación cambia solo el tiempo?',['Ellos leen → ellos leyeron.','Ellos leen → tú lees.','Ellos leen → nosotros leemos.','Ellos leen → él leyó.'],0,'Se conserva tercera persona plural y cambia presente por pasado.'],
 ['En «Habréis terminado», ¿qué forma no personal aparece?',['Participio: terminado.','Infinitivo: habréis.','Gerundio: terminado.','Ninguna.'],0,'«Terminado» es el participio que forma el tiempo compuesto.'],
 ['¿Qué forma es gerundio?',['cantando','cantado','cantar','cantó'],0,'«Cantando» termina en -ando y es gerundio.'],
 ['¿Qué forma es participio?',['escrito','escribiendo','escribir','escribe'],0,'«Escrito» es participio.']
 ],
 invariables:[
 ['En «Quizá llegue mañana», ¿qué análisis es correcto?',['quizá: duda; mañana: tiempo','quizá: tiempo; mañana: duda','ambos son de lugar','ambos son preposiciones'],0,'«Quizá» expresa duda y «mañana» sitúa el tiempo.'],
 ['En «Trabajó muy bien», «muy» es de...',['cantidad','modo','tiempo','lugar'],0,'«Muy» intensifica a «bien».'],
 ['En «Trabajó muy bien», «bien» es de...',['modo','cantidad','tiempo','duda'],0,'«Bien» indica cómo trabajó.'],
 ['¿Qué oración contiene dos adverbios de tiempo?',['Ayer salí temprano.','Aquí salí bien.','Quizá salí ayer.','Salí muy lejos.'],0,'«Ayer» y «temprano» indican cuándo.'],
 ['¿Qué oración contiene un adverbio de lugar?',['El libro está debajo.','Llegará pronto.','Canta bien.','Quizá llegue.'],0,'«Debajo» indica dónde.'],
 ['En «Fue desde casa hasta el parque», ¿cuántas preposiciones hay?',['Dos: desde y hasta.','Tres: desde, hasta y a.','Una: desde.','Ninguna.'],0,'«Desde» y «hasta» son preposiciones.'],
 ['¿Qué opción usa una conjunción adversativa?',['Quería ir, pero llovía.','Quería ir y llovía.','Quería ir o quedarse.','Quería ir con Ana.'],0,'«Pero» introduce oposición.'],
 ['¿Qué opción usa una conjunción disyuntiva?',['¿Vienes o te quedas?','Vienes y te quedas.','Vienes, pero te vas.','Vienes con Marta.'],0,'«O» presenta alternativas.'],
 ['¿Qué opción usa una conjunción copulativa?',['Lee y subraya.','Lee o subraya.','Lee, pero no subrayes.','Lee desde aquí.'],0,'«Y» suma acciones.'],
 ['En «¡Ay!, me duele», «¡Ay!» funciona como...',['interjección','preposición','conjunción','adverbio'],0,'Expresa dolor de forma independiente.'],
 ['¿Qué análisis de «aunque» es correcto?',['Es una conjunción.','Es una preposición.','Es un adverbio de lugar.','Es una interjección.'],0,'Une ideas en una oración.'],
 ['¿Qué palabra no pertenece al grupo?',['porque','desde','hacia','entre'],0,'«Porque» es conjunción; las demás son preposiciones.'],
 ['¿Qué palabra no pertenece al grupo?',['quizá','ante','bajo','sobre'],0,'«Quizá» es adverbio de duda; las demás son preposiciones.'],
 ['¿Qué palabra no pertenece al grupo?',['¡Eh!','y','o','pero'],0,'«¡Eh!» es interjección; las demás son conjunciones.'],
 ['En «Nunca volvió», «nunca» expresa...',['negación y tiempo','lugar y modo','cantidad y afirmación','solo lugar'],0,'Niega que la acción ocurriera en algún momento.'],
 ['¿Qué opción combina preposición y conjunción?',['Voy con Ana y Luis.','Llegó ayer temprano.','¡Ay!, qué sorpresa.','Quizá no venga.'],0,'«Con» es preposición e «y» conjunción.'],
 ['En «Está cerca de casa», ¿qué análisis es correcto?',['cerca: adverbio; de: preposición','cerca: preposición; de: adverbio','ambos son conjunciones','ambos son interjecciones'],0,'«Cerca» indica lugar y «de» relaciona palabras.'],
 ['En «Llegó tarde, pero contento», «pero» es...',['conjunción adversativa','adverbio de tiempo','preposición','interjección'],0,'Une dos ideas con contraste.'],
 ['¿Qué oración contiene una interjección y un adverbio?',['¡Bravo!, lo hiciste bien.','Llegó con Marta.','Vino y cantó.','Quizá venga mañana.'],0,'«¡Bravo!» es interjección y «bien» adverbio.'],
 ['¿Qué análisis es correcto en «Sí, iré después»?',['sí: afirmación; después: tiempo','sí: tiempo; después: afirmación','ambos son preposiciones','ambos son conjunciones'],0,'«Sí» afirma y «después» sitúa la acción en el tiempo.']
 ]
};

const LEVELS=[
 {id:'aprendiz',name:'Aprendiz',description:'Dos opciones y una pista para empezar.',icon:'🌱'},
 {id:'guardian',name:'Guardián',description:'Cuatro opciones y retos variados.',icon:'🛡️'},
 {id:'maestro',name:'Maestro',description:'Análisis de casos, sin pistas y con penalización por error.',icon:'👑'}
];
const HINTS={
 nombres:'Piensa si nombra a una persona, un conjunto, un objeto o una idea.',
 adjetivos:'Fíjate en si la palabra describe, señala, cuenta o indica posesión.',
 verbos:'Busca quién realiza la acción y cuándo sucede.',
 invariables:'Piensa qué relación expresa la palabra dentro de la oración.'
};
const toChoice=(zoneId,row,i,level)=>{
 const [prompt,options,answer,explain]=row;
 if(level==='aprendiz'){
  const wrong=options.findIndex((_,j)=>j!==answer);
  const pair=i%2?[wrong,answer]:[answer,wrong];
  return {id:`${zoneId}-e${i}`,type:'choice',prompt,options:pair.map(j=>options[j]),answer:pair.indexOf(answer),explain,hint:HINTS[zoneId]};
 }
 return {id:`${zoneId}-${level==='guardian'?'g':'m'}${i}`,type:'choice',
  prompt:level==='maestro'?prompt.replace(/^¿/,'Analiza el caso: ¿'):prompt,
  options:[...options],answer,explain};
};
function getQuestionBank(zoneId,level){
 const z=ZONES.find(item=>item.id===zoneId);
 if(zoneId==='final'){
  const sources=ZONES.filter(item=>item.id!=='final');
  return sources.flatMap(item=>getQuestionBank(item.id,level));
 }
 const extra=(level==='maestro'?HARD[zoneId]:EXTRA[zoneId]).map((row,i)=>toChoice(zoneId,row,i,level));
 const base=z.questions.map((q,i)=>{
  if(level==='aprendiz'&&(q.type==='choice'||q.type==='fill')){
   const wrong=(q.answer+1)%q.options.length,pair=i%2?[wrong,q.answer]:[q.answer,wrong];
   return {...q,id:`${zoneId}-${level}-original-${i}`,options:pair.map(j=>q.options[j]),answer:pair.indexOf(q.answer),hint:HINTS[zoneId]};
  }
  if(level==='aprendiz'&&q.type==='multi'){
   const correct=q.answer.map(j=>q.options[j]).join(' y ');
   const wrong=q.options.filter((_,j)=>!q.answer.includes(j)).join(' y ');
   return {id:`${zoneId}-${level}-original-${i}`,type:'choice',prompt:`¿Qué grupo cumple el reto? ${q.prompt}`,options:i%2?[wrong,correct]:[correct,wrong],answer:i%2?1:0,explain:q.explain,hint:HINTS[zoneId]};
  }
  if(level==='aprendiz'&&q.type==='build'){
   const wrong=[...q.words.slice(1),q.words[0]].join(' ');
   return {id:`${zoneId}-${level}-original-${i}`,type:'choice',prompt:`¿Qué oración cumple el reto? ${q.prompt}`,options:i%2?[wrong,q.answer]:[q.answer,wrong],answer:i%2?1:0,explain:q.explain,hint:HINTS[zoneId]};
  }
  return {...q,id:`${zoneId}-${level}-original-${i}`,hint:level==='aprendiz'?HINTS[zoneId]:undefined};
 });
 return [...extra,...base];
}
