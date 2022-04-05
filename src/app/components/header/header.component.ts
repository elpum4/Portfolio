import { Component, OnInit } from '@angular/core';

import { Header } from '../../models/header'
import { ImportallService } from '../../services/importall.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  banner: string = '';
  arrHead: Header[];
  constructor(private headerservices: ImportallService) { }

  ngOnInit(): void {
    this.obtenerHeader();
  }
  	
   
  async obtenerHeader() {
    await this.headerservices.getAllHeader().subscribe(
      data => {
        this.arrHead = data;
      },
      err => {
        this.arrHead = JSON.parse(err.error).message;
      }
    );
  }

}
