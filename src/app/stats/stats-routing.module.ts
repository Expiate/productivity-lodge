import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { StatsComponent } from './stats.component';

const routes: Routes = [
  {
    path: '',
    component: StatsComponent,
    children: [
      {
        path: 'menu',
        component: MenuComponent
      },
      {
        path: '**',
        redirectTo: 'menu'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsRoutingModule { }
