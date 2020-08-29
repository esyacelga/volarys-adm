import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SegmentoPage } from './segmento.page';

const routes: Routes = [
  {
    path: '',
    component: SegmentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SegmentoPageRoutingModule {}
