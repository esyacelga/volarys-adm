import {Component, OnInit} from '@angular/core';
import {
    ModeloPersona,
    ModeloTipoUsuario,
    ModeloTipoUsuarioPersona,
    ModeloUsuario,
    TipoUsuarioPersona,
} from '../../../classes/persona/TipoUsuarioPersona';
import {COLOR_TOAST_WARNING} from '../../../modules/system/generic/classes/constant';
import {Util} from '../../../modules/system/generic/classes/util';
import {PersonaService} from '../../../services/persona/persona.service';
import {TipoUsuarioPersonaService} from '../../../services/persona/tipo-usuario-persona.service';
import {TipoUsuarioService} from '../../../services/persona/tipo-usuario.service';
import {UsuarioService} from '../../../services/persona/usuario.service';

@Component({
    selector: 'app-rol-persona',
    templateUrl: './rol-persona.page.html',
    styleUrls: ['./rol-persona.page.scss'],
})
export class RolPersonaPage implements OnInit {

    public objPersona: ModeloPersona;
    public lstPersona: ModeloPersona[];
    public lstTipoUsuario: ModeloTipoUsuario[];
    public objTipoUsuario: ModeloTipoUsuario;
    public lstTipoUsuarioPersona: ModeloTipoUsuarioPersona[];
    public playerID: string;

    constructor(private svrUtil: Util,
                private svrPersona: PersonaService,
                private svrUsuario: UsuarioService,
                private svrPersonaUsuario: TipoUsuarioPersonaService, private svrTipoUsuario: TipoUsuarioService) {
    }

    public async crearRol(objTipoUsuario: ModeloTipoUsuario) {
        const data = this.lstTipoUsuarioPersona.find((x) => x.tipoUsuario._id === objTipoUsuario._id);
        if (data) {
            this.svrUtil.presentToast('El rol ya existe', COLOR_TOAST_WARNING);
            return;
        }
        const tipoUsuarioPersona = new TipoUsuarioPersona();
        tipoUsuarioPersona.usuario = this.lstTipoUsuarioPersona[0].usuario._id;
        tipoUsuarioPersona.persona = this.lstTipoUsuarioPersona[0].persona._id;
        tipoUsuarioPersona.tipoUsuario = objTipoUsuario._id;
        await this.svrPersonaUsuario.insertar(tipoUsuarioPersona);
        this.lstTipoUsuarioPersona = await this.svrPersonaUsuario.obtenerPorPersona(tipoUsuarioPersona.persona);
    }

    /**
     * Al seleccionar la persona de la pantalla obtiene los roles por el
     * id_persona
     */
    public async selecionPersona(persona: string) {
        this.lstTipoUsuarioPersona = await this.svrPersonaUsuario.obtenerPorPersona(persona);
    }

    public setearIdNotificador() {
        const usuario: ModeloUsuario = this.lstTipoUsuarioPersona[0].usuario;
        if (this.playerID === null || this.playerID === undefined || this.playerID === '') {
            this.svrUtil.presentToast('No se pude actulizar el id de notificador cuando no se encuentra asignado en la aplicacion', COLOR_TOAST_WARNING);
            return;
        }
        this.svrUsuario.actualizarPlayerId(usuario);
    }

    /**
     * Al iniciar la pantalla obtiene las personas rgistradas
     */
    public async ngOnInit() {
        this.lstPersona = await this.svrPersona.obtenerTodos();
        this.lstTipoUsuario = (await this.svrTipoUsuario.listarTodos()) as ModeloTipoUsuario[];
        this.playerID = this.svrUsuario.playerId;
    }
}
