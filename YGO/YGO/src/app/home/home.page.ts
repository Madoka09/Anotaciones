import { Component, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PasserService } from '../passer.service';
import { LoaderService } from '../loader.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Declarar Variables
  queryCard: string;
  cardetails: any = [];
  searched: boolean;
  location: any;
  @ViewChild('carta') carta;
  constructor(private httpC: HttpClient, public navPasser: PasserService, public loader: LoaderService) {}

  ionViewWillEnter() {
    this.searched = false;
    this.location = this.navPasser.getCard();
    this.carta.value = this.location;
    console.log(this.location);
    if(this.carta.value != null) {
      this.buscar();
    } else {
      console.log("No hay datos en el recuadro de busqueda!");
    }
  }

  buscar() {
    this.loader.present();
    this.searched = true;
    this.queryCard = 'https://db.ygoprodeck.com/api/v4/cardinfo.php?name';

    this.httpC.get(this.queryCard + '=' + this.carta.value).subscribe(data => {
      this.cardetails = data[0][0];
      console.log(this.cardetails);
      this.loader.dismiss()
    }, err => {
      console.log(err);
    });
  }
}
