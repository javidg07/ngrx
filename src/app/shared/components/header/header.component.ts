import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { autoLogout } from 'src/app/auth/state/auth.actions';
import { getUserAuthDetails } from 'src/app/auth/state/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 isAuthenticated$!:Observable<boolean>;
  constructor( private store:Store<any>) { }

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(getUserAuthDetails);
  }
  onLogout(event:Event){
    event.preventDefault();
    this.store.dispatch(autoLogout());
  }
}
