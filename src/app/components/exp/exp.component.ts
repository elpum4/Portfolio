import { Component, OnInit } from '@angular/core';

import { Exp } from '../../models/exp';
import { ImportallService } from '../../services/importall.service';
@Component({
  selector: 'app-exp',
  templateUrl: './exp.component.html',
  styleUrls: ['./exp.component.scss']
})
export class ExpComponent implements OnInit {
  
  arrExperiencias: Exp[];
  constructor(private expservices: ImportallService) { }

  ngOnInit(): void {
    this.obtenerExperiencia();
  }

  obtenerExperiencia() {
    this.expservices.getAllExp().subscribe(
      data => {
        this.arrExperiencias = data;
      },
      err => {
        this.arrExperiencias = JSON.parse(err.error).message;
      }
    );
  }

}
