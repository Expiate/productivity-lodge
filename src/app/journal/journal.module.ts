import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournalRoutingModule } from './journal-routing.module';
import { JournalComponent } from './journal.component';
import { TimeManagerComponent } from './time-manager/time-manager.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    JournalComponent,
    TimeManagerComponent
  ],
  imports: [
    CommonModule,
    JournalRoutingModule,
    ChartsModule
  ]
})
export class JournalModule { }
