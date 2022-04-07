import { Component, OnInit, Inject, Injectable } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  constructor(private dialogRef:  MatDialogRef<MessageComponent>, 
    @Inject(MAT_DIALOG_DATA) public  data:  any) {
  }
  public  closeMe() {
      this.dialogRef.close(false);
      
  }

  public aceptar(){
    
    this.dialogRef.close(true);
  }
  ngOnInit(): void {
  }

}
