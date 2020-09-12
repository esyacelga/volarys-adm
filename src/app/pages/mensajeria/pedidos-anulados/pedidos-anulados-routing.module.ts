import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosAnuladosPage } from './pedidos-anulados.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosAnuladosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosAnuladosPageRoutingModule {}
