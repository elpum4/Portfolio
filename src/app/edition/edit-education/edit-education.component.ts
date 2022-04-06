import { Component, OnInit, Inject} from '@angular/core';
import { Education } from '../../models/education';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImportallService } from '../../../services/importall.service';
import { ProjectService } from '../../../services/project.service';
import { MatDialog, MAT_DIALOG_DATA } from  '@angular/material/dialog';
@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.scss']
})
export class EditEducationComponent implements OnInit {
  arrEducation: Education;
  myForm: FormGroup;

  constructor(private educationservices: ImportallService, 
            private save: ProjectService, private  dialog:  MatDialog, 
            @Inject(MAT_DIALOG_DATA) private id: any) { }

  ngOnInit(): void {
    this.buscarEducacion(this.id);
    this.myForm = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(40)] ),
      ed_titulo: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(40)] ),
      ed_descripcion: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(400)]),
      ed_urllogo: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(400)]),
      ed_comienzo: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      ed_final: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(400)]),
      ed_actual: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(400)]),
      ed_tipo: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(400)]),
      
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
            this.myForm.setValue(data);
          },
          err => {
            this.arrEducation = JSON.parse(err.error).message;
          }
        );
      }   
    }

  /*svEducation(){
    this.save.saveEducation(this.myForm.value).subscribe(
      data => {
        this.dialog.closeAll();
      },
      err => {
      this.arrEducation = JSON.parse(err.error).message;
      }
    );
  }*/
  cerrar(){
     this.dialog.closeAll();
  }

}
