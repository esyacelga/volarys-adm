import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ImageGeneratorComponent} from '../../modules/components/image-generator/image-generator.component';
import {PipesModule} from '../../modules/pipes/pipes.module';
import {PhotoProfilePage} from './photo-profile.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PipesModule,
    ],
    declarations: [ImageGeneratorComponent, PhotoProfilePage],
})
export class PhotoProfilePageModule {
}
