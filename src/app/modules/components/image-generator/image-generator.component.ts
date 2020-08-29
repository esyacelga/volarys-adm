import {Component, Input, OnInit} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {COLOR_TOAST_PRIMARY, COLOR_TOAST_WARNING} from '../../system/generic/classes/constant';
import {Util} from '../../system/generic/classes/util';
import {ImageGeneratorService} from './image-generator.service';

@Component({
    selector: 'app-image-generator',
    templateUrl: './image-generator.component.html',
    styleUrls: ['./image-generator.component.scss'],
})
export class ImageGeneratorComponent implements OnInit {
    @Input() public ruta: string;
    @Input() public nombreImagen: string;
    public imagen: string;

    constructor(private camera: Camera, private svrImage: ImageGeneratorService, private svr: Util) {
    }

    public ngOnInit() {
    }

    public camara() {
        const options: CameraOptions = {
            quality: 60,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.CAMERA
        };
        console.log('Entro a camara procesar camara');
        this.procesarImagen(options);
    }

    public libreria() {
        const options: CameraOptions = {
            quality: 60,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        this.procesarImagen(options);
    }

    public async procesarImagen(options: CameraOptions) {
        console.error('Revisar Foto');
        this.camera.getPicture(options).then((imageData) => {
            // @ts-ignore
            const img = window.Ionic.WebView.convertFileSrc(imageData);
            this.imagen = img;
            if (!img || img === null || img === '') {
                this.svr.presentToast('No se ha seleccionado imagen: ', COLOR_TOAST_PRIMARY);
                return;
            }

            this.svrImage.subirImagen(imageData, this.ruta);
        }, (err) => {
            this.svr.presentToast('Imagen no seleccionada', COLOR_TOAST_WARNING );
            // Handle error
        });
    }

}
