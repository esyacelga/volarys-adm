import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PedidosAnuladosPageRoutingModule} from './pedidos-anulados-routing.module';

import {PedidosAnuladosPage} from './pedidos-anulados.page';
import {PipesModule} from '../../../modules/pipes/pipes.module';

@NgModule({
    imports: [
        PipesModule,
        CommonModule,
        FormsModule,
        IonicModule,
        PedidosAnuladosPageRoutingModule
    ],
    declarations: [PedidosAnuladosPage]
})
export class PedidosAnuladosPageModule {
}
