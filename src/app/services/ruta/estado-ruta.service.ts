import {Injectable} from '@angular/core';
import {CRUD_ESTADO_RUTA} from '../../constantes/ConstanteTransaccional';
import {OBTENER_TODOS_ESTADO_RUTA} from '../../constantes/ConstanteConsulta';
import {EstadoRuta} from '../../classes/ruta/vehiculo/DsiponibilidadVehiculo';
import {ExecuteCallProcedureService} from '../../modules/system/generic/service/execute-call-procedure.service';
import {RequestOptions} from '../../modules/system/generic/classes/RequestOptions';

@Injectable({
    providedIn: 'root'
})
export class EstadoRutaService {

    constructor(private genericService: ExecuteCallProcedureService) {

    }

    async registar(estadoRuta: EstadoRuta) {
        const requestOptions = new RequestOptions();
        return await this.genericService.servicioRestGenericoPost(estadoRuta, CRUD_ESTADO_RUTA, requestOptions) as EstadoRuta;
    }


    async obtenerTodos() {
        const requestOptions = new RequestOptions();
        return (await this.genericService.servicioRestGenericoGet({}, OBTENER_TODOS_ESTADO_RUTA, requestOptions)) as EstadoRuta[];
    }


}
