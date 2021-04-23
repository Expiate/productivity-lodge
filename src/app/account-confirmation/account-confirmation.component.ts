import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/common/services/auth.service';

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
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.confirmationForm = this.formBuilder.group({
      confCode: ['', Validators.required]
    });
  }

  onConfirm(data : { confCode: string }) {
    if (this.confirmationForm.status == 'VALID') {
      // Auth Service Http Call
    } else {
      this.showInvalid()
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

  }

  showInvalid() {
    this.toastr.error('', 'You must provide a Code', {
      positionClass: 'toast-bottom-center',
      progressBar: false,
      progressAnimation: 'decreasing',
      timeOut: 3000
    });
  }
}
