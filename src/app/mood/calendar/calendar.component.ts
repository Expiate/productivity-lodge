import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/common/services/storage.service';
import { Day } from '../common/models/day.model';
import { CalendarCreatorService } from '../common/services/calendar-creator.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
  // Specific Year Day's
  public yearDays = [];
  public year: number;

  // User Colors Fetched from API
  public userColors = []
  // This signals when the data has been fetched
  public dataDelivered: Promise<boolean>;

  constructor(
    public calendarCreator: CalendarCreatorService,
    private localStorage: StorageService,
    private router: Router) {}

  ngOnInit(): void {
    this.year = new Date().getFullYear();
    this.getUserColors()
    this.loadYear()
  }
  
  onNextYear() {
    this.year++;
    this.yearDays = [];
    this.calendarCreator.changeYear(this.year)
    this.loadYear()
  }

  onPreviousYear() {
    this.year--;
    this.yearDays = [];
    this.calendarCreator.changeYear(this.year)
    this.loadYear()
  }

  private loadYear() {
    this.calendarCreator.initialize(this.year, (days: []) => {
      this.yearDays = days
      console.log(this.yearDays)
      this.dataDelivered = Promise.resolve(true)
    })
  }


  showDay(day: Day) {
    console.log(day.number + " " + day.monthIndex + " " + day.year)
    console.log('Mood: ' + day.mood)
  }

  getUserColors() {
    this.userColors = this.localStorage.getUser().preferences.colors
  }

  getColor(day: Day) {
    if(day.mood == undefined) {
      return '#1D1D1D'
    } else {
      let color: string
      color = this.userColors[day.mood]
      return color
    }
  }

  navigateHome() {
    this.router.navigate(['main/'])
  }
}
