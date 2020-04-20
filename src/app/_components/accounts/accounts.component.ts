import { Component, OnInit, OnDestroy } from "@angular/core";
import { Currencies } from "../../_data/currencies";
import { AccountsService } from "../../_services/accounts.service";
import { Subscription, Observable } from "rxjs";
import { Account } from "../../_model/account";

@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.component.html",
  styleUrls: ["./accounts.component.css"]
})
export class AccountsComponent implements OnInit, OnDestroy {
  readonly currencyNotes;
  readonly currencyCoins;
  accounts: Account[];
  currencyCode: string;

  qtyIncrementAmt: number;

  private sub1: Subscription;

  constructor(private accountsService: AccountsService) {
    this.currencyCode = accountsService.accountType;

    this.currencyNotes = Currencies.getNotes(this.currencyCode);
    this.currencyCoins = Currencies.getCoins(this.currencyCode);
  }

  ngOnInit() {
    this.accounts = this.accountsService.accounts;
    this.sub1 = this.accountsService.qtyIncrementAmt.subscribe(
      amt => (this.qtyIncrementAmt = amt)
    );
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

  getAccountTotalNotes(account: Account): Observable<number> {
    return this.accountsService.getAccountTotalNotes(account);
  }

  getAccountTotalCoins(account: Account): Observable<number> {
    return this.accountsService.getAccountTotalCoins(account);
  }

  getAccountTotal(account: Account): Observable<number> {
    return this.accountsService.getAccountTotal(account);
  }
}
