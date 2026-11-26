# Guardianes de la Gramática

Juego web independiente creado por Teacher MikeSL para practicar gramática de Lengua en 5.º y 6.º de Primaria.

## Contenido

- El bosque de los nombres: tipos de sustantivos.
- La ciudad de los detalles: adjetivos y determinantes.
- La torre del tiempo: pronombres y verbos.
- El portal de los enlaces: adverbios, preposiciones, conjunciones e interjecciones.
- Batalla final: mezcla de los cuatro bloques.

Cada zona ofrece treinta situaciones por nivel. Aprendiz reduce las opciones y ofrece una pista; Guardián usa cuatro opciones y combina elección, selección múltiple y construcción de oraciones; Maestro añade casos de análisis y penaliza los errores. Las partidas tienen veinte retos por zona y veinticinco en la batalla final. Las opciones cambian de orden y las respuestas correctas se reparten entre todas las posiciones.

Antes de jugar cada zona se muestra un resumen breve con ejemplos originales de los contenidos.

Se puede jugar individualmente, con toda la clase o en una pantalla dividida para dos, tres o cuatro equipos. En el modo competitivo, cada equipo recibe preguntas distintas y avanza automáticamente al responder, sin esperar a los demás. Los puntos y las soluciones permanecen ocultos durante el combate; al terminar todos aparece una clasificación ordenada por puntos, con empates compartidos. Se puede pausar desde el control superior. En los modos individual y de clase hay además un punto de control cada cinco retos.

Las estrellas, el récord y los errores pendientes se guardan por nivel mediante `localStorage` en el navegador actual. También se puede reanudar la partida en curso después de recargar la página.

Las ilustraciones son originales. La música y los efectos se sintetizan con Web Audio, con temas para menú, batalla y jefe final. La música arranca al pulsar «Empezar batalla» y se puede silenciar o ajustar su volumen. El juego no solicita nombres ni envía resultados a un servidor.

## Desarrollo local

La web es estática: abre `index.html` o sirve esta carpeta con un servidor HTTP local. No requiere compilación ni dependencias de JavaScript.

## Publicación

Está preparado para GitHub Pages desde la raíz de la rama `main` de su propio repositorio. Los archivos de los PDF de referencia no se incluyen en la web.
