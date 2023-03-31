import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = 'http://localhost:3000/user/login';
  constructor(private http: HttpClient, private jwthelper: JwtHelperService) {}
  public login(body: any) {
    return this.http.post(this.url, body);
  }

  isauth(): boolean {
    const token = localStorage.getItem('token');
    if (this.jwthelper.isTokenExpired(token) || !localStorage.getItem('token')) {
      console.log(this.jwthelper.isTokenExpired(token),"el token expiro");
      
      return false;
    }
    return true;
  }
}
