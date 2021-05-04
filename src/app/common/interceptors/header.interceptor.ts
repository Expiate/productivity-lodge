import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/common/services/storage.service';

const blacklist = [
  '/users/login',
  '/users/signup',
  '/users/signup/confirm',
  '/users/signup/confirm/resend',
]

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(
    private localStorage: StorageService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let jwt = this.localStorage.getToken()

    if(this.isNotInBlacklist(request) && jwt) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt}`
        }
      })
    }

    return next.handle(request);
  }

  isNotInBlacklist(request: HttpRequest<any>): Boolean {
    for(let i = 0; i > blacklist.length; i++) {
      if (request.url.indexOf(blacklist[i]) > -1) {
        return false
      }
    }
    return true
  }
}
