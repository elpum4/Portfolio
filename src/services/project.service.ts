import { Injectable } from '@angular/core';
import { Project } from '../app/models/project';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  arrProyectos!: Project[];
  baseUrl: string;
  projectId: string
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:8080/api';
  }

  saveProject(project: Project): Observable<Project>  {
    this.httpClient.post<Project>(this.baseUrl + "/new/proyecto", project ).subscribe(data => {
        this.projectId = data.id;
    });return this.httpClient.get<Project>(this.baseUrl + "/new/proyecto");
  }


  /*
  getAllProjects(): Promise<Project[]> {
    return this.httpClient.get<Project[]>(this.baseUrl + "/ver/proyecto").toPromise(); 
  }*/


}