import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading: boolean;
  constructor(public loader: LoadingController) { }

  async present() {
    this.isLoading = true;
    return await this.loader.create({
      duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('Abortar'));
        }
      });
    });
  }

  async dismiss(){
    this.isLoading = false;
    return await this.loader.dismiss().then(() => console.log('Terminado'));
  }
}