import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-addprovider',
  templateUrl: 'addprovider.html',
})
export class AddproviderPage {

  element: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: Http, public toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddproviderPage');
  }

  //Metodo para insertar proveedor, se utiliza el valor que se le asigne al Objeto "element" por medio de ngModel
  addProvider() {
    this.element.action = "insertProvider";
    this.http.post("http://10.70.10.22/IonicApp/post_one.php", this.element).subscribe(data => {
      console.log(data);
      let result = JSON.parse(data["_body"]);
      if (result.status == "success") {
        this.showToast("Insertado con Exito");
      }
      else {
        this.showToast("Algo anda mal, contacte a IT, Porfavor");
      }
    }, err => {
      console.log(err);
    });
  }

  //Mostrar notificacion del tipo Toast
  showToast(message) {
    let toast = this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
