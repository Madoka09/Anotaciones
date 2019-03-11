import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AdminPage } from '../admin/admin';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { DashboardPage } from '../dashboard/dashboard';
import { GuestViewPage } from '../guest-view/guest-view';


@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    @ViewChild("username") username;
    @ViewChild("password") password;
    data: string;
    constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
        public menuCtrl: MenuController, private http: Http, public loading: LoadingController, public toast: ToastController) {
        this.menuCtrl.enable(false, 'rightMenu');
    }

    ionViewDidLoad() {

    }

    to_Production() {
        this.ionViewDidLoad();
    }

    to_Admin() {
        this.navCtrl.setRoot(AdminPage);
    }

    login() {
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
                var headers = new Headers();

                headers.append('Accept', 'application/json');
                headers.append('Content-Type', 'application/json');

                let options = new RequestOptions({ headers: headers });
                let data = {
                    username: this.username.value,
                    password: this.password.value,
                };

                let loader = this.loading.create({
                    content: "Procesando Solicitud...",
                });
                loader.present().then(() => {
                    this.http.post('http://10.70.10.22/IonicApp/login.php', data, options)
                        .map(res => res.json())
                        .subscribe(res => {
                            console.log(res)
                            console.log(data)
                            console.log(options)
                            loader.dismiss()

                            if (res == "operador") {
                                this.showToast(`Bienvenido ${this.username.value}`);
                                this.navCtrl.setRoot(DashboardPage);
                            }
                            else if (res == "admin") {
                                this.showToast(`Bienvenido ${this.username.value}`);
                                this.navCtrl.setRoot(AdminPage);
                            }
                            else if (res == "invitado") {
                                this.showToast(`Bienvenido ${this.username.value}`);
                                this.navCtrl.setRoot(GuestViewPage);
                            }
                            else {
                                let alert = this.alertCtrl.create({
                                    title: "Error",
                                    message: "Tu nombre de usuario o contraseña es invalido",
                                    buttons: ['OK']
                                });
                                alert.present();
                            }
                        });
                });
            }
        }
    }

    showToast(message) {
        let toast = this.toast.create({
            message: message,
            duration: 2000
        });
        toast.present();
    }
}
