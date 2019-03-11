import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { RequestOptions, Headers } from '@angular/http';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-edit-provider',
  templateUrl: 'edit-provider.html',
})
export class EditProviderPage {

  nombreProveedor: any;

  oldProveedorValue: any;

  element: any;

  @ViewChild("nuevoProveedor") nuevoProveedor;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private http: Http, public loading: LoadingController, public toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProviderPage');
  }

  ngOnInit(){
    //Parametros Nuevos
    this.nombreProveedor = this.navParams.get('nombre');
    //Parametros Viejos
    this.oldProveedorValue = this.navParams.get('nombre');
  }

  editar(){
    //Comprobr el unico campo ;)

    if(this.nuevoProveedor.value == ""){
      let alert = this.alertCtrl.create({
        title: "Atención",
        message: "El campo de el nombre de proveedor está vacio",
        buttons: ['OK']
      });
      alert.present();
    } else{
      var headers = new Headers();

      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });

      let data = {
        nombreProveedor: this.oldProveedorValue,

        nuevoProveedor: this.nuevoProveedor.value
      };

      let loader = this.loading.create({
        content: "Procesando Solicitud...",
      });

      loader.present().then(() => {
        this.http.post('http://10.70.10.22/IonicApp/edit_provider.php', data, options)
        .map(res => res.json())
        .subscribe(res =>{

          loader.dismiss()
          if(res == "success"){
            this.showToast("Modificado Exitosamente");
          } else{
            this.showToast("Ocurrió un error, contacte a IT porfavor");
          }
        });
      });
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
