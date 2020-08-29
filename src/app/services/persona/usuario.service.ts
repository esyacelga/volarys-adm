import {Injectable} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {ModeloUsuario} from '../../classes/persona/TipoUsuarioPersona';
import {OBTENER_TIPO_USUARIO_PERSONA_LOGIN, OBTENER_TODOS_USUARIOS} from '../../constantes/ConstanteConsulta';
import {CRUD_USUARIO} from '../../constantes/ConstanteTransaccional';
import {RequestOptions} from '../../modules/system/generic/classes/RequestOptions';
import {ExecuteCallProcedureService} from '../../modules/system/generic/service/execute-call-procedure.service';
import {PushNotificationService} from '../../modules/system/generic/service/push-notification.service';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    private token: string = null;
    public playerId: string = null;

    constructor(private genericService: ExecuteCallProcedureService,
                private svrPush: PushNotificationService,
                private storage: Storage, private navCtrl: NavController,
    ) {
        this.playerId = this.svrPush.playerId;
    }

    public async obtenerTodos() {
        const requestOptions = new RequestOptions();
        const lstUsuarios = await this.genericService.servicioRestGenericoGet({}, OBTENER_TODOS_USUARIOS, requestOptions);
        return lstUsuarios;
    }

    public async loginUsuario(correo: string, clave: string) {
        const requestOptions = new RequestOptions();
        const usuario = {correo, clave};
        const data = await this.genericService.servicioRestGenericoGet(usuario, OBTENER_TIPO_USUARIO_PERSONA_LOGIN, requestOptions);
        return data;
    }

    public async actualizarPlayerId(usuario: ModeloUsuario) {
        usuario.playerId = this.svrPush.playerId;
        const requestOptions = new RequestOptions();
        console.error('Esto es el objeto Usuario', usuario);
        await this.genericService.servicioRestGenericoGet(usuario, CRUD_USUARIO, requestOptions);
    }

    public async guardarToken(token: string) {
        this.token = token;
        await this.storage.set('token', token);
        await this.validaToken();

    }

    public async cargarToken() {
        this.token = await this.storage.get('token') || null;
    }

    public async validaToken(): Promise<boolean> {
        await this.cargarToken();
        if (!this.token) {
            this.navCtrl.navigateRoot('/login');
            return Promise.resolve(false);
        } else {
            this.navCtrl.navigateRoot('/main/tabs/tab1');
            return Promise.resolve(true);
        }
    }

}
