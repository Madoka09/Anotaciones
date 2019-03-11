import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { RequestOptions, Headers } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@IonicPage()
@Component({
  selector: 'page-multiple-departure',
  templateUrl: 'multiple-departure.html',
})
export class MultipleDeparturePage {
  //Inicializar contenedor de documento
  pdfObj = null;

  items: any;
  controlvar: boolean;
  //Elementos Iterables
  elements: any = [];
  element: any = [];

  //Variable para obtener valores actuales
  stockItems: any = [];

  //Guardar fecha
  todayDate: any;

  //Variable temporal para headers de tabla
  jsonExplo: any;
  //Variable de contenio fijo de Tabla
  values: any = [];
  //Elementos convertidos a string
  stringedElements: any;
  //Elementos de la tabla
  tableFirm: string = '';
  tableImport: string = '';
  //Elementos de cantidades
  quantity: any = [];
  //Variables iterables
  elementCodes: any = [];
  elementNames: any = [];
  elementQty: any = [];
  elementValues: any = [];
  elementId: any = [];
  departureVal: any;

  regularArr: any = [];

  createdJson: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpC: HttpClient, public toast: ToastController, public events: Events,
    public loading: LoadingController, private http: Http,
    private plt: Platform, private file: File, private fileOpener: FileOpener) {

    //Obtener numero de elementos para el elemento <expandable></expandable>
    this.httpC.get("http://10.70.10.22/IonicApp/json_departure_checker.php").subscribe(data => {
      this.elements = data;
      this.element = [];

      for (let i = 1; i <= this.elements.length; i++) {
        //empujar datos al array
        var item2 = { expandable: false }
        this.element.push(item2);
        console.log(this.element);
      }
    });

  }

  ngOnInit() {
    this.getData();
    this.getCurrentData();
    this.controlvar = false;
    this.elementValues.length = 0;

    this.todayDate = new Date();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MultipleDeparturePage');
  }

  //Obtener la informacion desde la base de datos
  getData() {
    this.httpC.get("http://10.70.10.22/IonicApp/json_departure_checker.php").subscribe(data => {
      this.elements = data;
      console.log(data);
    }, err => {
      console.log(err);
    });
  }

  //Obtener datos desde DB
  getCurrentData(){
    this.httpC.get("http://10.70.10.22/IonicApp/json_read.php").subscribe(dataStock => {
      this.stockItems = dataStock;
      console.log("Current Data var: " + JSON.stringify(dataStock));
    }, err => {
      console.log(err);
    });
  }

  splitValues() {
    for (let i = 0; i <= this.elements.length - 1; i++) {
      this.stringedElements = JSON.stringify(this.elements[i].temporal);
      var splittedArr = this.stringedElements.split(",");
      var code = splittedArr[1].replace(/"/g, "");
      var names = splittedArr[0].replace(/"/g, "");
      var qty = splittedArr[2].replace(/"/g, "");
      var id = splittedArr[3].replace(/"/g, "");
      this.elementId.push(id);
      this.elementCodes.push(code);
      this.elementNames.push(names);
      this.elementQty.push(qty);
      this.createdJson.push({ "id": this.elementId[i], "name": this.elementNames[i], "code": this.elementCodes[i], "qty": this.elementQty[i] });
    }

    console.log(this.createdJson);
    //console.log(this.stringedInput);
    console.log("Largo del Array" + this.elements.length);
    
  }

  recieveDepart() {
    this.splitValues();
    if (this.elementNames.length == 0) {
      this.showToast("No se han recibido peticiones");
      this.controlvar = false;
    } else {
      this.showToast("Peticiones Recibidas!");
      this.controlvar = true;
    }
  }

  clearArr() {
    if (this.elementCodes.length > 0) {
      this.elementCodes.length = 0;
      this.elementNames.length = 0;
      this.elementQty.length = 0;
      this.elementId.length = 0;
      console.log("Cleared Codes: " + this.elementCodes.length);
      console.log("Cleared Names: " + this.elementNames.length);
      console.log("Cleared Qty: " + this.elementQty.length);
    } else {
      this.showToast("¡No se han recibido elementos!");
    }
    this.elementCodes.length = 0;
    this.elementNames.length = 0;
    this.elementQty.length = 0;
    this.elementId.length = 0;
    this.showToast("Información limpiada satisfactoriamente");
    this.controlvar = false;
    this.truncate();
  }

  colConstructor() {
    //Insertar encabezados de tabla
    this.values.push(
      [
        { text: 'Cantidad' },
        { text: 'Articulo' },
        { text: 'Codigo' },
        { text: 'Firma' },
        { text: 'Importe' }
      ]
    );
    //Insertar contenidos en tabla
    for (let j = 0; j <= this.elements.length - 1; j++) {
      this.values.push(
        [
          { text: this.quantity[j] },
          { text: this.elementNames[j] },
          { text: this.elementCodes[j] },
          { text: this.tableFirm },
          { text: this.tableImport }
        ]
      );
    }
    console.log("Table contents: " + JSON.stringify(this.values));
  }

  truncate() {
    this.httpC.get("http://10.70.10.22/IonicApp/json_table_clearer.php").subscribe(data => {
      this.elements = data;
      console.log(data);
    }, err => {
      console.log(err);
    });
    console.log("La tabla se ha vaciado!");
    this.showToast("Se han vaciado las peticiones para salida multiple");
  }

  sendItem(element) {
    this.departureVal;
    this.elementValues.push({ "id": element.id, "codigo": element.code, "oldQty": element.qty, "newQty": this.departureVal });
    this.showToast(`A salida ${this.departureVal}, de ${element.name}`);
    console.log(this.elementValues);
    //crear variables
    this.quantity.push(this.departureVal)
    var code = element.code;
    var newQty = this.departureVal;
    var oldQty = element.qty;
    var id = element.id;
    //Hacer el query
    var headers = new Headers();

    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let data = {
      id: id,
      codigo: code,
      salidaNueva: newQty,
      salidaVieja: oldQty,
      date: (this.todayDate.getFullYear() + '-' + ((this.todayDate.getMonth() + 1)) + '-' + this.todayDate.getDate() + ' ' +this.todayDate.getHours() + ':' + this.todayDate.getMinutes()+ ':' + this.todayDate.getSeconds()),
    };

    let loader = this.loading.create({
      content: "Procesando Solicitud...",
    });

    loader.present().then(() => {
      this.http.post('http://10.70.10.22/IonicApp/json_departure_decrypter.php', data, options)
        .map(res => res.json())
        .subscribe(res => {

          loader.dismiss();
          if (res == "success") {
            this.showToast("Salida Generada");
          } else {
            this.showToast("Ocurrió un error, contacte a IT porfavor");
          }
        })
    })
    console.log(this.quantity)
    this.departureVal = '';
    this.createdJson.shift();
  }

  generatePDF() {
    //Construir array para tabla
    this.colConstructor();

    //Generacion de PDF
    var docDefinition = {
      content: [
        { text: 'ORDEN DE SALIDA', style: 'header', alignment: 'center' },
        { text: 'CA AUTOMOTIVE DURANGO', alignment: 'left' },
        { text: 'S. DE R.L. DE C.V', alignment: 'left' },
        { text: 'Fecha: ' + new Date().toLocaleDateString('ddMMyyyy'), alignment: 'right', style: 'date' },

        { lineHeight: 2, text: 'Se entrega a: ________________________________________________', alignment: 'left'},

        {
          columns: [
            { width: '*', text: '' },
            {
              width: 'auto',
              table: {
                headerRows: 1,
                body: this.values
              }
            },
            { width: '*', text: '' }
          ]
        }
      ]
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
    console.log(this.elementValues);
  }

  printPDF() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        //Guardar PDF en el directorio "data" de la app
        this.file.writeFile(this.file.dataDirectory, 'report.pdf', blob, { replace: true }).then(fileEntry => {
          //Abrir PDF con androide uwu
          this.fileOpener.open(this.file.dataDirectory + "report.pdf", 'application/pdf');
        });
      });
    } else {
      //si es un navegador, descargar en su lugar
      this.pdfObj.download();
    }
    this.clearArr();
  }

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

  showToast(message) {
    let toast = this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
