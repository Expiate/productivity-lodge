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

  /**
   * Changes the Current Year of the service to match the provided one
   * @param year In numeric value
   */
  public changeYear(year: number) {
    this.currentYear = year
  }

  /**
   * This Function returns uses a MonthIndex and a Year to create X(Number of days in the Month)
   * + Y(Number of empty days needed to adjust the UI) containing Day Data Model Info + API
   * Request Info and returns it all in an Array
   * @param monthIndex Month Number (0 for January - 11 for December)
   * @param year In numeric value
   * @returns Array
   */
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

  /**
   * Returns a string that defines an specific month of the year
   * using the MonthIndex provided in the params
   * @param monthIndex Month Number (0 for January - 11 for December)
   * @returns String
   */
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

  /**
   * Returns a 2 chars string that defines the Name of the Day
   * @param weekDay In numeric value (0-6)
   * @returns String
   */
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

  /**
   * Creates a Day Object using the Day Model and containing the info provided in the param
   * and fills it with API requested info then returns it as an Object
   * @param dayNumber In numeric value (1-31)
   * @param monthIndex Month Number (0 for January - 11 for December)
   * @param year In numeric value
   * @returns Day Object
   */
  private createDay(dayNumber: number, monthIndex: number, year: number) {
    let day = new Day();
    let date = new Date(year, monthIndex, dayNumber);

    for (let i = 0; i < this.apiDays.length; i++) {
      let apiDate = new Date(this.apiDays[i].date)
      if (dayNumber == apiDate.getDate() && monthIndex == apiDate.getMonth()) {
        console.log('Mood Changed :' + date)
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

  /**
   * This Function resets ApiDays and Days Arrays and then does an HTTP Request to the API
   * to get all Days data corresponding to a specific user (via JWT) in a specific year
   * (via Year param) and then uses GetMonth method to get 1 Array that contains 12 Arrays
   * each one containing all days GetMonth returns for a month. Then merges the data from the
   * API and the data from the Day Model into 1 single structure. Finally it uses the Next param
   * as a Method and sends the resulting Array into that methods params.
   * @param year In numeric value
   * @param next Method (Callback)
   */
  public initialize(year: number, next: Function) {
    this.apiDays = []
    this.days = []
    // Request Api Days
    this.http.get<any>(`${this.url}/${year}`, { observe: 'response' }).subscribe(resp => {
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
  }
}
