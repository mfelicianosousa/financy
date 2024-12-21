import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { BaseResourceService } from '../../../shared/services/base-resources.services';
import { CategoryService } from '../../categories/shared/category.service';
import { Entry } from './entry.model';
@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(
    protected injector: Injector,
    private categoryService
  ) {
    super( "api/entries", injector);
  }

  create(entry: Entry): Observable<Entry> {

    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;

        return super.create(entry);

      })
    )
  }

  update(entry: Entry): Observable<Entry> {

    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;

        return super.update(entry);
      })
    )

  }


  protected jsonDataToResorces(jsonData: any[]): Entry[]{
    //console.log(jsonData[0] as Entry)
    //console.log(Object.assign(new Entry(), jsonData[0]));

    const entries: Entry[] = [];
     //jsonData.forEach(element => entries.push( element as Entry ));
    jsonData.forEach( element => {
      const entry = Object.assign( new Entry(), element);
      entries.push( entry );

    });

     return entries;
  }

  protected jsonDataToResource(jsonData: any):Entry{
    return Object.assign( new Entry(), jsonData);
  }

}
