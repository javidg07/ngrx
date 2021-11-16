import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { signupStart } from '../state/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent  implements OnInit {
  signupForm!:FormGroup;
  res$!:Observable<any>
  constructor(private fb:FormBuilder,private store:Store<any>) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]]
  })
}
validateEmail():string | null{
  const data = this.signupForm?.controls['email'];
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
  const data = this.signupForm?.controls['password'];
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
  if(!this.signupForm.valid){
    return;
  }
 const email = this.signupForm.value.email;
 const password = this.signupForm.value.password;
   this.store.dispatch(signupStart({email,password}))
  console.log(this.signupForm.value)
}


}
