import { Injectable } from '@angular/core';
import { CrudService } from '../../shared/services/crud.service';
import { PersonaGeneroRequest } from '../models/personagenero-request.module';
import { PersonaGeneroResponse } from '../models/personagenero-response.module';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class PersonageneroService extends CrudService<PersonaGeneroRequest,PersonaGeneroResponse>{

  constructor(
    protected http:HttpClient
  ) { 
    super(http, urlConstants.persona)
  }
}
