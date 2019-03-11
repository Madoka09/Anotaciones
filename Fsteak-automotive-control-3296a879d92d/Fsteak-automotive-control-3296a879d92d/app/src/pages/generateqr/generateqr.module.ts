import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenerateqrPage } from './generateqr';

@NgModule({
  declarations: [
    GenerateqrPage,
  ],
  imports: [
    IonicPageModule.forChild(GenerateqrPage),
  ],
})
export class GenerateqrPageModule {}
