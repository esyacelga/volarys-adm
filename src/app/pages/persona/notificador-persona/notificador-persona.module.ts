import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificadorPersonaPageRoutingModule } from './notificador-persona-routing.module';

import { NotificadorPersonaPage } from './notificador-persona.page';
import {PipesModule} from '../../../modules/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    NotificadorPersonaPageRoutingModule
  ],
  declarations: [NotificadorPersonaPage]
})
export class NotificadorPersonaPageModule {}
