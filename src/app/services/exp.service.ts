import { Injectable } from '@angular/core';
import { Exp } from '../models/exp';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpService {
  
  arrExperiencias!: Exp[];
  baseUrl: string;
  constructor(private httpClient: HttpClient) { 
    this.baseUrl = 'http://localhost:8080/api';
  }
}




@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  arrProyectos!: Project[];
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:8080/api';
  }



  getAllProjects(): Promise<Project[]> {
    return this.httpClient.get<Project[]>(this.baseUrl + "/ver/proyectos").toPromise(); 
  }

}