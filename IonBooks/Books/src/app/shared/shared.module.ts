import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsPage } from '../details/details.page';

@NgModule({
  declarations: [DetailsPage],
  imports: [
    CommonModule
  ],
  exports: [
    DetailsPage
  ]
})
export class SharedModule { }
