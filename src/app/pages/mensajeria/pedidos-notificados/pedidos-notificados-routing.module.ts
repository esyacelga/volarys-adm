import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosNotificadosPage } from './pedidos-notificados.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosNotificadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosNotificadosPageRoutingModule {}
