import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { convertToBoolean } from 'src/app/functions/general.functions';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { MesaResponse } from '../../../models/mesa-response.module';
import { MesaRequest } from '../../../models/mesa-request.module';
import { MesaService } from '../../../services/mesa.service';

@Component({
  selector: 'app-man-mesa-register',
  templateUrl: './man-mesa-register.component.html',
  styleUrls: ['./man-mesa-register.component.scss']
})
export class ManMesaRegisterComponent implements OnInit {


  /**TODO: DECLARANDO VARIABLES DE ENTRADA */
  @Input() title: string = "";
  @Input() mesa: MesaResponse = new MesaResponse();
  @Input() accion: number = 0;


  /**TODO: DECLARANDO VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();



  /**TODO: DECLARANDO VARIABLES INTERNAS */

  myForm: FormGroup;
  mesaEnvio: MesaRequest = new MesaRequest();
  /**TODO: DECLARANDO EL CONSTRUCTOR */

  constructor(
    private fb: FormBuilder,
    private _mesaService: MesaService,
  ) {
    //nuestro formulario mesa request
    this.myForm = this.fb.group({
      // idmesa: [{ value: 0, disabled: true }, [Validators.required]],
      // descripcion: [null, [Validators.required]],
      // funcion: [null, [Validators.required]],
      // idEstado: [null, [Validators.required]],
    });
  }


  ngOnInit(): void {

    console.log("title ==>", this.title);
    console.log("mesa ==>", this.mesa);

    this.myForm.patchValue(this.mesa);

  }


  guardar() {

    
    this.mesaEnvio = this.myForm.getRawValue()

    // this.mesaEnvio.idMesa = convertToBoolean(this.mesaEnvio.idMesa.toString());

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

    this._mesaService.create(this.mesaEnvio).subscribe({
      next:(data:MesaResponse)=>{
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
    this._mesaService.update(this.mesaEnvio).subscribe({
      next:(data:MesaResponse)=>{
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