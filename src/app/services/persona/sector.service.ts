import {Injectable} from '@angular/core';
import {Sector} from '../../classes/persona/Sector';
import {CRUD_SECTOR} from '../../constantes/ConstanteTransaccional';
import {OBTENER_TODOS_SECTOR} from '../../constantes/ConstanteConsulta';
import {ExecuteCallProcedureService} from '../../modules/system/generic/service/execute-call-procedure.service';
import {RequestOptions} from '../../modules/system/generic/classes/RequestOptions';


@Injectable({
    providedIn: 'root'
})
export class SectorService {

    constructor(private genericService: ExecuteCallProcedureService) {

    }

    async registarSector(sector: Sector) {
        const requestOptions = new RequestOptions();
        return await this.genericService.servicioRestGenericoPost(sector, CRUD_SECTOR, requestOptions) as Sector;
    }


    async obtenerSectores() {
        const requestOptions = new RequestOptions();
        return (await this.genericService.servicioRestGenericoGet({}, OBTENER_TODOS_SECTOR, requestOptions)) as Sector[];
    }

}
