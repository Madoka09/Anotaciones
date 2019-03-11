import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeleteUserActionPage } from './delete-user-action';

@NgModule({
  declarations: [
    DeleteUserActionPage,
  ],
  imports: [
    IonicPageModule.forChild(DeleteUserActionPage),
  ],
})
export class DeleteUserActionPageModule {}
