import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../models/project';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImportallService } from '../../services/importall.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  arrProject: Project;
  myForm: FormGroup;

  constructor(private projectservices: ImportallService) { }

  ngOnInit(): void {
    this.buscarProyecto("1");
    this.myForm = new FormGroup({
      proy_titulo: new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(40)] ),
      proy_descripcion: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(400)]),
      proy_url: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(400)]),
      proy_cliente: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
      proy_urlimg: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(400)]),
      proy_categoria: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(400)]),

    });
  }

  public myError = (controlName: string, errorName: string) =>{
    return this.myForm.controls[controlName].hasError(errorName);
    }

  onEnviar(event:Event){
    console.log(this.arrProject);
    }

  async buscarProyecto(id:string){
      this.projectservices.getProjectById(parseInt(id)).subscribe(
        data => {
          this.arrProject = data;
        },
        err => {
          this.arrProject = JSON.parse(err.error).message;
        }
      );
    }

  saveProject(project: Project){
      this.arrProject = project;
    }

  
}
