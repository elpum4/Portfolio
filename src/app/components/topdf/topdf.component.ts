import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { Project } from 'src/app/models/project';

import { ImportallService } from '../../services/importall.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-topdf',
  templateUrl: './topdf.component.html',
  styleUrls: ['./topdf.component.scss']
})
export class TopdfComponent implements OnInit {

  arrHead: Profile[] = [];
  arrProyectos: Project[];
  constructor(private services: ImportallService,
            private  dialog:  MatDialog,) { }
  
  ngOnInit(): void {
    this.obtener();
    this.obtener_proyecto();
  }
  async obtener_proyecto() {
    this.services.getAll('proyecto').subscribe(
      data => {
        this.arrProyectos = data;
      },
      err => {
        this.arrProyectos = JSON.parse(err.error).message;
      }
    );
  }
  obtener() {
    this.services.getAll('profile').subscribe(
      data => {
        this.arrHead = data;
      },
      err => {
        this.arrHead = JSON.parse(err.error).message;
      }
    );
  }

  public exportHtmlToPDF(){

  
    this.cerrar();
  }
  cerrar(){
    this.dialog.closeAll();
 }
}
