import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-searchphysical',
  templateUrl: 'searchphysical.html',
})
export class SearchphysicalPage {

  qrData: null;
  scannedCode: any;
  qrResultString: any = [];

  elements: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private barcodeScanner: BarcodeScanner, public alertCtrl: AlertController,
    private http: Http, public loading: LoadingController, public toast: ToastController,
    private httpC: HttpClient) {
      
  }

  ngOnInit(){
    this.scanCode();
  }
 
  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;

      //Mandar request a PHP
      var headers = new Headers();

    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let data = {
      scannedCode: this.scannedCode
    };

    let loader = this.loading.create({
      content: "Procesando Solicitud..."
    });

    loader.present().then(() => {
      this.qrResultString.length = 0;
      this.http.post('http://10.70.10.22/IonicApp/qrcode_check.php', data, options)
      .map(res => res.json())
      .subscribe(res => {
        this.qrResultString.push(res);
      })
      console.log("Result: " + this.qrResultString);
      loader.dismiss();

        this.showToast(this.scannedCode);
        
    });

    }, (err) => {
        console.log('Error: ', err);
    });
    
    
  }

  getData(){
    this.httpC.get("http://10.70.10.22/IonicApp/qrcode_check.php").subscribe(dataQ => {
      this.elements = dataQ;
      console.log(dataQ);
    }, err => {
      console.log(err);
    })
  }

  showToast(message) {
    let toast = this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchphysicalPage');
    
  }


}
