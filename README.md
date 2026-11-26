# Guardianes de la Gramática

Juego web independiente creado por Teacher MikeSL para practicar gramática de Lengua en 5.º y 6.º de Primaria.

## Contenido

- El bosque de los nombres: tipos de sustantivos.
- La ciudad de los detalles: adjetivos y determinantes.
- La torre del tiempo: pronombres y verbos.
- El portal de los enlaces: adverbios, preposiciones, conjunciones e interjecciones.
- Batalla final: mezcla de los cuatro bloques.

Cada zona ofrece al menos treinta situaciones por nivel. Aprendiz reduce las opciones y ofrece una pista; Guardián usa cuatro opciones y combina elección, selección múltiple, ordenación de palabras y frases para completar; Maestro añade casos de análisis y penaliza los errores. Se puede elegir entre 10, 20 o 30 retos por zona. En la batalla final se pueden elegir los bloques de contenido y una duración de hasta 40 retos, según el banco disponible. Las opciones cambian de orden y las respuestas correctas se reparten entre todas las posiciones.

Antes de jugar cada zona se muestra un resumen breve con ejemplos originales de los contenidos.

Se puede jugar individualmente, con toda la clase o en una pantalla dividida para dos, tres o cuatro equipos. Los equipos pueden usar nombres de fantasía y emblemas elegidos entre los disponibles. En el modo competitivo, cada equipo recibe preguntas distintas y avanza automáticamente al responder, sin esperar a los demás. Los puntos y las soluciones permanecen ocultos durante el combate; al terminar todos aparece una clasificación ordenada por puntos, con empates compartidos. El informe final muestra por equipo los errores, las respuestas correctas y las explicaciones. Se puede pausar desde el control superior. En los modos individual y de clase hay además un punto de control cada cinco retos.

Las estrellas, el récord, los errores pendientes, los ajustes docentes y los nombres de equipo se guardan mediante `localStorage` en el navegador actual. También se puede reanudar la partida en curso después de recargar la página. Los controles usan botones y selectores que funcionan con teclado, indicadores de selección y áreas táctiles grandes.

Las ilustraciones son originales. La música y los efectos se sintetizan con Web Audio, con temas para menú, batalla y jefe final. La música arranca al pulsar «Empezar batalla» y se puede silenciar o ajustar su volumen. El juego no solicita nombres ni envía resultados a un servidor.

## Desarrollo local

La web es estática: abre `index.html` o sirve esta carpeta con un servidor HTTP local. No requiere compilación ni dependencias de JavaScript.

## Publicación

Está preparado para GitHub Pages desde la raíz de la rama `main` de su propio repositorio. Los archivos de los PDF de referencia no se incluyen en la web.
