export class ArticuloModel {
    public _id: string = '';
    public articuloSegmento = '';
    public img: string[] = [];
    public unidadCosto: Number = 0;
    public unidadAlmacenada: Number = 0;
    public descripcion: string = '';
    public estado: boolean = false;
    public fechaCreacion: Date = new Date();
    public portada: string = '';
    public verObservacion: boolean = false;
    public obsevacion: string = '';
    public esBanner: boolean = false;
    public conteoLike: Number = 0;
    public conteoDisLike: Number = 0;
    public conteoComentarios: Number = 0;
}
