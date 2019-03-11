import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuestViewPage } from './guest-view';

@NgModule({
  declarations: [
    GuestViewPage,
  ],
  imports: [
    IonicPageModule.forChild(GuestViewPage),
  ],
})
export class GuestViewPageModule {}
