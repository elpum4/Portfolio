import { Component, OnInit } from '@angular/core';

import { Project } from '../../models/project';
import { ImportallService } from '../../../services/importall.service';
import { EditProjectComponent } from 'src/app/edition/edit-project/edit-project.component';
import { ViewProjectComponent } from '../view-project/view-project.component';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { MatDialog, MAT_DIALOG_DATA } from  '@angular/material/dialog';
import { MessageComponent } from '../../components/message/message.component';
import { TokenStorageService } from '../../../services/token-storage.service';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  idProyecto="";
  isLoggedIn = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  arrProyectos: Project[];
  proyectos: Project[];
	responsiveOptions;

  constructor(private breakpointObserver: BreakpointObserver,
              public dialog: MatDialog, 
              private services: ImportallService,
              private tokenStorageService: TokenStorageService) {

                this.responsiveOptions = [
                  {
                    breakpoint: '2600px',
                    numVisible: 4,
                    numScroll: 2
                },
                  {
                      breakpoint: '1360px',
                      numVisible: 3,
                      numScroll: 3
                  },
                  {
                      breakpoint: '768px',
                      numVisible: 2,
                      numScroll: 2
                  },
                  {
                      breakpoint: '560px',
                      numVisible: 1,
                      numScroll: 1
                  }
              ];
               }
              

  ngOnInit() {
    this.obtener();
    this.logOk();
  }
  async obtener() {
    this.services.getAll('proyecto').subscribe(
      data => {
        this.arrProyectos = data;
        this.proyectos =Object.values(data);
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
        this.services.delete(this.idProyecto, 'proyecto').subscribe(
          data => {
            this.dialog.closeAll();
            window.location.reload();
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
  
  //mostrar edicion

  logOk() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  mostrarProyecto($event: any){
    this.idProyecto = $event;
    const dialogRef = this.dialog.open(ViewProjectComponent, {data: {
      dataKey: this.idProyecto}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
