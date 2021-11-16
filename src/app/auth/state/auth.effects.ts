import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  autoLogin,
  autoLogout,
  loginStart,
  loginSuccess,
  signupStart,
  signupSuccess,
} from './auth.actions';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { createEffects } from '@ngrx/effects/src/effects_module';

import { NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { errorHandle } from 'src/app/store/shared/shared.action';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/store/app.state';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  constructor(
    private action$: Actions,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private store: Store<any>,
    private router: Router
  ) {}

  login$ = createEffect((): any => {
    return this.action$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        this.store.dispatch(errorHandle({ message: '' }));
        this.spinner.show();
        return this.authService.loginUser(action.email, action.password).pipe(
          map((val) => {
            this.spinner.hide();
            const user = this.authService.modifyUser(val);
            // this.authService.storeUserLocal(user);
            return loginSuccess({ user, redirect: true });
          }),
          catchError((err) => {
            this.spinner.hide();
            console.log(err);

            const errorMessage = this.authService.getErrorMessage(
              err.error.error.message
            );
            return of(errorHandle({ message: errorMessage }));
          })
        );
      })
    );
  });
  signup$ = createEffect((): any => {
    return this.action$.pipe(
      ofType(signupStart),
      exhaustMap((action): any => {
        this.store.dispatch(errorHandle({ message: '' }));
        this.spinner.show();
        return this.authService.signupUser(action.email, action.password).pipe(
          map((val) => {
            const user = this.authService.modifyUser(val);
            // this.authService.storeUserLocal(user);
            this.spinner.hide();
            return signupSuccess({ user, redirect: true });
          }),
          catchError((err) => {
            this.spinner.hide();
            console.log(err);

            const errorMessage = this.authService.getErrorMessage(
              err.error.error.message
            );
            console.log(errorMessage);

            return of(errorHandle({ message: errorMessage }));
          })
        );
      })
    );
  });
  login_SignUpRedirect$ = createEffect(
    (): any => {
      return this.action$.pipe(
        ofType(...[loginSuccess, signupSuccess]),
        tap((val) => {
          if (val.redirect) {
            this.router.navigate(['/']);
          }
        })
      );
    },
    { dispatch: false }
  );
  autoLogin$ = createEffect((): any => {
    return this.action$.pipe(
      ofType(autoLogin),
      exhaustMap((action): any => {
        const user = this.authService.getUserFromLocalStorage();
        //earlier we do service call so it returns a obs but here we get just an obj so we have to convert into obs
        return user ? of(loginSuccess({ user, redirect: false })) : of();
      })
    );
  });
  autoLogout$ = createEffect(
    (): any => {
      return this.action$.pipe(
        ofType(autoLogout),
        tap((action): any => {
          this.authService.logoutUser();
          this.router.navigate(['/auth']);
        })
      );
    },
    { dispatch: false }
  );
}
