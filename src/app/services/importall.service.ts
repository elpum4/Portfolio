import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

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
    this.baseUrl = 'https://backapp-elpum4.herokuapp.com/api';
    //this.baseUrl = 'http://localhost:8080/api';

  }

  getAllProjects(): Promise<Project[]> {
    return this.httpClient.get<Project[]>(this.baseUrl + "/ver/proyectos").toPromise(); 
  }

  getAllExp(): Promise<Exp[]> {
    return this.httpClient.get<Exp[]>(this.baseUrl + "/ver/experiencias").toPromise(); 
  }

  getAllSkills(): Promise<Skill[]> {
    return this.httpClient.get<Skill[]>(this.baseUrl + "/ver/skills").toPromise(); 
  }

  getAllEdu(): Promise<Education[]> {
    return this.httpClient.get<Education[]>(this.baseUrl + "/ver/educacion").toPromise(); 
  }

  getAllHeader(): Promise<Header[]> {
    return this.httpClient.get<Header[]>(this.baseUrl + "/ver/header").toPromise(); 
  }
}
