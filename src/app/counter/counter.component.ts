import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent {
  status = false;
  counter = 0;
  buttonContent = 'Iniciar';
  counterFormatted = '00:00';
  interval: NodeJS.Timeout;

  run() {
    this.toggle();
    this.timer();
  }

  timer() {
    if (this.status) {
      this.interval = setInterval(() => {
        this.counter < 1500 ? (this.counter += 1) : this.timeLimit();
        this.formatCounter();
      }, 1000);
    } else {
      clearInterval(this.interval);
    }
  }

  timeLimit() {
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
    } else if (this.counter === 0 || this.counter >= 1500) {
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
