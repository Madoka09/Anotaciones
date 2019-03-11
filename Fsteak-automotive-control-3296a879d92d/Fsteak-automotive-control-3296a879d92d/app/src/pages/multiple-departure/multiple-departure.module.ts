import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MultipleDeparturePage } from './multiple-departure';

@NgModule({
  declarations: [
    MultipleDeparturePage,
  ],
  imports: [
    IonicPageModule.forChild(MultipleDeparturePage),
  ],
})
export class MultipleDeparturePageModule {}
