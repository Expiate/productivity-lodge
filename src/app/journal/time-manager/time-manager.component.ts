import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart, ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
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
  public newJournal: boolean = false

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

  navigateHome() {
    this.router.navigate(['main/'])
  }

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
      }
    } else {
      this.errorToast('', 'Total hours exceeds 24')
    }
  }

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
    } else {
      this.errorToast('', 'Ratings have to be 0-10')
    }
  }

  changeWorkout() {
    this.journal.workout = this.journalForm.get('workout').value
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
