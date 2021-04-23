import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountConfirmationComponent } from './account-confirmation/account-confirmation.component';
import { RegLogComponent } from './reg-log/reg-log.component';


@NgModule({
  declarations: [
    AuthComponent,
    AccountConfirmationComponent,
    RegLogComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
