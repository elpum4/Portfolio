import { Injectable } from '@angular/core';
import { Skill } from '../app/models/skill';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  arrSkill!: Skill[];
  baseUrl: string;
  projectId: string
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:8080/api';
  }

  saveSkill(skill: Skill): Observable<Skill> {
    return this.httpClient.post<Skill>(this.baseUrl + "/new/skill",skill);
  }

  deleteSkill(id: string): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + "/delete/skill/"+id);
  }

}