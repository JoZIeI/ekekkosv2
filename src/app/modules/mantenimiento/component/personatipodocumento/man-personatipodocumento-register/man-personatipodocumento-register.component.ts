import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonaTipoDocumentoResponse } from '../../../models/personatipodocumento-response.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonaTipoDocumentoRequest } from '../../../models/personatipodocumento-request.module';
import { PersonatipodocumentoService } from '../../../services/personatipodocumento.service';
import { AccionMantConst } from 'src/app/constants/general.constants';

@Component({
  selector: 'app-man-personatipodocumento-register',
  templateUrl: './man-personatipodocumento-register.component.html',
  styleUrls: ['./man-personatipodocumento-register.component.scss']
})
export class ManPersonatipodocumentoRegisterComponent implements OnInit {


  /**TODO: DECLARANDO VARIABLES DE ENTRADA */
  @Input() title: string = "";
  @Input() tipodocumento: PersonaTipoDocumentoResponse = new PersonaTipoDocumentoResponse();
  @Input() accion: number = 0;


  /**TODO: DECLARANDO VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();



  /**TODO: DECLARANDO VARIABLES INTERNAS */

  myForm: FormGroup;
  tipodocumentoEnvio: PersonaTipoDocumentoRequest = new PersonaTipoDocumentoRequest();
  /**TODO: DECLARANDO EL CONSTRUCTOR */

  constructor(
    private fb: FormBuilder,
    private _tipodocumentoService: PersonatipodocumentoService,
  ) {
    //nuestro formulario tipodocumento request
    this.myForm = this.fb.group({
      // idtipodocumento: [{ value: 0, disabled: true }, [Validators.required]],
      // descripcion: [null, [Validators.required]],
      // funcion: [null, [Validators.required]],
      // idEstado: [null, [Validators.required]],
    });
  }


  ngOnInit(): void {

    console.log("title ==>", this.title);
    console.log("tipodocumento ==>", this.tipodocumento);

    this.myForm.patchValue(this.tipodocumento);

  }


  guardar() {

    
    this.tipodocumentoEnvio = this.myForm.getRawValue()

    // this.tipodocumentoEnvio.idEstado = convertToBoolean(this.tipodocumentoEnvio.idEstado.toString());

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

    this._tipodocumentoService.create(this.tipodocumentoEnvio).subscribe({
      next:(data:PersonaTipoDocumentoResponse)=>{
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
    this._tipodocumentoService.update(this.tipodocumentoEnvio).subscribe({
      next:(data:PersonaTipoDocumentoResponse)=>{
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