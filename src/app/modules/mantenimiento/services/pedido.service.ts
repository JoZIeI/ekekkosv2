import { Injectable } from '@angular/core';
import { CrudService } from '../../shared/services/crud.service';
import { PedidoRequest } from '../models/pedido-request.module';
import { PedidoResponse } from '../models/pedido-response.module';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends CrudService<PedidoRequest,PedidoResponse>{

  constructor(
    protected http:HttpClient
  ) { 
    super(http, urlConstants.pedido)
  }
}
