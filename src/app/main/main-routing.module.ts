import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevInfoComponent } from './dev-info/dev-info.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    children: [
      {
        path:'home',
        component: HomeComponent
      },
      {
        path: 'dev-info',
        component: DevInfoComponent
      },
      {
        path:'**',
        redirectTo: 'home'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
