import { Component, OnInit, Inject} from '@angular/core';
import { Project } from '../../models/project';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImportallService } from '../../../services/importall.service';
import { MessageComponent } from '../../components/message/message.component' ;
import { MatDialog, MAT_DIALOG_DATA } from  '@angular/material/dialog';
@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  arrProject: Project;
  myForm: FormGroup;

  constructor(private services: ImportallService, 
              private  dialog:  MatDialog, 
              @Inject(MAT_DIALOG_DATA) private id: any) { }

  ngOnInit(): void {
    if (this.id){
      this.buscarProyecto(this.id);
    }
    this.myForm = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(40)] ),
      proy_titulo: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(40)] ),
      proy_descripcion: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(400)]),
      proy_url: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(400)]),
      proy_cliente: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      proy_urlimg: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(400)]),
      proy_categoria: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(400)]),
      
    });
  }

  public myError = (controlName: string, errorName: string) =>{
    return this.myForm.controls[controlName].hasError(errorName);
    }

  async buscarProyecto(id?:any){
      console.log(id);
      if (id) {
        this.services.getById(parseInt(id.dataKey), 'proyecto').subscribe(
          data => {
            this.arrProject = data;
            this.myForm.setValue(data);
          },
          err => {
            this.arrProject = JSON.parse(err.error).message;
          }
        );
      }   
    }

  svProject(){
    const dialogRef = this.dialog.open(MessageComponent, {data: {
      message: "Desea Aplicar los Cambios?", mot: "confirm"}
    });
    dialogRef.afterClosed()
    .subscribe((confirmado: Boolean) => {
      const envio = this.myForm.value;
      if (confirmado) {
        this.services.save('proyecto' ,envio).subscribe(
          data => {
            this.dialog.closeAll();
            window.location.reload();
            },
            err => {
              this.arrProject = JSON.parse(err.error).message;
              }
            );
        } else {
          this.cerrar();
          }
      });
  }
  cerrar(){
     this.dialog.closeAll();
  }
  
}
