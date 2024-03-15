import { Injectable } from '@angular/core';
import { CrudService } from '../../shared/services/crud.service';
import { ProductoCategoriumRequest } from '../models/productocategorium-request.module';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class ProductocategoriumService extends CrudService<ProductoCategoriumRequest,ProductoCategoriumRequest>{

  constructor(
    protected http:HttpClient
  ) { 
    super(http, urlConstants.categoria)
  }
}
