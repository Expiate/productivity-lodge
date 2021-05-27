import { Renderer2, ViewChild } from '@angular/core';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { StorageService } from 'src/app/common/services/storage.service';
import { stickyAnimation } from '../common/animations/stickyButtons';
import { cache } from '../common/models/cache.model';
import { chart } from '../common/models/chart.model';

@Component({
  selector: 'app-mood-review',
  templateUrl: './mood-review.component.html',
  styleUrls: ['./mood-review.component.scss'],
  animations: [stickyAnimation]
})
export class MoodReviewComponent implements OnInit, AfterViewInit {
  @ViewChild('body', { read: ElementRef }) public bodyView: ElementRef<any>;
  @ViewChild('month', { read: ElementRef }) public monthView: ElementRef<any>;
  @ViewChild('year', { read: ElementRef }) public yearView: ElementRef<any>;
  @ViewChild('buttons', { read: ElementRef }) public buttonsView: ElementRef;
  public state: boolean = true
  
  public moodData: cache
  public userColors: any[]
  
  // Month
  public monthData = [0, 0, 0, 0, 0]

  public monthAverage: any

  // Year
  public yearData = [0, 0, 0, 0, 0]

  public yearAverage: any

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
    private localStorage: StorageService,
    private renderer: Renderer2
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
          this.monthData[0] += 1
          break;
        case 1:
          this.monthData[1] += 1
          break;
        case 2:
          this.monthData[2] += 1
          break;
        case 3:
          this.monthData[3] += 1
          break;
        case 4:
          this.monthData[4] += 1
          break;
      }
    }
  }

  loadYearData() {
    for (let i = 0; i < this.moodData.year.length; i++) {
      switch(this.moodData.year[i].mood) {
        case 0:
          this.yearData[0] += 1
          break;
        case 1:
          this.yearData[1] += 1
          break;
        case 2:
          this.yearData[2] += 1
          break;
        case 3:
          this.yearData[3] += 1
          break;
        case 4:
          this.yearData[4] += 1
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

    // Corrections and Formating
    if(this.monthAverage != (null || undefined)) {
      this.monthAverage =  new Intl.NumberFormat('en-us', { maximumFractionDigits: 2}).format(this.monthAverage)
    }
    if(this.yearAverage != (null || undefined)) {
      this.yearAverage =  new Intl.NumberFormat('en-us', { maximumFractionDigits: 2}).format(this.yearAverage)
    }
  }

  createGraphs() {
    if (this.isYearDataAvailable) {
      this.createYearPieGraph()
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
    let diff = this.monthAverage - this.yearAverage
    diff = diff / this.yearAverage * 100
    let baseFormat = new Intl.NumberFormat('en-us', { maximumFractionDigits: 2}).format(diff)
    if (diff < 0) {
      return [baseFormat, -1]
    } else if (diff == 0) {
      return [baseFormat, 0]
    } else {
      return [baseFormat, 1]
    }
  }

  scrollTop() {
    this.monthView.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
    this.state= true
    this.renderer.setStyle(this.buttonsView.nativeElement, 'transform', `translateY(5px)`)
  }

  scrollBottom() {
    this.yearView.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
    this.state = false
    this.renderer.setStyle(this.buttonsView.nativeElement,
      'transform', `translateY(${this.bodyView.nativeElement.offsetHeight * 0.5 + 5}px)`)
  }

  getNavButtonColor(id: number) {
    if (this.state) {
      switch (id) {
        case 1:
          return '#B3B8CD'
        case 2:
          return '#FFFFFF'
      }
    } else {
      switch (id) {
        case 1:
          return '#FFFFFF'
        case 2:
          return '#B3B8CD'
      }
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
      responsive: false,
      responsiveAnimationDuration: 1500,
      animation: {
        duration: 1500
      },
      layout : {
        padding: {
          top: 0,
          left: 0,
          right: 0,
        },
        align: 'start'
      },
      legend: {
        display: true,
        position: 'bottom',
        padding : {
          right: 0,
        },
        labels: {
          boxWidth: 30
        }
      }
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

  createYearPieGraph() {

    this.yearPie.chartData = [
      {
        data: [0]
      }
    ]

    this.yearPie.chartData = null

    this.yearPie.chartData = [
      {
        data: this.yearData
      }
    ]

    this.yearPie.chartLabels = ['Super Bad', 'Bad', 'Neutral', 'Good', 'Super Good']
    this.yearPie.chartOptions = {
      responsive: false,
      responsiveAnimationDuration: 1500,
      animation: {
        duration: 1500
      },
      layout : {
        padding: {
          top: 0,
          left: 0,
          right: 0,
        },
        align: 'start'
      },
      legend: {
        display: true,
        position: 'bottom',
        padding : {
          right: 0,
        },
        labels: {
          boxWidth: 30
        }
      }
    }
    this.yearPie.chartColors = [
      {
        backgroundColor: this.userColors
      },
    ]
    this.yearPie.chartLegend = true
    this.yearPie.chartPlugins = []
    this.yearPie.chartType = 'pie'
  }

}
