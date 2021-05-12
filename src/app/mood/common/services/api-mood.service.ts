import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Day } from '../models/day.model';

@Injectable({
  providedIn: 'root'
})

export class ApiMoodService {
  private createUrl = `${environment.server_url}/days/create`;
  private deleteUrl = `${environment.server_url}/days/delete/`;
  private modifyUrl = `${environment.server_url}/days/update/`;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Creates a JSON with the formated contents of the Day Object and returns an
   * Observable of the API call done to create a day using the JSON
   * @param day Day Model Object
   * @returns Observable
   */
  public createDay(day: Day) {
    let month: string
    let date: string

    month = String(day.monthIndex + 1)
    date = String(day.number)

    if (month.length == 1) {
      month = "0" + month
    }

    if (date.length == 1) {
      date = "0" + date
    }
    
    let JSON = {
      date: `${day.year}-${month}-${date}`,
      mood: day.mood,
      emotions: day.emotions,
      note: day.note
    }

    return this.http.post<any>(this.createUrl, JSON, { observe: 'response' })
  }

  public deleteDay(day: Day) {

  }

  public modifyDay(day: Day) {
    let month: string
    let date: string
    let fullDate: string

    month = String(day.monthIndex + 1)
    date = String(day.number)

    if (month.length == 1) {
      month = "0" + month
    }

    if (date.length == 1) {
      date = "0" + date
    }

    fullDate = `${day.year}-${month}-${date}`
    
    let JSON = {
      mood: day.mood,
      emotions: day.emotions,
      note: day.note
    }

    return this.http.patch<any>(`${this.modifyUrl}${fullDate}`, JSON, { observe: 'response' })
  }
}
