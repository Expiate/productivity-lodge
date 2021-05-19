import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public selectedMenu: number = 1

  constructor(
    private router: Router,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

  changeMenuSelected(menuID: number) {
    this.selectedMenu = menuID
  }

  getColor(menuID: number) {
    if(menuID == this.selectedMenu) {
      return '#ebecf2'
    } else {
      return '#B3B8CD'
    }
  }

  closeApp() {
    window.close()
  }

  goToSettings() {
    this.openModal('settings')
  }

  
  /**
   * Uses Modal Service to open a Modal Window (content in html template)
   * using the id provided in params
   * @param id String (Declared in HTML JW-MODAL Template)
   */
  openModal(id: string) {
    this.modalService.open(id);
  }

    /**
   * Uses Modal Service to close a Modal Window (content in html template)
   * using the id provided in params
   * @param id String (Declared in HTML JW-MODAL Template)
   */
  closeModal(id: string) {
    this.modalService.close(id);
  }

  goToDev() {
    this.router.navigate(['main/dev-info'])
  }

  navigateMood() {
    this.router.navigate(['mood'])
  }

  navigateJournal() {
    this.router.navigate(['journal'])
  }
}
