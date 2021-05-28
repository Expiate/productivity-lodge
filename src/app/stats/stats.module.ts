import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { StatsComponent } from './stats.component';
import { MenuComponent } from './menu/menu.component';
import { MoodReviewComponent } from './mood-review/mood-review.component';
import { TimeReviewComponent } from './time-review/time-review.component';
import { MonthReviewComponent } from './month-review/month-review.component';
import { ChartsModule } from 'ng2-charts';
import { HowToUseComponent } from './how-to-use/how-to-use.component';
import { ModalModule } from '../_modal';


@NgModule({
  declarations: [
    StatsComponent,
    MenuComponent,
    MoodReviewComponent,
    TimeReviewComponent,
    MonthReviewComponent,
    HowToUseComponent
  ],
  imports: [
    CommonModule,
    StatsRoutingModule,
    ChartsModule,
    ModalModule
  ]
})
export class StatsModule { }
