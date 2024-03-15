import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PedidoResponse } from '../../../models/pedido-response.module';
import { PedidoRequest } from '../../../models/pedido-request.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from '../../../services/pedido.service';
import { convertToBoolean } from 'src/app/functions/general.functions';
import { AccionMantConst } from 'src/app/constants/general.constants';

@Component({
  selector: 'app-man-pedido-register',
  templateUrl: './man-pedido-register.component.html',
  styleUrls: ['./man-pedido-register.component.scss']
})
export class ManPedidoRegisterComponent implements OnInit {


  /**TODO: DECLARANDO VARIABLES DE ENTRADA */
  @Input() title: string = "";
  @Input() pedido: PedidoResponse = new PedidoResponse();
  @Input() accion: number = 0;


  /**TODO: DECLARANDO VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();



  /**TODO: DECLARANDO VARIABLES INTERNAS */

  myForm: FormGroup;
  pedidoEnvio: PedidoRequest = new PedidoRequest();
  /**TODO: DECLARANDO EL CONSTRUCTOR */

  constructor(
    private fb: FormBuilder,
    private _pedidoService: PedidoService,
  ) {
    //nuestro formulario pedido request
    this.myForm = this.fb.group({
      // idpedido: [{ value: 0, disabled: true }, [Validators.required]],
      // descripcion: [null, [Validators.required]],
      // funcion: [null, [Validators.required]],
      // idEstado: [null, [Validators.required]],
    });
  }


  ngOnInit(): void {

    console.log("title ==>", this.title);
    console.log("pedido ==>", this.pedido);

    this.myForm.patchValue(this.pedido);

  }


  guardar() {

    
    this.pedidoEnvio = this.myForm.getRawValue()

    // this.pedidoEnvio.idEstado = convertToBoolean(this.pedidoEnvio.idEstado.toString());

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

    this._pedidoService.create(this.pedidoEnvio).subscribe({
      next:(data:PedidoResponse)=>{
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
    this._pedidoService.update(this.pedidoEnvio).subscribe({
      next:(data:PedidoResponse)=>{
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