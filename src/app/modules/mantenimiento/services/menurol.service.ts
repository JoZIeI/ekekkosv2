import { Injectable } from '@angular/core';

import { CrudService } from '../../shared/services/crud.service';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';
import { MenuRolRequest } from '../models/menurol-request.module';
import { MenuRolResponse } from '../models/menurol-response.module';

@Injectable({
  providedIn: 'root'
})
export class MenurolService extends CrudService<MenuRolRequest,MenuRolResponse> {

  constructor(
    protected http:HttpClient
  ) { 
    super(http, urlConstants.menurol)
  }
}