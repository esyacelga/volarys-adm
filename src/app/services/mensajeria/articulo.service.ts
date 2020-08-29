import {Injectable} from '@angular/core';
import {FileTransfer} from '@ionic-native/file-transfer/ngx';
import {environment} from '../../../environments/environment.prod';
import {Articulo} from '../../classes/mensajeria/Articulo';
import {OBTENER_TODOS_ARTICULOS} from '../../constantes/ConstanteConsulta';
import {CRUD_ARTICULO, URL_CRUD_ARTICULO_IMAGE_UPLOAD} from '../../constantes/ConstanteTransaccional';
import {ImageObject} from '../../modules/system/generic/classes/ImageObject';
import {RequestOptions} from '../../modules/system/generic/classes/RequestOptions';
import {ExecuteCallProcedureService} from '../../modules/system/generic/service/execute-call-procedure.service';


const URL = environment.url;

@Injectable({
    providedIn: 'root'
})
export class ArticuloService {

    constructor(private genericService: ExecuteCallProcedureService, private fileTransfer: FileTransfer) {

    }

    public async registarArticulo(segmento: Articulo) {
        const requestOptions = new RequestOptions();
        const data = await this.genericService.servicioRestGenericoPost(segmento, CRUD_ARTICULO, requestOptions) as Articulo;
        return data;
    }

    public async obtenerArticulos() {
        const requestOptions = new RequestOptions();
        return await this.genericService.servicioRestGenericoGet({}, OBTENER_TODOS_ARTICULOS, requestOptions);
    }

    public async subirImagen(img: string, path: string) {
        const dataImage = new ImageObject(img, path);
        const requestOptions = new RequestOptions();
        requestOptions.successMessaje = 'Archivo cargado exitosamente';
        requestOptions.errorMessage = 'Hubo un error al cargar la imagen';
        requestOptions.loadingMessage = 'Cargando imagen';
        return await this.genericService.fileTransferService(dataImage, URL_CRUD_ARTICULO_IMAGE_UPLOAD, requestOptions);

    }


}
