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
  public userColors: []

  constructor(
    private router: Router,
    private localStorage: StorageService
  ) { }

  ngOnInit(): void {
    this.day = this.localStorage.getDay()
    this.getUserColors()
  }

  navigateMoodCalendar() {
    this.router.navigate(['mood/calendar'])
  }

  getUserColors() {
    this.userColors = this.localStorage.getUser().preferences.colors
  }

  getColor(day: Day) {
    if(day.mood == undefined) {
      return '#292929'
    } else {
      let color: string
      color = this.userColors[day.mood]
      return color
    }
  }
}
