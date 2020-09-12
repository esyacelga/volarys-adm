import {Component, OnInit} from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {NavController, Platform} from '@ionic/angular';
import {PushNotificationService} from './modules/system/generic/service/push-notification.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
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
    public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

    constructor(
        private platform: Platform,
        private navCtrl: NavController,
        private svtNotificacion: PushNotificationService,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
    ) {
        this.initializeApp();
    }

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

    public iniciaPulginCordova() {
        if (this.platform.is('cordova')) {

            this.svtNotificacion.configuracionInicial();
        }
    }

}
