import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { CounterButtonsComponent } from "./counter-buttons/counter-buttons.component";
import { CounterOutputComponent } from "./counter-output/counter-output.component";
import { CounterComponent } from "./counter/counter.component";
import { CustomCounterComponent } from "./custom-counter/custom-counter.component";
import { counterReducer } from "./state/counter.reducer";
import { COUNTER_STATE_NAME } from "./state/counter.selectors";
import { TestingComponent } from "./testing/testing.component";

 const route:Routes=[
  {
    path: '',
    component: CounterComponent,
  },
 ]
 @NgModule({
    declarations:[
      CounterButtonsComponent,CounterComponent,CounterOutputComponent,TestingComponent,CustomCounterComponent
    ],
    imports:[CommonModule,RouterModule.forChild(route),FormsModule,StoreModule.forFeature(COUNTER_STATE_NAME,counterReducer)]
 })
 export class CounterModule {}
