import { Injectable } from "@angular/core";
import { Account } from "../_model/account";
import { BehaviorSubject, from, Observable, zip } from "rxjs";
import { Currencies } from "../_data/currencies";
import { map, reduce } from "rxjs/operators";

@Injectable()
export class AccountsService {
  accountType: string = "INR";
  private _accounts: Account[];

  qtyIncrementAmt = new BehaviorSubject(1);

  constructor() {}

  get accounts() {
    if (!this._accounts) {
      this._accounts = [new Account("CIH"), new Account("CIW")];
    }
    return this._accounts;
  }

  getAccountTotalNotes(account: Account): Observable<number> {
    let notes = Currencies.getNotes(this.accountType);

    return from(notes).pipe(
      map(v => account.getNotesQty(v) * v),
      reduce((sum, product) => sum + product, 0)
    );
  }

  getAccountTotalCoins(account: Account): Observable<number> {
    let coins = Currencies.getCoins(this.accountType);

    return from(coins).pipe(
      map(v => account.getCoinsQty(v) * v),
      reduce((sum, product) => sum + product, 0)
    );
  }

  getAccountTotal(account: Account): Observable<number> {
    return zip(
      this.getAccountTotalNotes(account),
      this.getAccountTotalCoins(account)
    ).pipe(map(([nt, nc]) => nt + nc));
  }
}
