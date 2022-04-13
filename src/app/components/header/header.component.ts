import { Component, OnInit } from '@angular/core';

import { Profile } from '../../models/profile'
import { ImportallService } from '../../../services/importall.service';
import { TokenStorageService } from '../../../services/token-storage.service';

import { EditProfileComponent } from 'src/app/edition/edit-profile/edit-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  arrHead: Profile[];
  isLoggedIn = false;
  idHeader="";
  header="";
  headerid="";
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
    this.services.getAll('profile').subscribe(
      data => {
        this.arrHead = data;
        this.header=this.arrHead[0].hd_urlbanner;
        this.headerid=this.arrHead[0].id;
        console.log(this.headerid);
      },
      err => {
        this.arrHead = JSON.parse(err.error).message;
      }
    );
  }

  editar($event: any, section:Array<string>) {
    this.idHeader = $event;
    console.log(this.idHeader);
    const dialogRef = this.dialog.open(EditProfileComponent, {data: {
      dataKey: this.idHeader, seccion: section}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  cerrar(){
     this.dialog.closeAll();
  }
  //mostrar edicion

  logOk() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

}
