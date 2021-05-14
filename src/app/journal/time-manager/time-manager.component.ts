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
  public newJournal: boolean

  public lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];

  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  public lineChartOptions = {
    responsive: true,
  };

  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  public lineChartLegend = true;
  public lineChartPlugins = [];
  public lineChartType = 'line';
  

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
        this.newJournal = journalRecieved
        this.journal = journal
        console.log(this.journal)
        this.dataDelivered = Promise.resolve(true)
        this.setupGraph()
      })
  }

  setupGraph() {

  }
}
