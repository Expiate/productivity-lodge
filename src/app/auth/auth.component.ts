import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  email;
  password;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.signForm = this.formBuilder.group({
      signName: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      signEmail: ['', Validators.compose([Validators.email, Validators.required])],
      signPass: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

    this.logForm = this.formBuilder.group({
      logEmail: ['', Validators.compose([Validators.email, Validators.required])],
      logPass: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

    this.email = this.logForm.get('logEmail')
    this.password = this.logForm.get('logPass')
  }


  onSignUp(credentials: { signName: string; signEmail: string; signPass: string }) {
    if (this.signForm.status == 'VALID') {
      this.authService.register(credentials).subscribe(resp => {
        console.log(resp['status'])
        console.log(resp['body']['message'])
  
        if (resp['status'] == 201) {
          this.changeState()
          this.showRegisterSuccess()
          this.email.setValue(credentials.signEmail)
          this.password.setValue(credentials.signPass)
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
    this.toastr.success('Check your Email to confirm your Account', 'New Account Registered', {
      positionClass: 'toast-bottom-center',
      progressBar: true,
      progressAnimation: 'decreasing',
      timeOut: 5000
    });
  }

  showRegisterInvalid() {
    this.toastr.error('', 'Register Fields are Invalid', {
      positionClass: 'toast-bottom-center',
      progressBar: false,
      progressAnimation: 'decreasing',
      timeOut: 5000
    });
  }
}
