import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LoginService {

  
  url = environment.url;
  constructor(private http: HttpClient, private jwthelper: JwtHelperService) {}
  public login(body: any) {
    return this.http.post(this.url+'user/login', body);
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
