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

  constructor(
    private localStorage: StorageService
  ) { }

  ngOnInit(): void {
    this.moodData = this.localStorage.getCacheDay()
    console.log(this.moodData)
    if(this.moodData.month == undefined) {
      console.log('No Month Mood Data')
    } else {
      this.loadMonthData()
    }
    console.log(this.monthData)
  }

  loadMonthData() {
    for (let i = 0; i < this.moodData.month.length; i++) {
      switch(this.moodData.month[i].mood) {
        case 0:
          this.monthData[0] = this.monthData[0] + 1
        case 1:
          this.monthData[1] = this.monthData[1] + 1
        case 2:
          this.monthData[2] = this.monthData[2] + 1
        case 3:
          this.monthData[3] = this.monthData[3] + 1
        case 4:
          this.monthData[4] = this.monthData[4] + 1
      }
    }
  }

}
