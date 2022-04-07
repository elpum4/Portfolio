import { Component, OnInit, Inject} from '@angular/core';
import { Education } from '../../models/education';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { ImportallService } from '../../../services/importall.service';
import { EducationService } from '../../../services/education.service';
import { MatDialog, MAT_DIALOG_DATA } from  '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MessageComponent } from '../../components/message/message.component' ;

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.scss']
})
export class EditEducationComponent implements OnInit {
  arrEducation: Education;
  myForm: FormGroup;

  constructor(private educationservices: ImportallService, 
            private save: EducationService, private  dialog:  MatDialog, 
            @Inject(MAT_DIALOG_DATA) private id: any,
            private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buscarEducacion(this.id);
    this.myForm = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(40)]],
      ed_titulo:['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      ed_descripcion:['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      ed_institucion: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      ed_urllogo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(400)]],
      ed_comienzo: ['', [Validators.required]],
      ed_final: ['',],
      ed_actual:['',],
      ed_tipo:['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      });

  }
 
  public myError = (controlName: string, errorName: string) =>{
    return this.myForm.controls[controlName].hasError(errorName);
    }

  async buscarEducacion(id?:any){
      console.log(id);
      if (id) {
        this.educationservices.getEducationById(parseInt(id.dataKey)).subscribe(
          data => {
            this.arrEducation = data;
            console.log(this.arrEducation);
            this.myForm.get('id').setValue(this.arrEducation.id);
            this.myForm.get('ed_titulo').setValue(this.arrEducation.ed_titulo);
            this.myForm.get('ed_descripcion').setValue(this.arrEducation.ed_descripcion);
            this.myForm.get('ed_institucion').setValue(this.arrEducation.ed_institucion);
            this.myForm.get('ed_urllogo').setValue(this.arrEducation.ed_urllogo);
            this.myForm.get('ed_comienzo').setValue(this.arrEducation.ed_comienzo);
            this.myForm.get('ed_final').setValue(this.arrEducation.ed_final);
            this.myForm.get('ed_tipo').setValue(this.arrEducation.ed_tipo);
          },
          err => {
            this.arrEducation = JSON.parse(err.error).message;
          }
        );
      }   
    }

  svEducation(){
    const dialogRef = this.dialog.open(MessageComponent, {data: {
    message: "Desea Aplicar los Cambios?", mot: "confirm"}
    });
    dialogRef.afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.save.saveEducation(this.myForm.value).subscribe(
          data => {
            this.dialog.closeAll();
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
