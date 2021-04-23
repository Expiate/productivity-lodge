import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-reg-log',
  templateUrl: './reg-log.component.html',
  styleUrls: ['./reg-log.component.scss']
})
export class RegLogComponent implements OnInit {
  isActive = true;
  signForm: FormGroup;
  logForm: FormGroup;

  email;
  password;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
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

  /**
   * This Function takes the JSON formed by the input controls in the HTML and then
   * uses them to make an API CALL using the AuthService, then subscribes to it to
   * filter the Response Codes 
   * 
   * @param credentials JSON that contains a Name, an Email and a Password
   */
  onSignUp(credentials: { signName: string; signEmail: string; signPass: string }) {
    if (this.signForm.status == 'VALID') {
      this.authService.register(credentials).subscribe(resp => {
        console.log(resp['status'])
        console.log(resp['body']['message'])
        
        // Check if register was successful
        if (resp['status'] == 201) {
          this.changeState()
          this.showRegisterSuccess()
          this.email.setValue(credentials.signEmail)
          this.password.setValue(credentials.signPass)
        }
      }, error => {
        console.log(error['status'])

        // Check if email is being used
        if (error['status'] == 400) {
          this.showRegisterInvalid("There is already an Account using that email")
        }

      })
    } else {
      this.showRegisterInvalid("Register Fields have invalid format")
    }
  }

  /**
   * This Function takes the JSON formed by the input controls in the HTML and then
   * uses them to make an API CALL using the AuthService, then subscribes to it to
   * filter the Response Codes 
   * 
   * @param credentials JSON that contains an Email and a Password
   */
  onLogIn(credentials: { logEmail: string; logPass: string }) {
    if (this.logForm.status == 'VALID') {
      try {
        this.authService.login(credentials).subscribe(resp => {
          console.log(resp['status'])
          
          if (resp['status'] == 200) {
            // Log In
          }
        }, error => {
          console.log(error['status'])

          // Check if the credentials are wrong
          if (error['status'] == 400) {
            this.showLoginInvalid()
          // Check if the Account is not validated
          } else if (error['status'] == 403) {

            this.showPendingAccount()
            this.router.navigate(['auth/confirmation'])
          }
        })
      } catch (err) {
        console.log(err)
      }

    }
  }

  // Change the state of the HTML template to SignUp or LogIn Mode
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

  showRegisterInvalid(message: string) {
    this.toastr.error('', message, {
      positionClass: 'toast-bottom-center',
      progressBar: false,
      progressAnimation: 'decreasing',
      timeOut: 5000
    });
  }
  
  showLoginInvalid() {
    this.toastr.error('', 'Wrong Email or Password', {
      positionClass: 'toast-bottom-center',
      progressBar: false,
      progressAnimation: 'decreasing',
      timeOut: 5000
    });
  }

  showPendingAccount() {
    this.toastr.info('Check your Email to get the code', 'You Account is still Pending', {
      positionClass: 'toast-bottom-center',
      progressBar: false,
      progressAnimation: 'decreasing',
      timeOut: 5000
    });
  }
}
