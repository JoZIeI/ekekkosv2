import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolResponse } from 'src/app/Models/rol-response-model';
import { RolRequest } from '../../../models/rol-request.model';
import { RolService } from '../../../services/rol.service';
import { convertToBoolean } from 'src/app/functions/general.functions';
import { AccionMantConst } from 'src/app/constants/general.constants';

@Component({
  selector: 'app-man-rol-register',
  templateUrl: './man-rol-register.component.html',
  styleUrls: ['./man-rol-register.component.scss']
})
export class ManRolRegisterComponent implements OnInit {


  /**TODO: DECLARANDO VARIABLES DE ENTRADA */
  @Input() title: string = "";
  @Input() rol: RolResponse = new RolResponse();
  @Input() accion: number = 0;


  /**TODO: DECLARANDO VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();



  /**TODO: DECLARANDO VARIABLES INTERNAS */

  myForm: FormGroup;
  rolEnvio: RolRequest = new RolRequest();
  /**TODO: DECLARANDO EL CONSTRUCTOR */

  constructor(
    private fb: FormBuilder,
    private _rolService: RolService,
  ) {
    //nuestro formulario rol request
    this.myForm = this.fb.group({
      idRol: [{ value: 0, disabled: true }, [Validators.required]],
      descripcion: [null, [Validators.required]],
      funcion: [null, [Validators.required]],
      idEstado: [null, [Validators.required]],
    });
  }


  ngOnInit(): void {

    console.log("title ==>", this.title);
    console.log("rol ==>", this.rol);

    this.myForm.patchValue(this.rol);

  }


  guardar() {

    
    this.rolEnvio = this.myForm.getRawValue()

    this.rolEnvio.idEstado = convertToBoolean(this.rolEnvio.idEstado.toString());

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

    this._rolService.create(this.rolEnvio).subscribe({
      next:(data:RolResponse)=>{
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
    this._rolService.update(this.rolEnvio).subscribe({
      next:(data:RolResponse)=>{
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