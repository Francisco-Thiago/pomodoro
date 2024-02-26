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
  limit: number;
  type: Type;
  buttonContent: string;
  counterFormatted: string;
  interval: NodeJS.Timeout;

  constructor() {
    this.status = false;
    this.counterFormatted = '00:00';
  }

  ngOnInit(): void {
    this.counter = this.defaultTimer.counter;
    this.limit = this.defaultTimer.limit;
    this.type = this.defaultTimer.type;
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
    this.counter = 0;
    console.log('Parabéns :)');
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

  formatCounter() {
    const minutes = Math.trunc(this.counter / 60);
    const seconds = this.counter % 60;
    this.counterFormatted = `
        ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}
      `;
  }
}
