import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../services/token-storage.service';
import { SpinnerService } from '../services/spinner.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
//const TOKEN_HEADER_KEY = 'x-access-token';   // for Node.js Express back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService, private spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      // for Spring Boot back-end
      authReq = req.clone({ 
          headers: req.headers.set(TOKEN_HEADER_KEY, 
          'Bearer ' + token) 
      });

      // for Node.js Express back-end
      //authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });

      

    }
    this.spinnerService.requestStarted();
    return this.handler(next, authReq);
  }

  handler(next, authReq){
    return next.handle(authReq)
      .pipe(
        tap(
          (event)=>{
            if (event instanceof HttpResponse){
                this.spinnerService.requestEnded();
            }
          },
          (error: HttpErrorResponse) =>{
            this.spinnerService.resetSpinner();
            throw error;
          }
        )
      )
  }
}



export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];