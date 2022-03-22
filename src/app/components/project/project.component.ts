import { Component, OnInit } from '@angular/core';

import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  arrProyectos: Project[];
  constructor(private projectservices: ProjectService) { }

  ngOnInit(): void {
    this.obtenerProyectos();
  }

  async obtenerProyectos() {
    this.arrProyectos = await this.projectservices.getAllProjects();
    //console.log(this.arrProyectos);
  }
}
