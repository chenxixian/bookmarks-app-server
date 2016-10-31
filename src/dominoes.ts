class CajaDominos {
  private fichas:Array<Array<string>> = [];

  constructor() {
    for (let i = 0; i <= 6; i++) {
      this.fichas[i] = [];
      for (let j = i; j <=6; j++) {
        this.fichas[i].push(`${i}-${j}`);
      }
    }
    this.fichas = [].concat.apply([], this.fichas);
  }

  getAll() {
    for (let ficha of this.fichas) {
      console.log(ficha);
    }
  }

  getFicha(i:number, j:number) {
    return this.fichas[i][j]
  }
}

const caja = new CajaDominos();
console.log(caja.getFicha(0, 3));
