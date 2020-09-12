import {TipoUsuarioPersonaInterface} from '../persona/TipoUsuarioPersonaInterface';
import {PedidoDetalleInterface} from './PedidoDetalleInterface';
import {UsuarioInterface} from '../persona/UsuarioInterface';

export interface PedidoInterface {
    _id: string;
    estado: number;
    fechaCreacion: Date;
    solicitudDetalle: PedidoDetalleInterface[];
    usuario: UsuarioInterface;
    tipoUsuarioPersona: TipoUsuarioPersonaInterface;
}
