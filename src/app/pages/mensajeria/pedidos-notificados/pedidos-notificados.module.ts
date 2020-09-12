import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosNotificadosPageRoutingModule } from './pedidos-notificados-routing.module';

import { PedidosNotificadosPage } from './pedidos-notificados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosNotificadosPageRoutingModule
  ],
  declarations: [PedidosNotificadosPage]
})
export class PedidosNotificadosPageModule {}
