import { Component, OnInit } from '@angular/core';

import { Profile } from '../../models/profile'
import { ImportallService } from '../../../services/importall.service';
import { TokenStorageService } from '../../../services/token-storage.service';

import { EditProfileComponent } from 'src/app/edition/edit-profile/edit-profile.component';
import { MatDialog } from '@angular/material/dialog';
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
  constructor(private services: ImportallService,
              private tokenStorageService: TokenStorageService,
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
