import { Component } from '@angular/core';
import { DiceComponent } from './components/dice/dice.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DiceComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'parchis';
  dados: number[] = [0, 0]; // Valores de los dados lanzados
  fichaSeleccionada: string = ''; // ID de la ficha seleccionada (ej. 'ficha-amarilla1')
  modoSeleccion: boolean = false;
  respuestaSeleccionada: string = '';
  fichaamarilla1: string = 'casilla6';
  fichaazul1: boolean = true;
  fichaverde1: boolean = true;
  ficharoja1: boolean = true;
  preguntadado: number = 0; // Dado lanzado
  modal1: boolean = false; // Modal para preguntas
  modal2: boolean = false; // Modal para preguntas
  modal3: boolean = false; // Modal para preguntas
  modal4: boolean = false; // Modal para preguntas
  modal5: boolean = false; // Modal para preguntas
  modal6: boolean = false; // Modal para preguntas
  modal7: boolean = false; // Modal para preguntas
  modal8: boolean = false; // Modal para preguntas
  modal9: boolean = false; // Modal para preguntas
  modal10: boolean = false; // Modal para preguntas
  modal11: boolean = false; // Modal para preguntas
  modal12: boolean = false; // Modal para preguntas
  modal13: boolean = false; // Modal para preguntas
  modal14: boolean = false; // Modal para preguntas
  modal15: boolean = false; // Modal para preguntas
  modal16: boolean = false; // Modal para preguntas
  modal17: boolean = false; // Modal para preguntas
  modal18: boolean = false; // Modal para preguntas
  modal19: boolean = false; // Modal para preguntas
  modal20: boolean = false; // Modal para preguntas
  modal21: boolean = false; // Modal para preguntas
  modal22: boolean = false; // Modal para preguntas
  modal23: boolean = false; // Modal para preguntas
  modal24: boolean = false; // Modal para preguntas
  correctAnswer: string = ''; // Respuesta correcta para la pregunta
  positive: boolean = false; // Para mostrar el mensaje de respuesta correcta
  negative: boolean = false; // Para mostrar el mensaje de respuesta incorrecta
  closeeButton: boolean = false; // Para cerrar el modal
  modalWin: boolean = false;
  winnerColor: string = '';
  gameOver: boolean = false; // opcional, por si quieres bloquear turnos post-victoria

  // Lista de jugadores con sus fichas y oportunidades
  jugadores = [
    {
      color: 'Amarillo',
      fichasEnCasillaGrande: 4,
      oportunidades: 3,
      salida: '5',
      ficha1: 'ficha-amarilla1',
      posicionficha1: 'fichaamarilla',
      isFree: false,
      extraRoll: false,
      paseofinal: '92',
      llegada: '100',
    },
    {
      color: 'azul',
      fichasEnCasillaGrande: 4,
      oportunidades: 3,
      salida: '30',
      ficha1: 'ficha-azul1',
      posicionficha1: 'fichaazul',
      isFree: false,
      extraRoll: false,
      paseofinal: '17',
      llegada: '25',
    },
    {
      color: 'rojo',
      fichasEnCasillaGrande: 4,
      oportunidades: 3,
      salida: '55',
      ficha1: 'ficha-rojo1',
      posicionficha1: 'ficharojo',
      isFree: false,
      extraRoll: false,
      paseofinal: '42',
      llegada: '50',
    },
    {
      color: 'verde',
      fichasEnCasillaGrande: 4,
      oportunidades: 3,
      salida: '80',
      ficha1: 'ficha-verde1',
      posicionficha1: 'fichaverde',
      isFree: false,
      extraRoll: false,
      paseofinal: '67',
      llegada: '75',
    },
  ];

  jugadorActual = 0; // Índice del jugador actual

  // Método para lanzar los dados
  lanzarDados(dado1: number, dado2: number) {
    if (this.gameOver) return; // opcional, ignora si ya terminó

    const jug = this.jugadores[this.jugadorActual];
    const total = dado1 + dado2;
    const isDouble = dado1 === dado2;

    let keepTurn = false;
    let won = false; // ← NUEVO

    if (!jug.isFree) {
      if (isDouble) {
        this.moverFichasASalida(jug, total);
        // Si justo cayó en llegada al salir, dispara victoria
        if (jug[`posicionficha1`] === jug.llegada) {
          this.triggerWin(jug);
          return;
        }
        jug.isFree = true;
        keepTurn = true;
      } else {
        jug.oportunidades--;
        if (jug.oportunidades > 0) {
          keepTurn = true;
        } else {
          keepTurn = false;
          jug.oportunidades = 3;
        }
      }
    } else {
      // Pasa los dos dados crudos para aplicar regla de 12 y doble 1
      won = this.moverjugador(jug, total, dado1, dado2); // ← CAMBIO (tercer y cuarto argumento)
      if (!won) {
        keepTurn = isDouble; // dobles conservan turno si no ganó
      } else {
        return; // si ganó, ya mostramos modal y terminamos
      }
    }

    if (!keepTurn) this.pasarTurno();
  }

  seleccionarFicha(fichaId: string) {
    if (this.modoSeleccion) {
      this.fichaSeleccionada = fichaId;
    }
  }

  moverFicha(fichaId: string, posicionFicha: string) {
    console.log(`Moviendo ficha: ${fichaId} a ${posicionFicha}`);
  }

  moviendoFicha(dado: number, posicionFicha: String) {
    const posicionActual = parseInt(posicionFicha.split('-')[1]);
    const nuevaPosicion = posicionActual + dado;
    return `${nuevaPosicion}`;
  }

  // Método para mover todas las fichas del jugador a su casilla de salida
  moverFichasASalida(jugador: any, total: number) {
    const salida = document.getElementById(jugador.salida);

    if (salida) {
      const fichas = ['ficha1'];

      fichas.forEach((fichaKey, index) => {
        const ficha = document.createElement('div');
        ficha.classList.add('ficha', jugador.color.toLowerCase());
        ficha.id = jugador[fichaKey]; // Asignar el id correspondiente a cada ficha
        salida.appendChild(ficha);
        jugador.isFree = true; // Marcar la ficha como libre
        const nuevaPosicion = parseInt(jugador.salida) + total;
        const nuevaPosicionId = nuevaPosicion.toString();
        // Actualizar la posición de cada ficha al nombre de la casilla de salida
        this.openPreguntas(nuevaPosicionId, total);
        jugador[`posicionAnteriorFicha1`] = jugador.salida;
        jugador[`posicionficha${index + 1}`] = nuevaPosicionId;
        if (jugador[`posicionficha${index + 1}`] === jugador.llegada) {
          this.triggerWin(jugador);
        }
      });
      console.log('Estado actualizado del jugador:', jugador);
    } else {
      console.log(
        `No se encontró la casilla de salida para el jugador ${jugador.color}.`
      );
    }
  }

  moverjugador(
    jugador: any,
    dado: number,
    dado1?: number,
    dado2?: number
  ): boolean {
    const fichas = ['ficha1'];
    let won = false;

    fichas.forEach((fichaKey, index) => {
      const prev = jugador[`posicionficha${index + 1}`];
      jugador[`posicionAnteriorFicha${index + 1}`] = prev;

      // Posición actual numérica (si no hay, usa salida como referencia)
      let curr = this.getNumericPos(prev);
      if (curr === null) curr = parseInt(jugador.salida, 10);

      const target = parseInt(jugador.llegada, 10);
      const dist = this.distanceAhead(curr, target);

      const within12 = dist > 0 && dist <= 12;
      const isDoubleOnes = dado1 === 1 && dado2 === 1;
      const canWinThisRoll =
        within12 && (dado === dist || (dist === 1 && isDoubleOnes));

      let nuevaPosicion: number;

      if (canWinThisRoll) {
        // Mover DIRECTO a llegada
        nuevaPosicion = target;
      } else {
        // Movimiento normal
        nuevaPosicion = curr + dado;

        // Reglas de “saltos”/desvíos que ya tenías:
        const coloresEspeciales = ['amarillo', 'rojo', 'verde'];
        if (
          coloresEspeciales.includes(jugador.color.toLowerCase()) &&
          nuevaPosicion >= 17 &&
          nuevaPosicion <= 25
        ) {
          nuevaPosicion += 9;
        }

        const coloresEspeciales2 = ['amarillo', 'azul', 'verde'];
        if (
          coloresEspeciales2.includes(jugador.color.toLowerCase()) &&
          nuevaPosicion >= 42 &&
          nuevaPosicion <= 50
        ) {
          nuevaPosicion += 9;
        }

        const coloresEspeciales3 = ['amarillo', 'azul', 'rojo'];
        if (
          coloresEspeciales3.includes(jugador.color.toLowerCase()) &&
          nuevaPosicion >= 67 &&
          nuevaPosicion <= 75
        ) {
          nuevaPosicion += 9;
        }

        const coloresEspeciales4 = ['verde', 'azul', 'rojo'];
        if (
          coloresEspeciales4.includes(jugador.color.toLowerCase()) &&
          nuevaPosicion >= 92 &&
          nuevaPosicion <= 100
        ) {
          nuevaPosicion = nuevaPosicion - 91;
        }
      }

      const nuevaPosicionId = nuevaPosicion.toString();

      // Preguntas
      this.openPreguntas(nuevaPosicionId, dado);

      // Actualización de DOM
      const casillaDestino = document.getElementById(nuevaPosicionId);
      if (casillaDestino) {
        const fichaExistente = document.getElementById(jugador[fichaKey]);
        if (fichaExistente) {
          casillaDestino.appendChild(fichaExistente);
        } else {
          const nuevaFicha = document.createElement('div');
          nuevaFicha.classList.add('ficha', jugador.color.toLowerCase());
          nuevaFicha.id = jugador[fichaKey];
          casillaDestino.appendChild(nuevaFicha);
        }
        jugador[`posicionficha${index + 1}`] = nuevaPosicionId;
      } else {
        console.warn(`No se encontró la casilla con id ${nuevaPosicionId}`);
      }

      // Chequeo de victoria
      if (jugador[`posicionficha${index + 1}`] === jugador.llegada) {
        this.triggerWin(jugador);
        won = true;
      }
    });

    console.log('Estado actualizado del jugador:', jugador);
    return won;
  }

  // Método para pasar al siguiente jugador
  pasarTurno() {
    this.jugadorActual = (this.jugadorActual + 1) % this.jugadores.length;
    const siguiente = this.jugadores[this.jugadorActual];
    siguiente.oportunidades = 3;
    console.log(`Es el turno del jugador ${siguiente.color}`);
  }

  openPreguntas(casilla: string, daddo: number) {
    switch (casilla) {
      case '7':
        this.modal1 = true;
        this.correctAnswer = 'C';
        this.preguntadado = daddo; // Guardar el valor del dado lanzado
        break;
      case '9':
        this.modal2 = true;
        this.correctAnswer = 'A';
        this.preguntadado = daddo;
        break;
      case '11':
        this.modal3 = true;
        this.correctAnswer = 'A';
        this.preguntadado = daddo;
        break;
      case '13':
        this.modal4 = true;
        this.correctAnswer = 'C';
        this.preguntadado = daddo;
        break;
      case '15':
        this.modal5 = true;
        this.correctAnswer = 'B';
        this.preguntadado = daddo;
        break;
      case '3':
        this.modal6 = true;
        this.correctAnswer = 'C';
        this.preguntadado = daddo;
        break;
      case '28':
        this.modal7 = true;
        this.correctAnswer = 'A';
        this.preguntadado = daddo;
        break;
      case '32':
        this.modal8 = true;
        this.correctAnswer = 'D';
        this.preguntadado = daddo;
        break;
      case '34':
        this.modal9 = true;
        this.correctAnswer = 'D';
        this.preguntadado = daddo;
        break;
      case '36':
        this.modal10 = true;
        this.correctAnswer = 'B';
        this.preguntadado = daddo;
        break;
      case '38':
        this.modal11 = true;
        this.correctAnswer = 'C';
        this.preguntadado = daddo;
        break;
      case '40':
        this.modal12 = true;
        this.correctAnswer = 'C';
        this.preguntadado = daddo;
        break;
      case '53':
        this.modal13 = true;
        this.correctAnswer = 'D';
        this.preguntadado = daddo;
        break;
      case '57':
        this.modal14 = true;
        this.correctAnswer = 'A';
        this.preguntadado = daddo;
        break;
      case '59':
        this.modal15 = true;
        this.correctAnswer = 'C';
        this.preguntadado = daddo;
        break;
      case '61':
        this.modal16 = true;
        this.correctAnswer = 'A';
        this.preguntadado = daddo;
        break;
      case '63':
        this.modal17 = true;
        this.correctAnswer = 'A';
        this.preguntadado = daddo;
        break;
      case '65':
        this.modal18 = true;
        this.correctAnswer = 'B';
        this.preguntadado = daddo;
        break;
      case '78':
        this.modal19 = true;
        this.correctAnswer = 'B';
        this.preguntadado = daddo;
        break;
      case '82':
        this.modal20 = true;
        this.correctAnswer = 'B';
        this.preguntadado = daddo;
        break;
      case '84':
        this.modal21 = true;
        this.correctAnswer = 'D';
        this.preguntadado = daddo;
        break;
      case '86':
        this.modal22 = true;
        this.correctAnswer = 'B';
        this.preguntadado = daddo;
        break;
      case '88':
        this.modal23 = true;
        this.correctAnswer = 'A';
        this.preguntadado = daddo;
        break;
      case '90':
        this.modal24 = true;
        this.correctAnswer = 'C';
        this.preguntadado = daddo;
        break;
    }
  }

  validarRespuesta() {
    if (this.respuestaSeleccionada) {
      console.log('Respuesta seleccionada:', this.respuestaSeleccionada);
      if (this.respuestaSeleccionada === this.correctAnswer) {
        console.log('Respuesta correcta!');
        this.positive = true;
        this.respuestaSeleccionada = '';
        this.closeeButton = true;
        this.correctAnswer = '';
      } else {
        console.log('Respuesta incorrecta!');
        this.negative = true;
        this.closeeButton = true;
        this.respuestaSeleccionada = '';
        this.correctAnswer = '';

        // Obtener jugador actual
        const jugador = this.jugadores[this.jugadorActual];
        const fichaKey = 'ficha1';

        let posicionRetroceso: string;

        // ⚠️ Si no estaba libre (es decir, salió con doble), vuelve a salida
        if (!jugador.isFree && this.preguntadado > 0) {
          posicionRetroceso = jugador.salida;
        } else {
          posicionRetroceso = (jugador as any)[`posicionAnteriorFicha1`];
        }

        // Mover ficha al DOM
        const fichaElemento = document.getElementById(jugador[fichaKey]);
        const casillaDestino = document.getElementById(posicionRetroceso);

        if (fichaElemento && casillaDestino) {
          casillaDestino.appendChild(fichaElemento);
          jugador[`posicionficha1`] = posicionRetroceso;
          console.log(`Ficha regresó a la casilla ${posicionRetroceso}`);
        } else {
          console.warn('No se pudo mover la ficha de regreso');
        }
      }
    } else {
      console.warn('No seleccionaste una respuesta');
    }
  }

  closeModal() {
    this.modal1 = false;
    this.modal2 = false;
    this.modal3 = false;
    this.modal4 = false;
    this.modal5 = false;
    this.modal6 = false;
    this.modal7 = false;
    this.modal8 = false;
    this.modal9 = false;
    this.modal10 = false;
    this.modal11 = false;
    this.modal12 = false;
    this.modal13 = false;
    this.modal14 = false;
    this.modal15 = false;
    this.modal16 = false;
    this.modal17 = false;
    this.modal18 = false;
    this.modal19 = false;
    this.modal20 = false;
    this.modal21 = false;
    this.modal22 = false;
    this.modal23 = false;
    this.modal24 = false;
    this.positive = false; // Ocultar mensaje de respuesta correcta
    this.negative = false; // Ocultar mensaje de respuesta incorrecta
    this.modalWin = false; // ← NUEVO
    this.positive = false;
    this.negative = false;
  }

  private getNumericPos(pos: string): number | null {
    const n = parseInt(pos, 10);
    return Number.isFinite(n) ? n : null;
  }

  private distanceAhead(curr: number, target: number): number {
    // Tablero 1..100 con wrap
    let d = target - curr;
    if (d < 0) d += 100;
    return d;
  }

  private triggerWin(jugador: any) {
    this.modalWin = true;
    this.winnerColor = jugador.color;
    this.gameOver = true; // si quieres parar el juego
  }
}
