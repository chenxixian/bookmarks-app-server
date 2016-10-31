class CajaDominos {

  /**
   * Crea las fichas y las asigna a su propiedad fichas
   * @return {CajaDominos} una caja de ficha de dominos
   */
  constructor() {
    this.fichas = [];
    for (let i = 0; i <= 6; i++) {
      this.fichas[i] = [];
      for (let j = i; j <= 6; j++) {
        this.fichas[i].push(`${i}${j}`);
      }
    }
    this.fichas = [].concat.apply([], this.fichas);
  }

  /**
   * Devuelve el conjunto de fichas
   * @return {Array<string>} Todas ls fichas de la caja
   */
  getAll() {
    return this.fichas;
  }

  /**
   * Devuelve solo la ficha solicitada en la forma que se encuentra
   * @param  {string} ficha el formato de la ficha EJ.: "54"
   * @return {string}       la ficha como se encuentra Ej. "45"
   */
  getFicha(ficha) {
    const fnd = e => e === ficha || e === ficha.split("").reverse().join("");
    const i = this.fichas.findIndex(fnd);

    return this.fichas[i];
  }
}

const Jugador = (function () {
  function Jugador(nombre = 'Invitado') {
    this.nombre = nombre;
    this.fichas = [];
  }

  return Jugador;
} ());

class JuegoDeDominos {
  constructor(caja) { // Necesito una caja para inicializar el juego
    this.pila = [];
    this.jugadores = [];
  }

  iniciar(jugadores) {
    this.fichas = this.barajar(caja.getAll());
    this.jugadores.push(...jugadores);
    this.repartir(this.jugadores, this.fichas);
    console.log('Mesa Lista para jugar');
  }

  barajar(caja) {
    let j, x, i;
    let arr = [...caja]
    for (i = arr.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = arr[i - 1];
      arr[i - 1] = arr[j];
      arr[j] = x;
    }

    return arr;
  }

  repartir(jugadores, fichas) {
    this.jugadores = jugadores.map((j, i) => {
      return Object.assign({}, j, {
        fichas: fichas.splice(i, i + 7)
      });
    });

    this.pila = fichas.splice(0, fichas.length);
  }
  verFichas() {
    return this.fichas;
  }
  verJugadores() {
    let response = 'En esta mesa ';
    const jugadores = this.jugadores.map(j => j.nombre);
    if (jugadores.length) {
      response += `juegan (${jugadores.length}): ${jugadores.join(", ")}`
    } else {
      response += 'está vacía';
    }
    return response;
  }

  getJugador(jugador) {
    return this.jugadores.find(j => j.nombre === jugador.nombre);
  }
}




const caja = new CajaDominos();
const mesa1 = new JuegoDeDominos(caja);
const Pedro = new Jugador('Pedro');
const Juan = new Jugador('Juan');
mesa1.iniciar([Pedro, Juan]);
console.log('Ver fichas de Pedro: ', mesa1.getJugador(Pedro).fichas);
console.log('Ver fichas de Juan: ', mesa1.getJugador(Juan).fichas);
