import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';
import { DeparturesPage } from '../departures/departures';
import { HomePage } from '../home/home';
import { ModifyPage } from '../modify/modify';
import { SearchphysicalPage } from '../searchphysical/searchphysical';
import { ReportsPage } from '../reports/reports';
import { MultipleDeparturePage } from '../multiple-departure/multiple-departure';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public events: Events) {
    //Controlador de Menús laterales
    this.menuCtrl.enable(true, 'rightMenu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  /*
    Metodos para llamar vistas distintas, funcionan usando el metodo (tap) de la
    vista en HTML
  */
  newPiece() {
    this.navCtrl.push(AddItemPage);
  }

  departures(){
    this.navCtrl.push(DeparturesPage);
  }

  inventory(){
    this.navCtrl.push(HomePage);
  }

  add(){
    this.navCtrl.push(AddItemPage);
  }

  modify(){
    this.navCtrl.push(ModifyPage);
  }

  searchPhysical(){
    this.navCtrl.push(SearchphysicalPage);
  }

  generateReport(){
    this.navCtrl.push(ReportsPage);
  }

  multipleDeparture(){
    this.navCtrl.push(MultipleDeparturePage);
  }

}
