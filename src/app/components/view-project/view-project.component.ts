import { Component, OnInit, Inject } from '@angular/core';

import { Project } from '../../models/project';
import { ImportallService } from '../../services/importall.service';
import { MatDialog, MAT_DIALOG_DATA } from  '@angular/material/dialog';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {
  arrProject: Project = {
                          id: "",
                          proy_titulo: "",
                          proy_descripcion: "",
                          proy_url: "",
                          proy_cliente: "",
                          proy_urlimg: "",
                          proy_categoria:""};

  constructor(private services: ImportallService, 
    private  dialog:  MatDialog, 
    @Inject(MAT_DIALOG_DATA) private id: any) { }

  ngOnInit(): void {
    if (this.id){
      this.findProject(this.id);
    }
  }
  
  async findProject(id?:any){
    console.log(id);
    if (id) {
      this.services.getById(parseInt(id.dataKey), 'proyecto').subscribe(
    
        data => {
          this.arrProject = data;
        },
        err => {
          const errorMessage = err.error?.message || (typeof err.error === 'string' ? JSON.parse(err.error).message : 'Error retrieving data');
          console.error('Error retrieving project:', errorMessage);
        }
      );
    }   
  }

  onNavigate(url){
      window.open(url, "_blank");

  }
}
