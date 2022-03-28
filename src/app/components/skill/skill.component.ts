import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

import { Skill } from '../../models/skill'
import { ImportallService } from '../../services/importall.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  
  arrSkills: Skill[];
  constructor(private skillservices: ImportallService) { }

  ngOnInit(): void {
    this.obtenerSkills();
  }

  async obtenerSkills() {
    this.arrSkills = await this.skillservices.getAllSkills();
  }

 
}
