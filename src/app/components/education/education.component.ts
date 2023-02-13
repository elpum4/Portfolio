import { Component, OnInit } from '@angular/core';


import { Education } from '../../models/education';
import { ImportallService } from '../../services/importall.service';
import { EdicionComponent } from '../../components/edicion/edicion.component';

import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../../components/message/message.component' ;
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  isLoggedIn = false;
  idEducacion="";
  arrEducacion: Education[];
  constructor(public dialog: MatDialog, 
              private services: ImportallService,
              private tokenStorageService: TokenStorageService) { }


  ngOnInit(): void {
    this.obtener();
    this.logOk();
  }

  obtener() {
    this.services.getAll('educacion').subscribe(
      data => {
        this.arrEducacion = data['response'];
      },
      err => {
        this.arrEducacion = JSON.parse(err.error).message;
      }
    );
  }

  editarEducacion($event: any){
    this.idEducacion = $event;
    console.log(this.idEducacion);
    const dialogRef = this.dialog.open(EdicionComponent, {data: {
      id: this.idEducacion, dataKey:'educacion'}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  eliminarProyecto($event: any){
    this.idEducacion = $event;
    const dialogRef = this.dialog.open(MessageComponent, {data: {
    message: "Desea Eliminar Educación?", mot: "confirm"}
    });
    dialogRef.afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.services.delete(this.idEducacion, 'educacion').subscribe(
          data => {
            this.dialog.closeAll();
            window.location.reload();
            },
            err => {
              this.arrEducacion = JSON.parse(err.error).message;
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

  agregarEducacion(){
    const dialogRef = this.dialog.open(EdicionComponent, {data: {
      dataKey:'educacion'}
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
