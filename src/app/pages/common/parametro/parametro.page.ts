import {Component, OnInit} from '@angular/core';
import {ParametroService} from '../../../services/common/parametro.service';
import {ParametroInterface} from '../../../classes/interface/common/ParametroInterface';
import {ParametroClass} from '../../../classes/interface/common/ParametroClass';

@Component({
    selector: 'app-parametro',
    templateUrl: './parametro.page.html',
    styleUrls: ['./parametro.page.scss'],
})
export class ParametroPage implements OnInit {
    public objParametro: ParametroClass;
    public lstObjParametro: ParametroInterface[];

    constructor(private svrParametro: ParametroService) {
    }

    crearNuevo() {
        this.objParametro = new ParametroClass();
    }

    public async registarParametro(objParametro: ParametroInterface) {
        this.objParametro = (await this.svrParametro.registarParametro(objParametro)) as unknown as ParametroInterface;
        this.objParametro = null;
        this.cargarInical();
    }

    public async cargarInical() {
        this.lstObjParametro = (await this.svrParametro.obtenerParametros()) as ParametroInterface[];
    }

    ngOnInit() {
        this.cargarInical();
    }

}
