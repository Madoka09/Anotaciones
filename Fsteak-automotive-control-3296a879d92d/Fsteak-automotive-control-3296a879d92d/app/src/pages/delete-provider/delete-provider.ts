import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { RequestOptions, Headers } from '@angular/http';
import { Http } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-delete-provider',
  templateUrl: 'delete-provider.html',
})
export class DeleteProviderPage {

  //Variables para nombres de proveedor
  nombreProveedor: any;
  oldProveedorValue: any;
  element: any;

  //Leer el valor de la vista HTML y pasarla a la variable "nuevoProveedor"
  @ViewChild("nuevoProveedor") nuevoProveedor;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private http: Http, public loading: LoadingController, public toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeleteProviderPage');
  }

  ngOnInit(){
    //En incio asignar la variable nombreProveedor al valor que se tenga del @ViewChild
    this.nombreProveedor = this.navParams.get('nombre');

    //Variable de control para borrar elementos
    this.oldProveedorValue = this.navParams.get('nombre');
  }

  //Metodo para borrar elementos
  borrar(){
    //Creacion de headers para solicitudes CORS
    var headers = new Headers();

    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    /*
      Se crea un objeto llamado "data" que contiene la información que se obtiene desde un 
      textbox
    */ 
    let data = {
      nombreProveedor: this.oldProveedorValue,

      nuevoProveedor: this.nombreProveedor.value
    };

    //Mostrar un cuadro que diga "Procesando Solicitud", con la libreria Loader de Ionic
    let loader = this.loading.create({
      content: "Procesando Solicitud...",
    });

    //Realizar el request, al archivo en PHP que hace la consulta
    loader.present().then(() => {
      this.http.post('http://10.70.10.22/IonicApp/delete_provider.php', data, options)
      .map(res => res.json())
      .subscribe(res =>{
        
        loader.dismiss()
        if(res == "success"){
          this.showToast("Campo Borrado");
        } else{
          this.showToast("Ocurrió un error, contacte a IT porfavor");
        }
      });
    });
  }

  //Metodo de control para borrar algún elemento, se ejecuta antes que el borrar.
  confirmDelete(){
    let alert = this.alertCtrl.create({
      title: "¿Seguro que desea borrar este registro?",
      message: "Los cambios no podrán deshacerse.",
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'BORRAR',
          handler: () => {
            this.borrar();
          }
        }
      ]
    });
    alert.present();
  }

  showToast(message) {
    let toast = this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
