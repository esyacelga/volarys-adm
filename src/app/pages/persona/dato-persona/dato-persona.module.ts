import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ComponentModule} from '../../../modules/components/component.module';
import {PipesModule} from '../../../modules/pipes/pipes.module';
import {DatoPersonaPage} from './dato-persona.page';

const routes: Routes = [
    {
        path: '',
        component: DatoPersonaPage,
    },
];

@NgModule({
    imports: [
        PipesModule,
        ComponentModule,
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
    ],
    declarations: [DatoPersonaPage],
})

export class DatoPersonaPageModule {
}
