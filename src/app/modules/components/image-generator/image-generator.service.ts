import {Injectable} from '@angular/core';
import {ImageObject} from '../../system/generic/classes/ImageObject';
import {RequestOptions} from '../../system/generic/classes/RequestOptions';
import {ExecuteCallProcedureService} from '../../system/generic/service/execute-call-procedure.service';
import {URL_CRUD_ARTICULO_IMAGE_UPLOAD} from '../../../constantes/ConstanteTransaccional';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {COLOR_TOAST_WARNING} from '../../system/generic/classes/constant';
import {Util} from '../../system/generic/classes/util';
import {Platform} from '@ionic/angular';
import {WebView} from '@ionic-native/ionic-webview/ngx';

@Injectable({
    providedIn: 'root'
})
export class ImageGeneratorService {
    public imagenObtenida: string;

    constructor(private genericService: ExecuteCallProcedureService,
                private platform: Platform,
                private webview: WebView,
                private camera: Camera, private util: Util) {

    }

    /**
     * Servicio de envio de imagenes al servidor
     * @param img
     * @param path
     */
    async subirImagen(img: string, path: string) {
        const dataImage = new ImageObject(img, path);
        const requestOptions = new RequestOptions();
        requestOptions.successMessaje = 'Archivo cargado exitosamente';
        requestOptions.errorMessage = 'Hubo un error al cargar la imagen';
        requestOptions.loadingMessage = 'Cargando imagen';
        return await this.genericService.fileTransferService(dataImage, URL_CRUD_ARTICULO_IMAGE_UPLOAD, requestOptions);

    }

    public pathForImage(img) {
        if (img === null) {
            return '';
        } else {
            const converted = this.webview.convertFileSrc(img);
            return converted;
        }
    }

    /**
     * El directorio en caso de ser parte de articulos de envia el nombre del segmento
     * @param options
     */
    public async procesarImagen(options: CameraOptions, directorio) {
        if (this.platform.is('cordova')) {
            if (!directorio) {
                this.util.presentToast('No se ha enviado el directorio desde el componente', COLOR_TOAST_WARNING);
            }
            const imageData = await this.camera.getPicture(options);
            if (imageData) {
                const img = this.pathForImage(imageData);

                this.imagenObtenida = img;
                await this.subirImagen(imageData, directorio);
            }
            /*    this.camera.getPicture(options).then(async (imageData) => {
                    // @ts-ignore

                }, (err) => {
                    this.util.presentToast('Ocurrion un error al cargar la imagen:' + err, COLOR_TOAST_ERROR);
                });*/
        } else {
            this.util.presentToast('Opcion no valida desde sistema WEB', COLOR_TOAST_WARNING);
        }
    }


}
