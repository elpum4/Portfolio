import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ImportallService {
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://backapiflask.onrender.com/api';
    // this.baseUrl = 'http://localhost:5000/api';
  }

  //unificado

  getById(pId: number, tipo: string): Observable<any> {
    var urlAdd = '/' + tipo;

    this.httpClient
      .get(this.baseUrl + urlAdd + '/' + pId)
      .subscribe((datos) => {});
    return this.httpClient.get<any>(this.baseUrl + urlAdd + '/' + pId);
  }

  getAll(tipo: string): Observable<any[]> {
    var urlAdd = '/' + tipo;
    return this.httpClient.get<any[]>(this.baseUrl + urlAdd);
  }

  save(tipo: any, objeto: any): Observable<any> {
    var urlAdd = '/' + tipo;
    return this.httpClient.post<any>(this.baseUrl + urlAdd, objeto);
  }

  delete(id: string, tipo: any): Observable<any> {
    var urlAdd = '/' + tipo;
    return this.httpClient.delete<any>(this.baseUrl + urlAdd + '/' + id);
  }
}
