import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { RequestOptions, Headers } from '@angular/http';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-edit-user-action',
  templateUrl: 'edit-user-action.html',
})
export class EditUserActionPage {

  fullname: any;
  username: any;
  charge: any;

  charges: any

  oldFullnameValue: any;
  oldUsernameValue: any;
  oldChargeValue: any;
  element: any;

  @ViewChild("nuevoCharge") nuevoCharge;
  @ViewChild("nuevoFullname") nuevoFullname;
  @ViewChild("nuevoUsername") nuevoUsername;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private http: Http, public loading: LoadingController, public toast: ToastController,
    private httpC: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditUserActionPage');
    this.getUsers();
  }

  ngOnInit() {
    //Asignar nuevos Parametros
    this.fullname = this.navParams.get('name');
    this.username = this.navParams.get('email');
    this.charge = this.navParams.get('role');
    //Asignar Parametros viejos
    this.oldFullnameValue = this.navParams.get('name');
    this.oldUsernameValue = this.navParams.get('email');
    this.oldChargeValue = this.navParams.get('role');
  }

  modifyUser() {
    var headers = new Headers();

    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let data = {
      fullname: this.oldFullnameValue,
      username: this.oldUsernameValue,
      charge: this.oldChargeValue,

      nuevoFullname: this.nuevoFullname.value,
      nuevoUsername: this.nuevoUsername.value,
      nuevoCharge: this.nuevoCharge.value
    };

    let loader = this.loading.create({
      content: "Procesando Solicitud...",
    });

    loader.present().then(() => {
      this.http.post('http://10.70.10.22/IonicApp/edit_user.php', data, options)
        .map(res => res.json())
        .subscribe(res => {

          loader.dismiss();
          if (res == "success") {
            this.showToast("Modificado Exitosamente");
          } else {
            this.showToast("Ocurrió un error, contacte a IT porfavor");
            console.log(res);
          }
        });
    });
  }

  showToast(message) {
    let toast = this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  getUsers() {
    this.httpC.get("http://10.70.10.22/IonicApp/json_fetch_charge.php").subscribe(userData => {
      this.charges = userData;
      console.log(userData);
    }, err => {
      console.log(err);
    });
  }

}
