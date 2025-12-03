import { Component, OnInit } from '@angular/core';
import { Profile } from '../../models/profile'
import { ImportallService } from '../../services/importall.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { EdicionComponent } from '../edicion/edicion.component';
import { MatDialog } from '@angular/material/dialog';

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
    this.get();
    this.logOk();
  }

  
  get() {
    this.services.getAll('profile').subscribe(
      data => {
        this.arrHead = data['response'];
      },
      err => {
        const errorMessage = err.error?.message || (typeof err.error === 'string' ? JSON.parse(err.error).message : 'Error retrieving data');
        console.error('Error retrieving profile:', errorMessage);
        this.arrHead = [];
      }
    );
  }


  edit($event: any, section:Array<string>) {
    this.idHeader = $event;
    const dialogRef = this.dialog.open(EdicionComponent, {data: {
      id: this.idHeader, dataKey:'profile', section: section}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  close(){
     this.dialog.closeAll();
  }
  logOk() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }


}
