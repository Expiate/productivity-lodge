import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './common/services/auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
  isActive = true;
  signForm: FormGroup;
  logForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.signForm = this.formBuilder.group({
      signName: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      signEmail: ['', Validators.compose([Validators.email, Validators.required])],
      signPass: ['', Validators.compose([Validators.minLength(7), Validators.required])]
    });

    this.logForm = this.formBuilder.group({
      logEmail: ['', Validators.compose([Validators.email, Validators.required])],
      logPass: ['', Validators.compose([Validators.minLength(7), Validators.required])]
    });
  }


  onSignUp(credentials: { signName: string; signEmail: string; signPass: string }) {
    if (this.signForm.status == 'VALID') {
      this.authService.register(credentials).subscribe(resp => {
        console.log(resp['status'])
        console.log(resp['body']['message'])
  
        if (resp['status'] == 201) {
          this.changeState()
          this.showRegisterSuccess()
        }
      })
    } else {
      this.showRegisterInvalid()
    }
  }

  changeState() {
    if(this.isActive) {
      return this.isActive = false
    }
    this.isActive = true
  }

  showRegisterSuccess() {
    this.toastr.success('New Account Registered', '', {
      positionClass: 'toast-bottom-center',
      progressBar: false,
      progressAnimation: 'decreasing',
      timeOut: 1500
    });

    this.toastr.info('Check your Email to confirm your Account', '', {
      positionClass: 'toast-bottom-center',
      progressBar: true,
      progressAnimation: 'decreasing',
      timeOut: 3000
    })
  }

  showRegisterInvalid() {
    this.toastr.error('Register Form Invalid', '', {
      positionClass: 'toast-bottom-center',
      progressBar: false,
      progressAnimation: 'decreasing',
      timeOut: 1500
    });
  }
}
