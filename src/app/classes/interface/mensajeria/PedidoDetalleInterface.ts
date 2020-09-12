import {ArticuloInterface} from '../inventario/ArticuloInterface';

export interface PedidoDetalleInterface {
    _id: string;
    estado: number;
    articulo: ArticuloInterface;
    cantidad: number;
    unidadCosto: number;
}
