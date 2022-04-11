import { Component, OnInit, Inject } from '@angular/core';
import { Header } from '../../models/header';
import { FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { ImportallService } from '../../../services/importall.service';
import { MatDialog, MAT_DIALOG_DATA } from  '@angular/material/dialog';
import { MessageComponent } from '../../components/message/message.component' ;


@Component({
  selector: 'app-edit-header',
  templateUrl: './edit-header.component.html',
  styleUrls: ['./edit-header.component.scss']
})
export class EditHeaderComponent implements OnInit {
  arrHeader: Header;
  myForm: FormGroup;
  section: Array<string>;
  constructor(private services: ImportallService,
    private  dialog:  MatDialog, 
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buscarHeader(this.data);
    this.section = this.data.seccion;
    this.classView(this.section);

    this.myForm = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(40)]],
      hd_urlbanner:['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      hd_urlperfil:['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      hd_nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      hd_profesion: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(400)]],
      hd_sobremi: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(400)]],
    });
  }

  classView(clases:Array<string>) {
    if(clases.length>1){
      for(let clase of clases){
        var c = '.'+clase;
        var x = document.querySelector(c);
        x.className  = "view";
      }
    }else {
      var c = '.'+clases;
        var x = document.querySelector(c);
        x.className  = "view";
    }
}

  public myError = (controlName: string, errorName: string) =>{
    return this.myForm.controls[controlName].hasError(errorName);
    }

  async buscarHeader(id?:any){
    if (id) {
      this.services.getById(parseInt(id.dataKey), 'header').subscribe(
        data => {
          this.arrHeader = data;
          this.myForm.setValue(data);
        },
        err => {
          this.arrHeader = JSON.parse(err.error).message;
        }
      );
    }
  }
  
  svHeader(){
    const dialogRef = this.dialog.open(MessageComponent, {data: {
    message: "Desea Aplicar los Cambios?", mot: "confirm"}
    });
    dialogRef.afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        console.log(this.myForm.value);
        this.services.save('header',this.myForm.value).subscribe(
          data => {
            this.dialog.closeAll();
            window.location.reload();
            },
            err => {
              this.arrHeader = JSON.parse(err.error).message;
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
