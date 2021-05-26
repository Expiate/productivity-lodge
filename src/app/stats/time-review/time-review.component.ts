import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { StorageService } from 'src/app/common/services/storage.service';
import { cache } from '../common/models/cache.model';

@Component({
  selector: 'app-time-review',
  templateUrl: './time-review.component.html',
  styleUrls: ['./time-review.component.scss']
})
export class TimeReviewComponent implements OnInit {
  @ViewChild('body', { read: ElementRef }) public bodyView: ElementRef<any>;
  
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
  
  // Data Booleans
  public isMonthDataAvailable = false
  public isYearDataAvailable = false
  public comparationsAvailable = false

  constructor(
    private localStorage: StorageService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    Chart.defaults.global.defaultFontColor = '#FFFFFF'
    Chart.defaults.global.defaultFontFamily = 'Montserrat'
    Chart.defaults.global.animation.duration = 1500
    this.userColors = this.localStorage.getUser().preferences.colors
    this.journalData = this.localStorage.getCacheJournal()

    if(this.journalData.year == undefined) {
      console.log('No Data')
    } else {
      this.isYearDataAvailable = true
      this.loadYearData()
      console.log(this.yearData)
    }

    if(this.journalData.month == undefined) {
      console.log('No Month Mood Data')
    } else {
      this.isMonthDataAvailable = true
      this.loadMonthData()
      console.log(this.monthData)
    }

    this.calculateStats()
    //this.createGraphs()
  }

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

  calcOthers(schedule: any): number {
    let others: number
    others = 24 - schedule.sleep - schedule.work - schedule.leisure - schedule.personalDevelopment
    return others
  }

  calculateStats() {
    if(this.isYearDataAvailable) {
      this.yearAverages = this.calcMoodAverage(this.yearData)
    }

    if (this.isMonthDataAvailable) {
      this.monthAverages = this.calcMoodAverage(this.monthData)
      console.log(this.monthAverages)

      // Comparations
      this.comparationsAvailable = true
      // this.averageComp = this.calcAverageComp()
    }
  }

  calcMoodAverage(array: any[]): any[] {
    for (let i = 0; i < array.length; i++) {
      array[i] /= array.length
      array[i] = new Intl.NumberFormat('en-us', { maximumFractionDigits: 2}).format(array[i])
    }
    return array
  }

  createGraphs() {

  }

}
