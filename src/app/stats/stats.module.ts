import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { StatsComponent } from './stats.component';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [
    StatsComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    StatsRoutingModule
  ]
})
export class StatsModule { }
