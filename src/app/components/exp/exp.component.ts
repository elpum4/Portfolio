import { Component, OnInit } from '@angular/core';

import { Exp } from '../../models/exp';
import { ImportallService } from '../../../services/importall.service';
import { EditExpComponent } from 'src/app/edition/edit-exp/edit-exp.component';

import {MatDialog} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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
    private expservices: ImportallService) { }

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

}
