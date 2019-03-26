import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasserService {

  carta: any;
  constructor() { }

  public nameCard(item) {
    this.carta = item;
  }

  public getCard() {
    return this.carta;
  }
}
