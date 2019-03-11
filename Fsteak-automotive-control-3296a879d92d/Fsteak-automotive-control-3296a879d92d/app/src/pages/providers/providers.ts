import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { AddproviderPage } from '../addprovider/addprovider';
import { HttpClient } from '@angular/common/http';
import { ToastController } from 'ionic-angular';
import { DeleteProviderPage } from '../delete-provider/delete-provider';
import { EditProviderPage } from '../edit-provider/edit-provider';

@IonicPage()
@Component({
  selector: 'page-providers',
  templateUrl: 'providers.html',
})
export class ProvidersPage {
  elements: any = [];
  element: any = [];
  constructor(public navCtrl: NavController, public http: HttpClient, public toast: ToastController) {

    //Obtener elementos primero 
    this.http.get("http://10.70.10.22/IonicApp/json_fetch_providers.php").subscribe(data => {
      this.elements = data;

      this.element = [

      ];

      for (let i = 1; i <= this.elements.length; i++) {
        //empujar datos al array
        var item2 = { expandable: false }
        this.element.push(item2)

        console.log(this.element)

      }

    });

  }

  getProviders() {
    this.http.get("http://10.70.10.22/IonicApp/json_fetch_providers.php").subscribe(data => {
      this.elements = data;
      console.log(data);
    }, err => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProvidersPage');
    this.getProviders();
  }

  ionViewWillEnter(){
    this.getProviders();
  }

  addProvider() {
    this.navCtrl.push(AddproviderPage);
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

  deleteAction(element){
    this.navCtrl.push(DeleteProviderPage, element);
  }

  editAction(element){
    this.navCtrl.push(EditProviderPage, element);
  }

}
