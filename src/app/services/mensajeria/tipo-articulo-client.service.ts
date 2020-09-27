import {Injectable} from '@angular/core';
import {TipoArticulo} from '../../classes/mensajeria/tipo-articulo';
import {ExecuteCallProcedureService} from '../../modules/system/generic/service/execute-call-procedure.service';
import {RequestOptions} from '../../modules/system/generic/classes/RequestOptions';
import {URL_CREAR_TIPO_ARTICULO, URL_OBTENER_TODOS_ARTICULO} from '../../modules/system/generic/classes/UrlPostRestService';

@Injectable({
    providedIn: 'root'
})
export class TipoArticuloClientService {


    constructor(private genericService: ExecuteCallProcedureService) {
    }

    async registarTipoArticulo(tipoArticulo: TipoArticulo) {
        const requestOptions = new RequestOptions();
        tipoArticulo.nombre = tipoArticulo.nombre;
        tipoArticulo.descripcion = tipoArticulo.descripcion;
        tipoArticulo.codigo = tipoArticulo.codigo;
        return await this.genericService.servicioRestGenericoPost(tipoArticulo, URL_CREAR_TIPO_ARTICULO, requestOptions) as TipoArticulo;
    }


    async obtenerTipoArticulos() {
        const requestOptions = new RequestOptions();
        return await this.genericService.servicioRestGenericoGet({}, URL_OBTENER_TODOS_ARTICULO, requestOptions);
    }


}
