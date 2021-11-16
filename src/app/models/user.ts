export class User {
  constructor(private email:string, private expiresDate:Date,private idToken:string,private localId:string){

  }
  get expireDate():Date{
    return this.expiresDate;
  }
  get token (){
    return this.idToken;
  }
}
