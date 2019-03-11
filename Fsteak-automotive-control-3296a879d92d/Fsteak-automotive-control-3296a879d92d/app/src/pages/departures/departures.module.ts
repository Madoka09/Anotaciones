import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeparturesPage } from './departures';

@NgModule({
  declarations: [
    DeparturesPage,
  ],
  imports: [
    IonicPageModule.forChild(DeparturesPage),
  ],
})
export class DeparturesPageModule {}
