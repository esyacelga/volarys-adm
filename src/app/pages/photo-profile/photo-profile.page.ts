import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ModeloTipoUsuarioPersona} from '../../classes/persona/TipoUsuarioPersona';
import {StorageAppService} from '../../modules/system/generic/service/storage-app.service';
import {TipoUsuarioPersonaService} from '../../services/persona/tipo-usuario-persona.service';

@Component({
    selector: 'app-photo-profile',
    templateUrl: './photo-profile.page.html',
    styleUrls: ['./photo-profile.page.scss'],
})
export class PhotoProfilePage implements OnInit {
    public pathFotografia: string;
    public nombreImagen: string;

    constructor(private modal: ModalController, private svrStorage: StorageAppService,
                private svrTipoUsuarioPersona: TipoUsuarioPersonaService) {
    }

    public async ngOnInit() {
        const tipoUsuarioPersona: ModeloTipoUsuarioPersona =
            (await this.svrStorage.loadStorageObject('usuario')) as ModeloTipoUsuarioPersona;
        this.pathFotografia = tipoUsuarioPersona._id;
        this.nombreImagen = tipoUsuarioPersona.imagen;
    }

    public async guardarFotografia() {
        await this.svrTipoUsuarioPersona.actualizarFotografia(this.pathFotografia);
        this.modal.dismiss();
    }

    public salirModal() {
        this.modal.dismiss();
    }
}
