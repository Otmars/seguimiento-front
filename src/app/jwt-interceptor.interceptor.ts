import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: any = localStorage.getItem('token');
    console.log("intece");
    
    let req = request
    if (token) {

      req = request.clone({
        setHeaders:{
          Authorization :'Bearer ' + token
        }
      })
    }
    return next.handle(req);
  }
}
