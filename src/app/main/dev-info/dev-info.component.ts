import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dev-info',
  templateUrl: './dev-info.component.html',
  styleUrls: ['./dev-info.component.scss']
})
export class DevInfoComponent implements OnInit {

  private gmail: string = "jmsanchezbonilla@gmail.com"

  constructor(
    private router: Router,
    private clipboard: ClipboardService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  navigateHome() {
    this.router.navigate(['/main'])
  }

  openLinkedin() {
    window.open('https://www.linkedin.com/in/josé-maría-sánchez-bonilla-4a896a210/')
  }

  copyGmailToClipboard() {
    this.clipboard.copyFromContent(this.gmail)
    this.successToast('', 'Gmail copied to Clipboard')
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
}
