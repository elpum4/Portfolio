import { Component, OnInit } from '@angular/core';

import { Project } from '../../models/project';
import { ImportallService } from '../../services/importall.service';
import { EditProjectComponent } from 'src/app/edition/edit-project/edit-project.component';

import {MatDialog} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
              private projectservices: ImportallService) { }

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
    console.log(this.idProyecto);
    const dialogRef = this.dialog.open(EditProjectComponent, {data: {
      dataKey: this.idProyecto, formKey:Project}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
