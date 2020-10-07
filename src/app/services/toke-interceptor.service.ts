import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokeInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }


  intercept(req, next) {
    const tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToke()}`
      }
    })
    return next.handle(tokenizeReq);
  }



}
