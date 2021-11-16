import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { AuthEffects } from "./state/auth.effects";
import { authReducer } from "./state/auth.reducers";
import { AUTH_STATE_NAME } from "./state/auth.selectors";
const route:Routes=[
 {
   path:'',children:[
    { path:'',redirectTo:'login'},
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent}
   ]
 }
]
// StoreModule.forFeature(AUTH_STATE_NAME,authReducer) is been  removed from imports becoz auth state info we needed in shared module header comp
//  but due to lzy load we dont get tat data (inital state) so we gonna add the effectmodule in root level ex(appReducer)
@NgModule({
  declarations:[LoginComponent,SignupComponent],
    imports:[CommonModule,FormsModule,ReactiveFormsModule,RouterModule.forChild(route),EffectsModule.forFeature([])]

})
export class AuthModule {
}
