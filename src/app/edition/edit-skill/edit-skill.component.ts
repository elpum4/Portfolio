import { Component, OnInit, Inject } from '@angular/core';
import { Skill } from '../../models/skill';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImportallService } from '../../../services/importall.service';
import { SkillService } from '../../../services/skill.service';
import { MessageComponent } from '../../components/message/message.component' ;
import { MatDialog, MAT_DIALOG_DATA } from  '@angular/material/dialog';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.scss']
})
export class EditSkillComponent implements OnInit {
  
  arrSkill: Skill;
  myForm: FormGroup;
  constructor(private skillservices: ImportallService, 
    private save: SkillService, private  dialog:  MatDialog, 
    @Inject(MAT_DIALOG_DATA) private id: any) { }

    ngOnInit(): void {
      this.buscarProyecto(this.id);
      this.myForm = new FormGroup({
        id: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(40)] ),
        sk_titulo: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(40)] ),
        sk_habilidad: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(3)]),
      });
    }
  
    public myError = (controlName: string, errorName: string) =>{
      return this.myForm.controls[controlName].hasError(errorName);
      }
  
    async buscarProyecto(id?:any){
        console.log(id);
        if (id) {
          this.skillservices.getSkillById(parseInt(id.dataKey)).subscribe(
            data => {
              this.arrSkill = data;
              this.myForm.setValue(data);
            },
            err => {
              this.arrSkill = JSON.parse(err.error).message;
            }
          );
        }   
      }
  
    svSkill(){
      const dialogRef = this.dialog.open(MessageComponent, {data: {
        message: "Desea Aplicar los Cambios?", mot: "confirm"}
      });
      dialogRef.afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.save.saveSkill(this.myForm.value).subscribe(
            data => {
              this.dialog.closeAll();
              },
              err => {
                this.arrSkill = JSON.parse(err.error).message;
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
