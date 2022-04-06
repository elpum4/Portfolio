import { Injectable } from '@angular/core';
import { Education } from '../app/models/education';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  arrProyectos!: Education[];
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:8080/api';
  }

  saveEducation(education: Education): Observable<Education> {
    return this.httpClient.post<Education>(this.baseUrl + "/new/educacion",education);
  }

}