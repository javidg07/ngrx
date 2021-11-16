import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { appState } from 'src/app/store/app.state';
import { loginStart } from '../state/auth.actions';

//  export interface IUser{
//   email: string;
//   password: string;
// }
// interface IUserFormGroup extends FormGroup {
//   value: IUser;
//   controls: {
//     email: AbstractControl;
//     password: AbstractControl;
//   };
// }
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  res$!:Observable<any>
  constructor(private fb:FormBuilder,private store:Store<any>) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]]
  })
}
validateEmail():string | null{
  const data = this.loginForm?.controls['email'];
  if(data.invalid && data.touched){
    if(data?.errors?.required){
      return 'email is required'
    }
    if(data?.errors?.email){
      return 'email format is invalid '
    }
  }
  return null
}
validatePassword():string | null{
  const data = this.loginForm?.controls['password'];
  if(data.invalid && data.touched){
    if(data?.errors?.required){
      return 'password is required'
    }
    if(data?.errors?.minlength){
      return 'Password min length is 6'
    }
  }
  return null
}
onSubmit():void{
  if(!this.loginForm.valid){
    return;
  }
 const email = this.loginForm.value.email;
 const password = this.loginForm.value.password;
  this.store.dispatch(loginStart({email,password}))
  console.log(this.loginForm.value)
}


}
