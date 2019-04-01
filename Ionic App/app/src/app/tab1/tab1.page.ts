import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  resultados: any;

  @ViewChild('total') total;
  @ViewChild('resultado') resultado;
  @ViewChild('propina') propina;
  constructor() { }

  calculate() {
    this.resultados = this.total.value * (this.propina.value / 100);
    this.resultado.value = this.resultados;

    if (this.propina.value === false) {
      this.propina.value = 0.15;
      this.resultados = this.total.value * this.propina.value;
      this.resultado.value = this.resultados;
    }
  }

}

