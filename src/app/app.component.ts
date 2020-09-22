import {Component, OnInit} from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {NavController, Platform} from '@ionic/angular';
import {PushNotificationService} from './modules/system/generic/service/push-notification.service';
import {Util} from './modules/system/generic/classes/util';
import {COLOR_TOAST_SUCCESS, COLOR_TOAST_WARNING} from './modules/system/generic/classes/constant';
import {SwPush} from '@angular/service-worker';
import {ObjSubscripcionInterface} from './classes/interface/common/ObjSubscripcionInterface';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

    constructor(
        private platform: Platform,
        private utl: Util,
        private swPush: SwPush,
        private navCtrl: NavController,
        private svtNotificacion: PushNotificationService,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
    ) {
        this.initializeApp();
    }

    public selectedIndex = 0;
    public appPages = [
        {
            title: 'Pedidos Recibidos',
            url: 'pedidos-recibidos',
            icon: 'calculator',
        },
        {
            title: 'Pedidos Notificados',
            url: 'pedidos-notificados',
            icon: 'calculator',
        },
        {
            title: 'Pedidos Anulados',
            url: 'pedidos-anulados',
            icon: 'calculator',
        },
        {
            title: 'Pedidos Finalizados',
            url: 'pedidos-finalizados',
            icon: 'calculator',
        },
        {
            title: 'Articulo',
            url: 'articulo',
            icon: 'cube',
        },
        {
            title: 'Persona Adm',
            url: 'dato-persona',
            icon: 'body',
        },
        {
            title: 'Notificador',
            url: 'notificador-persona',
            icon: 'notifications',
        },
        {
            title: 'Notificador masiva',
            url: 'notificacion-masiva',
            icon: 'notifications',
        },
        {
            title: 'Rol',
            url: 'tipo-usuario',
            icon: 'body',
        },
        {
            title: 'Rol Persona',
            url: 'rol-persona',
            icon: 'body',
        },
        {
            title: 'Parámetro',
            url: '/parametro',
            icon: 'build',
        },
        {
            title: 'Tipo Articulo',
            url: 'tipo-articulo',
            icon: 'cube',
        },

        {
            title: 'Sector',
            url: '/sector',
            icon: 'clipboard',
        },
        {
            title: 'Segmento',
            url: 'segmento',
            icon: 'bookmarks',
        },
    ];

    public initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.iniciaPulginCordova();
        });
    }

    public ngOnInit() {
        this.navCtrl.navigateRoot('pedidos-recibidos');
    }

    public async iniciaPulginCordova() {
        if (this.platform.is('cordova')) {
            this.svtNotificacion.configuracionInicial();
        } else {
            const llave = await this.svtNotificacion.obtenerLlavePublica();
            await this.activarNotificacionesWeb(llave);
        }
    }

    public activarNotificacionesWeb(llavePublica) {
        console.log(llavePublica);
        this.swPush.requestSubscription({
            serverPublicKey: llavePublica
        }).then(async (sub: PushSubscription) => {
            const objeto: ObjSubscripcionInterface = sub.toJSON() as unknown as ObjSubscripcionInterface;
            const dataObj: ObjSubscripcionInterface = await this.svtNotificacion.registrarSubscripcion(objeto) as ObjSubscripcionInterface;
            console.log(dataObj);
        })
            .catch(err => {
                this.utl.presentToast('No Suscrito', COLOR_TOAST_WARNING);
            });

        this.swPush.messages.subscribe(obj => {
            console.log(obj);
            // @ts-ignore
            console.log(obj.notification.body);
            // @ts-ignore
            this.utl.presentToastExtend(obj.notification.body, COLOR_TOAST_SUCCESS);
        });
    }
}
