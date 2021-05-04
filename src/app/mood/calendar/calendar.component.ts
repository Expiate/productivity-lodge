import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Day } from '../common/models/day.model';
import { CalendarCreatorService } from '../common/services/calendar-creator.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
  public yearDays = [];
  public year: number;
  public dataDelivered: Promise<boolean>;

  constructor(
    public calendarCreator: CalendarCreatorService,
    private router: Router) {}

  ngOnInit(): void {
    this.year = new Date().getFullYear();
    //this.calendarCreator.getApiDays();
    //this.setYearDays(this.year);
    this.calendarCreator.initialize(this.year, (days) => {
      this.yearDays = days
      console.log(this.yearDays)
      this.dataDelivered = Promise.resolve(true)
    })
  }

  onNextYear() {
    this.year++;
    this.calendarCreator.changeYear(this.year);
    this.yearDays = [];
    this.setYearDays(this.year)
  }

  onPreviousYear() {
    this.year--;
    this.calendarCreator.changeYear(this.year);
    this.yearDays = [];
    this.setYearDays(this.year)
  }

  private setYearDays(year: number) {
    for(let i = 0; i <= 11; i++) {
      this.yearDays.push(this.calendarCreator.getMonth(i, year))
    }
  }

  showDay(day: Day) {
    console.log(day.number + " " + day.monthIndex + " " + day.year)
    console.log('Mood: ' + day.mood)
  }

  navigateHome() {
    this.router.navigate(['main/'])
  }
}
