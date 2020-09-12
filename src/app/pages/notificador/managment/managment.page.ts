import {Component, OnInit} from '@angular/core';
import {Pedido, PedidoResumen} from '../../../classes/mensajeria/Pedido';
import {SolicitudService} from '../../../services/mensajeria/solicitud.service';
import {TipoUsuarioPersonaService} from '../../../services/persona/tipo-usuario-persona.service';
import {SolcitudCabeceraModel} from '../../../classes/mensajeria/SolcitudCabeceraModel';
import {ModeloUsuario} from '../../../classes/persona/TipoUsuarioPersona';
import {NotificacionIndividualClass} from '../../../classes/model/Notificacion/NotificacionIndividualModel';
import {NotificacionMasivaService} from '../../../services/notificacion/notificacion-masiva.service';
import {PersonaModel} from '../../../classes/model/persona/PersonaModel';
import {Util} from '../../../modules/system/generic/classes/util';
import {COLOR_TOAST_WARNING} from '../../../modules/system/generic/classes/constant';
import {PedidoInterface} from '../../../classes/interface/mensajeria/PedidoInterface';

@Component({
    selector: 'app-managment',
    templateUrl: './managment.page.html',
    styleUrls: ['./managment.page.scss'],
})
export class ManagmentPage implements OnInit {

    pedido: PedidoResumen = new PedidoResumen(null);
    contenedor: PedidoResumen;
    lstPedido: PedidoInterface[] = [];
    lstPedidoResumen: PedidoResumen[] = [];

    public itemObject: Pedido;


    constructor(private svrSolicitud: SolicitudService,
                private util: Util,
                private svrTps: TipoUsuarioPersonaService,
                private svrNot: NotificacionMasivaService) {

    }

    async enviarMensajeRecepcion(pedido: Pedido, titulo, mensaje) {
        if (!pedido) {
            this.util.presentToast('El pedido no ha sido seleccionado', COLOR_TOAST_WARNING);
            return;
        }

        if (!pedido.tipoUsuarioPerona) {
            this.util.presentToast('El tipoUsuarioPerona no se encuentra instanciado, por lo tanto no se enviará la notificacion correspondiente', COLOR_TOAST_WARNING);
            return;
        }

        if (!pedido.tipoUsuarioPerona.persona) {
            this.util.presentToast('La persona no se encuentra instanciado, por lo tanto no se enviará la notificacion correspondiente', COLOR_TOAST_WARNING);
            return;
        }
        const usuario: ModeloUsuario = pedido.tipoUsuarioPerona.usuario;

        if (!usuario.playerId || usuario.playerId === '') {
            this.util.presentToast('EL ID de notificacion no se encuentra instanciado, por lo tanto no se enviará la notificacion correspondiente', COLOR_TOAST_WARNING);
            return;
        }
        const perosona: PersonaModel = new PersonaModel();
        perosona._id = pedido.tipoUsuarioPerona.persona._id;
        perosona.displayName = pedido.tipoUsuarioPerona.persona.picture;
        let simpleNotification: NotificacionIndividualClass = new NotificacionIndividualClass(perosona, 3, mensaje, titulo, 'Recepcion de pedido', usuario.playerId);
        simpleNotification = (await this.svrNot.registarNotificacionIndividual(simpleNotification) as unknown as NotificacionIndividualClass);
        this.svrNot.enviarNotificacionIndividual(simpleNotification);
    }

    async actualiarPedido(estado: number, pedido: PedidoResumen) {
        const solicitud: SolcitudCabeceraModel = new SolcitudCabeceraModel(pedido.pedido._id, pedido.usuario, estado);
        await this.svrSolicitud.actualizarSolicitud(solicitud);
        this.contenedor = null;
        this.ngOnInit();
    }

    async actualiarPedidoRecepcion(estado: number, pedido: PedidoResumen) {
        const solicitud: SolcitudCabeceraModel = new SolcitudCabeceraModel(pedido.pedido._id, pedido.usuario, estado);
        await this.svrSolicitud.actualizarSolicitud(solicitud);
    }


    async cancelar() {
        // this.lstPedido = await this.svrSolicitud.obtenerPedidos();
    }

    async ngOnInit() {
        this.lstPedidoResumen = [];
        this.lstPedido = await this.svrSolicitud.obtenerPedidosRecientes();
        for (const iterador of this.lstPedido) {
            this.lstPedidoResumen.push(new PedidoResumen(iterador));
        }
    }
}
