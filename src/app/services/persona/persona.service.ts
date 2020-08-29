import {Injectable} from '@angular/core';
import {OBTENER_TODOS_PERSONA, OBTENER_TODOS_PERSONA_POR_ID} from '../../constantes/ConstanteConsulta';
import {ModeloPersona, TipoUsuarioPersonaDto} from '../../classes/persona/TipoUsuarioPersona';
import {CRUD_PERSONA} from '../../constantes/ConstanteTransaccional';
import {isNull} from 'util';
import {ExecuteCallProcedureService} from '../../modules/system/generic/service/execute-call-procedure.service';
import {Util} from '../../modules/system/generic/classes/util';
import {COLOR_TOAST_WARNING} from '../../modules/system/generic/classes/constant';
import {RequestOptions} from '../../modules/system/generic/classes/RequestOptions';

@Injectable({
    providedIn: 'root'
})
export class PersonaService {

    constructor(private genericService: ExecuteCallProcedureService, private svrUtil: Util) {
    }

    async obtenerTodos() {
        const requestOptions = new RequestOptions();
        return (await this.genericService.servicioRestGenericoGet({}, OBTENER_TODOS_PERSONA, requestOptions)) as ModeloPersona[];
    }

    async actualizarPersona(persona: TipoUsuarioPersonaDto) {
        if (isNull(persona._id)) {
            this.svrUtil.presentToast('El ID persona no encontrado:', COLOR_TOAST_WARNING);
            return;
        }
        const requestOptions = new RequestOptions();
        return (await this.genericService.servicioRestGenericoGet(persona, CRUD_PERSONA, requestOptions)) as ModeloPersona[];
    }

    async obtenerPersonaPorId(idPersona) {
        const requestOptions = new RequestOptions();
        return (await this.genericService.servicioRestGenericoGet({idPersona}, OBTENER_TODOS_PERSONA_POR_ID, requestOptions)) as ModeloPersona;
    }


}
