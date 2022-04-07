import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

import { Skill } from '../../models/skill'
import { ImportallService } from '../../../services/importall.service';
import { EditSkillComponent } from 'src/app/edition/edit-skill/edit-skill.component'

import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { MessageComponent } from '../../components/message/message.component' ;
import { SkillService } from '../../../services/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';

  idSkill="";
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  arrSkills: Skill[];
  constructor(private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private skillservices: ImportallService,
    private borrar: SkillService) { }

  ngOnInit(): void {
    this.obtenerSkills();
  }

  async obtenerSkills() {
    await this.skillservices.getAllSkills().subscribe(
      data => {
        this.arrSkills = data;
      },
      err => {
        this.arrSkills = JSON.parse(err.error).message;
      }
    );
  }
  editarSkill($event: any){
    this.idSkill = $event;
    const dialogRef = this.dialog.open(EditSkillComponent, {data: {
      dataKey: this.idSkill}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  eliminarSkill($event: any){
    this.idSkill = $event;
    const dialogRef = this.dialog.open(MessageComponent, {data: {
    message: "Desea Eliminar el proyecto?", mot: "confirm"}
    });
    dialogRef.afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.borrar.deleteSkill(this.idSkill).subscribe(
          data => {
            this.dialog.closeAll();
            },
            err => {
              this.arrSkills = JSON.parse(err.error).message;
              }
            );
        } else {
          this.cerrar();
        }
      });
  }
  cerrar(){
     this.dialog.closeAll();
  }

  agregarSkill(){
    const dialogRef = this.dialog.open(EditSkillComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
}
