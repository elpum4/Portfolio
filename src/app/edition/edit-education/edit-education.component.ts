import { Component, OnInit, Inject} from '@angular/core';
import { Education } from '../../models/education';
import { TypeEd } from '../../models/typeed';
import { FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { ImportallService } from '../../../services/importall.service';
import { MatDialog, MAT_DIALOG_DATA } from  '@angular/material/dialog';
import { MessageComponent } from '../../components/message/message.component' ;

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.scss']
})
export class EditEducationComponent implements OnInit {
  arrEducation: Education;
  myForm: FormGroup;
  arrTEd: TypeEd[];
  disabled = false;

  constructor(private services: ImportallService,
            private  dialog:  MatDialog, 
            @Inject(MAT_DIALOG_DATA) private id: any,
            private fb: FormBuilder) { }

  ngOnInit(): void {
    this.obtener()
    if (this.id){
      this.buscarEducacion(this.id);
      console.log("estoy con id", this.id);
      this.myForm = this.fb.group({
        id: ['',],
        ed_titulo:['', [Validators.required, Validators.maxLength(100)]],
        ed_descripcion:['', [Validators.required, Validators.maxLength(400)]],
        ed_institucion: ['', [Validators.required, Validators.maxLength(100)]],
        ed_urllogo: ['', [Validators.required, Validators.maxLength(400)]],
        ed_comienzo: ['', [Validators.required]],
        ed_final: ['',],
        ed_actual:['',],
        ed_tipo:['', [Validators.required]],
        });
    }
    else {
        
        console.log("estoy sin id", this.id);
        this.myForm = this.fb.group({
          ed_titulo:['', [Validators.required, Validators.maxLength(100)]],
          ed_descripcion:['', [Validators.required, Validators.maxLength(400)]],
          ed_institucion: ['', [Validators.required, Validators.maxLength(100)]],
          ed_urllogo: ['', [Validators.required, Validators.maxLength(400)]],
          ed_comienzo: ['', [Validators.required]],
          ed_final: ['',],
          ed_actual:['',],
          ed_tipo:['', [Validators.required]],
          });

    }
    

  }
 
  public myError = (controlName: string, errorName: string) =>{
    return this.myForm.controls[controlName].hasError(errorName);
    }

  async buscarEducacion(id?:any){
      console.log(id);
      if (id) {
        console.log(id);
      if (id) {
        this.services.getById(parseInt(id.dataKey), 'educacion').subscribe(
          data => {
            this.arrEducation = data;
            this.myForm.patchValue(data);
          },
          err => {
            this.arrEducation = JSON.parse(err.error).message;
          }
        );
      }   
    }
  }
  async obtener() {
    this.services.getAll('tipoeducacion').subscribe(
      data => {
        this.arrTEd = data;
      },
      err => {
        this.arrTEd = JSON.parse(err.error).message;
      }
    );
  }

  svEducation(){
    const dialogRef = this.dialog.open(MessageComponent, {data: {
    message: "Desea Aplicar los Cambios?", mot: "confirm"}
    });
    dialogRef.afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        console.log(this.myForm.value);
        this.services.save('educacion',this.myForm.value).subscribe(
          data => {
            this.dialog.closeAll();
            window.location.reload();
            },
            err => {
              this.arrEducation = JSON.parse(err.error).message;
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
