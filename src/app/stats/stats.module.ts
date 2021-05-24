import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { StatsComponent } from './stats.component';
import { MenuComponent } from './menu/menu.component';
import { MoodReviewComponent } from './mood-review/mood-review.component';
import { TimeReviewComponent } from './time-review/time-review.component';
import { MonthReviewComponent } from './month-review/month-review.component';


@NgModule({
  declarations: [
    StatsComponent,
    MenuComponent,
    MoodReviewComponent,
    TimeReviewComponent,
    MonthReviewComponent
  ],
  imports: [
    CommonModule,
    StatsRoutingModule
  ]
})
export class StatsModule { }
