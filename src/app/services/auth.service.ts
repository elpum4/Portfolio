import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:8080/api/auth';
  currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    console.log('El servicio esta ok')
    this.currentUserSubject = new BehaviorSubject<any>
    (JSON.parse(sessionStorage.getItem('currentUser')||'{}'));

   }

  IniciarSesion(credenciales:any): Observable<any>{
    return this.http.post(this.url, credenciales).pipe(map(data=>{
    sessionStorage.setItem('currenUser', JSON.stringify(data));
    this.currentUserSubject.next(data);
    return data;
    }))
   }
}
