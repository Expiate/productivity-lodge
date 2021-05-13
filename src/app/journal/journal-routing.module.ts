import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalComponent } from './journal.component';
import { TimeManagerComponent } from './time-manager/time-manager.component';

const routes: Routes = [
  {
    path:'',
    component: JournalComponent,
    children: [
      {
        path: 'time-manager',
        component: TimeManagerComponent
      },
      {
        path:'**',
        redirectTo: 'time-manager'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalRoutingModule { }
