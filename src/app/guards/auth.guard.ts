import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService:LoginService, private router:Router) {}
  canActivate(): boolean {
    if(!this.loginService.isauth()){
      console.log('Token no es válido o ya expiró');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
