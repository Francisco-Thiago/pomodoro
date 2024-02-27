import { Component, EventEmitter, Output } from '@angular/core';
import { Type } from '../timer.model';

@Component({
  selector: 'app-timer-menu',
  templateUrl: './timer-menu.component.html',
  styleUrl: './timer-menu.component.scss'
})
export class TimerMenuComponent {
  @Output('modeSelected') selected: EventEmitter<Type> = new EventEmitter();
  @Output('clear') clear: EventEmitter<null> = new EventEmitter();

  modeOptions = Type;
  selectedMode = Type.Work

  onSelected(mode: Type) {
    this.selectedMode = mode;
    this.selected.emit(this.selectedMode)
  }

  clearCounter() {
    this.clear.emit();
  }
}
