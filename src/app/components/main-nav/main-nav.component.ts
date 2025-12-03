import { Component, OnInit, HostListener } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { TokenStorageService } from '../../services/token-storage.service';

import {MatDialog} from '@angular/material/dialog';
import { Profile } from 'src/app/models/profile';
import { ImportallService } from 'src/app/services/importall.service';
import { EdicionComponent } from '../edicion/edicion.component';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  arr = [];
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  arrHead: Profile[] = [];
  idHeader="";

  constructor(private services: ImportallService,
              public dialog: MatDialog,
              private tokenStorageService: TokenStorageService
            ) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }

    
    this.get();
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(
      data => {
        this.dialog.closeAll();
        window.location.reload();
        },
        err => {
          const errorMessage = err.error?.message || (typeof err.error === 'string' ? JSON.parse(err.error).message : 'Error retrieving data');
          console.error('Error in dialog:', errorMessage);
          }
        );


  }

  navigateTo($event) {
    const element = document.querySelector($event.target.hash);
    console.log(element);
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onNavigate(url){
    switch (url) {
      case 1:
        window.open(this.arrHead[0].hd_urlgit, "_blank");
        break;
      
      case 2:
        window.open(this.arrHead[0].hd_urllkd, "_blank");
        break;

      case 3:
        window.open("https://www.argentina.gob.ar/produccion/transformacion-digital-y-economia-del-conocimiento/argentina-programa", "_blank");
        break;
    }
  }

  get() {
    this.services.getAll('profile').subscribe(
      data => {
        this.arrHead = data['response'];
        console.log(this.arrHead[0].hd_mail);
        window.sessionStorage.setItem('emailStorage', this.arrHead[0].hd_mail);
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

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }


}