import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoodRoutingModule } from './mood-routing.module';
import { MoodComponent } from './mood.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DaySelectorComponent } from './day-selector/day-selector.component';
import { ModalModule } from '../_modal';

@NgModule({
  declarations: [
    MoodComponent,
    CalendarComponent,
    DaySelectorComponent,
  ],
  imports: [
    CommonModule,
    MoodRoutingModule,
    ModalModule
  ],
})
export class MoodModule { }
