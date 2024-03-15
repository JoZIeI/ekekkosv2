import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../Models/login-request.model';
import { Observable } from 'rxjs';
import { LoginResponse } from '../Models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = "https://localhost:7223/api/Auth";
  constructor(
    private http: HttpClient
  ) { }
  login(req: LoginRequest): Observable<LoginResponse> 
  {
    return this.http.post<LoginResponse>(this.url, req);
  }
}
