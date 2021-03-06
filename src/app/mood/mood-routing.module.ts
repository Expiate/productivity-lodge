import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { DayEditorComponent } from './day-editor/day-editor.component';
import { DaySelectorComponent } from './day-selector/day-selector.component';
import { MoodComponent } from './mood.component';

const routes: Routes = [
  {
    path: '',
    component: MoodComponent,
    children: [
      {
        path: 'calendar',
        component: CalendarComponent
      },
      {
        path:'day-selector',
        component: DaySelectorComponent
      },
      {
        path: 'day-editor',
        component: DayEditorComponent
      },
      {
        path: '**',
        redirectTo: 'calendar'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoodRoutingModule { }
