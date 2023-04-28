import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private loginService:LoginService,private router:Router){}
  canActivate(router: ActivatedRouteSnapshot){

    const expectedRole = router.data['expectedRole'];
    const token :any= localStorage.getItem('token')
    
    const tokendecode:any = decode(token);
    console.log(tokendecode.rol);
    
    // const { username, roles } = decode(token);
  

    if( !this.loginService.isauth() || tokendecode.rol !== expectedRole){
      console.log('Usuario no autorizado para la vista');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  
}
