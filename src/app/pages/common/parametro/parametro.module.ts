import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParametroPageRoutingModule } from './parametro-routing.module';

import { ParametroPage } from './parametro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParametroPageRoutingModule
  ],
  declarations: [ParametroPage]
})
export class ParametroPageModule {}
