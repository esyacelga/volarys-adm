import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoArticuloPage } from './tipo-articulo.page';

const routes: Routes = [
  {
    path: '',
    component: TipoArticuloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoArticuloPageRoutingModule {}
