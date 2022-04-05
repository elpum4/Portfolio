import { Component, OnInit } from '@angular/core';


import { Education } from '../../models/education';
import { ImportallService } from '../../services/importall.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  arrEducacion: Education[];
  constructor(private edservices: ImportallService) { }


  ngOnInit(): void {
    this.obtenerEducacion();
  }

  async obtenerEducacion() {
    await this.edservices.getAllEdu().subscribe(
      data => {
        this.arrEducacion = data;
      },
      err => {
        this.arrEducacion = JSON.parse(err.error).message;
      }
    );
  }

}
