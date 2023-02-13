import { Component, OnInit, Inject} from '@angular/core';
import { TypeEd } from '../../models/typeed';
import { TypeExp } from '../../models/typeexp';
import { TypeProject} from '../../models/typeproject';
import { FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { ImportallService } from '../../services/importall.service';
import { MatDialog, MAT_DIALOG_DATA } from  '@angular/material/dialog';
import { MessageComponent } from '../../components/message/message.component' ;


@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.scss']
})
export class EdicionComponent implements OnInit {
  
  arrAll: Array<any>;
  myForm: FormGroup;
  arrTEd: TypeEd[];
  arrTExp: TypeExp[];
  arrTProject: TypeProject[];
  disabled = false;
  entrada:string;
  section: Array<string>;

  constructor(private services: ImportallService,
    private  dialog:  MatDialog, 
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.entrada=this.data.dataKey;
    console.log(this.entrada);
    if (this.data.dataKey!='skill') {
      if(this.data.dataKey!='profile'){
        this.obtener(this.data.dataKey);
      }
    }
    switch(this.data.dataKey) { 
      case 'educacion': {
        if (this.data.id){
          this.buscarAll(this.data.dataKey, this.data.id);
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

        }else {
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
         break; 
      }
      case 'experiencia': {
        if (this.data.id){
          this.buscarAll(this.data.dataKey, this.data.id);
          this.myForm = this.fb.group({
            id: ['',],
            exp_titulo:['', [Validators.required, Validators.maxLength(100)]],
            exp_sitio: ['', [Validators.required, Validators.maxLength(100)]],
            exp_descripcion:['', [Validators.required, Validators.maxLength(400)]],
            exp_urllogo: ['', [Validators.required, Validators.maxLength(400)]],
            exp_comienzo: ['', [Validators.required]],
            exp_final: ['',],
            exp_actual:['',],
            exp_tipo:['', [Validators.required]],
            });


        }else {
          this.myForm = this.fb.group({
            exp_titulo:['', [Validators.required, Validators.maxLength(100)]],
            exp_sitio: ['', [Validators.required, Validators.maxLength(100)]],
            exp_descripcion:['', [Validators.required, Validators.maxLength(400)]],
            exp_urllogo: ['', [Validators.required, Validators.maxLength(400)]],
            exp_comienzo: ['', [Validators.required]],
            exp_final: ['',],
            exp_actual:['',],
            exp_tipo:['', [Validators.required]],
            });

          }
         break; 
      }
      case 'proyecto': {
        if (this.data.id){
          this.buscarAll(this.data.dataKey, this.data.id);
          this.myForm = this.fb.group({
            id: ['',],
            proy_titulo: ['', [Validators.required, Validators.maxLength(40)]],
            proy_descripcion: ['', [Validators.required,  Validators.maxLength(400)]],
            proy_url: ['', [Validators.required,  Validators.maxLength(400)]],
            proy_cliente: ['', [Validators.required,  Validators.maxLength(100)]],
            proy_urlimg: ['', [Validators.required,  Validators.maxLength(400)]],
            proy_categoria:['', [Validators.required]],
            
          });


        }else {
          this.myForm = this.fb.group({
            proy_titulo: ['', [Validators.required, Validators.maxLength(40)]],
            proy_descripcion: ['', [Validators.required,  Validators.maxLength(400)]],
            proy_url: ['', [Validators.required,  Validators.maxLength(400)]],
            proy_cliente: ['', [Validators.required,  Validators.maxLength(100)]],
            proy_urlimg: ['', [Validators.required,  Validators.maxLength(400)]],
            proy_categoria:['', [Validators.required]],
            });

          }
         break; 
      }
      case 'skill': {
        if (this.data.id){
          this.buscarAll(this.data.dataKey, this.data.id);
          this.myForm = this.fb.group({
            id: ['',],
            sk_titulo: ['', [Validators.required,Validators.maxLength(40)]],
            sk_habilidad:['', [Validators.required, Validators.pattern('^[1-9][0-9]?$|^100$')]],
          });


        }else {
          this.myForm = this.fb.group({
            sk_titulo: ['', [Validators.required,Validators.maxLength(40)]],
            sk_habilidad:['', [Validators.required, Validators.pattern('^[1-9][0-9]?$|^100$')]],
          });

          }
         break; 
      }
      
      case 'profile': {
        this.buscarAll(this.data.dataKey, this.data.id);
        this.myForm = this.fb.group({
          id: ['',],
          hd_urlbanner:['', [Validators.required, Validators.maxLength(400)]],
          hd_urlperfil:['', [Validators.required, Validators.maxLength(400)]],
          hd_nombre: ['', [Validators.required,  Validators.maxLength(100)]],
          hd_profesion: ['', [Validators.required,  Validators.maxLength(100)]],
          hd_sobremi: ['', [Validators.required,  Validators.maxLength(2500)]],
          hd_mail:['', [Validators.required, Validators.maxLength(100)]],
          hd_urllkd:['', [Validators.required, Validators.maxLength(400)]],
          hd_urlgit:['', [Validators.required, Validators.maxLength(400)]],
        });
        
        this.section = this.data.seccion;

         break; 
      }
      
    } 
  }
 
  public myError = (controlName: string, errorName: string) =>{
    return this.myForm.controls[controlName].hasError(errorName);
    }

  async buscarAll(type: string, id?:any ){
    if (id) {
      this.services.getById(parseInt(id), type).subscribe(
        data => {
          this.arrAll = data['response'];
          this.myForm.patchValue(data['response']);
        },
        err => {
          this.arrAll = JSON.parse(err.error).message;
        }
      );
    }
  }
  async obtener(type: string) {
    this.services.getAll('tipo'+type).subscribe(
      data => {
        switch(type) { 
          case 'educacion': {this.arrTEd = data['response'];} break;
          case 'experiencia': {this.arrTExp = data['response'];} break;
          case 'proyecto': {this.arrTProject = data['response'];} break;
        }
      },
      err => {switch(type) { 
        case 'educacion': { this.arrTEd = JSON.parse(err.error).message;}break;
        case 'experiencia': { this.arrTExp = JSON.parse(err.error).message;}break;
        case 'proyecto': { this.arrTProject = JSON.parse(err.error).message;}break;
      }
       
      }
    );
  }

  saveAll(type: string) {
    const dialogRef = this.dialog.open(MessageComponent, {data: {
    message: "Desea Aplicar los Cambios?", mot: "confirm"}
    });
    dialogRef.afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        console.log(this.myForm.value);
        this.services.save(type, this.myForm.value).subscribe(
          data => {
            this.dialog.closeAll();
            window.location.reload();
            },
            err => {
              this.arrAll = JSON.parse(err.error).message;
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
