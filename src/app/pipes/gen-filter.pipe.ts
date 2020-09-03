import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'underscore';

@Pipe({
    name: 'genFilter'
})
export class GenFilterPipe implements PipeTransform {

    transform(items: any[], filter: any): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out

        const lst: any[] = _.where(items, filter);
        return lst;
       // return items.filter(item => item.tipoArticulo.indexOf(filter.tipoArticulo) !== -1);
    }

}
