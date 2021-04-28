import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevInfoComponent } from './dev-info/dev-info.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main.component';
import { MoodComponent } from './mood/mood.component';

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
        path:'mood',
        component: MoodComponent
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
