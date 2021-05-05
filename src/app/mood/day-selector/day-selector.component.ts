import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/common/services/storage.service';
import { Day } from '../common/models/day.model';

@Component({
  selector: 'app-day-selector',
  templateUrl: './day-selector.component.html',
  styleUrls: ['./day-selector.component.scss']
})
export class DaySelectorComponent implements OnInit {

  public day: Day

  constructor(
    private router: Router,
    private localStorage: StorageService
  ) { }

  ngOnInit(): void {
    this.day = this.localStorage.getDay()
  }

  navigateMoodCalendar() {
    this.router.navigate(['mood/calendar'])
  }


}
