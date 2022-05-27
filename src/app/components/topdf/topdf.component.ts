import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile';

import { ImportallService } from '../../services/importall.service';
@Component({
  selector: 'app-topdf',
  templateUrl: './topdf.component.html',
  styleUrls: ['./topdf.component.scss']
})
export class TopdfComponent implements OnInit {

  arrHead: Profile[] = [];
  constructor(private services: ImportallService,) { }
  
  ngOnInit(): void {
    this.obtener();
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
}
