import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {ImageGeneratorService} from '../image-generator/image-generator.service';
import {Util} from '../../system/generic/classes/util';
import {COLOR_TOAST_WARNING} from '../../system/generic/classes/constant';

@Component({
    selector: 'app-imagen-editor',
    templateUrl: './imagen-editor.component.html',
    styleUrls: ['./imagen-editor.component.scss'],
})
export class ImagenEditorComponent implements OnInit, OnDestroy {
    @Input() public directorio = '';
    @Input() public idImagen = '';


    constructor(private camera: Camera, public  svrImagen: ImageGeneratorService, private util: Util) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.directorio = '';
        this.idImagen = '';
        // Esta variable quita la imagen guardada en memoria
        this.svrImagen.imagenObtenida = null;
    }

    public seleccionarPorLibreria() {
        if (!this.directorio) {
            this.util.presentToast('Debe ingresar un directorio valido', COLOR_TOAST_WARNING);
            return;
        }

        const options: CameraOptions = {
            quality: 60,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        };
        this.svrImagen.procesarImagen(options, this.directorio);
    }

    public seleccionarPoCamara() {
        if (!this.directorio) {
            this.util.presentToast('Debe ingresar un directorio valido', COLOR_TOAST_WARNING);
            return;
        }
        const options: CameraOptions = {
            quality: 60,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.CAMERA,
        };
        this.svrImagen.procesarImagen(options, this.directorio);
    }

}
