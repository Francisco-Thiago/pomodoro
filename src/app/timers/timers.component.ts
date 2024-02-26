import { Component } from '@angular/core';
import { Timer, Type } from '../timer.model';

@Component({
  selector: 'app-timers',
  templateUrl: './timers.component.html',
  styleUrl: './timers.component.scss',
})
export class TimersComponent {
  timer: Timer = {
    type: Type.Work,
    counter: 0,
    limit: 1500,
  };
}
