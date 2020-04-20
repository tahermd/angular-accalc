export class Account {
  public notes = new Map<number, number>();
  public coins = new Map<number, number>();

  constructor(public name: string) {}

  getNotesQty(value: number): number {
    return this.notes.has(value) ? this.notes.get(value) : 0;
  }

  getCoinsQty(value: number): number {
    return this.coins.has(value) ? this.coins.get(value) : 0;
  }

  setNotesQty(value: number, qty: number) {
    if (qty < 0) qty = 0;
    this.notes.set(value, qty);
  }

  setCoinsQty(value: number, qty: number) {
    if (qty < 0) qty = 0;
    this.coins.set(value, qty);
  }

  incrementNotesQty(value: number, incrementAmt: number) {
    let newQty = this.getNotesQty(value) + incrementAmt;
    this.setNotesQty(value, newQty);
  }

  incrementCoinsQty(value: number, incrementAmt: number) {
    let newQty = this.getCoinsQty(value) + incrementAmt;
    this.setCoinsQty(value, newQty);
  }
}
