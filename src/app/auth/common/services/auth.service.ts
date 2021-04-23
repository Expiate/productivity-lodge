import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';
const USER_KEY = 'user-data';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private authUrl = `${environment.server_url}/users`;
  private loginUrl = '/login';
  private registerUrl = '/signup';
  private confirmUrl = '/signup/confirm';

  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  login(credentials: { logEmail: string; logPass: string }) {
    console.log(`${this.authUrl}${this.loginUrl}`);
    let JSON = {
      'email': credentials.logEmail.toLowerCase(),
      'password': credentials.logPass
    }
    return this.http.post<any>(`${this.authUrl}${this.loginUrl}`, JSON, { observe: 'response' })
  }

  register(credentials: { signName: string; signEmail: string; signPass: string }) {
    console.log(`${this.authUrl}${this.registerUrl}`);
    let JSON = {
      'username': credentials.signName,
      'email': credentials.signEmail.toLowerCase(),
      'password': credentials.signPass
    }
    console.log(JSON)
    return this.http.post<any>(`${this.authUrl}${this.registerUrl}`, JSON, { observe: 'response' })
  }

  confirm(token : { confCode: string }) {
    console.log(`${this.authUrl}${this.confirmUrl}`);
    let JSON = {
      'confirmationCode': token.confCode
    }
    console.log(JSON)
    return this.http.post<any>(`${this.authUrl}${this.confirmUrl}`, JSON, { observe: 'response' })
  }

}
