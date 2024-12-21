import { BaseResourceModel } from "../../../shared/models/base-resource.models";
export class Category extends BaseResourceModel {
  constructor(
    public id?:number,
    public name?:string,
    public description?:string,

  ){
    super();
  }
}
