import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

import { Skill } from '../../models/skill'
import { ImportallService } from '../../services/importall.service';
import { EdicionComponent } from '../edicion/edicion.component'

import { MatDialog } from '@angular/material/dialog';

import { MessageComponent } from '../../components/message/message.component' ;
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  loaded = false;
  idSkill="";
  isLoggedIn = false;
  arrSkills: Skill[];
  constructor( public dialog: MatDialog,
              private services: ImportallService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.get();
    this.logOk();
  }

  async get() {
    this.loaded = false;
    await this.services.getAll('skill').subscribe(
      data => {
        this.arrSkills = data['response'];
        this.loaded = true;

      },
      err => {
        const errorMessage = err.error?.message || (typeof err.error === 'string' ? JSON.parse(err.error).message : 'Error retrieving data');
        console.error('Error retrieving skill:', errorMessage);
        this.arrSkills = [];
      }
    );
  }

  editSkill($event: any){
    this.idSkill = $event;
    const dialogRef = this.dialog.open(EdicionComponent, {data: {
      id: this.idSkill, dataKey:'skill'}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteSkill($event: any){
    this.idSkill = $event;
    const dialogRef = this.dialog.open(MessageComponent, {data: {
    message: "Do you want to delete the skill?", mot: "confirm"}
    });
    dialogRef.afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.services.delete(this.idSkill, 'skill').subscribe(
          data => {
            this.dialog.closeAll();
            window.location.reload();
            },
            err => {
              const errorMessage = err.error?.message || (typeof err.error === 'string' ? JSON.parse(err.error).message : 'Error deleting');
              console.error('Error deleting skill:', errorMessage);
              }
            );
        } else {
          this.close();
        }
      });
  }
  close(){
     this.dialog.closeAll();
  }

  addSkill(){
    const dialogRef = this.dialog.open(EdicionComponent, {data: {
      dataKey:'skill'}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
  
  //mostrar edicion

  logOk() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }
}
