import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-account-confirmation',
  templateUrl: './account-confirmation.component.html',
  styleUrls: ['./account-confirmation.component.scss']
})
export class AccountConfirmationComponent implements OnInit {

  confirmationForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.confirmationForm = this.formBuilder.group({
      confCode: ['', Validators.required]
    });
  }

  onConfirm(token : { confCode: string }) {
    if (this.confirmationForm.status == 'VALID') {
      this.authService.confirm(token).subscribe(resp => {
        console.log(resp['status'])
        
        if (resp['status'] == 200) {
          this.showSuccess()
          this.goBack()
        }
      }, error => {
        console.log(error['status'])

        if (error['status'] == 404) {
          this.showError()
        }
      })
    } else {
      this.showNoCode()
    }
  }

  showSuccess() {
    this.toastr.success('Redirecting...', 'Account Verified', {
      positionClass: 'toast-bottom-center',
      progressBar: true,
      progressAnimation: 'decreasing',
      timeOut: 3000
    });
  }


  showError() {
    this.toastr.error('', 'Invalid Code', {
      positionClass: 'toast-bottom-center',
      progressBar: false,
      progressAnimation: 'decreasing',
      timeOut: 3000
    });
  }

  showNoCode() {
    this.toastr.error('', 'You must provide a Code', {
      positionClass: 'toast-bottom-center',
      progressBar: false,
      progressAnimation: 'decreasing',
      timeOut: 3000
    });
  }

  goBack() {
    this.router.navigate(['/auth/reg-log'])
  }
}
