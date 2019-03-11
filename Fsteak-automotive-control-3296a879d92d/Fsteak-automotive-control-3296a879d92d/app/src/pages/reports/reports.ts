import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController, Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { HttpClient } from '@angular/common/http';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {
  pdfObj = null;
  //Elementos a iterar
  elements: any;
  //Arrays para construccion de headers en tabla
  nombre: any = [];
  cantidad: any = [];
  codigo: any = [];
  pasillo: any = [];
  rack: any = [];
  nivel: any = [];
  //Variable temporal para creacion de headers
  jsonExplo: any;
  //Valores de la tabla
  columns: any = [];
  values: any = [];

  departureData: any = [];
  newData: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient,
    public alertCtrl: AlertController,
    public loading: LoadingController, public toast: ToastController,
    private plt: Platform, private file: File, private fileOpener: FileOpener) {
  }
  ionViewDidLoad() {
    //Obtener informacion al cargar la vista
    this.getData();
    this.getDataDeparture();
  }

  ionViewWillEnter() {
    //Obtener informacion al regresar a la vista
    this.getData();
    this.getDataDeparture();
  }

  getData() {
    this.http.get("http://10.70.10.22/IonicApp/json_read.php").subscribe(data => {
      this.elements = data;
    }, err => {
      console.log(err)
    })
  }

  getDataDeparture() {
    this.http.get("http://10.70.10.22/IonicApp/json_read_departures.php").subscribe(data2 => {
      this.departureData = data2;
      console.log(data2);
    }, err => {
      console.log(err);
    })
  }

  doJsonMath() {
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
        console.log("Error Obteniendo Resultados");
      }
    }
    for (let i of this.newData) {
      this.nombre.push(i.nombre);
      this.cantidad.push(i.cantidad);
      this.codigo.push(i.codigo);
      this.pasillo.push(i.pasillo);
      this.rack.push(i.rack);
      this.nivel.push(i.nivel);
    }
    console.log(this.jsonExplo);
  }

  //creador de contenido dinamico para el PDF
  insertCols() {
    //Insertar encabezado de la tabla
    this.values.push(
      [
        { text: 'Articulo' },
        { text: 'Cantidad' },
        { text: 'Codigo' },
        { text: 'Pasillo' },
        { text: 'Rack' },
        { text: 'Nivel' }
      ]
    );
    //Insertar contenidos de la tabla
    for (let k = 0; k <= this.elements.length - 1; k++) {
      this.values.push(
        [
          { text: this.nombre[k] },
          { text: this.cantidad[k] },
          { text: this.codigo[k] },
          { text: this.pasillo[k] },
          { text: this.rack[k] },
          { text: this.nivel[k] }
        ]
      );
    }
    console.log(this.values);
  }

  generatePDF() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' })

        //Guardar el PDF al directorio "data" de la app
        this.file.writeFile(this.file.dataDirectory, 'report.pdf', blob, { replace: true }).then(fileEntry => {
          //Abrir el PDF con android
          this.fileOpener.open(this.file.dataDirectory + "report.pdf", 'application/pdf');
        });
      });
    } else {
      //si es en navegador, descargar
      this.pdfObj.download();
    }
  }

  //Invocar Loader antes de imprimir
  callToLoaderPrint() {
    this.doJsonMath();
    let loader = this.loading.create({
      content: "Generando Reporte...",
    });
    loader.present().then(() => {
      this.printPDF();
    });
    loader.dismiss();
    this.showToast("Reporte Creado con Exito");
  }


  printPDF() {
    //Construir array para crear la tabla, contiene el body completo
    this.insertCols();

    //Crear PDF para impresion
    var docDefiniton = {
      content: [
        { text: 'STOCK EN INVENTARIO', style: 'header', alignment: 'center' },
        { text: 'CA AUTOMOTIVE DURANGO', alignment: 'left' },
        { text: 'S. DE R.L. DE C.V', alignment: 'left' },
        { text: 'Fecha: ' + new Date().toLocaleDateString('ddMMyyyy'), alignment: 'right', style: 'date' },
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
    this.pdfObj = pdfMake.createPdf(docDefiniton);
  }

  showToast(message) {
    let toast = this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
