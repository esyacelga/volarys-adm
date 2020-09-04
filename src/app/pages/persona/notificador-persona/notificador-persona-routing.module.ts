import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificadorPersonaPage } from './notificador-persona.page';

const routes: Routes = [
  {
    path: '',
    component: NotificadorPersonaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificadorPersonaPageRoutingModule {}
