import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.signForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.minLength(7), Validators.required])]
    });
  }

  changeState() {
    if(this.isActive) {
      return this.isActive = false
    }
    this.isActive = true
  }

  showSuccess() {
    this.toastr.success('Success', '', {
      positionClass: 'toast-bottom-center',
      progressBar: false,
      progressAnimation: 'decreasing',
      timeOut: 1500
    });
  }
}
