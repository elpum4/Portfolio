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
    this.arrHead = await this.headerservices.getAllHeader();
    //this.banner = this.arrHead[0].hd_urlbanner;
    //console.log(this.banner);
  }

}
