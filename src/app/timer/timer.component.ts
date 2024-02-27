import { Component, Input, OnInit } from '@angular/core';
import { Timer, Type } from '../timer.model';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class CounterComponent implements OnInit {
  @Input('timer') defaultTimer: Timer;

  status: boolean;
  counter: number;
  sessions: number;
  limit: number;
  type: Type;
  buttonContent: string;
  counterFormatted: string;
  interval: NodeJS.Timeout;

  constructor() {
    this.status = false;
    this.sessions = 0;
  }

  ngOnInit(): void {
    this.counter = this.defaultTimer.counter;
    this.limit = this.defaultTimer.limit;
    this.type = this.defaultTimer.type;
    this.formatCounter(this.limit)
    this.buttonText();
  }

  run() {
    this.toggle();
    this.timer();
  }

  timer() {
    if (this.status) {
      this.interval = setInterval(() => {
        this.counter < this.limit ? (this.counter += 1) : this.finish();
        this.formatCounter();
      }, 1000);
    } else {
      clearInterval(this.interval);
    }
  }

  finish() {
    this.toggle();
    clearInterval(this.interval);
    this.breakSession();
    this.formatCounter(this.limit)
    this.counter = 0;
  }

  breakSession() {
    this.sessions += 1;
    const isLongBreak = this.sessions % 4 === 0 && this.type === Type.Rest;
    this.limit = isLongBreak ? 900 : 300;
  }

  toggle() {
    this.status = !this.status;
    this.buttonText();
  }

  buttonText() {
    if (this.status) {
      this.buttonContent = 'Pausar';
    } else if (this.counter === 0 || this.counter >= this.limit) {
      this.buttonContent = 'Iniciar';
    } else {
      this.buttonContent = 'Continuar';
    }
  }

  formatCounter(counter = this.counter) {
    const minutes = Math.trunc(counter / 60);
    const seconds = counter % 60;
    this.counterFormatted = `
        ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}
      `;
  }
}
