import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getAuthToken } from '../auth/state/auth.selectors';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store:Store<any>) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(getAuthToken).pipe(take(1),exhaustMap(token =>{
      if(!token){
        return next.handle(req);
      }
      const authReq = req.clone({
        params: req.params.append('auth', token)
      })
      return next.handle(authReq);
    }))

  }
}
