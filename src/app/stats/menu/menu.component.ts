import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ApiStatsService } from '../common/services/api-stats.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public today: Date
  public selectedMenu: number = 0

  // UI States
  public reviewState: boolean = false
  public timeState: boolean = true
  public moodState: boolean = true

  // Data
  public dayMonth
  public dayYear
  public journalMonth
  public JournalYear

  // This signals when the data has been fetched
  public dataDelivered: Promise<boolean>

  public errors: number = 0
  public lockCounter: number = 0

  constructor(
    private router: Router,
    private statsService: ApiStatsService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.today = new Date()
    this.reviewState = this.isReviewAvailable()
    this.fetchData()
  }

  navigateHome() {
    this.router.navigate(['main'])
  }

  selectMenu(id: number) {
    if (this.selectedMenu == id) {
      this.selectedMenu = 0
      return
    }
    this.selectedMenu = id
  }

  getTitle() {
    switch(this.selectedMenu) {
      case 0:
        return 'How to use'
      case 1:
        return 'Monthly Review'
      case 2:
        return 'Time'
      case 3:
        return 'Mood'
    }
  }

  public isReviewAvailable(): boolean {
    let month = this.today.getMonth()
    let formatMonth = month.toString()
    if (formatMonth.length == 1) {
      formatMonth = '0' + formatMonth
    }
    let year = this.today.getFullYear().toString()

    this.statsService.getJournalMonth(year, formatMonth).subscribe(resp => {
      // On Success
      console.log('Success: ' + resp['status'])
      console.log('Days Retrieved: ' + resp['body'].length)
      let days = resp['body']

      this.lock()
      if (days.length >= 25) {
        return true
      } else {
        return false
      }
    }, error => {
      // On Error
      console.log('Error: ' + error['status'])
      this.lock()
      return false
    })
    return false
  }

  public fetchData() {
    this.fetchManager(0).subscribe(resp => {
      // On Success
      console.log('Success: ' + resp['status'])
      this.dayMonth = resp['body']
      this.lock()

    }, error => {
      // On Error
      console.log('Error: ' + error['status'])
      this.errors++
      this.lock()
    })

    this.fetchManager(1).subscribe(resp => {
      // On Success
      console.log('Success: ' + resp['status'])
      this.dayYear = resp['body']
      this.lock()

    }, error => {
      // On Error
      console.log('Error: ' + error['status'])
      this.moodState = false
      this.errors++
      this.lock()
    })

    this.fetchManager(2).subscribe(resp => {
      // On Success
      console.log('Success: ' + resp['status'])
      this.journalMonth = resp['body']
      this.lock()

    }, error => {
      // On Error
      console.log('Error: ' + error['status'])
      this.timeState = false
      this.errors++
      this.lock()
    })

    this.fetchManager(3).subscribe(resp => {
      // On Success
      console.log('Success: ' + resp['status'])
      this.journalMonth = resp['body']
      this.lock()

    }, error => {
      // On Error
      console.log('Error: ' + error['status'])
      this.errors++
      this.lock()
    })
  }

  public fetchManager(i: number):  Observable<HttpResponse<any>> {
    let year = this.today.getFullYear().toString()
    let month = (this.today.getMonth() + 1).toString()
    if (month.length == 1) {
      month = '0' + month
    }

    switch(i) {
      case 0:
        return this.statsService.getDayMonth(year, month)
      case 1:
        return this.statsService.getDayYear(year)
      case 2:
        return this.statsService.getJournalMonth(year, month)
      case 3:
        return this.statsService.getJournalYear(year)
    }
  }

  public showNotEnoughDataError() {
    this.errorToast('', 'Not enough data')
  }

  public async lock() {
    this.lockCounter = this.lockCounter + 1
    console.log('Lock: ' + this.lockCounter)
    if(this.lockCounter == 5) {
      this.dataDelivered = Promise.resolve(true)
      console.log('Errors: ' + this.errors) 
    }
  }

  successToast(title: string, content: string) {
    if (title == null) {
      title = ""
    }
    this.toastr.success(content, title, {
      positionClass: 'toast-bottom-right',
      progressBar: false,
      progressAnimation: 'decreasing',
      timeOut: 3000
    });
  }

  errorToast(title: string, content: string) {
    if (title == null) {
      title = ""
    }
    this.toastr.error(content, title, {
      positionClass: 'toast-bottom-right',
      progressBar: false,
      progressAnimation: 'decreasing',
      timeOut: 3000
    });
  }

}
