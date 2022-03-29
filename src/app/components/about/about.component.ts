import { Component, OnInit } from '@angular/core';


import { Header } from '../../models/header'
import { ImportallService } from '../../services/importall.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  arrHead: Header[];
  constructor(private headerservices: ImportallService) { }

  ngOnInit(): void {
    this.obtenerHeader();
  }

  
  async obtenerHeader() {
    this.arrHead = await this.headerservices.getAllHeader();
  }
}
