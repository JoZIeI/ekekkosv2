import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColaboradorResponse } from '../../../models/colaborador-response.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ColaboradorRequest } from '../../../models/colaborador-request.module';
import { ColaboradorService } from '../../../services/colaborador.service';
import { convertToBoolean } from 'src/app/functions/general.functions';
import { AccionMantConst } from 'src/app/constants/general.constants';

@Component({
  selector: 'app-man-colaborador-register',
  templateUrl: './man-colaborador-register.component.html',
  styleUrls: ['./man-colaborador-register.component.scss']
})
export class ManColaboradorRegisterComponent implements OnInit {


  /**TODO: DECLARANDO VARIABLES DE ENTRADA */
  @Input() title: string = "";
  @Input() colaborador: ColaboradorResponse = new ColaboradorResponse();
  @Input() accion: number = 0;


  /**TODO: DECLARANDO VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();



  /**TODO: DECLARANDO VARIABLES INTERNAS */

  myForm: FormGroup;
  colaboradorEnvio: ColaboradorRequest = new ColaboradorRequest();
  /**TODO: DECLARANDO EL CONSTRUCTOR */

  constructor(
    private fb: FormBuilder,
    private _colaboradorService: ColaboradorService,
  ) {
    //nuestro formulario colaborador request
    this.myForm = this.fb.group({
      // idcolaborador: [{ value: 0, disabled: true }, [Validators.required]],
      // descripcion: [null, [Validators.required]],
      // funcion: [null, [Validators.required]],
      // idEstado: [null, [Validators.required]],
    });
  }


  ngOnInit(): void {

    console.log("title ==>", this.title);
    console.log("colaborador ==>", this.colaborador);

    this.myForm.patchValue(this.colaborador);

  }


  guardar() {

    
    this.colaboradorEnvio = this.myForm.getRawValue()

    // this.colaboradorEnvio.idEstado = convertToBoolean(this.colaboradorEnvio.idEstado.toString());

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

    this._colaboradorService.create(this.colaboradorEnvio).subscribe({
      next:(data:ColaboradorResponse)=>{
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
    this._colaboradorService.update(this.colaboradorEnvio).subscribe({
      next:(data:ColaboradorResponse)=>{
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