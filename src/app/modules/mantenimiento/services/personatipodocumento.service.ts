import { Injectable } from '@angular/core';
import { CrudService } from '../../shared/services/crud.service';
import { PersonaTipoDocumentoRequest } from '../models/personatipodocumento-request.module';
import { PersonaTipoDocumentoResponse } from '../models/personatipodocumento-response.module';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class PersonatipodocumentoService extends CrudService<PersonaTipoDocumentoRequest,PersonaTipoDocumentoResponse>{

  constructor(
    protected http:HttpClient
  ) { 
    super(http, urlConstants.personatipodocumento)
  }
}
