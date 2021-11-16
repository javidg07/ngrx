import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { getUserAuthDetails } from '../auth/state/auth.selectors';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor( private store:Store<any>,private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean | Observable<boolean| UrlTree> | Promise<boolean| UrlTree> | UrlTree   {
    return  this.store.select(getUserAuthDetails).pipe(map((auth):any=>{
      if(!auth){
        return this.router.createUrlTree(['auth']);
      }
      return true;
    }))

  }
}
