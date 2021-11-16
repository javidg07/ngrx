import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { appState } from 'src/app/store/app.state';
import { getCounter } from '../state/counter.selectors';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss']
})
export class CounterOutputComponent implements OnInit {
  //  counter!:number;
  // counter$!:Observable<CounterState>
  counter$!:Observable<number>;
  // constructor( private store :Store<{counter:{counter:number}}>) { }
//  constructor( private store :Store<{counter:CounterState}>) { }
 constructor( private store:Store<appState>) { }

  ngOnInit() {
    // this.store.select('counter').subscribe(val=>{
    //   if(val){
    //     console.log('recived counter',val.counter);

    //     this.counter =val.counter;
    //   }
    // })
    // this.counter$ =this.store.select('counter')
    // getcounter is used createSelector and createfeatureSelector like onpush statergy
    this.counter$ = this.store.select(getCounter)
  }

}
