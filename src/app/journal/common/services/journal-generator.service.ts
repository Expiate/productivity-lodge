import { Injectable } from '@angular/core';
import { Journal } from '../models/journal.model';

@Injectable({
  providedIn: 'root'
})
export class JournalGeneratorService {
  private date: Date
  private day: number
  private monthIndex: number
  private year: number

  constructor() {
    this.date = new Date()

    this.day = this.date.getDate()
    this.monthIndex = this.date.getMonth()
    this.year = this.date.getFullYear()
  }

  public generateJournal(): Journal {
    let journal: Journal = new Journal()

    journal.monthIndex = this.monthIndex;
    journal.month = this.getMonthName(this.monthIndex);

    journal.number = this.day;
    journal.year = this.year;

    journal.weekDayNumber = this.date.getDay();
    journal.weekDayName = this.getWeekDayName(journal.weekDayNumber);
    return journal
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

  public getWeekDayName(weekDay: number): string {
    switch (weekDay) {
      case 0:
        return "Sunday"; 
      case 1:
        return "Monday"; 
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";

      default:
        return "";
    }
  }
}
