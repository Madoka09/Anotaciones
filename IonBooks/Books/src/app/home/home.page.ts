import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  query: string;
  data: any = [];
  @ViewChild('search') search;
  constructor(private httpC: HttpClient, private router: Router, public modal: ModalController) {}

  getData() {
    this.query = 'http://openlibrary.org/search.json?title=';
    this.httpC.get(this.query + this.search.value).subscribe(data => {
      this.data = data;
      console.log(this.data);
    }, err => {
      console.log(err);
    });
  }

  viewDetails(item) {
    console.log('Me aplastastes');
    this.createModal(item);
  }

  async createModal(item) {
    const modal = await this.modal.create({
      component: DetailsPage,
      componentProps: {item}
    });
    return await modal.present();
  }
}
