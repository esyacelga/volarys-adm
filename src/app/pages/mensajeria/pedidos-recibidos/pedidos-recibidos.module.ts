import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PedidosRecibidosPageRoutingModule} from './pedidos-recibidos-routing.module';

import {PedidosRecibidosPage} from './pedidos-recibidos.page';
import {PipesModule} from '../../../modules/pipes/pipes.module';

@NgModule({
    imports: [
        PipesModule,
        CommonModule,
        FormsModule,
        IonicModule,
        PedidosRecibidosPageRoutingModule
    ],
    declarations: [PedidosRecibidosPage]
})
export class PedidosRecibidosPageModule {
}
