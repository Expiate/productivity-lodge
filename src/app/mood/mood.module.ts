import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoodRoutingModule } from './mood-routing.module';
import { MoodComponent } from './mood.component';
import { CalendarComponent } from './calendar/calendar.component';


@NgModule({
  declarations: [
    MoodComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    MoodRoutingModule
  ]
})
export class MoodModule { }
