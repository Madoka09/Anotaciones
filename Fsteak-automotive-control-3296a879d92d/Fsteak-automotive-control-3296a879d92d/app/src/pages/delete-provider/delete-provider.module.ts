import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeleteProviderPage } from './delete-provider';

@NgModule({
  declarations: [
    DeleteProviderPage,
  ],
  imports: [
    IonicPageModule.forChild(DeleteProviderPage),
  ],
})
export class DeleteProviderPageModule {}
