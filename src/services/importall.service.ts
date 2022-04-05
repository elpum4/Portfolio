import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Project } from '../models/project';
import { Exp } from '../models/exp';
import { Skill} from '../models/skill'
import { Education } from '../models/education'
import { Header } from '../models/header'
@Injectable({
  providedIn: 'root'
})
export class ImportallService {
  baseUrl: string;

  arrProyectos!: Project[];
  arrExperiencias!: Exp[];
  arrSkills!: Skill[];
  arrEdu!: Education[];
  arrHead!: Header[];

  constructor(private httpClient: HttpClient) { 
    //this.baseUrl = 'https://backapp-elpum4.herokuapp.com/api';
    this.baseUrl = 'http://localhost:8080/api';

  }

  //  Ava veremos esta parte como la hacemos
  getOptions(){
    const valores = {
      headers: new HttpHeaders({
        'Authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcnVlYmFkZTgiLCJpYXQiOjE2NDkwNzc2NjQsImV4cCI6MTY0OTE2NDA2NH0.bC87d9wHjMORiDgWxqZOnm837Ci-_Dc2hatWjkQyTUZSoZAMrACFohGk01u9cbtFRw_hxk6BHBI5T8uGefDIsA"
      })
    };
    return valores;

  }
  //Proyectos

  getProjectById(pId: number): Observable<Project> {
    return this.httpClient.get<Project>(this.baseUrl + "/buscar/proyecto/"+ pId);
  }
  getAllProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.baseUrl + "/ver/proyecto"); 
  }

  getAllExp(): Observable<Exp[]> {
    return this.httpClient.get<Exp[]>(this.baseUrl + "/ver/experiencia"); 
  }

  getAllSkills(): Observable<Skill[]> {
    return this.httpClient.get<Skill[]>(this.baseUrl + "/ver/skill"); 
  }

  getAllEdu(): Observable<Education[]> {
    return this.httpClient.get<Education[]>(this.baseUrl + "/ver/educacion"); 
  }

  getAllHeader(): Observable<Header[]> {
    return this.httpClient.get<Header[]>(this.baseUrl + "/ver/header"); 
  }
}