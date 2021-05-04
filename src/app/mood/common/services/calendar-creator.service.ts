import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Day } from '../models/day.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CalendarCreatorService {
  private url = `${environment.server_url}/days/getDays`;
  private apiDays = []
  private days = []
  private currentYear: number;

  constructor(
    private http: HttpClient
  ) {
    let date = new Date();
    this.currentYear = date.getFullYear();
  }

  public changeYear(year: number) {
    this.currentYear = year
    this.getApiDays();
  }

  public getMonth(monthIndex: number, year: number): Day[] {
    let days = [];

    let firstday = this.createDay(1, monthIndex, year);

    //create empty days
    if(firstday.weekDayNumber == 0) {
      for(let i = 1; i <= 6; i++) {
        days.push({
          weekDayNumber: i,
          monthIndex: monthIndex,
          year: year,
        } as Day);
      }
    }
    for (let i = 1; i < firstday.weekDayNumber; i++) {
      days.push({
        weekDayNumber: i,
        monthIndex: monthIndex,
        year: year,
      } as Day);
    }
    days.push(firstday);
    //

    let countDaysInMonth = new Date(year, monthIndex +1, 0).getDate();
    for (let i = 2; i < countDaysInMonth +1; i++) {
      days.push(this.createDay(i, monthIndex, year));
    }

    return days;
  }

  public getMonthName(monthIndex: number): string {
    switch (monthIndex) {
      case 0:
        return "January";      
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";

      default:
        return "";
    }
  }

  public getWeekDayName(weekDay: number): string {
    switch (weekDay) {
      case 0:
        return "Su"; // Sunday
      case 1:
        return "Mo"; // Monday
      case 2:
        return "Tu"; // Tuesday
      case 3:
        return "We"; // Wednesday
      case 4:
        return "Th"; // Thursday
      case 5:
        return "Fr"; // Friday
      case 6:
        return "Sa"; // Saturday

      default:
        return "";
    }
  }

  private createDay(dayNumber: number, monthIndex: number, year: number) {
    let day = new Day();
    let date = new Date(year, monthIndex, dayNumber);

    for (let i = 0; i < this.apiDays.length; i++) {
      let apiDate = new Date(this.apiDays[i].date)
      let formatDate = new Date(apiDate.getFullYear(), apiDate.getMonth(), apiDate.getDate())
      if (dayNumber == apiDate.getDate() && monthIndex == apiDate.getMonth()) {
        console.log('Mood Changed')
        day.mood = this.apiDays[i].mood
      }
    }

    day.monthIndex = monthIndex;
    day.month = this.getMonthName(monthIndex);

    day.number = dayNumber;
    day.year = this.currentYear;

    day.weekDayNumber = date.getDay();
    day.weekDayName = this.getWeekDayName(day.weekDayNumber);

    return day;
  }

  public getApiDays() {
    this.http.get<any>(`${this.url}/${this.currentYear}`, { observe: 'response' }).subscribe(resp => {
      // On Success
      console.log('Days Retrieved: ' + resp['body'].length)
      this.apiDays = resp['body']
      console.log(this.apiDays.length)
    }, error => {
      // On Error
      console.log('Error Retrieving API Days')
    })

  }

  public initialize(year, next) {
    // Request Api Days
    this.http.get<any>(`${this.url}/${this.currentYear}`, { observe: 'response' }).subscribe(resp => {
      // On Success
      console.log('Days Retrieved: ' + resp['body'].length)
      this.apiDays = resp['body']
      console.log(this.apiDays)
      for(let i = 0; i <= 11; i++) {
        this.days.push(this.getMonth(i, year))
      }

      next(this.days)
    }, error => {
      // On Error
      console.log('Error Retrieving API Days ' + error)
    })
    return []
  }

  public setDays(year) {
    for(let i = 0; i <= 11; i++) {
      this.days.push(this.getMonth(i, year))
    }
  }
}
