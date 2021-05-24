import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiStatsService {
  private getDay = `${environment.server_url}/days/getDay/`;
  private getDays = `${environment.server_url}/days/getDays/`;

  private getJournal = `${environment.server_url}/journals/getJournal/`;
  private getJournals = `${environment.server_url}/journals/getJournals/`;

  constructor(
    private http: HttpClient
  ) { }

  public getDayMonth(year: string, month: string) {
    return this.http.get<any>(`${this.getDays}${year}/${month}`, { observe: 'response' })
  }

  public getDayYear(year: string) {
    return this.http.get<any>(`${this.getDays}${year}`, { observe: 'response' })
  }

  public getJournalMonth(year: string, month: string) {
    return this.http.get<any>(`${this.getJournals}${year}/${month}`, { observe: 'response' })
  }

  public getJournalYear(year: string) {
    return this.http.get<any>(`${this.getJournals}${year}`, { observe: 'response' })
  }
}
