import {TipoArticuloInterface} from './TipoArticuloInterface';

export interface ArticuloSegmentoInterface {
    _id: string;
    descripcion: string;
    tipoArticulo: TipoArticuloInterface;
    idTipoArticulo: string;
    estado: number;
    esServicioTransporte: boolean;
}

