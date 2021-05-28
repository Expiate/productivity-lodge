import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/common/services/storage.service';

@Component({
  selector: 'app-month-review',
  templateUrl: './month-review.component.html',
  styleUrls: ['./month-review.component.scss']
})
export class MonthReviewComponent implements OnInit {

  public reviewCache: any[]

  public score: number = 0
  public totalDays: number
  public totalWorkHours: number
  public productiveHours: number
  public sleepModifier: number
  public pdModifier: number

  constructor(
    private localStorage: StorageService
  ) { }

  ngOnInit(): void {
    this.reviewCache = this.localStorage.getCacheReviewData()
    this.calcData()
    console.log(this.score)
  }

  calcData() {
    this.getTotalHours()
    this.totalWorkHours = this.getTotalHours()
    this.productiveHours = this.calcProductiveHours()
    this.score = this.calcScore()
  }

  getTotalHours() {
    this.totalDays = this.reviewCache.length
    let hours: number
    for (let i = 0; i < this.totalDays; i++) {
      hours += this.reviewCache[i].schedule.work
    }
    return hours = hours
  }

  calcProductiveHours() {
    let counter = 0
    for (let i = 0; i < this.totalDays; i++) {
      counter += this.reviewCache[i].productivityLevel
    }
    return counter / this.totalDays
  }

  calcScore() {
    let totalScore: number = 0
    for (let i = 0; i < this.totalDays; i++) {
      console.log('----')
      let semiScore: number = 0
      let day: any = this.reviewCache[i]
      semiScore = (day.schedule.work * (day.productivityLevel / 10))
      console.log('Base: ' + semiScore)
      while (day.schedule.personalDevelopment > 0) {
        if (day.schedule.personalDevelopment >= 1) {
          semiScore += day.schedule.personalDevelopment
          day.schedule.personalDevelopment = 0
        } else {
          day.schedule.personalDevelopment = 0
        }
      }
      console.log('Base + PD: ' +  semiScore)
      if (day.schedule.sleep >= 8) {
        day.schedule.sleep -= 8
        if (day.schedule.sleep != 0) {
          semiScore += day.schedule.sleep
          day.schedule.sleep = 0
        } else {
          semiScore++
        }
      } else {
        semiScore -= 8 - day.schedule.sleep
      }
      console.log('Semi Final: ' + semiScore)
      if (semiScore > 10) {
        semiScore = 10
      }
      console.log(semiScore)
      totalScore += semiScore 
    }
    totalScore = (totalScore * 10) / this.totalDays
    return Number(new Intl.NumberFormat('en-us', { maximumFractionDigits: 2 }).format(totalScore))
  }

}
