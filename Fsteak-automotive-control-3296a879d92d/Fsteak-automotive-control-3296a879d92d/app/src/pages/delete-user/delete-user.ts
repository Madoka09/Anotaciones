import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { DeleteUserActionPage } from '../delete-user-action/delete-user-action';
import { EditUserActionPage } from '../edit-user-action/edit-user-action';

@IonicPage()
@Component({
    selector: 'page-delete-user',
    templateUrl: 'delete-user.html',
})
export class DeleteUserPage {

    //arrlegos para guardar la información que se recibe de los metodos para obtener JSON
    elements: any = [];
    element: any = [];
    
    items: any = [];
    constructor(public navCtrl: NavController, public navParams: NavParams, public httpC: HttpClient, public http: Http, public toast: ToastController) {
        /*
            El elemento "expandable", permite expandir tantos elementos { expandable: true }, como 
            sea posible, por lo que en este metodo, se insertan tantos de esos elementos, como usuarios
            existan.
        */
        this.httpC.get("http://10.70.10.22/IonicApp/json_read.php").subscribe(data => {
            this.elements = data;
            this.element = [

            ];

            for (let i = 1; i <= this.elements.length; i++) {
                var item2 = { expandable: false }
                this.element.push(item2)

                console.log(this.element)

            }
        });


    }

    ionViewDidLoad() {
        this.getData();
        console.log('ionViewDidLoad DeleteUserPage');
    }

    ionViewWillEnter(){
        //Obtener informacion de usuarios, tan pronto, cargue la pagina
        this.getData();
    }

    //metodo para obtener usuarios y almacenarlos en el arreglo "elements"
    getData() {
        this.httpC.get("http://10.70.10.22/IonicApp/json_fetch_user.php").subscribe(data => {
            this.elements = data;
            console.log(data);
        }, err => {
            console.log(err);
        });
    }

    /*
        Funcion perteneciente al elemento "expandable", se encarga de asignar un elemento dado
        al area expandible del mismo.
    */
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

    //Metodo para borrar un usuario, se obtiene el JSON y se envia a la pagina de confirmacion de borrado
    deleteAction(element){
        this.navCtrl.push(DeleteUserActionPage, element);
    }

    editAction(element){
        this.navCtrl.push(EditUserActionPage, element);
    }

}
