import { Component, OnInit } from '@angular/core';

import { Exp } from '../../models/exp';
import { ImportallService } from '../../../services/importall.service';
import { EditExpComponent } from 'src/app/edition/edit-exp/edit-exp.component';

import {MatDialog} from '@angular/material/dialog';
import { MessageComponent } from '../../components/message/message.component';
import { TokenStorageService } from '../../../services/token-storage.service';
@Component({
  selector: 'app-exp',
  templateUrl: './exp.component.html',
  styleUrls: ['./exp.component.scss']
})
export class ExpComponent implements OnInit {
  idExp="";
  loaded = false;
  arrExperiencias: Exp[];
  isLoggedIn = false;
  constructor(public dialog: MatDialog, 
    private services: ImportallService,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.obtener();
    this.logOk();
  }

  obtener() {
    this.loaded = false;
    this.services.getAll('experiencia').subscribe(
      data => {
        this.arrExperiencias = data;
        this.loaded = true;
      },
      err => {
        this.arrExperiencias = JSON.parse(err.error).message;
      }
    );
  }

  editarExp($event: any){
    this.idExp = $event;
    console.log(this.idExp);
    const dialogRef = this.dialog.open(EditExpComponent, {data: {
      dataKey: this.idExp}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  eliminarExp($event: any){
    this.idExp = $event;
    const dialogRef = this.dialog.open(MessageComponent, {data: {
    message: "Desea Eliminar el proyecto?", mot: "confirm"}
    });
    dialogRef.afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.services.delete(this.idExp, 'experiencia').subscribe(
          data => {
            this.dialog.closeAll();
            window.location.reload();
            },
            err => {
              this.arrExperiencias = JSON.parse(err.error).message;
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

  agregarExp(){
    const dialogRef = this.dialog.open(EditExpComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  //mostrar edicion

  logOk() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

}
