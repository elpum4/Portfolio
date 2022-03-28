import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit {
  myForm: FormGroup;
  hide = true;
  constructor(private authService: AuthService, private router: Router) {
    
   }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])

    });
  }
  public myError = (controlName: string, errorName: string) =>{
    return this.myForm.controls[controlName].hasError(errorName);
    }

  onEnviar(event:Event){
    event.preventDefault;
    this.authService.IniciarSesion(this.myForm.value).subscribe(data=>{
      console.log("DATA: " + JSON.stringify(data));
      this.router.navigate(['']);
    })

  }

}