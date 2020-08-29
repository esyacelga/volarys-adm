import {Injectable} from '@angular/core';
import {ArticuloSegmento} from '../../classes/mensajeria/articulo-segmento';
import {CRUD_SEGMENTO} from '../../constantes/ConstanteTransaccional';
import {Sector} from '../../classes/persona/Sector';
import {OBTENER_TODOS_POR_TIPO_ARTICULO, OBTENER_TODOS_SEGMENTOS} from '../../constantes/ConstanteConsulta';
import {ExecuteCallProcedureService} from '../../modules/system/generic/service/execute-call-procedure.service';
import {Util} from '../../modules/system/generic/classes/util';
import {RequestOptions} from '../../modules/system/generic/classes/RequestOptions';

@Injectable({
    providedIn: 'root'
})
export class SegmentoService {

    constructor(private genericService: ExecuteCallProcedureService, private utils: Util) {

    }

    async registarSegmento(segmento: ArticuloSegmento) {
        const requestOptions = new RequestOptions();
        return await this.genericService.servicioRestGenericoPost(segmento, CRUD_SEGMENTO, requestOptions) as Sector;
    }


    async obtenerSegmentos() {
        const requestOptions = new RequestOptions();
        return await this.genericService.servicioRestGenericoGet({}, OBTENER_TODOS_SEGMENTOS, requestOptions);
    }

    async obtenerSegmentoPorArticulo(tipoArticulo) {
        const filtro = {
            tipoArticulo
        };
        const requestOptions = new RequestOptions();
        return await this.genericService.servicioRestGenericoGet(filtro, OBTENER_TODOS_POR_TIPO_ARTICULO, requestOptions);
    }

}
