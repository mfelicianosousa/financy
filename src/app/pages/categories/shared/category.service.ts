import { Injectable, Injector } from '@angular/core';

import { Category } from './category.model';
import { BaseResourceService } from '../../../shared/services/base-resources.services';
@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<Category> {

  constructor(protected injector: Injector) {
    super("api/categories", injector, Category.fromJson )

  }




}
