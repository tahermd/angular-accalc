type Currency = {
  [value: number]: number;
};

export class Account {
  public notes: Currency = {};
  public coins: Currency = {};

  constructor(public name: string) {}

  getNotesQty(value: number): number {
    const qty = this.notes[value];
    return qty ? qty : 0;
  }

  getCoinsQty(value: number): number {
    const qty = this.coins[value];
    return qty ? qty : 0;
  }

  setNotesQty(value: number, qty: number) {
    if (qty < 0) qty = 0;
    this.notes[value] = qty;
  }

  setCoinsQty(value: number, qty: number) {
    if (qty < 0) qty = 0;
    this.coins[value] = qty;
  }
}
