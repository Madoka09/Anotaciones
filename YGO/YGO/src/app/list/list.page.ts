import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage {
  // Declarar Variables
  query: string;
  cardetails: any = [];
  searched: boolean;
  card: any;
  @ViewChild('carta') carta;
  constructor(private httpC: HttpClient, public router: Router) {}

  ionViewDidLoad() {
    this.searched = false;
  }

  buscar() {
    this.searched = true;
    this.query = 'https://db.ygoprodeck.com/api/v4/cardinfo.php?archetype';

    this.httpC.get(this.query + '=' + this.carta.value).subscribe(data => {
      this.cardetails = data[0];
      console.log(this.cardetails);
    }, err => {
      console.log(err);
    });
  }

  fullView(item) {
    this.card = item.name;
    this.router.navigate(['/home', item])
    console.log(this.card);
  }
}
