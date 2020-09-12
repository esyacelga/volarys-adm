import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosRecibidosPage } from './pedidos-recibidos.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosRecibidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosRecibidosPageRoutingModule {}
