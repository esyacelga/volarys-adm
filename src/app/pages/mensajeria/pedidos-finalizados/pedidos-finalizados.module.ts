import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosFinalizadosPageRoutingModule } from './pedidos-finalizados-routing.module';

import { PedidosFinalizadosPage } from './pedidos-finalizados.page';
import {PipesModule} from '../../../modules/pipes/pipes.module';

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosFinalizadosPageRoutingModule
  ],
  declarations: [PedidosFinalizadosPage]
})
export class PedidosFinalizadosPageModule {}
