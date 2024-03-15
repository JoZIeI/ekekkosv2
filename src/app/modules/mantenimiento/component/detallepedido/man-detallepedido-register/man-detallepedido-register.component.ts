import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DetallePedidoResponse } from '../../../models/detallepedido-response.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DetallepedidoService } from '../../../services/detallepedido.service';
import { DetallePedidoRequest } from '../../../models/detallepedido-request.module';
import { convertToBoolean } from 'src/app/functions/general.functions';
import { AccionMantConst } from 'src/app/constants/general.constants';

@Component({
  selector: 'app-man-detallepedido-register',
  templateUrl: './man-detallepedido-register.component.html',
  styleUrls: ['./man-detallepedido-register.component.scss']
})
export class ManDetallepedidoRegisterComponent implements OnInit {


  /**TODO: DECLARANDO VARIABLES DE ENTRADA */
  @Input() title: string = "";
  @Input() detallepedido: DetallePedidoResponse = new DetallePedidoResponse();
  @Input() accion: number = 0;


  /**TODO: DECLARANDO VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();



  /**TODO: DECLARANDO VARIABLES INTERNAS */

  myForm: FormGroup;
  detallepedidoEnvio: DetallePedidoRequest = new DetallePedidoRequest();
  /**TODO: DECLARANDO EL CONSTRUCTOR */

  constructor(
    private fb: FormBuilder,
    private _detallepedidoService: DetallepedidoService,
  ) {
    //nuestro formulario detallepedido request
    this.myForm = this.fb.group({
      // iddetallepedido: [{ value: 0, disabled: true }, [Validators.required]],
      // descripcion: [null, [Validators.required]],
      // funcion: [null, [Validators.required]],
      // idEstado: [null, [Validators.required]],
    });
  }


  ngOnInit(): void {

    console.log("title ==>", this.title);
    console.log("detallepedido ==>", this.detallepedido);

    this.myForm.patchValue(this.detallepedido);

  }


  guardar() {

    
    this.detallepedidoEnvio = this.myForm.getRawValue()

    // this.detallepedidoEnvio.idDetallePedido = convertToBoolean(this.detallepedidoEnvio.idDetallePedido.toString());

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

    this._detallepedidoService.create(this.detallepedidoEnvio).subscribe({
      next:(data:DetallePedidoResponse)=>{
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
    this._detallepedidoService.update(this.detallepedidoEnvio).subscribe({
      next:(data:DetallePedidoResponse)=>{
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