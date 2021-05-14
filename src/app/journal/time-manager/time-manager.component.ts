import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDataSets , ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
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
    }
  };

  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
    {
      backgroundColor: '#3deb34'
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
        if (journalRecieved) {
          this.loadJournalGraphData()
        }
        this.dataDelivered = Promise.resolve(true)
      })
  }

  loadJournalGraphData() {
    let others = 24 - this.journal.work - this.journal.leisure - this.journal.sleep - this.journal.personalDevelopment
    let journalValues = [
      { data: [this.journal.sleep], label: 'Sleep', stack: 'a' },
      { data: [this.journal.work], label: 'Work', stack: 'a' },
      { data: [this.journal.leisure], label: 'Leisure', stack: 'a' },
      { data: [this.journal.personalDevelopment], label: 'Personal Development', stack: 'a' },
      { data: [others], label: 'Others', stack: 'a'}
    ]
    this.lineChartData = journalValues
  }
}
