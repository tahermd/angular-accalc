import { Denomination } from "./denomination";
import { Currencies } from "../_data/currencies";

export class Account {
  public name: string;
  public code: string;
  public notes: Denomination[] = [];
  public coins: Denomination[] = [];

  constructor(name: string, code: string) {
    this.name = name;
    this.code = code;

    Currencies.getNotes(this.code).forEach(v => {
      this.notes.push(new Denomination(v));
    });

    Currencies.getCoins(this.code).forEach(v => {
      this.coins.push(new Denomination(v));
    });
  }
}
