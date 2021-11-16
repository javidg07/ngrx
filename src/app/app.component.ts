import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { autoLogin } from './auth/state/auth.actions';
import { appState } from './store/app.state';
import { getErrorMessage } from './store/shared/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngrx-angular';
  errorMessage$!:Observable<string>
  constructor(private store: Store<appState>) {}
  ngOnInit() {
this.errorMessage$ = this.store.select(getErrorMessage);
  this.store.dispatch(autoLogin());

  }

}
