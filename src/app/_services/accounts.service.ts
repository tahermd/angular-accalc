import { Injectable } from "@angular/core";
import { Account } from "../_model/account";
import { BehaviorSubject, from, Observable, zip } from "rxjs";
import { Currencies, SupportedCurrencies } from "../_data/currencies";
import { map, reduce, mergeMap } from "rxjs/operators";

@Injectable()
export class AccountsService {
  accountType: SupportedCurrencies = SupportedCurrencies.INR;
  private _accounts: Account[];

  qtyIncrementAmt = new BehaviorSubject(1);

  constructor() {}

  get accounts() {
    if (!this._accounts) {
      this._accounts = [new Account("CIH"), new Account("CIW")];
    }
    return this._accounts;
  }

  getAccountTotalNotes(
    account: Account,
    currencyCode: SupportedCurrencies
  ): Observable<number> {
    let notes = Currencies.getNotes(currencyCode);

    return from(notes).pipe(
      map(v => account.getNotesQty(v) * v),
      reduce((sum, product) => sum + product, 0)
    );
  }

  getAccountTotalCoins(
    account: Account,
    currencyCode: SupportedCurrencies
  ): Observable<number> {
    let coins = Currencies.getCoins(currencyCode);

    return from(coins).pipe(
      map(v => account.getCoinsQty(v) * v),
      reduce((sum, product) => sum + product, 0)
    );
  }

  getAccountTotal(
    account: Account,
    currencyCode: SupportedCurrencies
  ): Observable<number> {
    return zip(
      this.getAccountTotalNotes(account, currencyCode),
      this.getAccountTotalCoins(account, currencyCode)
    ).pipe(map(([nt, nc]) => nt + nc));
  }

  getTotalNotes(
    accounts: Account[],
    currencyCode: SupportedCurrencies
  ): Observable<number> {
    return from(accounts).pipe(
      mergeMap(acc => this.getAccountTotalNotes(acc, currencyCode)),
      reduce((total, sum) => total + sum, 0)
    );
  }

  getTotalCoins(
    accounts: Account[],
    currencyCode: SupportedCurrencies
  ): Observable<number> {
    return from(accounts).pipe(
      mergeMap(acc => this.getAccountTotalCoins(acc, currencyCode)),
      reduce((total, sum) => total + sum, 0)
    );
  }

  getTotal(
    accounts: Account[],
    currencyCode: SupportedCurrencies
  ): Observable<number> {
    return from(accounts).pipe(
      mergeMap(acc => this.getAccountTotal(acc, currencyCode)),
      reduce((total, sum) => total + sum, 0)
    );
  }
}
