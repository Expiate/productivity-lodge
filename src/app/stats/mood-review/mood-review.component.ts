import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/common/services/storage.service';
import { cache } from '../common/models/cache.model';

@Component({
  selector: 'app-mood-review',
  templateUrl: './mood-review.component.html',
  styleUrls: ['./mood-review.component.scss']
})
export class MoodReviewComponent implements OnInit {
  public moodData: cache

  // Month
  public monthData = [0, 0, 0, 0, 0]

  public monthAverage: number

  // Year
  public yearData = [0, 0, 0, 0, 0]

  public yearAverage: number

  // Comparations
  public averageComp: any[2]

  // Data Booleans
  public isMonthDataAvailable = false
  public isYearDataAvailable = false
  public comparationsAvaiable = false

  constructor(
    private localStorage: StorageService
  ) { }

  ngOnInit(): void {
    this.moodData = this.localStorage.getCacheDay()
    console.log(this.moodData)

    if(this.moodData.year == undefined) {
      console.log('No Data')
    } else {
      this.isYearDataAvailable = true
      this.loadYearData()
    }

    if(this.moodData.month == undefined) {
      console.log('No Month Mood Data')
    } else {
      this.isMonthDataAvailable = true
      this.loadMonthData()
    }

    this.calculateStats()
    console.log(this.monthData)
  }

  loadMonthData() {
    for (let i = 0; i < this.moodData.month.length; i++) {
      switch(this.moodData.month[i].mood) {
        case 0:
          this.monthData[0] = this.monthData[0] + 1
          break;
        case 1:
          this.monthData[1] = this.monthData[1] + 1
          break;
        case 2:
          this.monthData[2] = this.monthData[2] + 1
          break;
        case 3:
          this.monthData[3] = this.monthData[3] + 1
          break;
        case 4:
          this.monthData[4] = this.monthData[4] + 1
          break;
      }
    }
  }

  loadYearData() {
    for (let i = 0; i < this.moodData.year.length; i++) {
      switch(this.moodData.year[i].mood) {
        case 0:
          this.yearData[0] = this.yearData[0] + 1
          break;
        case 1:
          this.yearData[1] = this.yearData[1] + 1
          break;
        case 2:
          this.yearData[2] = this.yearData[2] + 1
          break;
        case 3:
          this.yearData[3] = this.yearData[3] + 1
          break;
        case 4:
          this.yearData[4] = this.yearData[4] + 1
          break;
      }
    }
  }

  calculateStats() {

    if(this.isYearDataAvailable) {
      this.yearAverage = this.calcMoodAverage(this.moodData.year)
    }

    if (this.isMonthDataAvailable) {
      this.monthAverage = this.calcMoodAverage(this.moodData.month)
      console.log(this.monthAverage)

      // Comparations
      this.averageComp = this.calcAverageComp()
    }
  }

  calcMoodAverage(array: any[]): number {
    let sum: number = 0
    for (let i = 0; i < array.length; i++) {
      sum = sum + array[i].mood
    }
    sum = sum / (array.length)
    return sum
  }

  calcAverageComp(): any[2] {
    let base = this.monthAverage - this.yearAverage
    base = base / 5
    if (base < 0) {
      return [base * 100, -1]
    } else if ( base == 0) {
      return [base * 100, 0]
    } else {
      return [base * 100, 1]
    }
  }

}
