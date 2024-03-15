import { Injectable } from '@angular/core';
import { CrudService } from '../../shared/services/crud.service';
import { HttpClient } from '@angular/common/http';
import { MetodoPagoRequest } from '../models/metodopago-request.module';
import { MetodoPagoResponse } from '../models/metodopago-response.module';
import { urlConstants } from 'src/app/constants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class MetodopagoService extends CrudService<MetodoPagoRequest,MetodoPagoResponse>{

  constructor(
    protected http:HttpClient
  ) { 
    super(http, urlConstants.metodopago)
  }
}
