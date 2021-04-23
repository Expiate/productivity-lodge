import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountConfirmationComponent } from './account-confirmation/account-confirmation.component';
import { AuthComponent } from './auth.component';
import { RegLogComponent } from './reg-log/reg-log.component';

const routes: Routes = [
  {
    path:'',
    component: AuthComponent,
    children: [
      {
        path:'reg-log',
        component: RegLogComponent,
        data: { animationState: 'One' }
      },
      {
        path:'confirmation',
        component: AccountConfirmationComponent,
        data: { animationState: 'Two' }
      },
      {
        path:'**',
        redirectTo: 'reg-log'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
