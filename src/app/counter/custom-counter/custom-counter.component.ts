import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { appState } from 'src/app/store/app.state';
import { customCounter, updateName } from '../state/counter.action';
import { getName } from '../state/counter.selectors';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-custom-counter',
  templateUrl: './custom-counter.component.html',
  styleUrls: ['./custom-counter.component.scss']
})
export class CustomCounterComponent implements OnInit {
  count!:number;
  name!:string;
  initalName!:string;
  initalName$!:Observable<string>
  // constructor(private store: Store<{counter:CounterState}>) { }
  constructor( private store:Store<appState>) { }
  ngOnInit() {
    // this.store.select('counter').subscribe(val=>{
    //   if(val){
    //     console.log('recieved name',val.name);
    //     this.initalName= val.name;

    //   }
    // })
     // getName is used createSelector and createfeatureSelector like onpush statergy
    this.initalName$ = this.store.select(getName)
  }
  customIncrement():void{
  this.store.dispatch(customCounter({count:+this.count}))
  this.count =0;
  }
  changeName():void{
this.store.dispatch(updateName({name:this.name}))
this.name = '';
  }
}
