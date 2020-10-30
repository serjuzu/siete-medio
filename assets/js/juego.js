/**
 * b2=2 Bastos. 
 * c2=2 Copas. 
 * e2=2 Espadas.
 * o2=2 Oros.
 */

let baraja = [];
const tipos = ["b", "c", "e", "o"];
const especiales = ["S", "C", "R"];//Sota,Caballo, Rey
let puntosJugador=0,
    puntosComputadora=0;

// referencias al html
const btnPedir = document.querySelector("#btnPedir");
const btnPlantar = document.querySelector("#btnPlantar");
const scores = document.querySelectorAll("small");
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");

/**Esta función crea una nueva baraja */
const crearBaraja = () => {
  for (let i = 1; i <= 7; i++) {
    //para cada carta del 1 al 7
    for (let tipo of tipos) {
      //ciclo for...of
      baraja.push(tipo+i);
    }
  }
  for (let tipo of tipos) {
    for (let especial of especiales) {
      baraja.push(tipo+especial);
    }
  }
  //   barajeo la baraja con el método _.shuffle(lista) de la librería underscore.js
  baraja = _.shuffle(baraja);
  console.log(baraja);
  return baraja;
};

crearBaraja();

/**Esta función me permite tomar una carta */
const pedirCarta = () => {
  if (baraja.length === 0) {
    throw "No hay cartas en la baraja";
  }
  const carta = baraja.pop();
  return carta;
};

const valorCarta = (carta) => {
  /**El método substring() extrae los caracteres de una cadena, entre dos índices especificados, y devuelve la nueva subcadena*/
  const valor = carta.substring(1, carta.length);
  return isNaN(valor) ? 0.5 : valor * 1;
};

//  Turno de la computadora
const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();
    puntosComputadora = puntosComputadora + valorCarta(carta);
    scores[1].innerText = puntosComputadora;
    // <img class="carta" src="assets/cartas/10C.png">
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasComputadora.append(imgCarta);

    btnPlantar.disabled = true;
    if (puntosMinimos > 7.5) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 7.5);

  // demoramos el mensaje para que aparezcan todas las cartas antes
  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      alert("¡Empate, nadie gana!");
    } else if (puntosMinimos > 7.5) {
      alert("Gana la computadora :(");
    } else if (puntosComputadora > 7.5) {
      alert("Enhorabuena, has ganado");
    } else {
      alert("Gana la computadora :(");
    }
  }, 450);
};

// Eventos
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  puntosJugador = puntosJugador + valorCarta(carta);
  scores[0].innerText = puntosJugador;

  // <img class="carta" src="assets/cartas/10C.png">
  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  divCartasJugador.append(imgCarta);

  if (puntosJugador > 7.5) {
    btnPedir.disabled = true;
    btnPlantar.disabled = true;
    console.log("Lo siento, perdiste");
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 7.5) {
    btnPedir.disabled = true;
    btnPlantar.disabled = true;
    console.warn("Siete y medio, Genial!");
    turnoComputadora(puntosJugador);
  }
});

btnPlantar.addEventListener("click", () => {
  turnoComputadora(puntosJugador);
  btnPedir.disabled = true;
  btnPlantar.disabled = true;
});

btnNuevo.addEventListener("click", () => {
  // location.reload();
  baraja = [];
  baraja=crearBaraja();
  
  puntosJugador=0;
  puntosComputadora=0;

  scores[0].innerText=0;
  scores[1].innerText=0;

  divCartasComputadora.innerHTML='';
  divCartasJugador.innerHTML='';

  btnPedir.disabled=false;
  btnPlantar.disabled=false;
});
