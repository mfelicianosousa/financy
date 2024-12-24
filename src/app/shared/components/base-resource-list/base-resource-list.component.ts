import { Component, OnInit } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resources.services';
@Component({
  selector: '',
  template: '',
})

export abstract class BaseResourceListComponent<T extends BaseResourceModel>
  implements OnInit {

  resources: T[] = [];

  constructor(private resourceService: BaseResourceService<T>) { }

  ngOnInit() {

    console.log("Resources ", this)
    this.resourceService.getAll().subscribe(
       //entries => this.entries = entries.sort((a,b) => b.id - a.id),
       resources => this.resources = resources,
       error => alert('Erro ao carregar a lista')
    )
  }

  deleteResource(resource: T){
    const mustDelete = confirm('Deseja realmente excluir este item?')
    if (mustDelete){
       this.resourceService.delete(resource.id).subscribe(
        () => this.resources = this.resources.filter(element => element != resource),
        () => alert("Erro ao tentar excluir!")
      )
    }
  }

}
