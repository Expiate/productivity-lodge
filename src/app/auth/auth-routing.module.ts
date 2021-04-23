import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountConfirmationComponent } from './account-confirmation/account-confirmation.component';
import { AuthComponent } from './auth.component';
import { RegLogComponent } from './reg-log/reg-log.component';

const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    redirectTo: 'reg-log'
  },
  {
    path:'reg-log',
    component: RegLogComponent
  },
  {
    path:'confirmation',
    component: AccountConfirmationComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
