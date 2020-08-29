import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {PipesModule} from '../pipes/pipes.module';
import {ArticuloSlideComponent} from './articulo-slide/articulo-slide.component';
import {AvatarSelectorComponent} from './avatar-selector/avatar-selector.component';
import {CardImageComponent} from './card-image/card-image.component';
import {ItemSeleccionadoComponent} from './item-seleccionado/item-seleccionado.component';
import {MapaComponent} from './mapa/mapa.component';
import {PedidosComponent} from './pedidos/pedidos.component';
import {ProfileComponent} from './profile/profile.component';
import {SolicitudRutaComponent} from './solicitud-ruta/solicitud-ruta.component';
import {ImagenEditorComponent} from './imagen-editor/imagen-editor.component';

@NgModule({
    declarations: [AvatarSelectorComponent, MapaComponent, SolicitudRutaComponent, ProfileComponent, ImagenEditorComponent,
        CardImageComponent, ItemSeleccionadoComponent, ArticuloSlideComponent, PedidosComponent],
    exports: [
        AvatarSelectorComponent, MapaComponent, SolicitudRutaComponent, ProfileComponent, ImagenEditorComponent,
        CardImageComponent, ItemSeleccionadoComponent, ArticuloSlideComponent, PedidosComponent
    ],
    imports: [
        CommonModule,
        PipesModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
    ], entryComponents: [],
})
export class ComponentModule {
}
