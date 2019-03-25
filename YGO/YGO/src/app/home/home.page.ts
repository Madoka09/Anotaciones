import { Component, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Declarar Variables
  query: string;
  cardetails: any = [];
  searched: boolean;
  @ViewChild('carta') carta;
  constructor(private httpC: HttpClient) {}

  ionViewDidLoad() {
    this.searched = false;
  }

  buscar() {
    this.searched = true;
    this.query = 'https://db.ygoprodeck.com/api/v4/cardinfo.php?name';

    this.httpC.get(this.query + '=' + this.carta.value).subscribe(data => {
      this.cardetails = data[0][0];
      console.log(this.cardetails);
    }, err => {
      console.log(err);
    });
  }
}
