import {EventEmitter, Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class DataService {
    public actualiza = new EventEmitter<boolean>();

    constructor() {
    }

}
