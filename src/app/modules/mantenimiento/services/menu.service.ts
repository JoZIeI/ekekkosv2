import { Injectable } from '@angular/core';

import { CrudService } from '../../shared/services/crud.service';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';
import { MenuRequest } from '../models/menu-request.module';
import { MenuResponse } from '../models/menu-response.module';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends CrudService<MenuRequest,MenuResponse> {

  constructor(
    protected http:HttpClient
  ) { 
    super(http, urlConstants.menu)
  }
}