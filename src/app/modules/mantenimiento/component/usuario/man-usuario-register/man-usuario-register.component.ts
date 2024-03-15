import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsuarioResponse } from '../../../models/usuario-response.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioRequest } from '../../../models/usuario-request.module';
import { UsuarioService } from '../../../services/usuario.service';
import { AccionMantConst } from 'src/app/constants/general.constants';

@Component({
  selector: 'app-man-usuario-register',
  templateUrl: './man-usuario-register.component.html',
  styleUrls: ['./man-usuario-register.component.scss']
})
export class ManUsuarioRegisterComponent  implements OnInit {


  /**TODO: DECLARANDO VARIABLES DE ENTRADA */
  @Input() title: string = "";
  @Input() usuario: UsuarioResponse = new UsuarioResponse();
  @Input() accion: number = 0;


  /**TODO: DECLARANDO VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();



  /**TODO: DECLARANDO VARIABLES INTERNAS */

  myForm: FormGroup;
  usuarioEnvio: UsuarioRequest = new UsuarioRequest();
  /**TODO: DECLARANDO EL CONSTRUCTOR */

  constructor(
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
  ) {
    //nuestro formulario usuario request
    this.myForm = this.fb.group({
      // idusuario: [{ value: 0, disabled: true }, [Validators.required]],
      // descripcion: [null, [Validators.required]],
      // funcion: [null, [Validators.required]],
      // idEstado: [null, [Validators.required]],
    });
  }


  ngOnInit(): void {

    console.log("title ==>", this.title);
    console.log("usuario ==>", this.usuario);

    this.myForm.patchValue(this.usuario);

  }


  guardar() {

    
    this.usuarioEnvio = this.myForm.getRawValue()

    // this.usuarioEnvio.idEstado = convertToBoolean(this.usuarioEnvio.idEstado.toString());

    switch (this.accion) {
      case AccionMantConst.crear:
        this.crearRegistro();
        break;
      case AccionMantConst.editar:
        this.editarRegistro();
        break;
      // inactivar
      case AccionMantConst.eliminar:
        // eliminar registro
        break;
    }


  }

  crearRegistro()
  {

    this._usuarioService.create(this.usuarioEnvio).subscribe({
      next:(data:UsuarioResponse)=>{
        alert("creado de forma correcta");
      },
      error:()=>{
        alert("Ocurrio un error");
      },
      complete:()=>{
        this.cerrarModal(true);
      }
    });

    //llamar a nuestro servicio rest ==> crear un nuevo registro en base de datos

  }

  editarRegistro()
  {
    this._usuarioService.update(this.usuarioEnvio).subscribe({
      next:(data:UsuarioResponse)=>{
        alert("actualizado de forma correcta");
      },
      error:()=>{
        alert("Ocurrio un erro");
      },
      complete:()=>{
        this.cerrarModal(true);
      }
    });
  }



  cerrarModal(res: boolean) {
    //true ==> hubo modificación en base de datos ==> necesito volver a cargar la lista
    //false ==> NO hubo modificación en base de datos ==> NOOOOOO necesito volver a cargar la lista
    this.closeModalEmmit.emit(res);

  }

}