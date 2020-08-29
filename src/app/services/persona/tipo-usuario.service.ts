import {Injectable} from '@angular/core';
import {TipoUsuario} from '../../classes/persona/TipoUsuario';
import {CRUD_TIPO_USUARIO} from '../../constantes/ConstanteTransaccional';
import {Sector} from '../../classes/persona/Sector';
import {OBTENER_TIPO_USUARIO, OBTENER_TODOS_TIPO_USUARIO, OBTENER_TODOS_TIPO_USUARIO_POR_CODIGO} from '../../constantes/ConstanteConsulta';
import {ExecuteCallProcedureService} from '../../modules/system/generic/service/execute-call-procedure.service';
import {RequestOptions} from '../../modules/system/generic/classes/RequestOptions';

@Injectable({
    providedIn: 'root'
})
export class TipoUsuarioService {

    constructor(private genericService: ExecuteCallProcedureService) {

    }

    async registar(tipoUsuario: TipoUsuario) {
        const requestOptions = new RequestOptions();
        return await this.genericService.servicioRestGenericoPost(tipoUsuario, CRUD_TIPO_USUARIO, requestOptions) as Sector;
    }


    async listarTodos() {
        const requestOptions = new RequestOptions();
        return (await this.genericService.servicioRestGenericoGet({}, OBTENER_TODOS_TIPO_USUARIO, requestOptions)) as TipoUsuario[];
    }

    async obtenerPorCodigo(codigo) {
        const requestOptions = new RequestOptions();
        return (await this.genericService.servicioRestGenericoGet({codigo}, OBTENER_TODOS_TIPO_USUARIO_POR_CODIGO, requestOptions)) as TipoUsuario;
    }

    async buscarRegistro(campo, valor) {
        const requestOptions = new RequestOptions();
        const filtro = {
            campo,
            valor
        };
        return await this.genericService.servicioRestGenericoGet(filtro, OBTENER_TIPO_USUARIO, requestOptions);
    }
}
