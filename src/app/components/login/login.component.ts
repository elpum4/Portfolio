import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { RouterModule, Router } from '@angular/router';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public  email:  string  =  "";
  public  password:  string  =  "";
  constructor(private  dialog:  MatDialog, private  router:  Router) { }
  login(){
      if(this.email  ===  "email@email.com"  &&  this.password  === "p@ssw0rd")
      {
          this.router.navigate(['success']);
      }
      else
      {
          this.dialog.open(MessageComponent,{ data: {
          message:  "Error!!!"
          }});
      }
  }
  ngOnInit(): void {
  }

}
