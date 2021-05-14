import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Journal } from '../models/journal.model';

@Injectable({
  providedIn: 'root'
})
export class ApiJournalService {
  private createUrl = `${environment.server_url}/journals/create`;
  private getUrl =`${environment.server_url}/journals/getJournal/`;

  constructor(
    private http: HttpClient
  ) { }

  public createJournal(journal: Journal) {
    let month: string
    let date: string

    month = String(journal.monthIndex + 1)
    date = String(journal.number)

    if (month.length == 1) {
      month = "0" + month
    }

    if (date.length == 1) {
      date = "0" + date
    }

    let JSON = {
      date: `${journal.year}-${month}-${date}`,
      schedule: {
        work: journal.work,
        leisure: journal.leisure,
        sleep: journal.sleep,
        personalDevelopment: journal.personalDevelopment
      },
      productivityLevel: journal.productivityLevel,
      sleepQuality: journal.sleepQuality,
      workout: journal.workout
    }

    return this.http.post<any>(this.createUrl, JSON, { observe: 'response' })
  }

  public updateJournal(journal: Journal) {

  }

  public getJournal(date: string) {
    return this.http.get<any>(`${this.getUrl}${date}`, { observe: 'response' })
  }
}
