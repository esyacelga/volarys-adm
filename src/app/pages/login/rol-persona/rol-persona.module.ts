import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {RolPersonaPage} from './rol-persona.page';
import {PipesModule} from '../../../modules/pipes/pipes.module';

const routes: Routes = [
    {
        path: '',
        component: RolPersonaPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PipesModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [RolPersonaPage]
})
export class RolPersonaPageModule {
}
