import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      })
  }

}
