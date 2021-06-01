import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/common/services/storage.service';
@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(
    private localStorage: StorageService
  ) {}

  /**
   * Intercepts all http request and attaches them an Authorization Header that
   * contains the JWT
   * @param request HttpRequest
   * @param next HttpHandler
   * @returns HttpRequest
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let jwt = this.localStorage.getToken()

    if(jwt) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt}`
        }
      })
    }

    return next.handle(request);
  }

}
