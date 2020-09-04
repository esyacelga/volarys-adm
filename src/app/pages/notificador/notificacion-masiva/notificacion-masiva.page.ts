import {Component, OnInit} from '@angular/core';
import {NotificacionModel} from '../../../classes/notificacion/NotificacionModel';
import {TipoUsuario} from '../../../classes/persona/TipoUsuario';
import {NotificacionMasivaService} from '../../../services/notificacion/notificacion-masiva.service';
import {TipoUsuarioService} from '../../../services/persona/tipo-usuario.service';

@Component({
    selector: 'app-notificacion-masiva',
    templateUrl: './notificacion-masiva.page.html',
    styleUrls: ['./notificacion-masiva.page.scss'],
})
export class NotificacionMasivaPage implements OnInit {

    public lstTipoUsuario: TipoUsuario[] = [];
    public lstNotificacionModel: NotificacionModel[] = [];
    public objNotificacion: NotificacionModel;

    constructor(private svtTipoUsuario: TipoUsuarioService, private svrNotificacion: NotificacionMasivaService) {
    }

    public async ngOnInit() {
        this.lstTipoUsuario = (await this.svtTipoUsuario.listarTodos()) as TipoUsuario[];
        this.lstNotificacionModel = (await this.svrNotificacion.obtenerTodos()) as NotificacionModel[];
    }

    public async crearNuevo() {
        this.objNotificacion = new NotificacionModel();
    }

    public async registrar(notificacion: NotificacionModel) {
        await this.svrNotificacion.registar(notificacion);
        this.lstNotificacionModel = (await this.svrNotificacion.obtenerTodos()) as NotificacionModel[];
        this.objNotificacion = undefined;
    }

    public async eliminar(notificacion: NotificacionModel) {
        notificacion.estado = 0;
        await this.svrNotificacion.actualizar(notificacion);
        this.lstNotificacionModel = (await this.svrNotificacion.obtenerTodos()) as NotificacionModel[];

    }

    public async notificar(notificacion: NotificacionModel) {
        notificacion.estado = 0;
        await this.svrNotificacion.enviarNotificacionMasiva(notificacion);
        await this.svrNotificacion.actualizar(notificacion);
        this.lstNotificacionModel = (await this.svrNotificacion.obtenerTodos()) as NotificacionModel[];

    }


}
