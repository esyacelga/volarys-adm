import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class StorageAppService {
    public objGuardado: any = null;

    constructor(private storage: Storage, private platform: Platform) {

    }

    public eliminarTodo() {
        if (this.platform.is('cordova')) {
            this.storage.clear();

        } else {
            localStorage.clear();
        }
    }

    public loadStorageObject(key: string) {
        const promesa = new Promise((resolve, reject) => {
            if (this.platform.is('cordova')) {
                this.storage.get(key).then((val) => {
                    let objRegenrado = null;
                    try {
                        objRegenrado = JSON.parse(JSON.stringify(val));
                    } catch (error) {
                        console.error(error);
                        console.log(error);
                    }
                    resolve(objRegenrado);
                }, reason => {
                    console.log(this.objGuardado);
                });

            } else {
                if (localStorage.getItem(key)) {
                    this.objGuardado = JSON.parse(localStorage.getItem(key));
                    resolve(this.objGuardado);
                } else {
                    resolve(null);
                }

            }
        });
        return promesa;
    }

    public setStorageObject(obj, key) {
        if (this.platform.is('cordova')) {
            this.storage.set(key, obj);
        } else {
            localStorage.setItem(key, JSON.stringify(obj));
        }
    }
}
