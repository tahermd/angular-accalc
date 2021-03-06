type ICurrency = {
  [code: string]: {
    notes: number[];
    coins: number[];
  };
};

export enum SupportedCurrencies {
  INR = "INR"
}

export class Currencies {
  private static currencies: ICurrency = {
    INR: {
      notes: [2000, 500, 200, 100, 50, 20, 10, 5],
      coins: [10, 5, 2, 1]
    }
  };

  static getNotes(code: SupportedCurrencies): number[] {
    return this.currencies[code].notes;
  }

  static getCoins(code: SupportedCurrencies): number[] {
    return this.currencies[code].coins;
  }
}
