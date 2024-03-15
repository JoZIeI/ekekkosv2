import { Injectable } from '@angular/core';
import { CrudService } from '../../shared/services/crud.service';
import { ColaboradorRequest } from '../models/colaborador-request.module';
import { ColaboradorResponse } from '../models/colaborador-response.module';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService extends CrudService<ColaboradorRequest,ColaboradorResponse> {

  constructor(
    protected http:HttpClient
  ) { 
    super(http, urlConstants.colaborador)
  }
}