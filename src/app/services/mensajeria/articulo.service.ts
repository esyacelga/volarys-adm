import {Injectable} from '@angular/core';
import {Articulo} from '../../classes/mensajeria/Articulo';
import {OBTENER_TODOS_ARTICULOS} from '../../constantes/ConstanteConsulta';
import {CRUD_ARTICULO} from '../../constantes/ConstanteTransaccional';
import {RequestOptions} from '../../modules/system/generic/classes/RequestOptions';
import {ExecuteCallProcedureService} from '../../modules/system/generic/service/execute-call-procedure.service';


@Injectable({
    providedIn: 'root'
})
export class ArticuloService {

    constructor(private genericService: ExecuteCallProcedureService) {

    }

    public async registarArticulo(segmento: Articulo) {
        const requestOptions = new RequestOptions();
        const data = await this.genericService.servicioRestGenericoPost(segmento, CRUD_ARTICULO, requestOptions) as Articulo;
        return data;
    }

    public async obtenerArticulos() {
        const requestOptions = new RequestOptions();
        return await this.genericService.servicioRestGenericoGet({}, OBTENER_TODOS_ARTICULOS, requestOptions);
    }


}
