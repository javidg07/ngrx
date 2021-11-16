import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/store/app.state';
import { decrement, increment, reset } from '../state/counter.action';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.scss']
})
export class CounterButtonsComponent implements OnInit {
// @Output() increment = new EventEmitter<void>();
// @Output() decrement = new EventEmitter<void>();
// @Output() reset = new EventEmitter<void>();

  // constructor( private store:Store<{counter:{counter:number}}>) { }
//  constructor( private store:Store<{counter:CounterState}>) { }
      constructor( private store:Store<appState>) { }
  ngOnInit() {
  }
  onIncrement(){
    this.store.dispatch(increment())
// this.increment.emit()

  }
  onDecrement(){
    this.store.dispatch(decrement())
    // this.decrement.emit()
  }
  onReset(){
    this.store.dispatch(reset())
    // this.reset.emit()
  }
}
