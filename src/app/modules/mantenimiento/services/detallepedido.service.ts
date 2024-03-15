import { Injectable } from '@angular/core';
import { CrudService } from '../../shared/services/crud.service';
import { DetallePedidoRequest } from '../models/detallepedido-request.module';
import { DetallePedidoResponse } from '../models/detallepedido-response.module';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class DetallepedidoService extends CrudService<DetallePedidoRequest,DetallePedidoResponse> {

  constructor(
    protected http:HttpClient
  ) { 
    super(http, urlConstants.detallepedido)
  }
}