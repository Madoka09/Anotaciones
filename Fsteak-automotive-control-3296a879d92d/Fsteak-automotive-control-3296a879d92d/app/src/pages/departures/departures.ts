import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController, Platform } from 'ionic-angular';
import { RequestOptions, Headers } from '@angular/http';
import { Http } from '@angular/http';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { identifierModuleUrl } from '@angular/compiler';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@IonicPage()
@Component({
  selector: 'page-departures',
  templateUrl: 'departures.html',
})
export class DeparturesPage {
  pdfObj = null;

  nombre: any;
  codigo: any;
  cantidad: any;
  departure: any;
  id: any;

  oldNombreValue: any;
  oldCodigoValue: any;
  oldCantidadValue: any;
  oldDepartureValue: any;

  todayDate: any;

  element: any;

  codes: any = [];
  clients: any = [];


  @ViewChild("departureNombre") departureNombre;
  @ViewChild("departureCodigo") departureCodigo;
  @ViewChild("departureCantidad") departureCantidad;
  @ViewChild("departureQty") departureQty;
  @ViewChild("departureNew") departureNew;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private http: Http, public loading: LoadingController, public toast: ToastController,/*, private httpC: HttpClient*/
    private plt: Platform, private file: File, private fileOpener: FileOpener) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeparturesPage');
  }

  ngOnInit() {
    //parametros nuevos
    this.nombre = this.navParams.get('nombre');
    this.codigo = this.navParams.get('codigo');
    this.cantidad = this.navParams.get('cantidad');
    this.departure = this.navParams.get('departure');
    this.id = this.navParams.get('id');

    //Parametros viejos
    this.oldCantidadValue = this.navParams.get('nombre');
    this.oldCodigoValue = this.navParams.get('codigo');
    this.oldCantidadValue = this.navParams.get('cantidad');
    this.oldDepartureValue = this.navParams.get('departure');

    this.todayDate = new Date();
  }

  doMath() {
    let result = (this.cantidad - this.departure);
    if (result < 0) {
      this.departureNew.value = "Sin Stock suficiente";
      console.log("No hay stock suficiente");
    } else {
      this.departureNew.value = result;
      console.log(result);
    }

  }

  checkDeparture() {
    let alert = this.alertCtrl.create({
      title: "Atención",
      message: "No se puede realizar esta salida, compruebe los valores",
      buttons: ['OK']
    });
    alert.present();
  }

  departureAction() {
    //Comprobar los campos
    parseInt(this.departureQty.value);
     
    if (this.departureQty.value == "" || this.departureNew.value === "Sin Stock suficiente") {
      let alert = this.alertCtrl.create({
        title: "Atención",
        message: "No especificó la cantidad ó no hay stock disponible",
        buttons: ['OK']
      });
      alert.present();
    } else if(this.departureQty.value < 0 || this.departureNew.value == NaN){
      let alert = this.alertCtrl.create({
        title: "Atención",
        message: "No especificó la cantidad ó no hay stock disponible",
        buttons: ['OK']
      });
      alert.present();
    }else {
      var headers = new Headers();

      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });

      let data = {
        nombre: this.oldNombreValue,
        codigo: this.oldCodigoValue,
        cantidad: this.oldCantidadValue,
        departure: this.oldDepartureValue,
        date: (this.todayDate.getFullYear() + '-' + ((this.todayDate.getMonth() + 1)) + '-' + this.todayDate.getDate() + ' ' +this.todayDate.getHours() + ':' + this.todayDate.getMinutes()+ ':' + this.todayDate.getSeconds()),
       
        id: this.id,
        departureNombre: this.departureNombre.value,
        departureCantidad: this.departureCantidad.value,
        departureQty: this.departureQty.value,
        departureNew: this.departureNew.value
      };


      let loader = this.loading.create({
        content: "Procesando Solicitud...",
      });

      loader.present().then(() => {
        this.http.post('http://10.70.10.22/IonicApp/departure_stock.php', data, options)
          .map(res => res.json())
          .subscribe(res => {

            loader.dismiss()
            if (res == "success") {
              this.showToast("Salida Generada");
            } else {
              this.showToast("Ocurrió un error, contacte a IT porfavor");
            }
          })
      })

      var docDefinition = {
        content: [
          { text: 'ORDEN DE SALIDA', style: 'header', alignment: 'center'},
          { text: 'CA AUTOMOTIVE DURANGO', alignment: 'left'},
          { text: 'S. DE R.L. DE C.V', alignment: 'left'},
          { text: 'Fecha: ' + new Date().toLocaleDateString('ddMMyyyy') , alignment: 'right', style: 'date' },

          { lineHeight: 2, text: 'Se entrega a: ________________________________________________', alignment: 'left'},

          {
            columns:[
              {width: '*', text: ''},
              {
                width: 'auto',
                table:{
                  body: [
                    [ {text: 'Cantidad', alignment: 'center'}, {text: 'Articulo', alignment: 'center'}, {text: 'Codigo', alignment: 'center'}, {text: 'Firma', alignment: 'center'}, {text: 'Importe', alignment: 'center'} ],
                    [{text: this.departureQty.value, alignment: 'center'}, {text: this.departureNombre.value, alignment: 'center'}, {text: this.codigo, alignment: 'center'}, {text: " ", alignment: 'center'}, {text: " ", alignment: 'center'}]
                    
                  ]
                }
              },
              { width: '*', text: ''}
            ]
            
          }
          

        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          date:{
            italic: true,
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 15, 0, 0]
          },
          table:{
            alignment: 'center'
          }
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }

  downloadPDF() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        //Guardar el PDF al directorio "data" de la App
        this.file.writeFile(this.file.dataDirectory, 'doc_salida.pdf', blob, { replace: true }).then(fileEntry => {
          //Abrir el PDF con androide
          this.fileOpener.open(this.file.dataDirectory + 'doc_salida.pdf', 'application/pdf');
        });
      });
    } else {
      //si es el navegador, descargala
      this.pdfObj.download();
    }
    this.navCtrl.popToRoot();
  }

  showToast(message) {
    let toast = this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
