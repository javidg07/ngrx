import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUserAuthDetails } from 'src/app/auth/state/auth.selectors';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {
  testing$!:Observable<CounterState>
  constructor( private store:Store<{counter:CounterState}>) { }

  ngOnInit() {
  this.testing$ = this.store.select('counter');
  this.store.select(getUserAuthDetails).subscribe(val=>{
    if(val){
      // console.log(val);

    }
  })
  }

}
