import {Injectable} from '@angular/core';
import {IntegranteRuta, RutaDto} from '../../classes/ruta/vehiculo/DsiponibilidadVehiculo';
import {CRUD_RUTA, CRUD_RUTA_SIMPLE} from '../../constantes/ConstanteTransaccional';
import {OBTENER_TODOS_RUTA_DISPONIBILIDAD, OBTENER_TODOS_VEHICULO} from '../../constantes/ConstanteConsulta';
import {TipoUsuarioPersonaService} from '../persona/tipo-usuario-persona.service';
import {ExecuteCallProcedureService} from '../../modules/system/generic/service/execute-call-procedure.service';
import {RequestOptions} from '../../modules/system/generic/classes/RequestOptions';

@Injectable({
    providedIn: 'root'
})
export class VehiculoRutaService {

    constructor(private genericService: ExecuteCallProcedureService, private svrUsuario: TipoUsuarioPersonaService) {

    }

    async registar(ruta: RutaDto) {
        const requestOptions = new RequestOptions();
        return await this.genericService.servicioRestGenericoPost(ruta, CRUD_RUTA, requestOptions) as RutaDto;
    }

    async registrarSolicitud(ruta: RutaDto) {
        const requestOptions = new RequestOptions();
        return await this.genericService.servicioRestGenericoPost(ruta, CRUD_RUTA_SIMPLE, requestOptions) as RutaDto;
    }

    async obtenerTodos() {
        const requestOptions = new RequestOptions();
        return (await this.genericService.servicioRestGenericoGet({}, OBTENER_TODOS_VEHICULO, requestOptions)) as RutaDto[];
    }


    /**
     * Obtiene los integrantes de una solicitud ya creada
     * @param idDisponibilidad
     */
    async obtenerIntegrantesPorDisponibilidad(idDisponibilidad:string) {
        const requestOptions = new RequestOptions();
        return (await this.genericService.servicioRestGenericoGet({idDisponibilidad}, OBTENER_TODOS_RUTA_DISPONIBILIDAD, requestOptions)) as IntegranteRuta[];
    }


}
