import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart, ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/_modal';
import { Journal } from '../common/models/journal.model';
import { ApiJournalService } from '../common/services/api-journal.service';
import { JournalGeneratorService } from '../common/services/journal-generator.service';

@Component({
  selector: 'app-time-manager',
  templateUrl: './time-manager.component.html',
  styleUrls: ['./time-manager.component.scss']
})
export class TimeManagerComponent implements OnInit {
  // This signals when the data has been fetched
  public dataDelivered: Promise<boolean>

  public journal: Journal

  // Specifies wether the journal has been feched from the DB or its a new one
  public newJournal: boolean = false
  // Signals wether there has been changes into the UI fields
  public newData: boolean = false

  public journalForm: FormGroup

  public lineChartData: ChartDataSets[] = [
    { data: [0], label: 'Work', stack: 'a' },
    { data: [0], label: 'Leisure', stack: 'a' },
    { data: [0], label: 'Sleep', stack: 'a' },
    { data: [0], label: 'Personal Development', stack: 'a' },
    { data: [0], label: 'Others', stack: 'a' }
  ];

  public lineChartLabels: Label[] = ['Hours'];

  public lineChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          max: 24,
        }
      }],
    },
    tooltips: {
      enabled: true,
      callbacks: {
        title: function () {
          return 'Hours'
        }
      }
    }
  };

  public lineChartColors: Color[] = [
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
  ];

  public lineChartLegend = true;
  public lineChartPlugins = [];
  public lineChartType = 'horizontalBar';


  constructor(
    private router: Router,
    private journalGenerator: JournalGeneratorService,
    private formBuilder: FormBuilder,
    private apiJournal: ApiJournalService,
    private toastr: ToastrService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    Chart.defaults.global.defaultFontColor = '#B3B8CD'
    Chart.defaults.global.defaultFontFamily = 'Montserrat'
    this.loadJournal()
  }

  /**
   * Navigates app to home
   */
  navigateHome() {
    this.router.navigate(['main/'])
  }

  /**
   * Uses ApiJournal Service to fecth a Journal form the DB using
   * a Template Journal obtained through the Journal Generator Service
   * if it gets data from the db it loads it into the UI but if it gets
   * no data, creates a new Journal to be filled
   */
  loadJournal() {
    this.apiJournal.getJournal(
      this.journalGenerator.generateJournal(),
      (journalRecieved: boolean, journal: Journal) => {
        this.newJournal = !journalRecieved
        this.journal = journal
        console.log(this.journal)
        console.log(this.newJournal)
        if (journalRecieved) {
          this.loadJournalGraphData(this.journal.sleep, this.journal.work,
            this.journal.leisure, this.journal.personalDevelopment)
        } else {
          this.journal.sleep = 0
          this.journal.work = 0
          this.journal.leisure = 0
          this.journal.personalDevelopment = 0
          this.journal.workout = false
          this.journal.productivityLevel = 0
          this.journal.sleepQuality = 0
        }
        this.dataDelivered = Promise.resolve(true)
        this.bindFormData()
      })
  }

  /**
   * Loads the data provided in the params into the UI Chart
   * @param sleep Number
   * @param work Number
   * @param leisure Number
   * @param personalDevelopment Number
   */
  loadJournalGraphData(sleep: number, work: number, leisure: number, personalDevelopment: number) {
    let others: number
    if(sleep + work + leisure + personalDevelopment < 16) {
      others = 0
    } else {
      others = 24 - sleep - leisure - work - personalDevelopment
    }

    let journalValues = [
      { data: [sleep], label: 'Sleep', stack: 'a' },
      { data: [work], label: 'Work', stack: 'a' },
      { data: [leisure], label: 'Leisure', stack: 'a' },
      { data: [personalDevelopment], label: 'Personal Development', stack: 'a' },
      { data: [others], label: 'Others', stack: 'a' }
    ]
    this.lineChartData = journalValues
  }

  /**
   * Creates the Form that contains all the required controls to run the
   * Component, uses journal data as default values for the controls and adds
   * validators to the controls as well
   */
  bindFormData() {
    this.journalForm = this.formBuilder.group({
      work: [this.journal.work, Validators.compose([Validators.min(0), Validators.required])],
      sleep: [this.journal.sleep, Validators.compose([Validators.min(0), Validators.required])],
      leisure: [this.journal.leisure, Validators.compose([Validators.min(0), Validators.required])],
      pers: [this.journal.personalDevelopment, Validators.compose([Validators.min(0), Validators.required])],
      workout: [this.journal.workout, Validators.compose([Validators.required])],
      prod: [this.journal.productivityLevel, Validators.compose([Validators.min(0), Validators.required])],
      sleepQ: [this.journal.sleepQuality, Validators.compose([Validators.min(0), Validators.required])],
    })
  }

  /**
   * Detect changes in the UI Controls values (Schedule) and loads its into
   * the Journal Object if its passes validation, also updates the
   * UI Chart values
   * @param e Event
   * @param controlName String
   */
  updateData(e, controlName: string) {
    let value: number = this.journalForm.get(controlName).value

    if (value < 24) {
      switch (controlName) {
        case 'sleep':
          this.journal.sleep = value
          break;
        case 'work':
          this.journal.work = value
          break;
        case 'leisure':
          this.journal.leisure = value
          break;
        case 'pers':
          this.journal.personalDevelopment = value
          break;
      }

      let sum: number = this.journal.sleep + this.journal.work + this.journal.leisure + this.journal.personalDevelopment
      if (sum > 24) {
        this.errorToast('', 'Total hours exceeds 24')
      } else {
        this.loadJournalGraphData(this.journal.sleep, this.journal.work, this.journal.leisure, this.journal.personalDevelopment)
        this.newData = true
      }
    } else {
      this.errorToast('', 'Total hours exceeds 24')
    }
  }
  /**
   * Detect changes in the UI Controls values (Ratings) and loads its into
   * the Journal Object if its passes validation
   * @param controlName String
   */
  changeRatings(controlName) {
    let value: number = this.journalForm.get(controlName).value
    if (value <= 10 && value >= 0) {
      switch (controlName) {
        case 'prod':
          this.journal.productivityLevel = value
          break;
        case 'sleepQ':
          this.journal.sleepQuality = value
          break;
      }
      this.newData = true
    } else {
      this.errorToast('', 'Ratings have to be 0-10')
    }
  }

  /**
   * Detect changes in Workout UI Checkbox and loads the value
   * into the Journal Object
   */
  changeWorkout() {
    this.journal.workout = this.journalForm.get('workout').value
    this.newData = true
  }

  /**
   * Attemps to make an HTTP Call to wether create a new Journal
   * with the new values or update an existing one if it was originally
   * retrieved from the DB
   * @returns void
   */
  save() {
    let apiObservable: Observable<HttpResponse<any>>
    
    if (this.journalForm.valid) {

      if (this.newJournal) {
        console.log('new')
        apiObservable = this.apiJournal.createJournal(this.journal)
      } else {
        console.log('update')
        apiObservable = this.apiJournal.updateJournal(this.journal)
      }

      apiObservable.subscribe(resp => {
        // On Success
        console.log("Success: " + resp['status'])
        console.log(resp['body']['message'])
  
        if (resp['status'] == 201 || resp['status'] == 200) {
          // Show Success Toast
          this.newJournal = false
          this.successToast('', 'Journal Saved')
          this.newData = false
        }
      }, error => {
        // On Error
        console.log("Error: " + error['status'])
        console.log(error['body']['message'])
  
        this.errorToast('Something went wrong', 'Try again later')
      })
    } else {
      this.errorToast('', 'There is an error in the fields')
      return
    }
  }

  /**
   * Checks if values have been changed in the controls before exiting
   * the view. If changes has been made it opens a modal window
   */
  exit() {
    if (this.newData == true) {
      this.openModal('closeDayEditorWithoutSaving')
    } else {
      this.navigateHome()
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
