import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public selectedMenu: number

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigateHome() {
    this.router.navigate(['main'])
  }

  selectMenu(id: number) {
    if (this.selectedMenu == id) {
      this.selectedMenu = 0
      return
    }
    this.selectedMenu = id
  }

  getTitle() {
    switch(this.selectedMenu) {
      case 0:
        return 'How to use'
      case 1:
        return 'Monthly Review'
      case 2:
        return 'Time'
      case 3:
        return 'Mood'
    }
  }

}
