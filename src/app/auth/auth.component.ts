import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
  isActive = true;

  constructor(
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
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
