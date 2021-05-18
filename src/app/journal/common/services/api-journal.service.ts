import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Journal } from '../models/journal.model';

@Injectable({
  providedIn: 'root'
})
export class ApiJournalService {
  private createUrl = `${environment.server_url}/journals/create`;
  private udpateUrl = `${environment.server_url}/journals/update`;
  private getUrl =`${environment.server_url}/journals/getJournal/`;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Use a Journal Object to build a formatted date and uses it to make an
   * HTTP Call to the API to create a new Journal in the DB
   * and returns an observable with its response
   * @param journal Journal Object 
   * @returns Observable
   */
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

  /**
   * Use a Journal Object to build a formatted date and uses it to make an
   * HTTP Call to the API to update an existing Journal in the DB
   * and returns an observable with its response
   * @param journal Journal Object 
   * @returns Observable
   */
  public updateJournal(journal: Journal) {
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

    return this.http.patch<any>(this.udpateUrl, JSON, { observe: 'response' })
  }

  /**
   * Use a Journal Object to build a formatted date and uses it to make an
   * HTTP Call to the API to fecht an existing Journal in the DB
   * and returns an observable with its response
   * @param journal Journal Object 
   * @returns Observable
   */
  public getJournal(journal: Journal, next: Function) {
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

    let fullDate = `${journal.year}-${month}-${date}`

    this.http.get<any>(`${this.getUrl}${fullDate}`, { observe: 'response' }).subscribe(resp => {
      // On Success
      console.log("Success: " + resp['status'])
      console.log('Journal Recieved')

      let json = resp['body']

      journal.work = json.schedule.work
      journal.leisure = json.schedule.leisure
      journal.sleep = json.schedule.sleep
      journal.personalDevelopment = json.schedule.personalDevelopment

      journal.productivityLevel = json.productivityLevel
      journal.sleepQuality = json.sleepQuality
      journal.workout = json.workout

      next(true,journal)
    }, error => {
      // On Error
      console.log("Error: " + error['status'])
      console.log('No Journal Recieved')

      next(false, journal)
    })
  }
}
