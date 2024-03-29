import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Type } from '../timer.model';

@Component({
  selector: 'app-timer-menu',
  templateUrl: './timer-menu.component.html',
  styleUrl: './timer-menu.component.scss'
})
export class TimerMenuComponent {
  @Input('mode') mode: Type;
  @Output('modeSelected') selected: EventEmitter<Type> = new EventEmitter();
  @Output('clear') clear: EventEmitter<null> = new EventEmitter();

  modeOptions = Type;

  onSelected(mode: Type) {
    this.mode = mode;
    this.selected.emit(this.mode)
  }

  clearCounter() {
    this.clear.emit();
  }
}
