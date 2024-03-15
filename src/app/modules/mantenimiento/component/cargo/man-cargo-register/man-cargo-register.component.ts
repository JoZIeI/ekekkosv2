import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CargoResponse } from '../../../models/cargo-response.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CargoRequest } from '../../../models/cargo-request.module';
import { CargoService } from '../../../services/cargo.service';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { convertToBoolean } from 'src/app/functions/general.functions';

@Component({
  selector: 'app-man-cargo-register',
  templateUrl: './man-cargo-register.component.html',
  styleUrls: ['./man-cargo-register.component.scss']
})
export class ManCargoRegisterComponent implements OnInit {


  /**TODO: DECLARANDO VARIABLES DE ENTRADA */
  @Input() title: string = "";
  @Input() cargo: CargoResponse = new CargoResponse();
  @Input() accion: number = 0;


  /**TODO: DECLARANDO VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();



  /**TODO: DECLARANDO VARIABLES INTERNAS */

  myForm: FormGroup;
  cargoEnvio: CargoRequest = new CargoRequest();
  /**TODO: DECLARANDO EL CONSTRUCTOR */

  constructor(
    private fb: FormBuilder,
    private _cargoService: CargoService,
  ) {
    //nuestro formulario cargo request
    this.myForm = this.fb.group({
      idCargo: [{ value: 0, disabled: true }, [Validators.required]],
      nombre: [null, [Validators.required]],
      // funcion: [null, [Validators.required]],
      // idEstado: [null, [Validators.required]],
    });
  }


  ngOnInit(): void {

    console.log("title ==>", this.title);
    console.log("cargo ==>", this.cargo);

    this.myForm.patchValue(this.cargo);

  }


  guardar() {

    
    this.cargoEnvio = this.myForm.getRawValue()

    // this.cargoEnvio.idCargo = convertToBoolean(this.cargoEnvio.idCargo.toString());

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

    this._cargoService.create(this.cargoEnvio).subscribe({
      next:(data:CargoResponse)=>{
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
    this._cargoService.update(this.cargoEnvio).subscribe({
      next:(data:CargoResponse)=>{
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