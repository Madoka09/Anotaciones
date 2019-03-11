import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { provideModuleLoader } from 'ionic-angular/umd/util/module-loader';

@IonicPage()
@Component({
  selector: 'page-product-entry',
  templateUrl: 'product-entry.html',
})
export class ProductEntryPage {

  nombre: any;
  codigo: any;
  cantidad: any;
  fifo: any;
  id: any;
  providerData: any = [];

  oldCantidad: any;

  incomeCount: any;

  datearr: any = [];
  todayDate: any;

  dia: any;
  mes: any;
  year: any;

  generatedFifo: any;

  @ViewChild("nuevaCantidad") nuevaCantidad;
  @ViewChild("nuevoFIFO") nuevoFIFO;
  @ViewChild("proveedor") proveedor;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: Http, public alertCtrl: AlertController,
    public loading: LoadingController, public toast: ToastController,
    private httpC: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductEntryPage');
  }

  ngOnInit() {
    //Parametros a Mostrar
    this.nombre = this.navParams.get('nombre');
    this.codigo = this.navParams.get('codigo');
    this.fifo = this.navParams.get('fifo');
    this.id = this.navParams.get('id');

    //Parametros viejos
    this.oldCantidad = this.navParams.get('cantidad');

    //Inicializar Fecha
    this.todayDate = new Date();
  }

  ionViewWillEnter(){
    //Obtener informacion de los proveedores
    this.getProviders();
  }

  doMath() {
    let result = (parseInt(this.oldCantidad) + parseInt(this.nuevaCantidad.value));
    this.cantidad = result;
    console.log(this.cantidad);

    //Generar FIfo
    this.generateFifo();
  }

  getProviders(){
    this.httpC.get("http://10.70.10.22/IonicApp/json_fetch_providers.php").subscribe(data =>{
      this.providerData = data;
      console.log(data)
    }, err => {
      console.log(err)
    })
  }

  generateEntry() {
    //Obtener cantidades
    this.doMath();

    //Recibir informacion
    parseInt(this.nuevaCantidad.value);

    //Comprobar los campos
    if (this.nuevaCantidad.value == "" || this.nuevaCantidad.value == String) {
      let alert = this.alertCtrl.create({
        title: "Atención",
        message: "No especificó la cantidad ó el valor es invalido",
        buttons: ['OK']
      });
      alert.present();
    } else if (this.nuevaCantidad.value == 0) {
      let alert = this.alertCtrl.create({
        title: "Atención",
        message: "No puede realizar una entrada por 0",
        buttons: ['OK']
      });
      alert.present();
    } else {
      var headers = new Headers();

      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });

      let data = {
        nombre: this.nombre,
        codigo: this.codigo,
        newFifo: this.generatedFifo,
        newCantidad: this.nuevaCantidad.value,
        proveedor: this.proveedor.value,
        id: this.id,
        fecha: (this.todayDate.getFullYear() + '-' + ((this.todayDate.getMonth() + 1)) + '-' + this.todayDate.getDate() + ' ' +this.todayDate.getHours() + ':' + this.todayDate.getMinutes()+ ':' + this.todayDate.getSeconds())
      };

      let loader = this.loading.create({
        content: "Procesando Solicitud..."
      });

      loader.present().then(() => {
        this.http.post('http://10.70.10.22/IonicApp/json_entry_stock.php', data, options)
          .map(res => res.json())
          .subscribe(res => {

            loader.dismiss()
            if (res == "success") {
              this.showToast("Entrada Realizada con Éxito");
              this.navCtrl.popToRoot();
            } else {
              this.showToast("Ocurrió un error, contacte a IT porfavor");
            }
          });
      });
    }
  }

  generateFifo() {
    //Procesar Fecha
    var timeNow = new Date().toLocaleDateString('ddMMyyyy');
    this.datearr.push(timeNow);
    var splitted = [];
    splitted = this.datearr[0].split("/")

    //Convertir fecha a numeros
    this.dia = parseInt(splitted[0]);
    this.mes = parseInt(splitted[1]);

    //Contador de numero de entradas
    this.incomeCount = this.nuevoFIFO.value;

    //Restar dos digitos al year
    this.year = parseInt(splitted[2]);
    var newYear = JSON.stringify(this.year).substr(-2);

    //Realizar la generacion de FIFO
    //ADVERTENCIA: UN MONTON DE IF ANIDADO

    //FIFO temporal para terminar el año
    if (this.dia <= 15 && this.mes == 12 && newYear == "18") {
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

  showToast(message) {
    let toast = this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
