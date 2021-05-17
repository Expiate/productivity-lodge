import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartDataSets , ChartOptions } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
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

  public lineChartData: ChartDataSets[] = [
    { data: [0], label: 'Work', stack: 'a' },
    { data: [0], label: 'Leisure', stack: 'a' },
    { data: [0], label: 'Sleep', stack: 'a' },
    { data: [0], label: 'Personal Development', stack: 'a' },
    { data: [0], label: 'Others', stack: 'a'}
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
    private apiJournal: ApiJournalService
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
        }
        this.dataDelivered = Promise.resolve(true)
      })
  }

  loadJournalGraphData(sleep: number, work: number, leisure: number, personalDevelopment: number) {
    let others = 24 - sleep - leisure - work - personalDevelopment
    let journalValues = [
      { data: [sleep], label: 'Sleep', stack: 'a' },
      { data: [work], label: 'Work', stack: 'a' },
      { data: [leisure], label: 'Leisure', stack: 'a' },
      { data: [personalDevelopment], label: 'Personal Development', stack: 'a' },
      { data: [others], label: 'Others', stack: 'a'}
    ]
    this.lineChartData = journalValues
  }
}
