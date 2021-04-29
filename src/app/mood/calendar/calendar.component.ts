import { Component, OnInit } from '@angular/core';
import { Day } from '../common/models/day.model';
import { CalendarCreatorService } from '../common/services/calendar-creator.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
  public JanDays: Day[];
  public FebDays: Day[];
  public MarDays: Day[];
  public AprDays: Day[];
  public MayDays: Day[];
  public JunDays: Day[];
  public JulDays: Day[];
  public AugDays: Day[];
  public SepDays: Day[];
  public OctDays: Day[];
  public NovDays: Day[];
  public DecDays: Day[];
  public yearDays = [];
  public monthDays: Day[];

  public year: number;



  constructor(public calendarCreator: CalendarCreatorService) {}

  ngOnInit(): void {
    this.year = new Date().getFullYear();

    this.setYearDays(this.year);
    
  }

  requestDays() {

  }

  chargeDataIntoYearDays() {
    this.yearDays.push(this.JanDays)
    this.yearDays.push(this.FebDays)
    this.yearDays.push(this.MarDays)
    this.yearDays.push(this.AprDays)
    this.yearDays.push(this.MayDays)
    this.yearDays.push(this.JunDays)
    this.yearDays.push(this.JulDays)
    this.yearDays.push(this.AugDays)
    this.yearDays.push(this.SepDays)
    this.yearDays.push(this.OctDays)
    this.yearDays.push(this.NovDays)
    this.yearDays.push(this.DecDays)
  }

  private setYearDays(year: number) {
    for(let i = 0; i <= 11; i++) {
      this.yearDays.push(this.calendarCreator.getMonth(i, year))
    }
  }

  showDay(day: Day) {
    console.log(day.number + " " + day.monthIndex + " " + day.year)
  }
}
