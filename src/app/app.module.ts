import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountsComponent } from './_components/accounts/accounts.component';
import { AccountsService } from './_services/accounts.service';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    AccountsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
  ],
  providers: [AccountsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
