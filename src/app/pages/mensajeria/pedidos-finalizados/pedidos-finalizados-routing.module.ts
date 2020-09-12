import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosFinalizadosPage } from './pedidos-finalizados.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosFinalizadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosFinalizadosPageRoutingModule {}
