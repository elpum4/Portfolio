import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // url = 'http://localhost:5000/api/auth';
  url = 'https://backapiflask.onrender.com/api/auth';

  currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(sessionStorage.getItem('currentUser') || '{}')
    );
  }
  getOptions() {
    const valores = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return valores;
  }

  login(credenciales: any): Observable<any> {
    const httpOptions = this.getOptions();
    return this.http.post(this.url + '/signin', credenciales, httpOptions).pipe(
      map((data) => {
        sessionStorage.setItem('currenUser', JSON.stringify(data));
        this.currentUserSubject.next(data);
        return data;
      })
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    const httpOptions = this.getOptions();
    return this.http.post(
      this.url + '/signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }
}
