import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service'
import { Router} from '@angular/router';
import { MatDialogRef, MatDialog } from  '@angular/material/dialog';
import { MessageComponent } from '../message/message.component' ;
import { TokenStorageService } from '../../../services/token-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit {
  myForm: FormGroup;
  hide = true;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  
  constructor(private authService: AuthService, 
    private tokenStorage: TokenStorageService, 
    private router: Router, 
    private dialogRef:  MatDialogRef<LoginComponent>, 
    private  dialog:  MatDialog) {
    
   }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])

    });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  public myError = (controlName: string, errorName: string) =>{
    return this.myForm.controls[controlName].hasError(errorName);
    }

  onSubmit(): void {
    this.authService.login(JSON.stringify(this.myForm.value)).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.dialog.closeAll();
        this.router.navigate(['']);
      },
      err => {
        this.errorMessage = err.error.message;
          this.dialog.open(MessageComponent,{ data: {
            message:  "ERROR!!"
            }});
        this.isLoginFailed = true;
      }
    );
  }
}
  

