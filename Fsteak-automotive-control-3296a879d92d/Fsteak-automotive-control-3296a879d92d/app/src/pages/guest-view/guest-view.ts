import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ReportsPage } from '../reports/reports';

@IonicPage()
@Component({
  selector: 'page-guest-view',
  templateUrl: 'guest-view.html',
})
export class GuestViewPage {


  items: any;

  elements: any = [];
  element: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public http: HttpClient) {
    //controlador del menu lateral
    this.menuCtrl.enable(true, 'rightMenu');

    //Obtener elementos primero 
    this.http.get("http://10.70.10.22/IonicApp/json_read.php").subscribe(data => {
      this.elements = data;

      this.element = [

      ];

      for (let i = 1; i <= this.elements.length; i++) {
        //empujar datos al array
        var item2 = { expandable: false }
        this.element.push(item2)

        console.log(this.element);
      }

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuestViewPage');
    this.getData();
  }

  ionViewWillEnter() {
    this.getData();
  }

  getData() {
    this.http.get("http://10.70.10.22/IonicApp/json_read.php").subscribe(data => {
      this.elements = data;
      console.log(data);
    }, err => {
      console.log(err);
    });
  }

  expandItem(element) {

    this.elements.map((listItem) => {

      if (element == listItem) {
        listItem.expanded = !listItem.expanded;
      } else {
        listItem.expanded = false;
      }

      return listItem;

    });

  }

  refresh(refresher) {
    console.log("Empieza Refresh", refresher);
    this.getData();

    setTimeout(() => {
      console.log("Termina Refresh");
      refresher.complete();
    }, 2000);
  }

  gotoReport(){
    this.navCtrl.push(ReportsPage);
  }

}
