import { Injectable } from '@angular/core';
import { CrudService } from '../../shared/services/crud.service';
import { PersonaTipoRequest } from '../models/personatipo-request.module';
import { PersonaTipoResponse } from '../models/personatipo-response.module';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class PersonatipoService extends CrudService<PersonaTipoRequest,PersonaTipoResponse>{

  constructor(
    protected http:HttpClient
  ) { 
    super(http, urlConstants.personatipo)
  }
}
