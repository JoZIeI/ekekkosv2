import { Injectable } from '@angular/core';
import { CrudService } from '../../shared/services/crud.service';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';
import { ProductoRequest } from '../models/producto-request.model';
import { ProductoResponse } from '../models/producto-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends CrudService<ProductoRequest,ProductoResponse> {

  constructor(
    protected http:HttpClient
  ) { 
    super(http, urlConstants.producto)
  }
}
