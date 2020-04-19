import { Component } from '@angular/core';
import { Account } from './_model/account';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';

  ngOnInit() {
    let account = new Account('test','');

    console.log(account.getNotesQty(2));
  }
}
