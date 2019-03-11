import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AdminPage } from '../admin/admin';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild("fullname") fullname;
  @ViewChild("username") username;
  @ViewChild("password") password;
  @ViewChild("passwordVerify") passwordVerify;
  @ViewChild("charge") charge;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private http: Http, public loading: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {
    if (this.username.value == "") {
      let alert = this.alertCtrl.create({
        title: "Atención",
        message: "El campo de Usuario está vacio",
        buttons: ['OK']
      });
      alert.present();
    } else {
      if (this.password.value == "") {
        let alert = this.alertCtrl.create({
          title: "Atención",
          message: "El campo de Contraseña está vacio",
          buttons: ['OK']
        });
        alert.present();
      } else {
        if (this.fullname.value == "") {
          let alert = this.alertCtrl.create({
            title: "Atención",
            message: "El campo de Contraseña está vacio",
            buttons: ['OK']
          });
          alert.present();
        } else {
          var headers = new Headers();

          headers.append("Accept", 'application/json');
          headers.append('Content-Type', 'application/json');
          let options = new RequestOptions({ headers: headers });
          let data = {
            username: this.username.value,
            password: this.password.value,
            passwordVerify: this.passwordVerify.value,
            fullname: this.fullname.value,
            charge: this.charge.value
          };
          let loader = this.loading.create({
            content: 'Procesando Solicitud...'
          });
          loader.present().then(() => {
            this.http.post('http://10.70.10.22/IonicApp/register.php', data, options)
              .map(res => res.json())
              .subscribe(res => {
                loader.dismiss()
                if (res == "Registro Exitoso") {
                  let alert = this.alertCtrl.create({
                    title: "Usuario creado con exito",
                    buttons: ['OK']
                  });
                  alert.present(),
                    this.navCtrl.setRoot(AdminPage);
                } if (res == "Existente") {
                  let alert = this.alertCtrl.create({
                    title: "El usuario ya existe, intente nuevamente",
                    buttons: ['OK']
                  });
                  alert.present();
                  this.navCtrl.setRoot(AdminPage);
                } if (res == "mismatch") {
                  let alert = this.alertCtrl.create({
                    title: "Las contraseñas no coinciden, intente nuevamente",
                    buttons: ['OK']
                  });
                  alert.present();
                  this.navCtrl.setRoot(AdminPage);
                } 
              })
          })
        }
      }
    }
  }
}