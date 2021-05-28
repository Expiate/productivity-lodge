import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { ModalModule } from '../_modal';
import { NgxColorsModule } from 'ngx-colors';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ModalModule,
    NgxColorsModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule
  ]
})
export class MainModule { }
