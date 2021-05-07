import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/common/services/storage.service';
import { ModalService } from 'src/app/_modal';
import { emotions } from '../common/data/emotions';
import { Day } from '../common/models/day.model';

@Component({
  selector: 'app-day-editor',
  templateUrl: './day-editor.component.html',
  styleUrls: ['./day-editor.component.scss']
})
export class DayEditorComponent implements OnInit {

  public day: Day
  public userColors: []
  public checked: string
  public color: string = "#FFFFFF"

  public moodForm: FormGroup


  constructor(
    private router: Router,
    private localStorage: StorageService,
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private emotions: emotions
  ) { }

  ngOnInit(): void {
    this.day = this.localStorage.getDay()
    this.getUserColors()

    // Mood Form Config
    this.moodForm = this.formBuilder.group({
      mood: [this.getRadio(this.day.mood)]
    })
    console.log(this.moodForm.get('mood').value)
  }

  getUserColors() {
    this.userColors = this.localStorage.getUser().preferences.colors
  }

  getColor(mood: number): string {
    if (mood == undefined) {
      return '#292929'
    } else {
      let color: string
      color = this.userColors[mood]
      return color
    }
  }

  getSpan(tag: string) {
    return this.emotions.getSpan(tag)
  }

  getRadio(mood: number) {
    switch(mood) {
      case 0:
        return 'super-sad'
      case 1:
        return 'sad'
      case 2:
        return 'neutral'
      case 3:
        return 'happy'
      case 4:
        return 'super-happy'
    }
    return null
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  navigateMoodDaySelector() {
    this.router.navigate(['mood/day-selector'])
  }

  changeMood(e) {
    this.checked = e.target.value
    this.color = '#FFFFFF'
  }

  getFill(string) {

  }

}
