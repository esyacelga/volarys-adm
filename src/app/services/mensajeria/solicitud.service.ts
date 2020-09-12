import {Injectable} from '@angular/core';
import {SolcitudCabeceraModel, SolcitudDetalleModel} from '../../classes/mensajeria/SolcitudCabeceraModel';
import {CRUD_ACTUALIZAR_SOLICITUD, CRUD_SOLICITUD} from '../../constantes/ConstanteTransaccional';
import {Articulo} from '../../classes/mensajeria/Articulo';
import {OBTENER_PEDIDOS, OBTENER_PEDIDOS_POR_ESTADO} from '../../constantes/ConstanteConsulta';
import {Pedido} from '../../classes/mensajeria/Pedido';
import {StorageAppService} from '../../modules/system/generic/service/storage-app.service';
import {ExecuteCallProcedureService} from '../../modules/system/generic/service/execute-call-procedure.service';
import {RequestOptions} from '../../modules/system/generic/classes/RequestOptions';
import {COLOR_TOAST_SUCCESS} from '../../modules/system/generic/classes/constant';
import {PedidoInterface} from '../../classes/interface/mensajeria/PedidoInterface';


@Injectable({
    providedIn: 'root'
})
export class SolicitudService {
    lstDetalle: SolcitudDetalleModel[] = [];

    constructor(private genericService: ExecuteCallProcedureService, private svrStorage: StorageAppService) {
        this.getDetalleSolicitud();
    }

    async actualizarSolicitud(solicitud: SolcitudCabeceraModel) {
        const requestOptions = new RequestOptions();
        const data = await this.genericService.servicioRestGenericoPost(solicitud, CRUD_ACTUALIZAR_SOLICITUD, requestOptions) as SolcitudCabeceraModel;
        return data;
    }

    async registarSolicitud(solicitud: SolcitudCabeceraModel) {
        const requestOptions = new RequestOptions();
        requestOptions.successMessaje = 'Su solicitud a sido generado, un operador estará próximo a comunicarse con usted';
        requestOptions.toastColor = COLOR_TOAST_SUCCESS;
        const data = await this.genericService.servicioRestGenericoPost(solicitud, CRUD_SOLICITUD, requestOptions) as Articulo;
        return data;
    }


    async obtenerPedidos() {
        const requestOptions = new RequestOptions();
        const data: Pedido[] = (await this.genericService.servicioRestGenericoGet({}, OBTENER_PEDIDOS, requestOptions)) as Pedido[];
        return data;
    }

    async obtenerPedidosRecientes() {
        const requestOptions = new RequestOptions();
        const data: PedidoInterface[] = (await this.genericService.servicioRestGenericoGet({estado: 1}, OBTENER_PEDIDOS_POR_ESTADO, requestOptions)) as PedidoInterface[];
        return data;
    }


    setDetalleSolcitud(detalle: SolcitudDetalleModel) {
        this.lstDetalle.push(detalle);
        this.svrStorage.setStorageObject(this.lstDetalle, 'DetalleSolicitud');
    }

    async getDetalleSolicitud() {
        if (await this.svrStorage.loadStorageObject('DetalleSolicitud')) {
            // @ts-ignore
            this.lstDetalle = await this.svrStorage.loadStorageObject('DetalleSolicitud');
        } else {
            this.lstDetalle = [];
        }
    }
}
