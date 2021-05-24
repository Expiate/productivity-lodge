import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/common/services/storage.service';
import { cache } from '../common/models/cache.model';

@Component({
  selector: 'app-mood-review',
  templateUrl: './mood-review.component.html',
  styleUrls: ['./mood-review.component.scss']
})
export class MoodReviewComponent implements OnInit {
  public journalData: cache

  constructor(
    private localStorage: StorageService
  ) { }

  ngOnInit(): void {
    this.journalData = this.localStorage.getCacheJournal()
    console.log(this.journalData)
  }

}
