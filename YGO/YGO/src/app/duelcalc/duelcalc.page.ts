import { Component, OnInit, ViewChild } from '@angular/core';
import { Toast } from '@ionic-native/toast/ngx';

@Component({
  selector: 'app-duelcalc',
  templateUrl: './duelcalc.page.html',
  styleUrls: ['./duelcalc.page.scss'],
})
export class DuelcalcPage implements OnInit {

  operatorController: boolean;
  operatorController2: boolean;
  operator1: any;
  @ViewChild('player1') player1;
  @ViewChild('player2') player2;
  @ViewChild('manual1') manual1;
  @ViewChild('manual2') manual2;
  constructor(private toast: Toast) { }

  ngOnInit() {
    this.operatorController = false;
    this.operatorController2 = false;
  }

  callToast() {
    this.toast.show('Debes Introducir un Valor', '500', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  // Funciones de Operador1
  operatorMinus() {
    this.operatorController = false;
    console.log(this.operatorController);
  }

  operatorPlus() {
    this.operatorController = true;
    console.log(this.operatorController);
  }

  // Funciones de Operador2
  operatorMinus2() {
    this.operatorController2 = false;
    console.log(this.operatorController2);
  }

  operatorPlus2() {
    this.operatorController2 = true;
    console.log(this.operatorController2);
  }

  // Funciones Player 1
  half() {
    let lp = this.player1.value;
    let half = lp / 2;
    this.player1.value = half;
  }

  reset() {
    this.player1.value = 8000;
  }

  otk() {
    this.player1.value = 0;
  }

  mil() {
    if (this.operatorController === false) {
      let lp = this.player1.value;
      let number = (parseInt(lp) - 1000);
      this.player1.value = number;
      console.log(this.player1.value);
    } else {
      let lp = this.player1.value;
      let number = (parseInt(lp) + 1000);
      this.player1.value = number;
      console.log(this.player1.value);
    }
  }

  quin() {
    if (this.operatorController === false) {
      let lp = this.player1.value;
      let number = (parseInt(lp) - 500);
      this.player1.value = number;
      console.log(this.player1.value);
    } else {
      let lp = this.player1.value;
      let number = (parseInt(lp) + 500);
      this.player1.value = number;
      console.log(this.player1.value);
    }
  }

  cien() {
    if (this.operatorController === false) {
      let lp = this.player1.value;
      let number = (parseInt(lp) - 100);
      this.player1.value = number;
      console.log(this.player1.value);
    } else {
      let lp = this.player1.value;
      let number = (parseInt(lp) + 100);
      this.player1.value = number;
      console.log(this.player1.value);
    }
  }

  addP1() {
    if (this.manual1.value !== '') {
      let val1 = parseInt(this.manual1.value);
      let lp = parseInt(this.player1.value);
      let result = val1 + lp;
      this.player1.value = result;
    } else {
      this.callToast();
    }
  }

  minP1() {
    if (this.manual1.value !== '') {
      let val1 = parseInt(this.manual1.value);
      let lp = parseInt(this.player1.value);
      let result = lp - val1;
      this.player1.value = result;
    } else {
      this.callToast();
    }
  }

  // Funciones de Player 2
  half2() {
    let lp = this.player2.value;
    let half = lp / 2;
    this.player2.value = half;
  }

  reset2() {
    this.player2.value = 8000;
  }

  otk2() {
    this.player2.value = 0;
  }

  mil2() {
    if (this.operatorController2 === false) {
      let lp = this.player2.value;
      let number = (parseInt(lp) - 1000);
      this.player2.value = number;
      console.log(this.player2.value);
    } else {
      let lp = this.player2.value;
      let number = (parseInt(lp) + 1000);
      this.player2.value = number;
      console.log(this.player2.value);
    }
  }

  quin2() {
    if (this.operatorController2 === false) {
      let lp = this.player2.value;
      let number = (parseInt(lp) - 500);
      this.player2.value = number;
      console.log(this.player2.value);
    } else {
      let lp = this.player2.value;
      let number = (parseInt(lp) + 500);
      this.player2.value = number;
      console.log(this.player2.value);
    }
  }

  cien2() {
    if (this.operatorController2 === false) {
      let lp = this.player2.value;
      let number = (parseInt(lp) - 100);
      this.player2.value = number;
      console.log(this.player2.value);
    } else {
      let lp = this.player2.value;
      let number = (parseInt(lp) + 100);
      this.player2.value = number;
      console.log(this.player2.value);
    }
  }

  addP2() {
    if (this.manual2.value !== '') {
      let val1 = parseInt(this.manual2.value);
      let lp = parseInt(this.player2.value);
      let result = val1 + lp;
      this.player2.value = result;
    } else {
      this.callToast();
    }
  }

  minP2() {
    if (this.manual2.value !== '' ) {
      let val1 = parseInt(this.manual2.value);
      let lp = parseInt(this.player2.value);
      let result = lp - val1;
      this.player2.value = result;
    } else {
      this.callToast();
    }
  }

}
