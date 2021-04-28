import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  closeApp() {
    window.close()
  }

  goToSettings() {

  }

  goToDev() {
    this.router.navigate(['/dev-info'])
  }

  navigateMood() {
    this.router.navigate(['main/mood'])
  }
}