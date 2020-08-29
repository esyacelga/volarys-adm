import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipoArticuloPageRoutingModule } from './tipo-articulo-routing.module';

import { TipoArticuloPage } from './tipo-articulo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipoArticuloPageRoutingModule
  ],
  declarations: [TipoArticuloPage]
})
export class TipoArticuloPageModule {}
