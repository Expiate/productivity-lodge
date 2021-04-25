import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { MoodComponent } from './mood/mood.component';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    MoodComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
