import { Component, OnInit } from '@angular/core';

import { Header } from '../../models/header'
import { ImportallService } from '../../../services/importall.service';
import { TokenStorageService } from '../../../services/token-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  banner: string = '';
  arrHead: Header[];
  header: string = '';
  isLoggedIn = false;
  constructor(private services: ImportallService,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.obtenerHeader();
    this.logOk();
  }
  	
   
  obtenerHeader() {
    this.services.getAll('header').subscribe(
      data => {
        this.arrHead = data;
        this.header=this.arrHead[0].hd_urlbanner;
      },
      err => {
        this.arrHead = JSON.parse(err.error).message;
      }
    );
  }

  //mostrar edicion

  logOk() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

}
