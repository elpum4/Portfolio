import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEventType } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { TokenStorageService } from '../app/services/token-storage.service';
import { SpinnerService } from '../app/services/spinner.service';
import { CacheService } from '../app/services/cache.service';
import { MessageComponent } from '../app/components/message/message.component';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
//const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
const TOKEN_HEADER_KEY = 'x-access-token';   // for Node.js Express back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private token: TokenStorageService, 
    private spinnerService: SpinnerService,
    private cacheService: CacheService,
    private dialog: MatDialog
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Handle GET requests with cache
    if (req.method === 'GET') {
      const resource = this.cacheService.extractResourceFromUrl(req.url);
      
      if (resource) {
        const cachedData = this.cacheService.get(resource);
        
        if (cachedData) {
          // Return cached data immediately without making HTTP request
          // Don't start spinner for cached requests
          return of(new HttpResponse({
            status: 200,
            body: cachedData,
            url: req.url
          }));
        }
      }
    }

    // Handle POST/PUT/DELETE requests - invalidate cache
    if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
      const resource = this.cacheService.extractResourceFromUrl(req.url);
      
      if (resource) {
        // Invalidate cache for this resource before making the request
        this.cacheService.invalidate(resource);
      }
    }

    // Add authentication token
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      // for Spring Boot back-end
      // authReq = req.clone({ 
      //     headers: req.headers.set(TOKEN_HEADER_KEY, 
      //     'Bearer ' + token) 
      // });

      // for Node.js Express back-end
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
    }
    
    this.spinnerService.requestStarted();
    return next.handle(authReq).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            this.spinnerService.requestEnded();
            
            // Cache GET responses
            if (req.method === 'GET' && event.status === 200) {
              const resource = this.cacheService.extractResourceFromUrl(req.url);
              
              if (resource && event.body) {
                this.cacheService.set(resource, event.body);
              }
            }
          }
        }
      ),
      catchError((error: HttpErrorResponse) => {
        this.spinnerService.resetSpinner();
        
        // Handle 401 Unauthorized (token expired or invalid)
        if (error.status === 401) {
          // Clear expired token
          this.token.signOut();
          
          // Show message to user
          this.dialog.open(MessageComponent, {
            data: {
              message: "Your session has expired. Please log in again.",
              mot: "error"
            }
          });
          
          // Reload page to reset state
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
        
        return throwError(() => error);
      })
    );
  }
}



export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];