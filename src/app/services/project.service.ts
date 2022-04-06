import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  arrProyectos!: Project[];
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:8080/api';
  }

  saveProject(project: Project): Observable<Project> {
    return this.httpClient.post<Project>(this.baseUrl + "/new/proyecto",project);
  }

}