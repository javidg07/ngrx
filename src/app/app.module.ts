import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment.prod';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { appReducer } from './store/app.state';
import { AuthEffects } from './auth/state/auth.effects';
import { AuthInterceptor } from './services/Auth.Interceptor';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './store/router/custom.serializer';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
@NgModule({
  declarations: [
    AppComponent,HeaderComponent, HomeComponent,PostDetailsComponent
   ],
  imports: [
    BrowserModule,FormsModule,BrowserAnimationsModule,
    AppRoutingModule,ReactiveFormsModule,HttpClientModule, NgxSpinnerModule,
    // StoreModule.forRoot({counter:counterReducer}),
    //  StoreModule.forRoot(appReducer),  removed due to lazy loading of ngrx  initial states
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects]),

    StoreDevtoolsModule.instrument({
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
   StoreRouterConnectingModule.forRoot({serializer:CustomSerializer}),
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
