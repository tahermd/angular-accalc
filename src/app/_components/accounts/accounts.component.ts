import { Component, OnInit, OnDestroy } from "@angular/core";
import { Currencies } from "../../_data/currencies";
import { AccountsService } from "../../_services/accounts.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.component.html",
  styleUrls: ["./accounts.component.css"]
})
export class AccountsComponent implements OnInit, OnDestroy {
  readonly currencyNotes;
  readonly currencyCoins;
  accounts: Account[];

  qtyIncrementAmt: number;

  private sub1: Subscription;

  constructor(private accountsService: AccountsService) {
    let accountType = accountsService.accountType;

    this.currencyNotes = Currencies.getNotes("INR");
    this.currencyCoins = Currencies.getCoins("INR");
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
}
