import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountConfirmationComponent } from './account-confirmation/account-confirmation.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    redirectTo: 'confirmation'
  },
  {
    path:'reg-log',
    component: AuthComponent
  },
  {
    path:'confirmation',
    component: AccountConfirmationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
