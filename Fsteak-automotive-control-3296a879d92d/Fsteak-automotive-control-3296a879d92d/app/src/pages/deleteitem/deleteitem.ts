import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { RequestOptions, Headers } from '@angular/http';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-deleteitem',
  templateUrl: 'deleteitem.html',
})
export class DeleteitemPage {
  //Variables para almacenar los datos para eliminar los Item
  nombre: any;
  codigo: any;
  id: any;

  element: any;

  //Metodos para leer o asignar valores a los textbox de la vista en HTML
  @ViewChild("nuevoNombre") nuevoNombre;
  @ViewChild("nuevoCodigo") nuevoCodigo;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private http: Http, public loading: LoadingController, public toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeleteitemPage');
  }

  ngOnInit() {
    //Realizar asignacion de parametros.
    this.nombre = this.navParams.get('nombre');
    this.codigo = this.navParams.get('codigo');
    this.id = this.navParams.get('id');
  }

  //Metodo de confirmacion para eliminar elemento
  delete(){
    let alert = this.alertCtrl.create({
      title: "¿Seguro que desea borrar este elemento?",
        message: "Los cambios no podrán deshacerse.",
        buttons: [
          {
            text: 'Cancelar',
          },
          {
            text: 'BORRAR',
            handler: () =>{
              this.confirmDelete();
            }
          }
        ]
      });
    alert.present();
  }

  //Metodo para realizar eliminacion de elementos, es llamado con el metodo "delete"
  confirmDelete() {
    var headers = new Headers();

    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let data = {
      nombre: this.nombre,
      codigo: this.codigo,
      id: this.id,

      nuevoNombre: this.nuevoNombre.value,
      nuevoCodigo: this.nuevoCodigo.value,
    };

    let loader = this.loading.create({
      content: "Procesando Solicitud...",
    });

    loader.present().then(() => {
      this.http.post('http://10.70.10.22/IonicApp/delete_stock.php', data, options)
        .map(res => res.json())
        .subscribe(res => {

          loader.dismiss()
          if (res == "success") {
            this.showToast("Campo Borrado");
            this.navCtrl.popToRoot();
          } else {
            this.showToast("Ocurrió un error, contacte a IT porfavor");
          }

        });
    });
  }

  //metodo para mostrar notificacion del tipo TOAST
  showToast(message) {
    let toast = this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}

