import { Component, OnInit, HostListener } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { TokenStorageService } from '../../../services/token-storage.service';

import {MatDialog} from '@angular/material/dialog';


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

  constructor(public dialog: MatDialog,
              private tokenStorageService: TokenStorageService
            ) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(
      data => {
        this.dialog.closeAll();
        window.location.reload();
        },
        err => {
          this.arr = JSON.parse(err.error).message;
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
        window.open("https://github.com/elpum4", "_blank");
        break;
      
      case 2:
        window.open("https://www.linkedin.com/in/fcerionie", "_blank");
        break;

      case 3:
        window.open("https://www.argentina.gob.ar/produccion/transformacion-digital-y-economia-del-conocimiento/argentina-programa", "_blank");
        break;
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }


}