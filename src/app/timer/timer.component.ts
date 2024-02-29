import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Timer, Type } from '../timer.model';
import { Howl } from 'howler';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class CounterComponent implements OnInit, OnChanges {
  @Input('timer') defaultTimer: Timer;
  @Input('clear') isClear: boolean;
  @Input() autoBreak: boolean;
  @Output('finish') score: EventEmitter<Timer> = new EventEmitter();
  @Output('auto') externalAuto: EventEmitter<boolean> = new EventEmitter();
  @Input('auto') internalAuto: boolean;

  status: boolean;
  counter: number;
  sessions: number;
  limit: number;
  type: Type;
  buttonContent: string;
  counterFormatted: string;
  interval: NodeJS.Timeout;
  alarm: Howl;
  break: boolean;

  constructor() {
    this.status = false;
    this.sessions = 0;
  }

  ngOnInit(): void {
    this.counter = this.defaultTimer.counter;
    this.limit = this.defaultTimer.limit;
    this.type = this.defaultTimer.type;
    this.sessions = this.defaultTimer.sessions;
    this.formatCounter(this.limit);
    this.buttonText();
    if (
      (this.internalAuto && this.sessions > 0) ||
      (this.internalAuto && this.autoBreak)
    ) {
      this.run();
    }
  }

  ngOnChanges(): void {
    if (this.isClear) this.clearCounter();
  }

  run() {
    this.toggleStatus();
    this.timer();
  }

  timer() {
    this.formatCounter();
    if (this.status) {
      this.interval = setInterval(() => {
        this.counter != 0 ? (this.counter -= 1) : this.finish();
        this.formatCounter();
      }, 1000);
    } else {
      clearInterval(this.interval);
    }
  }

  finish() {
    this.playAlarm();
    this.toggleStatus();
    clearInterval(this.interval);
    this.formatCounter(this.limit);
    this.counter = this.limit;
    this.incrementSession();
    this.updateScore();
  }

  playAlarm() {
    if (!this.alarm) {
      this.alarm = new Howl({
        src: ['../../assets/pomodoro-sound.mp3'],
      });
    }
    this.alarm.play();
  }

  updateScore() {
    const timer = new Timer(this.limit, this.counter, this.sessions, this.type);
    this.score.emit(timer);
  }

  incrementSession() {
    this.sessions += 1;
    if (this.type === Type.Rest) {
      this.limit = this.sessions % 4 === 0 ? 900 : 300;
    }
  }

  toggleStatus() {
    this.status = !this.status;
    this.buttonText();
  }

  buttonText() {
    if (this.status) {
      this.buttonContent = 'Pausar';
    } else if (this.counter === this.limit || this.counter >= this.limit) {
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

  toggleAuto() {
    this.internalAuto = !this.internalAuto;
    this.externalAuto.emit(this.internalAuto);
  }

  clearCounter() {
    if (this.isClear) {
      this.counter = 0;
      this.status = false;
      this.formatCounter(this.limit);
      clearInterval(this.interval);
      this.buttonText();
    }
  }
}
