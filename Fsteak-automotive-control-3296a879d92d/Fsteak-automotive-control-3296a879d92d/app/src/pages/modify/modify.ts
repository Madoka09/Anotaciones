import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { RequestOptions, Headers } from '@angular/http';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-modify',
  templateUrl: 'modify.html',
})
export class ModifyPage {

  nombre: any;
  codigo: any;
  descripcion: any;

  oldNombreValue: any;
  oldCodigoValue: any;
  oldDescripcionValue: any;

  element: any;

  username: any;
  providers: any;

  @ViewChild("nuevoNombre") nuevoNombre;
  @ViewChild("nuevoCodigo") nuevoCodigo;

  @ViewChild("nuevoDescripcion") nuevoDescripcion;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private http: Http, public loading: LoadingController, public toast: ToastController, private httpC: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyPage');
  }

  ngOnInit() {
    //Parametros nuevos
    this.nombre = this.navParams.get('nombre');
    this.codigo = this.navParams.get('codigo');
    this.descripcion = this.navParams.get('descripcion');
    //Parametros Viejos
    this.oldNombreValue = this.navParams.get('nombre');
    this.oldCodigoValue = this.navParams.get('codigo');
    this.oldDescripcionValue = this.navParams.get('descripcion');
  }

  editar() {
    //Comprobar campos, son muchos >.<
    if (this.nuevoNombre.value == "") {
      let alert = this.alertCtrl.create({
        title: "Atención",
        message: "El campo nombre está vacio",
        buttons: ['OK']
      });
      alert.present();
    } else {
      if (this.nuevoCodigo.value == "") {
        let alert = this.alertCtrl.create({
          title: "Atención",
          message: "El campo de codigo está vacio",
          buttons: ['OK']
        });
        alert.present();
      } else {
        if (this.nuevoDescripcion.value == "") {
          let alert = this.alertCtrl.create({
            title: "Atención",
            message: "El campo Descripcion está vacio",
            buttons: ['OK']
          });
          alert.present();
        } else {
          var headers = new Headers();

          headers.append("Accept", 'application/json');
          headers.append('Content-Type', 'application/json');
          let options = new RequestOptions({ headers: headers });

          let data = {
            nombre: this.oldNombreValue,
            codigo: this.oldCodigoValue,

            nuevoNombre: this.nuevoNombre.value,
            nuevoCodigo: this.nuevoCodigo.value,
            nuevoDescripcion: this.nuevoDescripcion.value,
          };

          let loader = this.loading.create({
            content: "Procesando Solicitud...",
          });

          loader.present().then(() => {
            this.http.post('http://10.70.10.22/IonicApp/edit_stock.php', data, options)
              .map(res => res.json())
              .subscribe(res => {

                loader.dismiss()
                if (res == "success") {
                  this.showToast("Modificado Exitosamente");
                  this.navCtrl.popToRoot();
                } else {
                  this.showToast("Ocurrió un error, contacte a IT porfavor");
                }
              });
          });
        }
      }
    }
    this.navCtrl.popToRoot();
  }

  showToast(message) {
    let toast = this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
