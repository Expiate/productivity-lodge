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
  
  /**
   * Returns all Mood Day objects in the DB in that specific Month/Year
   * @param year Year Value (String) Ej '2021'
   * @param month Month Value (String) Ej. '04'
   * @returns Observable
   */
  public getDayMonth(year: string, month: string) {
    return this.http.get<any>(`${this.getDays}${year}/${month}`, { observe: 'response' })
  }

  /**
   * Returns all Mood Day objects in the DB in that specific Year
   * @param year Year Value (String) Ej '2021'
   * @returns Observable
   */
  public getDayYear(year: string) {
    return this.http.get<any>(`${this.getDays}${year}`, { observe: 'response' })
  }

    /**
   * Returns all Journal objects in the DB in that specific Month/Year
   * @param year Year Value (String) Ej '2021'
   * @param month Month Value (String) Ej. '04'
   * @returns Observable
   */
  public getJournalMonth(year: string, month: string) {
    return this.http.get<any>(`${this.getJournals}${year}/${month}`, { observe: 'response' })
  }

    /**
   * Returns all Journal objects in the DB in that specific Year
   * @param year Year Value (String) Ej '2021'
   * @returns Observable
   */
  public getJournalYear(year: string) {
    return this.http.get<any>(`${this.getJournals}${year}`, { observe: 'response' })
  }
}
