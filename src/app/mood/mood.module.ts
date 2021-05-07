import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoodRoutingModule } from './mood-routing.module';
import { MoodComponent } from './mood.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DaySelectorComponent } from './day-selector/day-selector.component';
import { ModalModule } from '../_modal';
import { DayEditorComponent } from './day-editor/day-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MoodComponent,
    CalendarComponent,
    DaySelectorComponent,
    DayEditorComponent,
  ],
  imports: [
    CommonModule,
    MoodRoutingModule,
    ModalModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class MoodModule { }
