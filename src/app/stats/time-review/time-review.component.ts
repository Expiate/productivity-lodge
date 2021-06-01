import { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { StorageService } from 'src/app/common/services/storage.service';
import { cache } from '../common/models/cache.model';
import { chart } from '../common/models/chart.model';

@Component({
  selector: 'app-time-review',
  templateUrl: './time-review.component.html',
  styleUrls: ['./time-review.component.scss']
})
export class TimeReviewComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('body', { read: ElementRef }) public bodyView: ElementRef<any>;
  @ViewChild('month', { read: ElementRef }) public monthView: ElementRef<any>;
  @ViewChild('year', { read: ElementRef }) public yearView: ElementRef<any>;
  @ViewChild('stats', { read: ElementRef }) public statsView: ElementRef<any>;
  @ViewChild('buttons', { read: ElementRef }) public buttonsView: ElementRef;
  public state: number = 1
  
  public userColors: any[]
  public journalData: cache

  // Month Data
  public monthData = [0, 0, 0, 0, 0, 0, 0]
  public loggedMonth: number
  public monthWorkoutDays: number
  public monthAverages = [0, 0, 0, 0, 0, 0, 0]

  // Year Data
  public yearData = [0, 0, 0, 0, 0, 0, 0]
  public loggedYear: number
  public yearWorkoutDays: number
  public yearAverages = [0, 0, 0, 0, 0, 0, 0]

  // Comparations
  public averageComp = [0, 0, 0, 0, 0, 0, 0]
  
  // Data Booleans
  public isMonthDataAvailable = false
  public isYearDataAvailable = false
  public comparationsAvailable = false

  // Graphs
  public totalMonthGraph: chart = new chart()
  public averageMonthGraph: chart = new chart()
  public totalYearGraph: chart = new chart()
  public averageYearGraph: chart = new chart()

  public monthProductivityGraph: chart = new chart()
  public monthSleepQualityGraph: chart = new chart()
  public yearProductivityGraph: chart = new chart()
  public yearSleepQualityGraph: chart = new chart()

  constructor(
    private localStorage: StorageService,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    this.monthView.nativeElement.scrollIntoView()
  }

  @HostListener('unloaded')
  ngOnDestroy() {
    console.log('time review destroy')
  }

  ngOnInit(): void {
    this.state = 1
    Chart.defaults.global.defaultFontColor = '#FFFFFF'
    Chart.defaults.global.defaultFontFamily = 'Montserrat'
    Chart.defaults.global.animation.duration = 1500
    this.userColors = this.localStorage.getUser().preferences.colors
    this.journalData = this.localStorage.getCacheJournal()

    if(this.journalData.year == undefined) {
      console.log('No Data')
    } else {
      if(this.journalData.year.length == this.journalData.month.length) {
        this.isYearDataAvailable = false
      } else {
        this.isYearDataAvailable = true
        this.loadYearData()
        console.log(this.yearData)
      }
    }

    if(this.journalData.month == undefined) {
      console.log('No Month Mood Data')
    } else {
      this.isMonthDataAvailable = true
      this.loadMonthData()
      console.log(this.monthData)
    }

    this.calculateStats()
    this.createGraphs()
  }

  /**
   * Get the sums of all the values that contains the journals in a month
   */
  loadMonthData() {
    this.loggedMonth = this.journalData.month.length
    for(let i = 0; i < this.loggedMonth; i++) {
      this.monthData[0] += this.journalData.month[i].schedule.sleep
      this.monthData[1] += this.journalData.month[i].schedule.work
      this.monthData[2] += this.journalData.month[i].schedule.leisure
      this.monthData[3] += this.journalData.month[i].schedule.personalDevelopment
      this.monthData[4] += this.calcOthers(this.journalData.month[i].schedule)

      this.monthData[5] += this.journalData.month[i].productivityLevel
      this.monthData[6] += this.journalData.month[i].sleepQuality

      if (this.journalData.month[i].workout == true) {
        this.monthWorkoutDays++
      }
    }
    
  }

    /**
   * Get the sums of all the values that contains the journals in a year
   */
  loadYearData() {
    this.loggedYear = this.journalData.year.length
    for(let i = 0; i < this.loggedYear; i++) {
      this.yearData[0] += this.journalData.year[i].schedule.sleep
      this.yearData[1] += this.journalData.year[i].schedule.work
      this.yearData[2] += this.journalData.year[i].schedule.leisure
      this.yearData[3] += this.journalData.year[i].schedule.personalDevelopment
      this.yearData[4] += this.calcOthers(this.journalData.year[i].schedule)

      this.yearData[5] += this.journalData.year[i].productivityLevel
      this.yearData[6] += this.journalData.year[i].sleepQuality

      if (this.journalData.year[i].workout == true) {
        this.yearWorkoutDays++
      }
    }
  }

  /**
   * Calculates the hours in the day that are not being used in the schedule
   * @param schedule JSON Object
   * @returns Number
   */
  calcOthers(schedule: any): number {
    let others: number
    others = 24 - schedule.sleep - schedule.work - schedule.leisure - schedule.personalDevelopment
    return others
  }

  /**
   * Calculate all requires stats using current data
   */
  calculateStats() {
    if(this.isYearDataAvailable) {
      this.yearAverages = this.calcAverage(Object.assign([], this.yearData), this.loggedYear)
      console.log('Average Year :' + this.yearAverages)
    }

    if (this.isMonthDataAvailable) {
      this.monthAverages = this.calcAverage(Object.assign([], this.monthData), this.loggedMonth)
      console.log('Average Month :' + this.monthAverages)

      if(this.isYearDataAvailable) {
        // Comparations
        this.comparationsAvailable = true
        this.averageComp = this.calcAverageComp(Object.assign([], this.monthAverages), Object.assign([], this.yearAverages))
        console.log('Average Comparison :' + this.averageComp)
      }
    }
  }

  /**
   * Calculates the Average Values resulting Array of the values of an Array
   * @param array 
   * @param length 
   * @returns Array
   */
  calcAverage(array: any[], length: number): any[] {
    for (let i = 0; i < array.length; i++) {
      array[i] /= length
      array[i] = Number(new Intl.NumberFormat('en-us', { maximumFractionDigits: 2 }).format(array[i]))
    }
    return array
  }

  /**
   * Calculates the difference values of 2 arrays and returns a new array
   * @param mAverage 
   * @param yAverage 
   * @returns Array
   */
  calcAverageComp(mAverage: any[], yAverage: any[]): any[] {
    let diff: any[] = []
    for (let i = 0; i < mAverage.length; i++) {
      let base = (mAverage[i] - yAverage[i]) / yAverage[i] * 100
      diff.push(Number(new Intl.NumberFormat('en-us', { maximumFractionDigits: 2 }).format(base)))
    }
    return diff
  }

  /**
   * Creates all required graphs using current data
   */
  createGraphs() {
    if (this.isYearDataAvailable == true) {
      this.createTotalYearGraph()
      this.createYearProductivityGraph()
      this.createYearSleepQualityGraphs()
    }

    if (this.isMonthDataAvailable == true) {
      this.createTotalMonthGraph()
      this.createMonthProductivityGraph()
      this.createMonthSleepQualityGraphs()
    }
  }

  createTotalMonthGraph() {
    this.totalMonthGraph.chartData = [
      { data: [0], label: 'Sleep' },
      { data: [0], label: 'Work' },
      { data: [0], label: 'Leisure' },
      { data: [0], label: 'PD' },
      { data: [0], label: 'Others' }
    ]

    this.totalMonthGraph.chartData = null

    this.totalMonthGraph.chartData = [
      { data: [this.monthData[0]], label: 'Sleep' },
      { data: [this.monthData[1]], label: 'Work' },
      { data: [this.monthData[2]], label: 'Leisure' },
      { data: [this.monthData[3]], label: 'PD' },
      { data: [this.monthData[4]], label: 'Others' }
    ]

    this.totalMonthGraph.chartLabels = []
    this.totalMonthGraph.chartOptions = {
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
        position: 'top',
        padding : {
          right: 0,
        },
        labels: {
          boxWidth: 30
        }
      },
      tooltips: {
        enabled: true,
        callbacks: {
          title: function () {
            return 'Hours'
          }
        }
      }
    }
    this.totalMonthGraph.chartColors = [
      {
        borderColor: 'black',
        backgroundColor: '#206a5d',
      },
      {
        backgroundColor: '#81b214'
      },
      {
        backgroundColor: '#ffcc29'
      },
      {
        backgroundColor: '#f58634'
      },
      {
        backgroundColor: '#c8c2bc'
      }
    ]
    this.totalMonthGraph.chartLegend = true
    this.totalMonthGraph.chartPlugins = []
    this.totalMonthGraph.chartType = 'bar'
  }

  createTotalYearGraph() {
    this.totalYearGraph.chartData = [
      { data: [0], label: 'Sleep' },
      { data: [0], label: 'Work' },
      { data: [0], label: 'Leisure' },
      { data: [0], label: 'PD' },
      { data: [0], label: 'Others' }
    ]

    this.totalYearGraph.chartData = null

    this.totalYearGraph.chartData = [
      { data: [this.yearData[0]], label: 'Sleep' },
      { data: [this.yearData[1]], label: 'Work' },
      { data: [this.yearData[2]], label: 'Leisure' },
      { data: [this.yearData[3]], label: 'PD' },
      { data: [this.yearData[4]], label: 'Others' }
    ]

    this.totalYearGraph.chartLabels = []
    this.totalYearGraph.chartOptions = {
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
        position: 'top',
        padding : {
          right: 0,
        },
        labels: {
          boxWidth: 30
        }
      },
      tooltips: {
        enabled: true,
        callbacks: {
          title: function () {
            return 'Hours'
          }
        }
      }
    }
    this.totalYearGraph.chartColors = [
      {
        borderColor: 'black',
        backgroundColor: '#206a5d',
      },
      {
        backgroundColor: '#81b214'
      },
      {
        backgroundColor: '#ffcc29'
      },
      {
        backgroundColor: '#f58634'
      },
      {
        backgroundColor: '#c8c2bc'
      }
    ]
    this.totalYearGraph.chartLegend = true
    this.totalYearGraph.chartPlugins = []
    this.totalYearGraph.chartType = 'bar'
  }

  createMonthProductivityGraph() {
    let positive = (100 * this.monthData[5]) / (this.loggedMonth * 10)
    positive = Number(new Intl.NumberFormat('en-us', { maximumFractionDigits: 2 }).format(positive))
    let negative = 100 - positive
    negative = Number(new Intl.NumberFormat('en-us', { maximumFractionDigits: 2 }).format(negative))
    
    this.monthProductivityGraph.chartData = [
      {
        data: [positive, negative]
      }
    ]

    this.monthProductivityGraph.chartLabels = ['Productive %', 'Non Productive %']
    this.monthProductivityGraph.chartOptions = {
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
    this.monthProductivityGraph.chartColors = [
      {
        backgroundColor: ['rgb(5, 150, 105)', 'rgba(220, 38, 38)']
      },
    ]
    this.monthProductivityGraph.chartLegend = true
    this.monthProductivityGraph.chartPlugins = []
    this.monthProductivityGraph.chartType = 'doughnut'
  }

  createMonthSleepQualityGraphs() {
    let positive = (100 * this.monthData[6]) / (this.loggedMonth * 10)
    positive = Number(new Intl.NumberFormat('en-us', { maximumFractionDigits: 2 }).format(positive))
    let negative = 100 - positive
    negative = Number(new Intl.NumberFormat('en-us', { maximumFractionDigits: 2 }).format(negative))
    
    this.monthSleepQualityGraph.chartData = [
      {
        data: [positive, negative]
      }
    ]

    this.monthSleepQualityGraph.chartLabels = ['Good Quality %', 'Bad Quality %']
    this.monthSleepQualityGraph.chartOptions = {
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
    this.monthSleepQualityGraph.chartColors = [
      {
        backgroundColor: ['rgb(5, 150, 105)', 'rgba(220, 38, 38)']
      },
    ]
    this.monthSleepQualityGraph.chartLegend = true
    this.monthSleepQualityGraph.chartPlugins = []
    this.monthSleepQualityGraph.chartType = 'doughnut'
  }

  createYearProductivityGraph() {
    let positive = (100 * this.yearData[5]) / (this.loggedYear * 10)
    positive = Number(new Intl.NumberFormat('en-us', { maximumFractionDigits: 2 }).format(positive))
    let negative = 100 - positive
    negative = Number(new Intl.NumberFormat('en-us', { maximumFractionDigits: 2 }).format(negative))
    
    this.yearProductivityGraph.chartData = [
      {
        data: [positive, negative]
      }
    ]

    this.yearProductivityGraph.chartLabels = ['Productive %', 'Non Productive %']
    this.yearProductivityGraph.chartOptions = {
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
    this.yearProductivityGraph.chartColors = [
      {
        backgroundColor: ['rgb(5, 150, 105)', 'rgba(220, 38, 38)']
      },
    ]
    this.yearProductivityGraph.chartLegend = true
    this.yearProductivityGraph.chartPlugins = []
    this.yearProductivityGraph.chartType = 'doughnut'
  }

  createYearSleepQualityGraphs() {
    let positive = (100 * this.yearData[6]) / (this.loggedYear * 10)
    positive = Number(new Intl.NumberFormat('en-us', { maximumFractionDigits: 2 }).format(positive))
    let negative = 100 - positive
    negative = Number(new Intl.NumberFormat('en-us', { maximumFractionDigits: 2 }).format(negative))
    
    this.yearSleepQualityGraph.chartData = [
      {
        data: [positive, negative]
      }
    ]

    this.yearSleepQualityGraph.chartLabels = ['Good Quality %', 'Bad Quality %']
    this.yearSleepQualityGraph.chartOptions = {
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
    this.yearSleepQualityGraph.chartColors = [
      {
        backgroundColor: ['rgb(5, 150, 105)', 'rgba(220, 38, 38)']
      },
    ]
    this.yearSleepQualityGraph.chartLegend = true
    this.yearSleepQualityGraph.chartPlugins = []
    this.yearSleepQualityGraph.chartType = 'doughnut'
  }

  scrollTop() {
    switch(this.state) {
      case 1:
        break;
      case 2:
        this.monthView.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
        this.renderer.setStyle(this.buttonsView.nativeElement, 'transform', `translateY(5px)`)
        this.state--
        break;
      case 3:
        this.yearView.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
        this.renderer.setStyle(this.buttonsView.nativeElement, 'transform', `translateY(${this.bodyView.nativeElement.offsetHeight /3 + 5}px)`)
        this.state--
        break;
    }
    console.log(this.state)
  }

  scrollBottom() {
    switch(this.state) {
      case 1:
        this.yearView.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
        this.renderer.setStyle(this.buttonsView.nativeElement, 'transform', `translateY(${this.bodyView.nativeElement.offsetHeight / 3  + 5}px)`)
        this.state++
        break;
      case 2:
        this.statsView.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
        this.renderer.setStyle(this.buttonsView.nativeElement, 'transform', `translateY(${(this.bodyView.nativeElement.offsetHeight / 3) * 2 + 5}px)`)
        this.state++
        break;
      case 3:
        break;
    }
    console.log(this.state)
  }

  getNavButtonColor(id: number) {
    switch(this.state) {
      case 1:
        if(id == 1) {
          return '#B3B8CD'
        } else {
          return '#FFFFFF'
        }
      case 2:
        if(id == 1) {
          return '#FFFFFF'
        } else {
          return '#FFFFFF'
        }
      case 3:
        if(id == 1) {
          return '#FFFFFF'
        } else {
          return '#B3B8CD'
        }
    }
  }

}
