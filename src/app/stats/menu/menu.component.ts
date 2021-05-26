import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/common/services/storage.service';
import { cache } from '../common/models/cache.model';
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
  public dayCache: cache = new cache()
  public journalCache: cache = new cache()

  // This signals when the data has been fetched
  public dataDelivered: Promise<boolean>

  public errors: number = 0
  public lockCounter: number = 0

  constructor(
    private router: Router,
    private statsService: ApiStatsService,
    private toastr: ToastrService,
    private localStorage: StorageService
  ) { }

  ngOnInit(): void {
    this.today = new Date()
    this.reviewState = this.isReviewAvailable()
    this.fetchData()
    this.router.navigate(['stats/menu/howToUse'])
  }

  navigateHome() {
    this.router.navigate(['main'])
  }

  selectMenu(id: number) {
    if (this.selectedMenu == id) {
      this.selectedMenu = 0
      this.router.navigate(['stats/menu/howToUse'])
      return
    }
    this.selectedMenu = id
    this.router.navigate([`stats/menu/${this.getRouterLink()}`])
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
    let month = this.today.getMonth() + 1
    let formatMonth = month.toString()
    if (formatMonth.length == 1) {
      formatMonth = '0' + formatMonth
    }
    let year = this.today.getFullYear().toString()
    console.log(year + " " + formatMonth)

    let response: boolean = false

    this.statsService.getJournalMonth(year, formatMonth).subscribe(resp => {
      // On Success
      console.log('Success: ' + resp['status'])
      console.log('Days Retrieved: ' + resp['body'].length)
      let days = resp['body']

      this.lock()
      
      if (days.length >= 25) {
        response = true
      } else {
        response = false
      }
    }, error => {
      // On Error
      console.log('Error: ' + error['status'])
      this.errors++
      this.lock()
      response = false
    })
    // TODO Delete this in prod
    response = true
    return response
  }

  public fetchData() {
    this.fetchManager(0).subscribe(resp => {
      // On Success
      console.log('Success: ' + resp['status'])
      this.dayCache.month = resp['body']
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
      this.dayCache.year = resp['body']
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
      this.journalCache.month = resp['body']
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
      this.journalCache.year = resp['body']
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
      this.localStorage.saveCacheDay(this.dayCache)
      this.localStorage.saveCacheJournal(this.journalCache)
      console.log('Errors: ' + this.errors) 
    }
  }

  public getRouterLink() {
    switch(this.selectedMenu) {
      case 0:
        return ''
      case 1:
        return 'monthReview'
      case 2:
        return 'timeReview'
      case 3:
        return 'moodReview'
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
