import { Component, ViewChild } from '@angular/core';
import { ConfpService } from '../confp.service';
import { Router } from '@angular/router';
import { Toast } from '@ionic-native/toast/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild('configV') configV;
  constructor(public configuration: ConfpService, private router: Router, public toast: Toast) {}

  sendConf() {
    let confV = this.configV.value;
    this.configuration.getConf(confV);
    this.router.navigateByUrl('');
    this.toast.show('Configuración Guardada', '6000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }
}
