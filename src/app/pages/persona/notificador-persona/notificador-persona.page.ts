import {Component, OnInit} from '@angular/core';
import {ModeloPersona, ModeloTipoUsuarioPersona} from '../../../classes/persona/TipoUsuarioPersona';
import {Sector} from '../../../classes/persona/Sector';
import {Util} from '../../../modules/system/generic/classes/util';
import {PersonaService} from '../../../services/persona/persona.service';
import {TipoUsuarioPersonaService} from '../../../services/persona/tipo-usuario-persona.service';
import {StorageAppService} from '../../../modules/system/generic/service/storage-app.service';
import {SectorService} from '../../../services/persona/sector.service';
import {ModalController} from '@ionic/angular';
import {NotificacionModel} from '../../../classes/notificacion/NotificacionModel';
import {TipoUsuario} from '../../../classes/persona/TipoUsuario';
import {TipoUsuarioService} from '../../../services/persona/tipo-usuario.service';
import {NotificacionMasivaService} from '../../../services/notificacion/notificacion-masiva.service';
import {NotificacionIndividualClass} from '../../../classes/model/Notificacion/NotificacionIndividualModel';

@Component({
    selector: 'app-notificador-persona',
    templateUrl: './notificador-persona.page.html',
    styleUrls: ['./notificador-persona.page.scss'],
})
export class NotificadorPersonaPage implements OnInit {
    public activaPanel = false;
    public lstTipoUsuario: TipoUsuario[] = [];
    public objPersona: ModeloPersona;
    public lstPersona: ModeloPersona[];
    public lstSectores: Sector[];
    public modeloPersonaTipoUsuario: ModeloTipoUsuarioPersona;
    public lstTipoUsuarioPersona: ModeloTipoUsuarioPersona[];
    public objTipoUsuarioPersona: ModeloTipoUsuarioPersona;
    public objNotificacion: NotificacionModel;

    constructor(private svrUtil: Util,
                private svrNot: NotificacionMasivaService,
                private svtTipoUsuario: TipoUsuarioService,
                private svrPersona: PersonaService,
                private svtTipoUsuariPersona: TipoUsuarioPersonaService,
                private svrStorage: StorageAppService,
                private svrSector: SectorService,
                private modalCtrl: ModalController,
                private svrPersonaUsuario: TipoUsuarioPersonaService) {
    }

    public async registroEnvio(notificacion: NotificacionModel) {
        const simpleNotification: NotificacionIndividualClass = new NotificacionIndividualClass(this.objTipoUsuarioPersona.persona, 3, notificacion.mensajeTitulo, notificacion.titulo, notificacion.keyPayload, this.objTipoUsuarioPersona.usuario.playerId);
        await this.svrNot.registarNotificacionIndividual(simpleNotification);
    }

    public async selecionPersona(persona: string) {
        this.lstTipoUsuarioPersona = await this.svrPersonaUsuario.obtenerPorPersona(persona);
        if (this.lstTipoUsuarioPersona.length > 0 && this.lstTipoUsuarioPersona[0].persona && this.lstTipoUsuarioPersona[0].persona.correo) {
            this.objTipoUsuarioPersona = (await this.svtTipoUsuariPersona.obtenerPorCorreo(this.lstTipoUsuarioPersona[0].persona.correo) as ModeloTipoUsuarioPersona);
            this.svrStorage.setStorageObject(this.objTipoUsuarioPersona, 'usuario');
        }
    }

    public async ngOnInit() {
        this.lstTipoUsuario = (await this.svtTipoUsuario.listarTodos()) as TipoUsuario[];
        this.lstPersona = await this.svrPersona.obtenerTodos();
        this.lstSectores = await this.svrSector.obtenerSectores();
    }

}
