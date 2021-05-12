import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/common/services/storage.service';
import { ModalService } from 'src/app/_modal';
import { domAnimations } from '../common/animations/dom-animations';
import { emotions } from '../common/data/emotions';
import { Day } from '../common/models/day.model';
import { ApiMoodService } from '../common/services/api-mood.service';

@Component({
  selector: 'app-day-editor',
  templateUrl: './day-editor.component.html',
  styleUrls: ['./day-editor.component.scss'],
  animations: [domAnimations]
})

export class DayEditorComponent implements OnInit {

  public day: Day
  public userColors: []
  public activeColors: [string] = ['']
  public checked: string
  public hover: string
  public displayEmotions: boolean = false;
  public color: string = "#FFFFFF"

  public moodForm: FormGroup


  constructor(
    private router: Router,
    private localStorage: StorageService,
    private modalService: ModalService,
    private apiMood: ApiMoodService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private emotions: emotions
  ) { }

  ngOnInit(): void {
    // Get Data from Local Storage and Setup Variables 
    this.day = this.localStorage.getDay()
    if (this.day.emotions == undefined) this.day.emotions = []
    this.getUserColors()

    // Mood Form Config
    this.moodForm = this.formBuilder.group({
      mood: [this.getRadio(this.day.mood), Validators.required],
      note: [this.day.note, Validators.maxLength(255)]
    })
    // Auto Check the Radio Button using user data
    this.checked = this.moodForm.get('mood').value

    this.setupActiveColors()
  }

  /**
   * Fills ActiveColors Array with the defaul color (White)
   */
  setupActiveColors() {
    for (let i = 0; i <= 4; i++) {
      this.activeColors[i] = "#FFFFFF"
    }
  }

  /**
   * Gets the User Preference Colors from Local Storage and stores it
   * into UserColors var
   */
  getUserColors() {
    this.userColors = this.localStorage.getUser().preferences.colors
  }

  /**
   * Returns the specific hex value color corresponding to the user data
   * using mood param, if mood param is undefined returns default app color
   * #292929
   * @param mood Numeric Value (0-4)
   * @returns String (HEX Value)
   */
  getColor(mood: number): string {
    if (mood == undefined) {
      return '#292929'
    } else {
      let color: string
      color = this.userColors[mood]
      return color
    }
  }

  /**
   * Returns the String Value for the selected mood in the radio control
   * @param mood Numeric Value (0-4)
   * @returns String
   */
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

  /**
   * Returns the Mood Numeric Value corresponding to the radio param
   * @param radio String that matches RadioControl Value
   * @returns Number
   */
  getMood(radio: string) {
    switch(radio) {
      case 'super-sad':
        return 0
      case 'sad':
        return 1
      case 'neutral':
        return 2
      case 'happy':
        return 3
      case 'super-happy':
        return 4
    }
  }

  /**
   * Uses Modal Service to open a Modal Window (content in html template)
   * using the id provided in params
   * @param id String (Declared in HTML JW-MODAL Template)
   */
  openModal(id: string) {
    this.modalService.open(id);
  }

    /**
   * Uses Modal Service to close a Modal Window (content in html template)
   * using the id provided in params
   * @param id String (Declared in HTML JW-MODAL Template)
   */
  closeModal(id: string) {
    this.modalService.close(id);
  }

  /**
   * Navigates the App to Day Selector Component in Mood Module
   */
  navigateMoodDaySelector() {
    this.router.navigate(['mood/day-selector'])
  }

  /**
   * Registers UI Events and stores Event values in Checked var
   * @param e Event
   */
  changeMood(e) {
    this.checked = e.target.value
    this.color = '#FFFFFF'
  }

  /**
   * Changes the state on DisplayEmotions Boolean var
   */
  changeDisplayEmotions() {
    this.displayEmotions = !this.displayEmotions
  }

  /**
   * Returns the requested HEX Value stored in ActiveColors
   * using mood param
   * @param mood Numeric Value (0-4)
   * @returns String (HEX Value)
   */
  getActiveColor(mood: number): string {
    return this.activeColors[mood]
  }

  /**
   * Updates an ActiveColors value using active and mood params
   * @param active Boolean 
   * @param mood Numeric Value (0-4)
   */
  updateActiveColor(active: boolean, mood: number) {
    if (active) {
      this.activeColors[mood] = this.userColors[mood]
    } else {
      this.activeColors[mood] = "#FFFFFF"
    }
  }

  /**
   * Deletes a specific emotion in emotions array using its index
   * @param index Number
   */
  deleteTag(index: number) {
    this.day.emotions.splice(index, 1)
  }

  /**
   * Returns an Array of the Emotions that are not already on emotions
   * property on day var
   * @returns String []
   */
  getAvailableEmotions() {
    return this.emotions.getOuterJoin(this.day.emotions)
  }

  /**
   * Pushes an element of Available Emotions to Day Emotions using its index in
   * Available Emotions
   * @param i Number
   * @returns void
   */
  addToEmotions(i: number) {
    if (this.day.emotions.length == 6) {
      return
    }
    this.day.emotions.push(this.getAvailableEmotions()[i])
  }

  /**
   * Uses the data of the MoodForm to signal ApiMood service to make an
   * HTTP call in order to create a new day in the server. Then it resolves
   * the observable that containst the response. If the day was already recovered
   * from the server it attemps to modify its contents in the server instead of
   * creating a new day
   * @returns void
   */
  saveDay() {
    if (this.moodForm.get('mood').value != null) {
      this.day.mood = this.getMood(this.moodForm.get('mood').value)
    } else {
      // Show Mood Not Selected Toast
      this.errorToast('', 'You have to select a mood')
      return 
    }

    if (this.moodForm.get('note').value != "") {
      this.day.note = this.moodForm.get('note').value
    }  
    
    if(this.day.isRecoveredFromAPI) {
      console.log('Modify')
      this.apiMood.modifyDay(this.day)  
      return
    }

    this.apiMood.createDay(this.day).subscribe(resp => {
      // On Success
      console.log("Success: " + resp['status'])
      console.log(resp['body']['message'])

      if (resp['status'] == 201) {
        // Show Success Toast
        this.day.isRecoveredFromAPI = true
        this.localStorage.saveDay(this.day)
        this.successToast('', 'Day Saved')
      }
    }, error => {
      // On Error
      console.log("Error: " + error['status'])
      console.log(error['body']['message'])

      this.errorToast('Something went wrong', 'Try again later')
    })
  }

  /**
   * Clears the MoodForm data and uses ApiMood Service to
   * make an HTTP Call to remove specific day data from
   * the server
   */
  deleteDay() {
    this.moodForm.get('mood').setValue("")
    this.moodForm.get('note').setValue("")
    this.checked = ""
    this.day.emotions = []

    if(this.day.isRecoveredFromAPI) {
      this.apiMood.deleteDay(this.day)
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
