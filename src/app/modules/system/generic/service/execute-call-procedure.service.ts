import {Injectable} from '@angular/core';
import {
    COLOR_TOAST_ERROR,
    COLOR_TOAST_MEDIUM,
    COLOR_TOAST_PRIMARY,
    DURATION_TOAST,
    ERROR_MESSAGE,
    LOAD_MESSAGE,
    OFFLINE,
    PROC_GET_XML_GENERICO,
    PROC_XML_REST_GENERICO,
    SUCCESS_MESSAGE
} from '../classes/constant';
import {Platform, ToastController} from '@ionic/angular';
import {RequestOptions} from '../classes/RequestOptions';
import {LoadingService} from './loading.service';
import {Util} from '../classes/util';
import {RestConectionService} from './rest-conection.service';
import {ImageObject} from '../classes/ImageObject';

@Injectable({
    providedIn: 'root'
})
export class ExecuteCallProcedureService {
    mostrarMensaje = false;
    private internetConection = true;

    constructor(private utilService: Util,
                private notify: ToastController,
                protected loading: LoadingService,
                private platform: Platform,
                private restConnection: RestConectionService) {

    }

    public async getGenericObjects(genericObject: any, storeProcedure: string, options?: RequestOptions) {
        if (!options) {
            options = new RequestOptions();
        }
        const promesa = new Promise(async (resolve, reject) => {
            if (options.restUrl === undefined) {
                options.restUrl = PROC_GET_XML_GENERICO;
            }

            if (options.successMessaje === undefined) {
                options.successMessaje = SUCCESS_MESSAGE;
            }
            if (options.errorMessage === undefined) {
                options.errorMessage = ERROR_MESSAGE;
            }
            if (options.loadingMessage === undefined) {
                options.loadingMessage = LOAD_MESSAGE;
            }
            if (options.toastColor === undefined) {
                options.toastColor = COLOR_TOAST_PRIMARY;
            }

            this.restConnection.procConsultaGenerica(genericObject, storeProcedure, options.restUrl).subscribe(async resp => {
                this.loading.dismiss('messagesService.loadMessagesOverview');
                if (resp.RETURN_VALUE !== 1) {
                    await this.presentToast(resp.AS_MSJ, COLOR_TOAST_ERROR);
                    reject(resp.AS_MSJ);
                } else {
                    let obj = null;
                    if (options.responseType === 1) {
                        obj = this.utilService.entidadDesdeXML(resp.AS_XML);
                    } else {
                        obj = this.utilService.listaDesdeXML(resp.AS_XML);
                    }
                    resolve(obj);
                }
            }, async error => {
                await this.loading.dismiss('messagesService.loadMessagesOverview');
                console.log(error);
                console.log(storeProcedure);
                this.presentToast(options.errorMessage, COLOR_TOAST_ERROR);
                reject(error);
            });
        });
        return promesa;
    }

    public ejecucionGenerica = function(genericObject: any, storeProcedure: string, messages?: RequestOptions) {
        const promesa = new Promise((resolve, reject) => {
            if (!messages) {
                messages = new RequestOptions();
            }
            if (messages.restUrl === undefined) {
                messages.restUrl = PROC_XML_REST_GENERICO;
            }
            if (messages.successMessaje === undefined) {
                messages.successMessaje = SUCCESS_MESSAGE;
            }
            if (messages.errorMessage === undefined) {
                messages.errorMessage = ERROR_MESSAGE;
            }
            if (messages.loadingMessage === undefined) {
                messages.loadingMessage = LOAD_MESSAGE;
            }
            if (messages.toastColor === undefined) {
                messages.toastColor = COLOR_TOAST_PRIMARY;
            }
            this.loading.present('messagesService.loadMessagesOverview', messages.loadingMessage);
            this.restConnection.procEjecucionGenerica(genericObject, storeProcedure, messages.restUrl).subscribe(resp => {
                this.loading.dismiss('messagesService.loadMessagesOverview');
                this.presentToast(messages.successMessaje, messages.toastColor);
                if (resp.RETURN_VALUE !== 1) {
                    this.presentToast(resp.AS_MSJ, COLOR_TOAST_ERROR);
                    reject(resp.AS_MSJ);
                } else {
                    let obj = null;
                    if (messages.responseType === 1) {
                        obj = this.utilService.entidadDesdeXML(resp.AS_XML);
                    } else {
                        obj = this.utilService.listaDesdeXML(resp.AS_XML);
                    }
                    resolve(obj);
                }
            }, error => {
                console.log(error);
                console.log(storeProcedure);
                this.loading.dismiss('messagesService.loadMessagesOverview');
                this.presentToast(messages.errorMessage, COLOR_TOAST_ERROR);
                reject(error);
            });
        });

        return promesa;
    };


    public async servicioRestGenericoGet(genericObject: any, urlRestService: string, options?: RequestOptions) {
        if (!options) {
            options = new RequestOptions();
        }
        if (this.internetConection === false) {
            this.presentToast(OFFLINE, COLOR_TOAST_MEDIUM, 'bottom');
            return;
        }
        const promesa = new Promise(async (resolve, reject) => {

            if (options.successMessaje === undefined) {
                options.successMessaje = SUCCESS_MESSAGE;
            }
            if (options.errorMessage === undefined) {
                options.errorMessage = ERROR_MESSAGE;
            }
            if (options.loadingMessage === undefined) {
                options.loadingMessage = LOAD_MESSAGE;
            }
            if (options.toastColor === undefined) {
                options.toastColor = COLOR_TOAST_PRIMARY;
            }
            if (options.presentarToast === undefined) {
                options.presentarToast = false;
            }
            if (options.mostrarLoading === undefined) {
                options.mostrarLoading = true;
            }
            if (options.mostrarLoading === true) {
                await this.loading.present('messagesService.loadMessagesOverview', options.loadingMessage);
            }

            this.restConnection.genericGetRestFull(genericObject, urlRestService).subscribe(async resp => {
                if (options.mostrarLoading === true) {
                    await this.loading.dismiss('messagesService.loadMessagesOverview');
                }
                if (options.presentarToast === true) {
                    this.presentToast(options.successMessaje, options.toastColor);
                }
                let obj = null;
                if (options.responseType === 1) {
                    obj = resp.items;
                } else {
                    obj = resp.objeto;
                }
                resolve(obj);
            }, async error => {
                const mensaje = this.errorToMessage(error, urlRestService);
                if (mensaje) {
                    await this.loading.dismiss('messagesService.loadMessagesOverview');
                    this.presentToast(mensaje, COLOR_TOAST_ERROR);
                }
                reject(error);
            });
        });
        return promesa;
    }

    public errorToMessage(error, nombreRest) {
        let tituloError = '';
        let detalleError = 'Log: ' + nombreRest;
        if (error.error) {
            if (error.error.message) {
                tituloError = tituloError + error.error.message;
            }
        }
        tituloError = tituloError;
        if (error.error.errors === undefined) {
            return 'Existe un problema con su conexión de internet';
        }
        detalleError = this.lectorError(error.error.errors.errors);
        if (this.mostrarMensaje === true) {
            return tituloError + ' </br> ' + detalleError;
        } else {
            return detalleError;
        }
    }


    public lectorError(objError) {
        let mensajes = '';
        for (const aProperty in objError) {
            if (objError.hasOwnProperty(aProperty)) {
                const data = objError[aProperty];
                mensajes = data.message;
                if (data.mostrarDetalle) {
                    this.mostrarMensaje = data.mostrarDetalle;
                }
            }
        }
        return mensajes;
    }

    public servicioRestGenericoPost = function(genericObject: any, urlRestService: string, messages?: RequestOptions) {
        if (this.internetConection === false) {
            this.presentToast(OFFLINE, COLOR_TOAST_MEDIUM, 'bottom');
            return;
        }
        return new Promise(async (resolve, reject) => {
            if (!messages) {
                messages = new RequestOptions();
            }
            if (messages.successMessaje === undefined) {
                messages.successMessaje = SUCCESS_MESSAGE;
            }
            if (messages.errorMessage === undefined) {
                messages.errorMessage = ERROR_MESSAGE;
            }
            if (messages.loadingMessage === undefined) {
                messages.loadingMessage = LOAD_MESSAGE;
            }
            if (messages.toastColor === undefined) {
                messages.toastColor = COLOR_TOAST_PRIMARY;
            }
            if (messages.presentarToast === undefined) {
                messages.presentarToast = false;
            }
            if (messages.mostrarLoading === undefined) {
                messages.mostrarLoading = true;
            }
            if (messages.mostrarLoading === true) {
                await this.loading.present('messagesService.loadMessagesOverview', messages.loadingMessage);
            }
            if (!genericObject._id) {
                this.restConnection.genericPostRestFull(genericObject, urlRestService).subscribe(async resp => {
                    if (messages.mostrarLoading === true) {
                        await this.loading.dismiss('messagesService.loadMessagesOverview');
                    }
                    if (messages.presentarToast === true) {
                        this.presentToast(messages.successMessaje, messages.toastColor);
                    }
                    let obj = null;
                    if (messages.responseType === 1) {
                        obj = resp;
                    } else {
                        obj = resp.objeto;
                    }
                    resolve(obj);
                }, async httpError => {
                    const mensaje = this.lectorError(httpError.error.errors.errors);
                    await this.loading.dismiss('messagesService.loadMessagesOverview');
                    if (httpError !== undefined && httpError.error !== undefined && httpError.error.errors !== undefined && mensaje === '') {
                        this.presentToast(httpError.error.errors.message, COLOR_TOAST_ERROR);
                    } else {
                        this.presentToast(mensaje, COLOR_TOAST_ERROR);
                    }
                    reject(httpError.error.errors);
                });
            } else {
                this.restConnection.genericPutRestFull(genericObject, urlRestService).subscribe(async resp => {
                    await this.loading.dismiss('messagesService.loadMessagesOverview');
                    if (messages.presentarToast === true) {
                        this.presentToast(messages.successMessaje, messages.toastColor);
                    }
                    let obj = null;
                    if (messages.responseType === 1) {
                        obj = resp;
                    } else {
                        obj = resp.objeto;
                    }
                    resolve(obj);
                }, async error => {
                    await this.loading.dismiss('messagesService.loadMessagesOverview');
                    let mensaje = 'Error en al ejcuatar la peticion PUT';
                    if (error && error.error && error.error.errors && error.error.errors.errors) {
                        mensaje = this.lectorError(error.error.errors.errors);
                    } else {
                        this.presentToast(mensaje, COLOR_TOAST_ERROR);
                    }
                    reject(mensaje);
                });
            }


        });
    };


    public fileTransferService = function(genericObject: ImageObject, urlRestService: string, messages?: RequestOptions) {
        return new Promise(async (resolve, reject) => {
            if (!messages) {
                messages = new RequestOptions();
            }
            if (messages.successMessaje === undefined) {
                messages.successMessaje = SUCCESS_MESSAGE;
            }
            if (messages.errorMessage === undefined) {
                messages.errorMessage = ERROR_MESSAGE;
            }
            if (messages.loadingMessage === undefined) {
                messages.loadingMessage = LOAD_MESSAGE;
            }
            if (messages.toastColor === undefined) {
                messages.toastColor = COLOR_TOAST_PRIMARY;
            }

            await this.loading.present('messagesService.loadMessagesOverview', messages.loadingMessage);
            this.restConnection.subirImagen(genericObject, urlRestService).then(async resp => {
                await this.loading.dismiss('messagesService.loadMessagesOverview');
                this.presentToast(messages.successMessaje, messages.toastColor);
                console.log('se ha subido exitosmente');
                resolve(resp);

            }, async error => {
                console.log(error);
                console.log('se ha subido errors');
                console.log(urlRestService);
                await this.loading.dismiss('messagesService.loadMessagesOverview');
                if (error && error.errors && error.errors.errors) {
                    this.presentToast(error.errors.errors.message, COLOR_TOAST_ERROR);
                } else {
                    this.presentToast(messages.errorMessage, COLOR_TOAST_ERROR);
                }
                reject(error);
            });


        });
    };


    private async presentToast(mensaje, color, position ?) {
        if (!position) {
            position = 'top';
        }
        const toast = await this.notify.create({
            message: mensaje,
            position,
            duration: DURATION_TOAST,
            color
        });
        toast.present();
    }
}
