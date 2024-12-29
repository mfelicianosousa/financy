import { Component, OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resources.services';

import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';

@Component({
  selector: '', // Seletor vazio porque é uma classe abstrata
  template: ''  // Template vazio porque é uma classe abstrata
})
export abstract class BaseResourceFormComponent<T extends BaseResourceModel>
  implements OnInit, AfterContentChecked {

  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData: any) => T
  ) {
    // Injeções de dependências realizadas através do Injector
    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
    this.formBuilder = injector.get(FormBuilder);
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm(): void {
    this.submittingForm = true;
    if (this.currentAction === 'new') {
      this.createResource();
    } else {
      this.updateResource();
    }
  }

  // Métodos protegidos
  protected setCurrentAction(): void {
    this.currentAction = (this.route.snapshot.url && this.route.snapshot.url[0] && this.route.snapshot.url[0].path === 'new') ? 'new' : 'edit';
  }

  protected loadResource(): void {
    if (this.currentAction === 'edit') {
      this.route.paramMap
        .pipe(switchMap(params => this.resourceService.getById(+params.get('id'))))
        .subscribe(
          resource => {
            this.resource = resource;
            this.resourceForm.patchValue(resource); // Preenche o formulário com os dados carregados
          },
          error => {
            alert('Ocorreu um erro no servidor, tente mais tarde.');
          }
        );
    }
  }

  protected setPageTitle(): void {
    this.pageTitle = this.currentAction === 'new' ? this.creationPageTitle() : this.editionPageTitle();
  }

  protected creationPageTitle(): string {
    return 'Novo';
  }

  protected editionPageTitle(): string {
    return 'Edição';
  }

  protected createResource(): void {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.create(resource).subscribe(
      resource => this.actionsForSuccess(resource),
      error => this.actionsForError(error)
    );
  }

  protected updateResource(): void {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.update(resource).subscribe(
      resource => this.actionsForSuccess(resource),
      error => this.actionsForError(error)
    );
  }

  protected actionsForSuccess(resource: T): void {
    toastr.success('Solicitação processada com sucesso!');
    const baseComponentPath: string = this.route.snapshot.parent && this.route.snapshot.parent.url && this.route.snapshot.parent.url[0] ? this.route.snapshot.parent.url[0].path : '';
    // Redireciona e recarrega a página do componente
    this.router.navigateByUrl(baseComponentPath, { skipLocationChange: true }).then(() => {
      this.router.navigate([baseComponentPath, resource.id, 'edição']);
    });
  }

  protected actionsForError(error: any): void {
    toastr.error('Ocorreu um erro ao processar a sua solicitação.');
    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error.error).errors;
    } else {
      this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor, tente mais tarde.'];
    }
  }

  // Método abstrato a ser implementado pelas classes filhas
  protected abstract buildResourceForm(): void;
}
