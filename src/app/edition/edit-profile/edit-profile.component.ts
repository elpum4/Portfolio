import { Component, OnInit, Inject } from '@angular/core';
import { Profile } from '../../models/profile';
import { FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { ImportallService } from '../../../services/importall.service';
import { MatDialog, MAT_DIALOG_DATA } from  '@angular/material/dialog';
import { MessageComponent } from '../../components/message/message.component' ;


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  arrHeader: Profile;
  myForm: FormGroup;
  section: Array<string>;
  constructor(private services: ImportallService,
    private  dialog:  MatDialog, 
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buscarHeader(this.data);
    this.section = this.data.seccion;

    this.myForm = this.fb.group({
      id: ['',],
      hd_urlbanner:['', [Validators.required, Validators.maxLength(400)]],
      hd_urlperfil:['', [Validators.required, Validators.maxLength(400)]],
      hd_nombre: ['', [Validators.required,  Validators.maxLength(100)]],
      hd_profesion: ['', [Validators.required,  Validators.maxLength(100)]],
      hd_sobremi: ['', [Validators.required,  Validators.maxLength(2500)]],
    });
  }

  showPage(clases:Array<string>) {
    if(clases.length>1){
      for(let clase of clases){
        document.getElementById(clase).style.display = "flex";
      }
    }else{
      document.getElementById(clases[0]).style.display = "flex";
    } 
    document.getElementById("loading").style.display = "none";
    document.getElementById("edicion").style.display = "block";
  }


  public myError = (controlName: string, errorName: string) =>{
    return this.myForm.controls[controlName].hasError(errorName);
    }

  async buscarHeader(id?:any){
    if (id) {
      document.getElementById("edicion").style.display = "none";
      this.services.getById(parseInt(id.dataKey), 'profile').subscribe(
        data => {
          this.arrHeader = data;
          this.myForm.patchValue(data);
          this.showPage(this.section);
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
        this.services.save('profile',this.myForm.value).subscribe(
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
