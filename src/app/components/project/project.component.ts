import { Component, OnInit } from '@angular/core';

import { Project } from '../../models/project';
import { ImportallService } from '../../../services/importall.service';
import { EditProjectComponent } from 'src/app/edition/edit-project/edit-project.component';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { MatDialog, MAT_DIALOG_DATA } from  '@angular/material/dialog';
import { MessageComponent } from '../../components/message/message.component' ;
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  idProyecto="";
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  arrProyectos: Project[];
  constructor(private breakpointObserver: BreakpointObserver,
              public dialog: MatDialog, 
              private projectservices: ImportallService,
              private borrar: ProjectService) { }

  ngOnInit(): void {
    this.obtenerProyectos();
  }

  async obtenerProyectos() {
    this.projectservices.getAllProjects().subscribe(
      data => {
        this.arrProyectos = data;
      },
      err => {
        this.arrProyectos = JSON.parse(err.error).message;
      }
    );
  }

  editarProyecto($event: any){
    this.idProyecto = $event;
    const dialogRef = this.dialog.open(EditProjectComponent, {data: {
      dataKey: this.idProyecto}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  eliminarProyecto($event: any){
    this.idProyecto = $event;
    const dialogRef = this.dialog.open(MessageComponent, {data: {
    message: "Desea Eliminar el proyecto?", mot: "confirm"}
    });
    dialogRef.afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.borrar.deleteProject(this.idProyecto).subscribe(
          data => {
            this.dialog.closeAll();
            },
            err => {
              this.arrProyectos = JSON.parse(err.error).message;
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

  agregarProyecto(){
    const dialogRef = this.dialog.open(EditProjectComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
}
