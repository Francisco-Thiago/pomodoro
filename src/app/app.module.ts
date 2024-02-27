import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CounterComponent } from './timer/timer.component';
import { TimersComponent } from './timers/timers.component';
import { TimerMenuComponent } from './timer-menu/timer-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    TimersComponent,
    TimerMenuComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
