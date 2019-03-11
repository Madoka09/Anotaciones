import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {
  //Variables en que se guardan los elementos en formato JSON recibidos
  element: any = {};
  elements: any = [];

  //Variables para insertar elemento nuevo
  username: any = [];
  providers: any = [];
  date: any;
  todayDate: any;

  //Variables para generar FIFO
  incomeCount: any;
  datearr: any = [];
  dia: any;
  mes: any;
  year: any;
  generatedFifo: any;
  @ViewChild('nuevoFIFO') nuevoFIFO;
  @ViewChild('dateVal') dateVal;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toast: ToastController, public http: Http, public httpC: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
    //Obtener usuarios en JSON al Inicio
    this.getUsers();

    //Obtener Proveedores en JSON al inicio
    this.getProviders();

    //Obtener lista de stock al inicio
    this.getStock();

    //Inicializar Fecha
  }

  //Metodo para insertar elemento nuevo en la base de datos
  add() {
    //Llamar funcion para generación de FIFO
    this.generateFifo();

    //Insertar FIFO generado con la funcion anterior a la cadena JSON
    this.element.fifo = this.generatedFifo;

    this.element.action = "insertItem";
    this.http.post("http://10.70.10.22/IonicApp/post_one.php", this.element).subscribe(data => {
      console.log(data);
      let result = JSON.parse(data["_body"]);
      if (result.status == "success") {
        this.showToast("Insertado con Exito");
        this.navCtrl.popToRoot();
      }
      else {
        this.showToast("Algo anda mal, contacte a IT, Porfavor");
      }
    }, err => {
      console.log(err);
    });
  }

  //Obtener lista de usuarios para elemento desplegable "Añadido Por:"
  getUsers() {
    this.httpC.get("http://10.70.10.22/IonicApp/json_fetch_user.php").subscribe(userData => {
      this.username = userData;
      console.log(userData);
    }, err => {
      console.log(err);
    });
  }

  //Obtener lista de proveedores para elemento: "Proveedor"
  getProviders() {
    this.httpC.get("http://10.70.10.22/IonicApp/json_fetch_providers.php").subscribe(providerData => {
      this.providers = providerData;
      console.log(providerData);
    }, err => {
      console.log(err);
    });
  }

  //Obtener todo el stock disponible al momento
  getStock(){
    this.httpC.get("http://10.70.10.22/IonicApp/json_read.php").subscribe(stockData =>{
      this.elements = stockData;
      console.log(stockData);
    }, err => {
      console.log(err);
    })
  }

  //Funcion para invocar una notificacion del tipo Toast, el mensaje se declara al momento de usar
  showToast(message) {
    let toast = this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  generateFifo() {
    /*
      Obtener Fecha del equipo, e insertarla a un array, despues hacer un split de los elementos 
      con el operador de "/" para insertarlos en el array "splitted"
    */
    var timeNow = new Date().toLocaleDateString('ddMMyyyy');
    this.datearr.push(timeNow);
    var splitted = [];
    splitted = this.datearr[0].split("/")

    //Convertir datos del array a enteros
    this.dia = parseInt(splitted[0]);
    this.mes = parseInt(splitted[1]);

    //Igualar la entrada del textbox "FIFO" a variable para generacion de fifo, se utiliza despúes
    this.incomeCount = this.nuevoFIFO.value;

    //Eliminar dos digitos a la variable de año, para dejar el formato de fecha como "yy"
    this.year = parseInt(splitted[2]);
    var newYear = JSON.stringify(this.year).substr(-2);

    //Realizar la generacion de FIFO
    //ADVERTENCIA: UN MONTON DE IF ANIDADO

    //FIFO temporal para terminar el año
    if (this.dia <= 15 && this.mes == 12 && newYear == "18") {
      //Los valores para la variable "generatedFifo" deben pasarse como String
      this.generatedFifo = (`${this.incomeCount}-S${newYear}`)
      console.log("FIFO: " + this.generatedFifo);
    } else if (this.dia >= 16 && this.mes == 12 && newYear == "18") {
      this.generatedFifo = (`${this.incomeCount}-T${newYear}`)
      console.log("FIFO: " + this.generatedFifo);
    } else {
      console.log("Solo valido en 2018, pasando al metodo permanente")
      //Entrando a 2019, se dejará de generar fifo, habilitar este metodo:
      if (this.dia <= 15 && this.mes == 3) {
        console.log("El dia es menor o igual a 15");

        //Crear FIFO
        this.generatedFifo = (`${this.incomeCount}-E${newYear}`);
        console.log("FIFO: " + this.generatedFifo);

      } else if (this.dia >= 16 && this.mes == 3) {
        console.log("El dia es 16 o mayor");

        //Crear FIFO
        this.generatedFifo = (`${this.incomeCount}-F${newYear}`);
        console.log("FIFO: " + this.generatedFifo)
      } else if (this.dia <= 15 && this.mes == 4) {

        //Crear FIFO
        this.generatedFifo = (`${this.incomeCount}-G${newYear}`);
        console.log("FIFO: " + this.generatedFifo);
      } else if (this.dia >= 16 && this.mes == 4) {

        //Crear FIFO
        this.generatedFifo = (`${this.incomeCount}-H${newYear}`);
        console.log("FIFO: " + this.generatedFifo);
      } else if (this.dia <= 15 && this.mes == 5) {

        //Crear FIFO
        this.generatedFifo = (`${this.incomeCount}-I${newYear}`);
        console.log("FIFO: " + this.generatedFifo);
      } else if (this.dia >= 16 && this.mes == 5) {

        //Crear FIFO
        this.generatedFifo = (`${this.incomeCount}-J${newYear}`);
        console.log("FIFO: " + this.generatedFifo);
      } else if (this.dia <= 15 && this.mes == 6) {
        //Crear FIFO
        this.generatedFifo = (`${this.incomeCount}-K${newYear}`);
        console.log("FIFO: " + this.generatedFifo);
      } else if (this.dia >= 16 && this.mes == 6) {

        //Crear FIFO
        this.generatedFifo = (`${this.incomeCount}-L${newYear}`);
        console.log("FIFO: " + this.generatedFifo);
      } else if (this.dia <= 15 && this.mes == 7) {

        //Crear FIFO
        this.generatedFifo = (`${this.incomeCount}-M${newYear}`);
        console.log("FIFO: " + this.generatedFifo);
      } else if (this.dia >= 16 && this.mes == 7) {

        //Crear FIFO
        this.generatedFifo = (`${this.incomeCount}-N${newYear}`);
        console.log("FIFO: " + this.generatedFifo);
      } else if (this.dia <= 15 && this.mes == 8) {
        //Crear FIFO
        this.generatedFifo = (`${this.incomeCount}-O${newYear}`);
        console.log("FIFO: " + this.generatedFifo);
      } else if (this.dia >= 16 && this.mes == 8) {
        //Crear FIFO
        this.generatedFifo = (`${this.incomeCount}-P${newYear}`);
        console.log("FIFO: " + this.generatedFifo);
      } else if (this.dia <= 15 && this.mes == 9) {
        //Crear FIFO
        this.generatedFifo = (`${this.incomeCount}-Q${newYear}`);
        console.log("FIFO: " + this.generatedFifo);
      } else if (this.dia >= 16 && this.mes == 9) {
        //Crear FIFO
        this.generatedFifo = (`${this.incomeCount}-R${newYear}`);
        console.log("FIFO: " + this.generatedFifo);
      } else if (this.dia <= 15 && this.mes == 10) {
        //Crear FIFO
        this.generatedFifo = (`${this.incomeCount}-S${newYear}`);
        console.log("FIFO: " + this.generatedFifo);
      } else if (this.dia >= 16 && this.mes == 10) {
        //Crear FIFO
        this.generatedFifo = (`${this.incomeCount}-T${newYear}`);
        console.log("FIFO: " + this.generatedFifo);
      } else if (this.dia <= 15 && this.mes == 11) {
        //Crear FIFO
        this.generatedFifo = (`${this.incomeCount}-U${newYear}`);
        console.log("FIFO: " + this.generatedFifo);
      } else if (this.dia >= 16 && this.mes == 11) {
        //Crear FIFO
        this.generatedFifo = (`${this.incomeCount}-V${newYear}`);
        console.log("FIFO: " + this.generatedFifo);
      } else if (this.dia <= 15 && this.mes == 12) {
        //Crear FIFO
        this.generatedFifo = (`${this.incomeCount}-W${newYear}`);
        console.log("FIFO: " + this.generatedFifo);
      } else if (this.dia >= 16 && this.mes == 12) {
        //Crear FIFO
        this.generatedFifo = (`${this.incomeCount}-X${newYear}`);
        console.log("FIFO: " + this.generatedFifo);
      } else if (this.dia <= 15 && this.mes == 1) {
        this.generatedFifo = (`${this.incomeCount}-A${newYear}`);
        console.log("FIFO: " + this.generatedFifo);
      } else if (this.dia >= 16 && this.mes == 1) {
        this.generatedFifo = (`${this.incomeCount}-B${newYear}`);
        console.log("FIFO: " + this.generatedFifo);
      } else if (this.dia <= 15 && this.mes == 2) {
        this.generatedFifo = (`${this.incomeCount}-C${newYear}`);
        console.log("FIFO: " + this.generatedFifo);
      } else if (this.dia >= 16 && this.mes == 2) {
        this.generatedFifo = (`${this.incomeCount}-D${newYear}`);
        console.log("FIFO: " + this.generatedFifo);
      }
    }
    console.log(newYear)
  }

}
