import { Component, ViewChild } from '@angular/core';
import { ConfpService } from '../confp.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  newPropina: any;
  resultados: any;

  @ViewChild('total') total;
  @ViewChild('resultado') resultado;
  @ViewChild('propina') propina;
  constructor(public configuration: ConfpService) { }

  ionViewWillEnter() {
    this.newPropina = this.configuration.returnConf();

  }

  calculate() {

    if (this.configuration.returnConf() === '' || 'undefined') {
      if (this.propina.value === '' && this.configuration.returnConf() === undefined) {
        this.propina.value = 15;
        this.resultados = this.total.value * (this.propina.value / 100);
        this.resultado.value = this.resultados;
        console.log('1');
      }
      this.resultados = this.total.value * (this.propina.value / 100);
      this.resultado.value = this.resultados;
      console.log('2');
    }
    if (this.propina.value === '' && this.configuration.returnConf() !== undefined) {
      this.propina.value = this.newPropina;
      this.resultados = this.total.value * (this.propina.value / 100);
      this.resultado.value = this.resultados;
      console.log(this.newPropina);
      console.log('3');
    }

  }

}

