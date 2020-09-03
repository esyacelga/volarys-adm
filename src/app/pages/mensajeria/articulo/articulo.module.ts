import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ArticuloPageRoutingModule} from './articulo-routing.module';

import {ArticuloPage} from './articulo.page';
import {PipesModule} from '../../../pipes/pipes.module';
import {ComponentModule} from '../../../modules/components/component.module';

@NgModule({
    imports: [
        PipesModule,
        CommonModule,
        ComponentModule,
        FormsModule,
        IonicModule,
        ArticuloPageRoutingModule
    ],
    declarations: [ArticuloPage]
})
export class ArticuloPageModule {


}
