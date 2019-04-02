import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfpService {

  conf: any;
  constructor() { }

  public getConf(confV) {
    this.conf = confV;
  }

  public returnConf() {
    return this.conf;
  }
}
