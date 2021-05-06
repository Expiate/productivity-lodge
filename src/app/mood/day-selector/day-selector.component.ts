import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/common/services/storage.service';
import { Day } from '../common/models/day.model';

@Component({
  selector: 'app-day-selector',
  templateUrl: './day-selector.component.html',
  styleUrls: ['./day-selector.component.scss']
})
export class DaySelectorComponent implements OnInit {

  public day: Day
  public userColors: []

  constructor(
    private router: Router,
    private localStorage: StorageService
  ) { }

  ngOnInit(): void {
    this.day = this.localStorage.getDay()
    this.getUserColors()
  }

  navigateMoodCalendar() {
    this.router.navigate(['mood/calendar'])
  }

  getUserColors() {
    this.userColors = this.localStorage.getUser().preferences.colors
  }

  getColor(mood: number) {
    if(mood == undefined) {
      return '#292929'
    } else {
      let color: string
      color = this.userColors[mood]
      return color
    }
  }

  getMoodIcon(mood: number) {
    switch(mood) {
      case 0:
        return "moodIcon m0"
      case 1:
        return "moodIcon m1"
      case 2:
        return "moodIcon m2"
      case 3:
        return "moodIcon m3"
      case 4:
        return "moodIcon m4"
    }
  }

  getSpan(tag: string) {
    let s1 = 'span 1'
    let s2 = 'span 2'

    switch(tag) {
      case 'optimistic':
        return s2
      case 'motivated':
        return s2
    }
  }
}
