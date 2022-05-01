import { Component, OnInit } from '@angular/core';
import { Profile } from '../../models/profile'
import { ImportallService } from '../../../services/importall.service';
import { TokenStorageService } from '../../../services/token-storage.service';

import { EditProfileComponent } from 'src/app/edition/edit-profile/edit-profile.component';

import { MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from '../spinner/spinner.component'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  arrHead: Profile[] = [];
  isLoggedIn = false;
  idHeader="";
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
      },
      err => {
        this.arrHead = JSON.parse(err.error).message;
      }
    );
  }


  editar($event: any, section:Array<string>) {
    this.idHeader = $event;
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
  logOk() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }


}
