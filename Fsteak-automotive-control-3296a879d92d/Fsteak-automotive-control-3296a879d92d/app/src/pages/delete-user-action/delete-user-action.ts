import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { RequestOptions, Headers } from '@angular/http';
import { Http } from '@angular/http';
import { AdminPage } from '../admin/admin';

@IonicPage()
@Component({
  selector: 'page-delete-user-action',
  templateUrl: 'delete-user-action.html',
})
export class DeleteUserActionPage {
  //Variables para almacenar valores de la vista anterior
  fullname: any;
  username: any;

  element: any;

  ///ViewChild para asignar valores a textbox de la vista en HTML u obtenerlos
  @ViewChild("nuevoFullname") nuevoFullname;
  @ViewChild("nuevoUsername") nuevoUsername;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private http: Http, public loading: LoadingController, public toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeleteUserActionPage');
  }

  ngOnInit(){
    //Obtener los parametros desde la vista
    this.fullname = this.navParams.get('name');
    this.username = this.navParams.get('email');
  }

  //Creación de cabeceras y objetos para realizar la consulta
  confirnmDeleteUser() {
    //Creacion de las cabeceras para la solicitud CORS
    var headers = new Headers();

    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    //Creacion de objeto para ser enviado al archivo PHP y realizar la consulta
    let data = {
      fullname: this.fullname,
      username: this.username,

      nuevoFullname: this.nuevoFullname.value,
      nuevoUsername: this.nuevoUsername.value
    };

    let loader = this.loading.create({
      content: "Procesando Solicitud...",
    });

    loader.present().then(() => {
      this.http.post('http://10.70.10.22/IonicApp/delete_user.php', data, options)
      .map(res => res.json())
      .subscribe(res => {

        loader.dismiss()
        if(res == "success"){
          this.showToast("Usuario Borrado");
        } else{
          this.showToast("Ocurrió un error, contacte a IT porfavor");
        }
      });
    });
    this.navCtrl.setRoot(AdminPage);
  }

  //Metodo para mostrar la notifiacion TOAST
  showToast(message){
    let toast = this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  /*
    Metodo de confirmacion de borrado de usuario, este metodo es el que se llama 
    con el boton "borrar" de la vista en HTML
  */
  deleteUser(){
    let alert = this.alertCtrl.create({
      title: "¿Seguro que desea borrar este usuario?",
      message: "Los cambios no podrán deshacerse.",
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'BORRAR',
          handler: () => {
            this.confirnmDeleteUser();
          }
        }
      ]
    });
    alert.present();
  }

}
