import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CounterComponent } from './timer/timer.component';
import { TimersComponent } from './timers/timers.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    TimersComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
