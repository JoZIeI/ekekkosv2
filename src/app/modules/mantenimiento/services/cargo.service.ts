import { Injectable } from '@angular/core';
import { CrudService } from '../../shared/services/crud.service';
import { CargoRequest } from '../models/cargo-request.module';
import { CargoResponse } from '../models/cargo-response.module';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class CargoService extends CrudService<CargoRequest,CargoResponse> {

  constructor(
    protected http:HttpClient
  ) { 
    super(http, urlConstants.cargo)
  }
}