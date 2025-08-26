import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dice',
  standalone: true,
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss'],
})
export class DiceComponent {
  dice1: number = 1;
  dice2: number = 1;
  rolling: boolean = false;
  private intervalId: any;

  @Output() diceRolled = new EventEmitter<[number, number]>(); // Emitir los valores de los dados

  rollDice(): void {
    if (this.rolling) return; // Evita múltiples clics seguidos
    this.rolling = true;

    // Inicia la animación (cambia los números rápido)
    this.intervalId = setInterval(() => {
      this.dice1 = Math.floor(Math.random() * 6) + 1;
      this.dice2 = Math.floor(Math.random() * 6) + 1;
    }, 100); // Cambia cada 100ms

    // Detiene la animación después de 1 segundo y asigna los valores reales
    setTimeout(() => {
      clearInterval(this.intervalId);
      this.dice1 = Math.floor(Math.random() * 6) + 1;
      this.dice2 = Math.floor(Math.random() * 6) + 1;
      this.rolling = false;

      // Emitir los valores de los dados cuando la animación termine
      this.diceRolled.emit([this.dice1, this.dice2]);
    }, 1000); // Duración de la animación
  }
}
