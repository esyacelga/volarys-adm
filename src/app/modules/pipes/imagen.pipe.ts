import { Pipe, PipeTransform } from '@angular/core';
import {environment} from '../../../environments/environment';
const URL = environment.url;
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, directorio: string): string {
    console.log(`${ URL }/articulo/imagen/${ directorio }/${ img }`);
    return `${ URL }/articulo/imagen/${ directorio }/${ img }`;
  }

}
