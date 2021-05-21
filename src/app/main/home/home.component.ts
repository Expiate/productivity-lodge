import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/common/services/storage.service';
import { ModalService } from 'src/app/_modal';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private userUrl = `${environment.server_url}/users/changeColors`;
  public selectedMenu: number = 1
  public userData;
  public colors: string[]

  public paletteForm: FormGroup

  constructor(
    private router: Router,
    private modalService: ModalService,
    private localStorage: StorageService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.userData = this.localStorage.getUser()
    let registerDate = new Date(this.userData.registerDate)
    let formatDate = registerDate.getFullYear() + "/" + (registerDate.getMonth() + 1) + "/" + registerDate.getDate()
    this.userData.registerDate = formatDate
    this.colors = this.userData.preferences.colors
    
    this.paletteForm = this.formBuilder.group({
      color0: [this.colors[0], Validators.required],
      color1: [this.colors[1], Validators.required],
      color2: [this.colors[2], Validators.required],
      color3: [this.colors[3], Validators.required],
      color4: [this.colors[4], Validators.required]
    })
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

  logout() {
    this.localStorage.clearStorage()
    this.router.navigate(['auth/'])
  }

  changeColorPalette(colors : { color0: string, color1: string, color2: string, color3: string, color4: string}) {
    let JSON = {
      'colors': [
        colors.color0,
        colors.color1,
        colors.color2,
        colors.color3,
        colors.color4
      ]
    }
    this.http.patch<any>(this.userUrl, JSON, { observe: 'response' }).subscribe(resp => {
      // On Success
      console.log("Success: " + resp['status'])
      console.log(resp['body'])
      this.successToast('', 'Color Palette Updated')
      this.userData.preferences.colors = [
        colors.color0,
        colors.color1,
        colors.color2,
        colors.color3,
        colors.color4
      ]
      this.localStorage.deleteUser()
      this.localStorage.saveUser(this.userData)

      this.colors = this.userData.preferences.colors
    
      this.paletteForm = this.formBuilder.group({
        color0: [this.colors[0], Validators.required],
        color1: [this.colors[1], Validators.required],
        color2: [this.colors[2], Validators.required],
        color3: [this.colors[3], Validators.required],
        color4: [this.colors[4], Validators.required]
      })
    }, error => {
      // On Error
      console.log("Error: " + error['status'])
      console.log(error['body'])
      this.errorToast('Error', 'Try again later')
    })
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

  navigateStats() {
    this.router.navigate(['stats'])
  }

  navigateJournal() {
    this.router.navigate(['journal'])
  }

  successToast(title: string, content: string) {
    if (title == null) {
      title = ""
    }
    this.toastr.success(content, title, {
      positionClass: 'toast-bottom-right',
      progressBar: false,
      progressAnimation: 'decreasing',
      timeOut: 3000
    });
  }

  errorToast(title: string, content: string) {
    if (title == null) {
      title = ""
    }
    this.toastr.error(content, title, {
      positionClass: 'toast-bottom-right',
      progressBar: false,
      progressAnimation: 'decreasing',
      timeOut: 3000
    });
  }
}
