import { Injectable } from '@angular/core';
import { Exp } from '../app/models/exp';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpService {
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:8080/api';
  }



  saveExp(experiencia: Exp): Observable<Exp> {
    return this.httpClient.post<Exp>(this.baseUrl + "/new/experiencia",experiencia);
  }
  deleteExp(id: string): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + "/delete/experiencia/"+id);
  }

}