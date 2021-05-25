import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { StorageService } from 'src/app/common/services/storage.service';
import { cache } from '../common/models/cache.model';
import { chart } from '../common/models/chart.model';

@Component({
  selector: 'app-mood-review',
  templateUrl: './mood-review.component.html',
  styleUrls: ['./mood-review.component.scss']
})
export class MoodReviewComponent implements OnInit, AfterViewInit {
  public moodData: cache
  public userColors: any[]
  // Month
  public monthData = [0, 0, 0, 0, 0]

  public monthAverage: number

  // Year
  public yearData = [0, 0, 0, 0, 0]

  public yearAverage: number

  // Comparations
  public averageComp: any[2]

  // Graphs
  public monthPie: chart = new chart()
  public yearPie: chart = new chart()

  // Data Booleans
  public isMonthDataAvailable = false
  public isYearDataAvailable = false
  public comparationsAvailable = false

  constructor(
    private localStorage: StorageService
  ) { }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    Chart.defaults.global.defaultFontColor = '#FFFFFF'
    Chart.defaults.global.defaultFontFamily = 'Montserrat'
    Chart.defaults.global.animation.duration = 1500
    this.moodData = this.localStorage.getCacheDay()
    this.userColors = this.localStorage.getUser().preferences.colors
    console.log(this.userColors)
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
    this.createGraphs()
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
      this.comparationsAvailable = true
      this.averageComp = this.calcAverageComp()
    }
  }

  createGraphs() {
    if (this.isYearDataAvailable) {

    }

    if(this.isMonthDataAvailable) {
      this.createMonthPieGraph()
    }
  }

  calcMoodAverage(array: any[]): number {
    let sum: number = 0
    for (let i = 0; i < array.length; i++) {
      sum = sum + (array[i].mood + 1)
    }
    sum = sum / (array.length)
    return sum
  }

  calcAverageComp(): any[2] {
    let base = this.monthAverage - this.yearAverage
    base = base / 5
    if (base < 0) {
      return [base * 100, -1]
    } else if (base == 0) {
      return [base * 100, 0]
    } else {
      return [base * 100, 1]
    }
  }

  createMonthPieGraph() {

    this.monthPie.chartData = [
      {
        data: [0]
      }
    ]

    this.monthPie.chartData = null

    this.monthPie.chartData = [
      {
        data: this.monthData
      }
    ]

    this.monthPie.chartLabels = ['Super Bad', 'Bad', 'Neutral', 'Good', 'Super Good']
    this.monthPie.chartOptions = {
      responsive: true,
      animation: {
        duration: 1500
      },
    }
    this.monthPie.chartColors = [
      {
        backgroundColor: this.userColors
      },
    ]
    this.monthPie.chartLegend = true
    this.monthPie.chartPlugins = []
    this.monthPie.chartType = 'pie'
  }

}
