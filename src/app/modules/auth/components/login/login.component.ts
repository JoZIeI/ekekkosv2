import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginRequest } from '../../models/login-request.model';
import { AuthService } from '../../service/auth.service';
import { LoginResponse } from 'src/app/Models/login-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  loginForm: FormGroup;
  loginRequest: LoginRequest = new LoginRequest();


  constructor(
    private fb: FormBuilder,
    private _AuthService: AuthService, 
    private _router: Router
  ) {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      pasword: [null, [Validators.required]],
    });
  }
  
  login() {

    console.log(this.loginForm.getRawValue());

    //este login request lo tengo que enviar hacia el servicio web
    this.loginRequest = this.loginForm.getRawValue();

    this._AuthService.login(this.loginRequest).subscribe({
      next: (data: LoginResponse) => {
        console.log(data);
        alert("login correcto ");
        //redirigir al dashboard
        this._router.navigate(['dashboard']);

        //NOSOTROS ALMACENAMOS EL VALOR DEL TOKEN Y ALGUNOS VALORES DE NUESTRO USUARIO
        //PARA SESION STORAGE 

        debugger;
        if(data.success)
        {
          sessionStorage.setItem("token", data.token );
          // sessionStorage.setItem("UserId", data.Usuarios.idAdmin.toString());
          // sessionStorage.setItem("username", data.Usuarios.Usuario );
          // sessionStorage.setItem("fullName", data.Usuarios.Nombres );
          // sessionStorage.setItem("rolId", data.RolAdmin.idRol.toString() );

        }
        else {
          return;
        }

      },
      error: (err) => { },
      complete: () => { },
    });
  }
}