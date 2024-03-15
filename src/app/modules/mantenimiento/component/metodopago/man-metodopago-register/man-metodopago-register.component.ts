import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MetodoPagoResponse } from '../../../models/metodopago-response.module';
import { MetodoPagoRequest } from '../../../models/metodopago-request.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MetodopagoService } from '../../../services/metodopago.service';
import { convertToBoolean } from 'src/app/functions/general.functions';
import { AccionMantConst } from 'src/app/constants/general.constants';

@Component({
  selector: 'app-man-metodopago-register',
  templateUrl: './man-metodopago-register.component.html',
  styleUrls: ['./man-metodopago-register.component.scss']
})
export class ManMetodopagoRegisterComponent implements OnInit {


  /**TODO: DECLARANDO VARIABLES DE ENTRADA */
  @Input() title: string = "";
  @Input() metodopago: MetodoPagoResponse = new MetodoPagoResponse();
  @Input() accion: number = 0;


  /**TODO: DECLARANDO VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();



  /**TODO: DECLARANDO VARIABLES INTERNAS */

  myForm: FormGroup;
  metodopagoEnvio: MetodoPagoRequest = new MetodoPagoRequest();
  /**TODO: DECLARANDO EL CONSTRUCTOR */

  constructor(
    private fb: FormBuilder,
    private _metodopagoService: MetodopagoService,
  ) {
    //nuestro formulario metodopago request
    this.myForm = this.fb.group({
      // idmetodopago: [{ value: 0, disabled: true }, [Validators.required]],
      // descripcion: [null, [Validators.required]],
      // funcion: [null, [Validators.required]],
      // idEstado: [null, [Validators.required]],
    });
  }


  ngOnInit(): void {

    console.log("title ==>", this.title);
    console.log("metodopago ==>", this.metodopago);

    this.myForm.patchValue(this.metodopago);

  }


  guardar() {

    
    this.metodopagoEnvio = this.myForm.getRawValue()

    // this.metodopagoEnvio.idMetodo = convertToBoolean(this.metodopagoEnvio.idMetodo.toString());

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

    this._metodopagoService.create(this.metodopagoEnvio).subscribe({
      next:(data:MetodoPagoResponse)=>{
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
    this._metodopagoService.update(this.metodopagoEnvio).subscribe({
      next:(data:MetodoPagoResponse)=>{
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