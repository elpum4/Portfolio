import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../models/project';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImportallService } from '../../services/importall.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  arrProject: Project;
  myForm: FormGroup;

  constructor(private projectservices: ImportallService, private save: ProjectService) { }

  ngOnInit(): void {
    this.buscarProyecto("2");
    this.myForm = new FormGroup({
      proy_titulo: new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(40)] ),
      proy_descripcion: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(400)]),
      proy_url: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(400)]),
      proy_cliente: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
      proy_urlimg: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(400)]),
      proy_categoria: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(400)]),
      
    });
    
    console.log(this.arrProject.proy_titulo);
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
      ); return this.arrProject;
    }

  svProject(){
    this.save.saveProject(JSON.stringify(this.myForm.value))
    }

  
}
