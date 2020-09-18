import {ArticuloSegmento} from './articulo-segmento';

export class Articulo {
    public _id: string;
    public descripcion: string;
    public unidadAlmacenada: number;
    public unidadCosto: number;
    public articuloSegmento: string;
    public estado: number;
    public posicion: false;
    public portada: string;
    public coords: string;
    public esServicio: false;
    public esBanner: false;
    public permiteComentar: false;
    public ocultarBotonSolicitar: false;
    public img?: string[];
    public verObservacion: false;
    public obsevacion: string;
}


export class ObjetoArticulo {
    public _id: string;
    public descripcion: string;
    public unidadAlmacenada: number;
    public unidadCosto: number;
    public articuloSegmento: ArticuloSegmento = new ArticuloSegmento();
    public estado: number;
    public posicion: false;
    public portada: string;
    public imagenEditada: string;
    public esServicio: false;
    public esBanner: false;
    public permiteComentar: false;
    public ocultarBotonSolicitar: false;
    public verObservacion: false;
    public obsevacion: string;
    public obsevacionLarga: string;
    public horaInicio: Date;
    public horaFin: Date;
    public coords: string;
    public img?: string[];
}
