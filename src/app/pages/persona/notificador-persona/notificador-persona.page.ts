import {Component, OnInit} from '@angular/core';
import {ModeloPersona, ModeloTipoUsuarioPersona} from '../../../classes/persona/TipoUsuarioPersona';
import {Util} from '../../../modules/system/generic/classes/util';
import {PersonaService} from '../../../services/persona/persona.service';
import {TipoUsuarioPersonaService} from '../../../services/persona/tipo-usuario-persona.service';
import {StorageAppService} from '../../../modules/system/generic/service/storage-app.service';
import {SectorService} from '../../../services/persona/sector.service';
import {ModalController} from '@ionic/angular';
import {NotificacionModel} from '../../../classes/notificacion/NotificacionModel';
import {TipoUsuarioService} from '../../../services/persona/tipo-usuario.service';
import {NotificacionMasivaService} from '../../../services/notificacion/notificacion-masiva.service';
import {NotificacionIndividualClass} from '../../../classes/model/Notificacion/NotificacionIndividualModel';
import {COLOR_TOAST_WARNING} from '../../../modules/system/generic/classes/constant';

@Component({
    selector: 'app-notificador-persona',
    templateUrl: './notificador-persona.page.html',
    styleUrls: ['./notificador-persona.page.scss'],
})
export class NotificadorPersonaPage implements OnInit {
    public activaPanel = false;
    public lstPersona: ModeloPersona[];
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
        if (!notificacion.titulo) {
            this.svrUtil.presentToast('Debe ingresar un titulo', COLOR_TOAST_WARNING);
            return;
        }
        if (!notificacion.mensajeTitulo) {
            this.svrUtil.presentToast('Debe ingresar un mensaje', COLOR_TOAST_WARNING);
            return;
        }


        if (!notificacion) {
            this.svrUtil.presentToast('No se ha generado el objeto noficaciòn', COLOR_TOAST_WARNING);
            return;
        }

        if (!this.objTipoUsuarioPersona.usuario.playerId) {
            this.svrUtil.presentToast('La persona seleccionada no posee un id de notificacion', COLOR_TOAST_WARNING);
            return;
        }
        let simpleNotification: NotificacionIndividualClass = new NotificacionIndividualClass(this.objTipoUsuarioPersona.persona, 3, notificacion.mensajeTitulo, notificacion.titulo, notificacion.keyPayload, this.objTipoUsuarioPersona.usuario.playerId);
        simpleNotification = (await this.svrNot.registarNotificacionIndividual(simpleNotification) as unknown as NotificacionIndividualClass);
        this.svrNot.enviarNotificacionIndividual(simpleNotification);
        this.objNotificacion = new NotificacionModel();
        this.objTipoUsuarioPersona = null;
    }

    public async selecionPersona(persona: string) {
        this.lstTipoUsuarioPersona = await this.svrPersonaUsuario.obtenerPorPersona(persona);
        if (this.lstTipoUsuarioPersona.length > 0) {
            for (const data of this.lstTipoUsuarioPersona) {
                if (data.usuario.playerId) {
                    this.objTipoUsuarioPersona = data;
                }
            }
        }
        /*
        if (this.lstTipoUsuarioPersona.length > 0 && this.lstTipoUsuarioPersona[0].persona && this.lstTipoUsuarioPersona[0].persona.correo) {
            this.objTipoUsuarioPersona = (await this.svtTipoUsuariPersona.obtenerPorCorreo(this.lstTipoUsuarioPersona[0].persona.correo) as ModeloTipoUsuarioPersona);
            this.svrStorage.setStorageObject(this.objTipoUsuarioPersona, 'usuario');
        }
        */
    }

    public async ngOnInit() {
        this.objNotificacion = new NotificacionModel();
        this.lstPersona = await this.svrPersona.obtenerTodos();
    }

}
