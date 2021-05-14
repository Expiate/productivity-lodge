import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-time-manager',
  templateUrl: './time-manager.component.html',
  styleUrls: ['./time-manager.component.scss']
})
export class TimeManagerComponent implements OnInit {
  // This signals when the data has been fetched
  public dataDelivered: Promise<boolean>;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigateHome() {
    this.router.navigate(['main/'])
  }

}
