import { Component } from '@angular/core';
import { Timer, Type } from '../timer.model';

@Component({
  selector: 'app-timers',
  templateUrl: './timers.component.html',
  styleUrl: './timers.component.scss',
})
export class TimersComponent {
  mode = Type.Work;
  modeOptions = Type;
  clear = false;

  work: Timer = {
    type: Type.Work,
    sessions: 0,
    counter: 0,
    limit: 1500,
  };

  rest: Timer = {
    type: Type.Rest,
    sessions: 0,
    counter: 0,
    limit: 300,
  };

  onMode(seletedMode: Type) {
    this.mode = seletedMode;
  }

  onClear() {
    this.clear = true;
    setTimeout(() => {this.clear = false}, 1000);
  }
}
