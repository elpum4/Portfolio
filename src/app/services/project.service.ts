import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  arrProyectos!: Project[];
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https:/localhost:8080/';
    this.getToken();
  }

  getOptions(){
    const valores = {
      headers: new HttpHeaders({
        'access-token': localStorage.getItem('token')!
      })
    };
    return valores;

  }
  
  
  getToken(): void {
    let objetoToken;
    this.httpClient.get(this.baseUrl +' api/token').subscribe(valor => {
      objetoToken = valor;
      localStorage.setItem('token' ,objetoToken.token)
    });
  }
  
  getAllProjects(): Promise<Project[]> {
    const httpOptions = this.getOptions();
    return this.httpClient.get<Project[]>(this.baseUrl, httpOptions).toPromise(); 
  }

  getProjectByCategory(pCategory: string): Promise<Project[]> {
    const httpOptions = this.getOptions();
    return this.httpClient.get<Project[]>(this.baseUrl + 'categoria/' + pCategory, httpOptions).toPromise();
  }

  getProjectById(pId: number): Promise<Project> {
    const httpOptions = this.getOptions();

    this.httpClient.get(this.baseUrl + pId, httpOptions).subscribe(datos =>{
      console.log(datos);
    });
    return this.httpClient.get<Project>(this.baseUrl + pId, httpOptions).toPromise();
  }

}
