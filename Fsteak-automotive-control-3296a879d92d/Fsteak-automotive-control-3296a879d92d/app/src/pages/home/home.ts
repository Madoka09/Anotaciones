import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';
import { ModifyPage } from '../modify/modify';
import { DeleteitemPage } from '../deleteitem/deleteitem';
import { GenerateqrPage } from '../generateqr/generateqr';
import { DeparturesPage } from '../departures/departures';
import { Events } from 'ionic-angular';
import { RequestOptions } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ProductEntryPage } from '../product-entry/product-entry';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    searchTerm: any;
    result: any;
    items: any;

    //Elementos del stock
    restoredElements: any = [];
    elements: any = [];
    element: any = [];

    //arrar para mostrar nueva informacion
    newData: any = [];
    todayDate: any;

    //Elementos de la tabla "Entradas"
    departureData: any = [];

    jsonEntry: any;
    jsonDeparture: any;

    constructor(public navCtrl: NavController, private httpC: HttpClient, private http: Http,
        public toast: ToastController, public events: Events, public navParams: NavParams,
        public loading: LoadingController, public alertCtrl: AlertController) {
        //Obtener numero de elementos para el elemento <expandable></expandable>
        this.httpC.get("http://10.70.10.22/IonicApp/json_read.php").subscribe(data => {
            this.elements = data;
            this.element = [];
            console.log("first Request");
            this.httpC.get("http://10.70.10.22/IonicApp/json_read_departures.php").subscribe(data2 => {
                this.departureData = data2;
                console.log("second Request");
                console.log(data2);
                for (let i = 0; i <= this.elements.length - 1; i++) {
                    if (this.elements[i].codigo == this.departureData[i].codigo) {
                        var entradas = parseInt(this.elements[i].cantidad);
                        var salidas = parseInt(this.departureData[i].Total);

                        var nuevo = (entradas - salidas);

                        this.newData.push({
                            cantidad: nuevo,
                            descripcion: this.elements[i].descripcion,
                            codigo: this.elements[i].codigo,
                            fifo: this.elements[i].codigof,
                            creado: this.elements[i].created_at,
                            id: this.elements[i].id,
                            nivel: this.elements[i].nivel,
                            pasillo: this.elements[i].pasillo,
                            rack: this.elements[i].rack,
                            proveedor: this.elements[i].provedor,
                            nombre: this.elements[i].nombre,
                        })

                    } else {
                        console.log("Error Generando JSON dinamico");
                    }
                }
            }, err => {
                console.log(err);
            })

            for (let i = 1; i <= this.elements.length; i++) {
                //empujar datos al array
                var item2 = { expandable: false }
                this.element.push(item2);
                console.log(this.element);
            }

        });
    }

    ionViewDidLoad() {
        //Obtener informacion al cargar la vista
        //this.getData()
        //this.doJsonMath();
    } 

    ionViewWillEnter() {
        //Obtener informacion al regresar a la vista
        //this.getData();
        //this.doJsonMath();
    }

    //Obtener la informacion de los productos desde la base de datos
    getData() {
        this.httpC.get("http://10.70.10.22/IonicApp/json_read.php").subscribe(data => {
            this.elements = data;
            console.log(data);
        }, err => {
            console.log(err);
        });
    }

    //Obtener Datos
    getDataDeparture() {
        this.httpC.get("http://10.70.10.22/IonicApp/json_read_departures.php").subscribe(data2 => {
            this.departureData = data2;
            console.log(data2);
        }, err => {
            console.log(err);
        })
    }

    //Crear nuevo Json en base a las consultas de la base de datos.
    doJsonMath() {
        this.getData();
        this.getDataDeparture();
        console.log(this.elements.length);

        for (let i = 0; i <= this.elements.length - 1; i++) {
            if (this.elements[i].codigo == this.departureData[i].codigo) {
                var entradas = parseInt(this.elements[i].cantidad);
                var salidas = parseInt(this.departureData[i].Total);

                var nuevo = (entradas - salidas);

                this.newData.push({
                    cantidad: nuevo,
                    descripcion: this.elements[i].descripcion,
                    codigo: this.elements[i].codigo,
                    fifo: this.elements[i].codigof,
                    creado: this.elements[i].created_at,
                    id: this.elements[i].id,
                    nivel: this.elements[i].nivel,
                    pasillo: this.elements[i].pasillo,
                    rack: this.elements[i].rack,
                    proveedor: this.elements[i].provedor,
                    nombre: this.elements[i].nombre,
                })

            } else {
                   console.log("Error generando JSON dinamico");
            }
        }
    }

    //Ir a vista para añadir item
    addItem() {
        this.navCtrl.push(AddItemPage);
    }

    //Funcion para filtrar los elementos al componente de <expandable></expandable>
    expandItem(element) {
        this.newData.map((listItem) => {
            if (element == listItem) {
                listItem.expanded = !listItem.expanded;
            } else {
                listItem.expanded = false;
            }
            return listItem;
        });
    }

    //Ir a vista de editar elemento
    editView(element) {
        this.navCtrl.push(ModifyPage, element);
    }

    //Ir a vista de borrar elemento
    deleteView(element) {
        this.navCtrl.push(DeleteitemPage, element);
    }

    //Ir a vista de CodigosQR
    generateQR(element) {
        this.navCtrl.push(GenerateqrPage, element);
    }

    //Ir a vista de salidas
    departureView(element) {
        this.navCtrl.push(DeparturesPage, element);
    }

    //ir a vista de entradas
    productEntry(element) {
        this.navCtrl.push(ProductEntryPage, element);
    }

    //Enviar a salida multiple
    sendMultipleDepart(element) {
        var name = element.nombre;
        var code = element.codigo;
        var qty = element.cantidad;
        var id = element.id;

        var headers = new Headers();

        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        let data = {
            id: id,
            name: name,
            code: code,
            qty: qty,
        };
        let loader = this.loading.create({
            content: 'Procesando Solicitud...'
        });
        loader.present().then(() => {
            this.http.post('http://10.70.10.22/IonicApp/json_departure_reciever.php', data, options)
                .map(res => res.json())
                .subscribe(res => {
                    if (res == "success") {
                        this.showToast(`Elemento ${name} enviado a salida multiple`);
                    }
                })
        });
        loader.dismiss();
        console.log(id);
        console.log(name);
        console.log(code);
        console.log(qty);
    }

    //Funcion para llamar al metodo "getData()" para recargar la pagina
    refresh(refresher) {
        console.log("Empieza Refresh", refresher);
        this.getData();

        setTimeout(() => {
            console.log("Termina Refresh");
            refresher.complete();
        }, 2000);
    }

    /*
        --ELEMENTOS PARA LA BUSQUEDA DE DATOS
    */

    //Obtener texto de la textbox y hacer la busqueda
    getItems(ev: any) {
        //Obtener valor del text box
        let val = ev.target.value;

        //Comprobar si es un nuemero
        if (parseInt(val)) {
            console.log("INT DETECTED");
            this.newData = this.newData.filter((elements) => {
                return (elements.codigo.includes(parseInt(val)));
            });
        } else {
            //Comprobar si es una cadena de texto
            if (val && val.trim() != '') {
                console.log("STRING DETECTED")
                this.newData = this.newData.filter((elements) => {
                    return (elements.nombre.toLowerCase().includes(val.toLowerCase()))
                });
                //En caso de pulsar cancel, reestablecer los cambios
            } else if (val == '' || val == undefined) {
                console.log("pulsaste cancel");
                this.newData.length = 0;
                this.doJsonMath();
            }
        }

    }

    fecha(){
        this.todayDate = new Date();
        console.log((this.todayDate.getFullYear() + '-' + ((this.todayDate.getMonth() + 1)) + '-' + this.todayDate.getDate() + ' ' +this.todayDate.getHours() + ':' + this.todayDate.getMinutes()+ ':' + this.todayDate.getSeconds()));
    }

    //Mostrar notificaciones del tipo toast
    showToast(message) {
        let toast = this.toast.create({
            message: message,
            duration: 2000
        });
        toast.present();
    }

}
