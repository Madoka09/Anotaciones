import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  value: any;
  constructor(private navParams: NavParams, public modalCtrl: ModalController) { }

  ngOnInit() {
    this.value = this.navParams.get('item');
    console.log(this.value);
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

}
