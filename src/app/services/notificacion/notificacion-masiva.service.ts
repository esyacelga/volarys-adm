import {Injectable} from '@angular/core';
import {
    CRUD_NOTIFICACION,
    CRUD_NOTIFICACION_ACTUALIZAR,
    CRUD_REGISTRAR_NOTIFICACION_INDIVIDUAL, ENVIO_NOTIFICACION_INDIVIDUAL,
    ENVIO_NOTIFICACION_MASIVO
} from '../../constantes/ConstanteTransaccional';
import {NotificacionModel} from '../../classes/notificacion/NotificacionModel';
import {OBTENER_TODOS_NOTIFICACIONES} from '../../constantes/ConstanteConsulta';
import {ExecuteCallProcedureService} from '../../modules/system/generic/service/execute-call-procedure.service';
import {RequestOptions} from '../../modules/system/generic/classes/RequestOptions';
import {NotificacionIndividualClass} from '../../classes/model/Notificacion/NotificacionIndividualModel';

@Injectable({
    providedIn: 'root'
})
export class NotificacionMasivaService {

    constructor(private svrGenerico: ExecuteCallProcedureService) {

    }

    public async registar(notificacionModel: NotificacionModel) {
        const requestOptions = new RequestOptions();
        return await this.svrGenerico.servicioRestGenericoPost(notificacionModel, CRUD_NOTIFICACION, requestOptions) as NotificacionModel;
    }

    public async enviarNotificacionMasiva(notificacionModel: NotificacionModel) {
        const requestOptions = new RequestOptions();
        return await this.svrGenerico.servicioRestGenericoGet(notificacionModel, ENVIO_NOTIFICACION_MASIVO, requestOptions) as NotificacionModel;
    }


    public async registarNotificacionIndividual(notificacionModel: NotificacionIndividualClass) {
        const requestOptions = new RequestOptions();
        return await this.svrGenerico.servicioRestGenericoPost(notificacionModel, CRUD_REGISTRAR_NOTIFICACION_INDIVIDUAL, requestOptions) as NotificacionModel;
    }

    public async enviarNotificacionIndividual(notificacionModel: NotificacionIndividualClass) {
        const requestOptions = new RequestOptions();
        requestOptions.presentarToast = true;
        requestOptions.successMessaje = 'Se ha enviado la notificacion de forma exitosa';
        return await this.svrGenerico.servicioRestGenericoGet(notificacionModel, ENVIO_NOTIFICACION_INDIVIDUAL, requestOptions) as NotificacionModel;
    }

    public async actualizar(notificacionModel: NotificacionModel) {
        const requestOptions = new RequestOptions();
        return await this.svrGenerico.servicioRestGenericoPost(notificacionModel, CRUD_NOTIFICACION_ACTUALIZAR, requestOptions) as NotificacionModel;
    }

    public async obtenerTodos() {
        const requestOptions = new RequestOptions();
        return await this.svrGenerico.servicioRestGenericoGet({}, OBTENER_TODOS_NOTIFICACIONES, requestOptions) as NotificacionModel[];
    }

}
