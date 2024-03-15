import { Injectable } from '@angular/core';
import { CrudService } from '../../shared/services/crud.service';

import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';
import { MesaRequest } from '../models/mesa-request.module';
import { MesaResponse } from '../models/mesa-response.module';

@Injectable({
  providedIn: 'root'
})
export class MesaService extends CrudService<MesaRequest,MesaResponse>{

  constructor(
    protected http:HttpClient
  ) { 
    super(http, urlConstants.mesa)
  }
}
