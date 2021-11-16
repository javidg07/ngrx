import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { autoLogout } from "../auth/state/auth.actions";
import { AuthResponse } from "../models/auth-Response";
import { User } from "../models/user";

@Injectable({
  providedIn:'root'
})
export class AuthService {
  timeoutInterval:any
    constructor(private http:HttpClient,private store:Store<any>) {}

    loginUser(email:string, password:string):Observable<AuthResponse> {
      return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,{email,password,returnSecureToken:true})

    }
     signupUser(email:string, password:string):Observable<AuthResponse> {
      return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`,{email,password,returnSecureToken:true})

    }
    modifyUser(data:AuthResponse):User {
      const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
      const {email,localId,idToken} = data;
        const user = new User(email,expirationDate,idToken,localId);
         this.storeUserLocal(user);
        return user
    }
    getErrorMessage(message: string) {
      switch (message) {
        case 'EMAIL_NOT_FOUND':
          return 'Email Not Found';
        case 'INVALID_PASSWORD':
          return 'Invalid Password';
          case 'EMAIL_EXISTS':
            return 'Email already exist';
            case 'Permission denied':
            return 'Permission denied';
        default:
          return 'Unknown error occurred. Please try again';
      }
    }
    storeUserLocal(user:User) {
      const data = JSON.stringify(user);
      localStorage.setItem('userAuthInfo', data);
      this.runTimeInterval(user);
    }
    getUserFromLocalStorage() {
      const userDataString = localStorage.getItem('userAuthInfo');
      if(userDataString){
        const userData = JSON.parse(userDataString);
        const {email,localId,idToken} = userData;
        const expirationDate = new Date(userData.expiresDate);
        const user = new User(email,expirationDate,idToken,localId);
        this.runTimeInterval(user);
        return user;
      }
        return null
    }
    runTimeInterval(user:User){
      const todayDate = new Date().getTime();
      // const expirationDate = user.expireDate.getTime()-3500000;
      const expirationDate = user.expireDate.getTime();

      const timeInterval = expirationDate - todayDate;
      console.log(timeInterval);

      this.timeoutInterval= setTimeout(() => {
        console.log('expired');

         this.store.dispatch(autoLogout())
     }, timeInterval);
    }
    logoutUser() {
      if(this.timeoutInterval ){
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
      }
      localStorage.removeItem('userAuthInfo');
    }
  }
