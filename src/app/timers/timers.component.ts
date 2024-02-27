import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  auto = true;
  autoBreak = false;

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

  changeAuto(auto: boolean) {
    this.auto = auto;
  }

  finish(timer: Timer) {
    this.autoBreak = true;
    if (this.auto) this.mode = Type.Work === timer.type ? Type.Rest : Type.Work;
    if (this.work.type === timer.type) {
      this.work = timer;
    } else {
      this.rest = timer;
    }
  }

  onMode(seletedMode: Type) {
    this.mode = seletedMode;
    this.autoBreak = false;
  }

  onClear() {
    this.clear = true;
    setTimeout(() => {
      this.clear = false;
    }, 1000);
  }
}
