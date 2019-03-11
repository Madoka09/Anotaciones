import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductEntryPage } from './product-entry';

@NgModule({
  declarations: [
    ProductEntryPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductEntryPage),
  ],
})
export class ProductEntryPageModule {}
