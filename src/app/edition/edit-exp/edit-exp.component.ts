import { Component, OnInit, Inject } from '@angular/core';
import { Exp } from '../../models/exp';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ImportallService } from '../../../services/importall.service';
import { MatDialog, MAT_DIALOG_DATA } from  '@angular/material/dialog';
import { MessageComponent } from '../../components/message/message.component' ;


@Component({
  selector: 'app-edit-exp',
  templateUrl: './edit-exp.component.html',
  styleUrls: ['./edit-exp.component.scss']
})
export class EditExpComponent implements OnInit {
  arrExp: Exp;
  myForm: FormGroup;

  constructor(private services: ImportallService,
    private  dialog:  MatDialog, 
    @Inject(MAT_DIALOG_DATA) private id: any,
    private fb: FormBuilder) { }

ngOnInit(): void {
  this.buscarExp(this.id);
  this.myForm = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(40)]],
    exp_titulo:['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    exp_sitio: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    exp_descripcion:['', [Validators.required, Validators.minLength(2), Validators.maxLength(400)]],
    ex_urllogo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(400)]],
    exp_comienzo: ['', [Validators.required]],
    exp_final: ['',],
    exp_actual:['',],
    exp_tipo:['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
    });

  }

  public myError = (controlName: string, errorName: string) =>{
    return this.myForm.controls[controlName].hasError(errorName);
    }

  async buscarExp(id?:any){
    console.log(id);
    if (id) {
      console.log(id);
    if (id) {
      this.services.getById(parseInt(id.dataKey), 'experiencia').subscribe(
        data => {
          this.arrExp = data;
          this.myForm.setValue(data);
        },
        err => {
          this.arrExp = JSON.parse(err.error).message;
        }
      );
    }   
  }
}
  svExp(){
    const dialogRef = this.dialog.open(MessageComponent, {data: {
      message: "Desea Aplicar los Cambios?", mot: "confirm"}
    });
    dialogRef.afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.services.save('experiencia',this.myForm.value).subscribe(
          data => {
            this.dialog.closeAll();
            window.location.reload();
            },
            err => {
              this.arrExp = JSON.parse(err.error).message;
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