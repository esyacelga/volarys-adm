import {Injectable} from '@angular/core';
import {Disponibilidad, ModeloDisponibilidad, Vehiculo} from '../../classes/ruta/vehiculo/DsiponibilidadVehiculo';
import {CRUD_DISPONIBILIDAD} from '../../constantes/ConstanteTransaccional';
import {OBTENER_TODOS_DISPONIBILIDAD, OBTENER_TODOS_OBTENER_DISPONIBILIDAD} from '../../constantes/ConstanteConsulta';
import {Util} from '../../modules/system/generic/classes/util';
import {ExecuteCallProcedureService} from '../../modules/system/generic/service/execute-call-procedure.service';
import {RequestOptions} from '../../modules/system/generic/classes/RequestOptions';

@Injectable({
    providedIn: 'root'
})
export class UnidadDisponibilidaddadService {

    constructor(private genericService: ExecuteCallProcedureService, private utils: Util) {

    }

    async registar(disponibilidad: Disponibilidad) {
        const requestOptions = new RequestOptions();
        return await this.genericService.servicioRestGenericoPost(disponibilidad, CRUD_DISPONIBILIDAD, requestOptions) as Vehiculo;
    }


    async obtenerTodos() {
        const requestOptions = new RequestOptions();
        return (await this.genericService.servicioRestGenericoGet({}, OBTENER_TODOS_DISPONIBILIDAD, requestOptions)) as Disponibilidad[];
    }


    async obtenerDisponibilidad() {
        const requestOptions = new RequestOptions();
        return (await this.genericService.servicioRestGenericoGet({}, OBTENER_TODOS_OBTENER_DISPONIBILIDAD, requestOptions)) as ModeloDisponibilidad[];
    }

}
