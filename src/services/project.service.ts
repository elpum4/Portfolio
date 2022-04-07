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

  saveProject(project: Project): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + "/new/proyecto",project);
  }

  deleteProject(id: string): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + "/delete/proyecto/"+id);
  }

}