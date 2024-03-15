import { Injectable } from '@angular/core';
import { CrudService } from '../../shared/services/crud.service';
import { HttpClient } from '@angular/common/http';
import { PersonaRequest } from '../models/persona-request.module';
import { PersonaResponse } from '../models/persona-response.module';
import { urlConstants } from 'src/app/constants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class PersonaService extends CrudService<PersonaRequest,PersonaResponse>{

  constructor(
    protected http:HttpClient
  ) { 
    super(http, urlConstants.persona)
  }
}
