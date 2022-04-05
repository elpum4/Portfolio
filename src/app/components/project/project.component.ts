import { Component, OnInit } from '@angular/core';

import { Project } from '../../models/project';
import { ImportallService } from '../../services/importall.service';

import iSlider from '../../../../node_modules/islider.js/build/iSlider'
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  arrProyectos: Project[];
  constructor(private projectservices: ImportallService) { }

  ngOnInit(): void {
    this.obtenerProyectos();
  }


  async obtenerProyectos() {
    this.arrProyectos = await this.projectservices.getAllProjects();
  }
}
