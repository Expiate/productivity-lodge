import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dev-info',
  templateUrl: './dev-info.component.html',
  styleUrls: ['./dev-info.component.scss']
})
export class DevInfoComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  navigateHome() {
    this.router.navigate(['/main'])
  }

  openLinkedin() {
    window.open('https://www.linkedin.com/in/josé-maría-sánchez-bonilla-4a896a210/')
  }

  copyGmailToClipboard() {
  }
}
