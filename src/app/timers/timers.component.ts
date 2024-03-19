import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Timer, Type } from '../timer.model';

@Component({
  selector: 'app-timers',
  templateUrl: './timers.component.html',
  styleUrl: './timers.component.scss',
})
export class TimersComponent {
  mode = Type.Pomodoro;
  modeOptions = Type;
  clear = false;
  auto = true;
  autoBreak = false;

  pomodoro: Timer = {
    type: Type.Pomodoro,
    sessions: 0,
    counter: 1500,
    limit: 1500,
  };

  shortBreak: Timer = {
    type: Type.ShortBreak,
    sessions: 0,
    counter: 300,
    limit: 300,
  };

  longBreak: Timer = {
    type: Type.LongBreak,
    sessions: 0,
    counter: 900,
    limit: 900,
  };

  changeAuto(auto: boolean) {
    this.auto = auto;
  }

  finish(timer: Timer) {
    this.autoBreak = true;
    if (this.auto) this.mode = Type.Pomodoro === timer.type ? Type.ShortBreak : Type.Pomodoro;
    if (this.pomodoro.type === timer.type) {
      this.pomodoro = timer;
    } else {
      this.shortBreak = timer;
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
