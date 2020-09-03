import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SegmentoPageRoutingModule } from './segmento-routing.module';

import { SegmentoPage } from './segmento.page';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    IonicModule,
    SegmentoPageRoutingModule
  ],
  declarations: [SegmentoPage]
})
export class SegmentoPageModule {}
