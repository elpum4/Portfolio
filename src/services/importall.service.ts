import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ImportallService {
  baseUrl: string;

  constructor(private httpClient: HttpClient) { 
    this.baseUrl = 'https://backapp-elpum4.herokuapp.com/api';
    //this.baseUrl = 'http://localhost:8080/api';

  }


  //unificado

  getById(pId: number, tipo: string): Observable<any> {
    var urlAdd = "/buscar/"+tipo;
    
    this.httpClient.get(this.baseUrl + urlAdd + '/' + pId).subscribe(datos =>{
    });
    return this.httpClient.get<any>(this.baseUrl + urlAdd + '/' + pId)
  }

  getAll(tipo: string): Observable<any[]> {
    var urlAdd = "/ver/"+tipo;
    return this.httpClient.get<any[]>(this.baseUrl + urlAdd); 
  }

  save(tipo: any, objeto: any): Observable<any> {
    var urlAdd = "/new/"+tipo;
    return this.httpClient.post<any>(this.baseUrl + urlAdd, objeto);
  }

  delete(id: string, tipo: any): Observable<any> {
    var urlAdd = "/delete/"+tipo;
    return this.httpClient.delete<any>(this.baseUrl + urlAdd + '/' + id);
  }
}