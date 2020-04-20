import { Component, OnInit, OnDestroy } from "@angular/core";
import { AccountsService } from "../../_services/accounts.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-incrementer",
  templateUrl: "./incrementer.component.html",
  styleUrls: ["./incrementer.component.css"]
})
export class IncrementerComponent implements OnInit, OnDestroy {
  buttons: { [group: string]: number[] } = {
    group1: [-1, -2, -5, -10, -20, -50, -100],
    group2: [0, 1, 2, 5, 10, 20, 50, 100]
  };

  incrementAmt: number = 100;
  private sub1: Subscription;

  constructor(private accountService: AccountsService) {}

  ngOnInit() {
    this.sub1 = this.accountService.qtyIncrementAmt.subscribe(
      amt => (this.incrementAmt = amt)
    );
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

  setIncrementAmt(amt: number) {
    this.accountService.qtyIncrementAmt.next(amt);
  }
}
