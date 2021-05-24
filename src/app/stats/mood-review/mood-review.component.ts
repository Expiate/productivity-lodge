import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mood-review',
  templateUrl: './mood-review.component.html',
  styleUrls: ['./mood-review.component.scss']
})
export class MoodReviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('hola')
  }

}
