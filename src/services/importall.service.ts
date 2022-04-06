import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Project } from '../app/models/project';
import { Exp } from '../app/models/exp';
import { Skill} from '../app/models/skill'
import { Education } from '../app/models//education'
import { Header } from '../app/models//header'
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

  //Proyectos

  getProjectById(pId: number): Observable<Project> {
    this.httpClient.get(this.baseUrl + "/buscar/proyecto/"+ pId).subscribe(datos =>{
    });
    return this.httpClient.get<Project>(this.baseUrl + "/buscar/proyecto/"+ pId);
  }
  getAllProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.baseUrl + "/ver/proyecto"); 
  }
  //Experiencias

  getAllExp(): Observable<Exp[]> {
    return this.httpClient.get<Exp[]>(this.baseUrl + "/ver/experiencia"); 
  }
  //Skill

  getSkillById(pId: number): Observable<Skill> {
    this.httpClient.get(this.baseUrl + "/buscar/skill/"+ pId).subscribe(datos =>{
    });
    return this.httpClient.get<Skill>(this.baseUrl + "/buscar/skill/"+ pId);
  }
  getAllSkills(): Observable<Skill[]> {
    return this.httpClient.get<Skill[]>(this.baseUrl + "/ver/skill"); 
  }

  //Educación

  getEducationById(pId: number): Observable<Education> {
    this.httpClient.get(this.baseUrl + "/buscar/educacion/"+ pId).subscribe(datos =>{
    });
    return this.httpClient.get<Education>(this.baseUrl + "/buscar/educacion/"+ pId);
  }

  getAllEdu(): Observable<Education[]> {
    return this.httpClient.get<Education[]>(this.baseUrl + "/ver/educacion"); 
  }

  getAllHeader(): Observable<Header[]> {
    return this.httpClient.get<Header[]>(this.baseUrl + "/ver/header"); 
  }
}