import { Component, OnInit } from '@angular/core';
import { Header } from '../../models/header'
import { ImportallService } from '../../../services/importall.service';
import { TokenStorageService } from '../../../services/token-storage.service';

import { EditHeaderComponent } from 'src/app/edition/edit-header/edit-header.component';

import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  arrHead: Header[];
  isLoggedIn = false;
  idHeader="";
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private services: ImportallService,
    private tokenStorageService: TokenStorageService,
    private breakpointObserver: BreakpointObserver,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtener();
    this.logOk();
  }

  
  obtener() {
    this.services.getAll('header').subscribe(
      data => {
        this.arrHead = data;
      },
      err => {
        this.arrHead = JSON.parse(err.error).message;
      }
    );
  }


  editar($event: any, section:Array<string>) {
    this.idHeader = $event;
    const dialogRef = this.dialog.open(EditHeaderComponent, {data: {
      dataKey: this.idHeader, seccion: section}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  cerrar(){
     this.dialog.closeAll();
  }
  logOk() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }
}
