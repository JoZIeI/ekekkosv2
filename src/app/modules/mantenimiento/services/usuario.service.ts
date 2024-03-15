import { Injectable } from '@angular/core';
import { CrudService } from '../../shared/services/crud.service';
import { UsuarioRequest } from '../models/usuario-request.module';

import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';
import { UsuarioResponse } from '../models/usuario-response.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CrudService<UsuarioRequest,UsuarioResponse>{

  constructor(
    protected http:HttpClient
  ) { 
    super(http, urlConstants.Usuario)
  }
}
