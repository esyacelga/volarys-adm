import {ModeloUsuario} from '../persona/TipoUsuarioPersona';

export class Pedido {
    _id = '';
    estado = 0;
    fechaCreacion: Date;
    solicitudDetalle: PedidoDetalle[] = [];
    usuario = '';
    tipoUsuarioPerona: TipoUsuarioPerona = new TipoUsuarioPerona();
    user: ModeloUsuario = new ModeloUsuario();
}


export class PedidoDetalle {
    _id = '';
    estado = 0;
    cantidad = 0;
    unidadCosto = 0;
    articulo: Artic = new Artic();
}


export class Artic {
    _id: string = '';
    descripcion: number = 0;
}

export class TipoUsuarioPerona {
    _id: string = '';
    persona: Persona = new Persona();
    usuario: ModeloUsuario = new ModeloUsuario();
}

export class Persona {
    _id: string = '';
    nombres: string = '';
    apellidos: string = '';
    picture: string = '';
    numeroTelefonoCelular: string = '';
    numeroTelefonoConvencional = '';

}

export class PedidoResumen {
    pedido: Pedido;
    usuario: string;
    total = 0;


    constructor(pedido: Pedido) {
        this.pedido = pedido;
        if (pedido !== null) {
            this.transform(pedido.solicitudDetalle);
        }
    }


    transform(lstDetalle: PedidoDetalle[]) {
        for (const entry of lstDetalle) {
            this.total = (entry.cantidad * entry.unidadCosto) + this.total;
        }
    }

}
