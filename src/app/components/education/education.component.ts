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
    this.get();
    this.logOk();
  }

  get() {
    this.services.getAll('educacion').subscribe(
      data => {
        this.arrEducacion = data['response'];
      },
      err => {
        const errorMessage = err.error?.message || (typeof err.error === 'string' ? JSON.parse(err.error).message : 'Error retrieving data');
        console.error('Error retrieving educacion:', errorMessage);
        this.arrEducacion = [];
      }
    );
  }

  editEducation($event: any){
    this.idEducacion = $event;
    console.log(this.idEducacion);
    const dialogRef = this.dialog.open(EdicionComponent, {data: {
      id: this.idEducacion, dataKey:'educacion'}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteEducation($event: any){
    this.idEducacion = $event;
    const dialogRef = this.dialog.open(MessageComponent, {data: {
    message: "Do you want to delete education?", mot: "confirm"}
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
              const errorMessage = err.error?.message || (typeof err.error === 'string' ? JSON.parse(err.error).message : 'Error deleting');
              console.error('Error deleting education:', errorMessage);
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

  addEducation(){
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
