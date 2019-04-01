import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PasserService } from '../passer.service';
import { Toast } from '@ionic-native/toast/ngx';
import { LoaderService } from '../loader.service';


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
  constructor(private httpC: HttpClient, public router: Router, public navPasser: PasserService,
    private toast: Toast, private loader: LoaderService) {}

  ionViewDidLoad() {
    this.searched = false;
  }

  showToast() {
    this.toast.show('Información Encontrada', '5000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  buscar() {
    this.searched = true;
    this.loader.present();
    this.query = 'https://db.ygoprodeck.com/api/v4/cardinfo.php?archetype';

    this.httpC.get(this.query + '=' + this.carta.value).subscribe(data => {
      this.cardetails = data[0];
      console.log(this.cardetails);
      this.loader.dismiss();
      this.showToast();
    }, err => {
      console.log(err);
    });
  }

  fullView(item) {
    this.navPasser.nameCard(item.name);
    this.router.navigateByUrl('/home');
    console.log(this.card);
  }
}
