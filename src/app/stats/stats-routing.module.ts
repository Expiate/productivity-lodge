import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MonthReviewComponent } from './month-review/month-review.component';
import { MoodReviewComponent } from './mood-review/mood-review.component';
import { StatsComponent } from './stats.component';
import { TimeReviewComponent } from './time-review/time-review.component';

const routes: Routes = [
  {
    path: '',
    component: StatsComponent,
    children: [
      {
        path: 'menu',
        component: MenuComponent,
        children: [
          {
            path: 'monthReview',
            component: MonthReviewComponent
          },
          {
            path: 'timeReview',
            component: TimeReviewComponent
          },
          {
            path: 'moodReview',
            component: MoodReviewComponent
          }
        ]
      },
      {
        path: '**',
        redirectTo: 'menu'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsRoutingModule { }
