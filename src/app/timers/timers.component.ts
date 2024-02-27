import { Component } from '@angular/core';
import { Timer, Type } from '../timer.model';

@Component({
  selector: 'app-timers',
  templateUrl: './timers.component.html',
  styleUrl: './timers.component.scss',
})
export class TimersComponent {
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
}
