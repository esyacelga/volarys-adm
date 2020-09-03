import {Component, OnInit} from '@angular/core';
import {ArticuloSegmento} from '../../../classes/mensajeria/articulo-segmento';
import {TipoArticuloClientService} from '../../../services/mensajeria/tipo-articulo-client.service';
import {SegmentoService} from '../../../services/mensajeria/segmento.service';
import {ArticuloSegmentoInterface} from '../../../classes/interface/inventario/ArticuloSegmentoInterface';
import {TipoArticuloInterface} from '../../../classes/interface/inventario/TipoArticuloInterface';

@Component({
    selector: 'app-segmento',
    templateUrl: './segmento.page.html',
    styleUrls: ['./segmento.page.scss'],
})
export class SegmentoPage implements OnInit {

    segmentoArticulo: ArticuloSegmento;
    lstSegmento: ArticuloSegmentoInterface[];
    lstTipoArticulos: TipoArticuloInterface[];

    constructor(private svcTipoArticulo: TipoArticuloClientService, private svcArticuloSegmento: SegmentoService) {
    }

    async ngOnInit() {
        await this.obtenerTipoArticuloTodos();
        await this.obtenerSegmentos();
    }

    crearNuevo() {
        this.segmentoArticulo = new ArticuloSegmento();
    }

    async registrarNuevo(objGuardar: ArticuloSegmento) {
        // @ts-ignore}
        objGuardar.estado = 1;
        await this.svcArticuloSegmento.registarSegmento(objGuardar);
        await this.obtenerSegmentos();
        this.segmentoArticulo = null;
    }

    async obtenerTipoArticuloTodos() {
        this.lstTipoArticulos = (await this.svcTipoArticulo.obtenerTipoArticulos() as TipoArticuloInterface[]);
    }


    async obtenerSegmentos() {
        this.lstSegmento = (await this.svcArticuloSegmento.obtenerSegmentos() as ArticuloSegmentoInterface[]);
        for (const data of this.lstSegmento)
        {
            data.idTipoArticulo = data.tipoArticulo._id;
        }
    }

    async eliminar(articuloSegmento: ArticuloSegmento) {
        articuloSegmento.estado = 0;
        await this.svcArticuloSegmento.registarSegmento(articuloSegmento);
        this.obtenerSegmentos();
        this.segmentoArticulo = null;
    }

}
