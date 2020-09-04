import {PersonaModel} from '../persona/PersonaModel';
import {ArticuloModel} from './ArticuloModel';

export class NotificacionMensajeClass {
    public estado: boolean;
    public tipoNotificacion: number;
    public created: Date;
    public persona: PersonaModel;
    public articulo: ArticuloModel;
    public mensaje: string;
    public like: boolean;
    public dislike: boolean;
    public idSegmento: string;
    public nombreSegmento: string;
    public playerId: string;


    constructor(articulo: ArticuloModel, persona: PersonaModel, tipoNotificacion: number, mensaje: string,
                like: boolean, dislike: boolean, idSegmento: string,
                nombreSegmento: string, playerId: string) {
        this.mensaje = mensaje;
        this.persona = persona;
        this.articulo = articulo;
        this.tipoNotificacion = tipoNotificacion;
        this.estado = true;
        this.created = new Date();
        this.like = like;
        this.dislike = dislike;
        this.idSegmento = idSegmento;
        this.nombreSegmento = nombreSegmento;
        this.playerId = playerId;
    }
}


export class NotificacionIndividualClass {
    public estado: boolean;
    public tipoNotificacion: number;
    public created: Date;
    public persona: PersonaModel;
    public mensaje: string;
    public idSegmento: string;
    public nombreSegmento: string;
    public playerId: string;

    constructor(persona: PersonaModel, tipoNotificacion: number, mensaje: string,
                idSegmento: string, nombreSegmento: string, playerId: string) {
        this.mensaje = mensaje;
        this.persona = persona;
        this.tipoNotificacion = tipoNotificacion;
        this.estado = true;
        this.created = new Date();
        this.idSegmento = idSegmento;
        this.nombreSegmento = nombreSegmento;
        this.playerId = playerId;
    }
}
