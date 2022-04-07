import { Component, OnInit } from '@angular/core';

import { Exp } from '../../models/exp';
import { ImportallService } from '../../../services/importall.service';
import { EditExpComponent } from 'src/app/edition/edit-exp/edit-exp.component';

import {MatDialog} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MessageComponent } from '../../components/message/message.component' ;
import { ExpService } from '../../../services/exp.service';
@Component({
  selector: 'app-exp',
  templateUrl: './exp.component.html',
  styleUrls: ['./exp.component.scss']
})
export class ExpComponent implements OnInit {
  idExp="";
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  arrExperiencias: Exp[];
  constructor(private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog, 
    private expservices: ImportallService,
    private borrar: ExpService) { }

  ngOnInit(): void {
    this.obtenerExperiencia();
  }

  obtenerExperiencia() {
    this.expservices.getAllExp().subscribe(
      data => {
        this.arrExperiencias = data;
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
        this.borrar.deleteExp(this.idExp).subscribe(
          data => {
            this.dialog.closeAll();
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

}
