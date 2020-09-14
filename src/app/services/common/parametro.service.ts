import {Injectable} from '@angular/core';
import {Articulo} from '../../classes/mensajeria/Articulo';
import {OBTENER_TODOS_PARMETROS} from '../../constantes/ConstanteConsulta';
import {CRUD_PARAMETRO} from '../../constantes/ConstanteTransaccional';
import {RequestOptions} from '../../modules/system/generic/classes/RequestOptions';
import {ExecuteCallProcedureService} from '../../modules/system/generic/service/execute-call-procedure.service';
import {ParametroClass} from '../../classes/interface/common/ParametroClass';


@Injectable({
    providedIn: 'root'
})
export class ParametroService {

    constructor(private genericService: ExecuteCallProcedureService) {

    }

    public async registarParametro(objParametro: ParametroClass) {
        const requestOptions = new RequestOptions();
        const data = await this.genericService.servicioRestGenericoPost(objParametro, CRUD_PARAMETRO, requestOptions) as Articulo;
        return data;
    }

    public async obtenerParametros() {
        const requestOptions = new RequestOptions();
        return await this.genericService.servicioRestGenericoGet({}, OBTENER_TODOS_PARMETROS, requestOptions);
    }


}
