import { Component, OnInit } from '@angular/core';


import { Education } from '../../models/education';
import { ImportallService } from '../../../services/importall.service';
import { EditEducationComponent } from 'src/app/edition/edit-education/edit-education.component';

import {MatDialog} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  idEducacion="";
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  arrEducacion: Education[];
  constructor(private breakpointObserver: BreakpointObserver,
              public dialog: MatDialog, 
              private edservices: ImportallService) { }


  ngOnInit(): void {
    this.obtenerEducacion();
  }

  obtenerEducacion() {
    this.edservices.getAllEdu().subscribe(
      data => {
        this.arrEducacion = data;
      },
      err => {
        this.arrEducacion = JSON.parse(err.error).message;
      }
    );
  }

  editarEducacion($event: any){
    this.idEducacion = $event;
    console.log(this.idEducacion);
    const dialogRef = this.dialog.open(EditEducationComponent, {data: {
      dataKey: this.idEducacion}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
