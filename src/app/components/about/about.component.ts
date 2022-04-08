import { Component, OnInit } from '@angular/core';
import { Header } from '../../models/header'
import { ImportallService } from '../../../services/importall.service';
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  arrHead: Header[];
  
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
      },
      err => {
        this.arrHead = JSON.parse(err.error).message;
      }
    );
  }
  logOk() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }
}
