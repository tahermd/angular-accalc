import { Injectable } from "@angular/core";
import { Account } from "../_model/account";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class AccountsService {
  accountType: string = "INR";
  private _accounts: Account[];

  qtyIncrementAmt = new BehaviorSubject(0);

  constructor() {}

  get accounts() {
    if (!this._accounts) {
      this._accounts = [new Account("CIH"), new Account("CIW")];
    }
    return this._accounts;
  }
}
