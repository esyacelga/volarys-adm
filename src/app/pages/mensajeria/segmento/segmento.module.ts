import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SegmentoPageRoutingModule } from './segmento-routing.module';

import { SegmentoPage } from './segmento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SegmentoPageRoutingModule
  ],
  declarations: [SegmentoPage]
})
export class SegmentoPageModule {}
