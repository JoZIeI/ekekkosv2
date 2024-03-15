import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonaResponse } from '../../../models/persona-response.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaRequest } from '../../../models/persona-request.module';
import { PersonaService } from '../../../services/persona.service';
import { convertToBoolean } from 'src/app/functions/general.functions';
import { AccionMantConst } from 'src/app/constants/general.constants';

@Component({
  selector: 'app-man-persona-register',
  templateUrl: './man-persona-register.component.html',
  styleUrls: ['./man-persona-register.component.scss']
})
export class ManPersonaRegisterComponent implements OnInit {


  /**TODO: DECLARANDO VARIABLES DE ENTRADA */
  @Input() title: string = "";
  @Input() persona: PersonaResponse = new PersonaResponse();
  @Input() accion: number = 0;


  /**TODO: DECLARANDO VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();



  /**TODO: DECLARANDO VARIABLES INTERNAS */

  myForm: FormGroup;
  personaEnvio: PersonaRequest = new PersonaRequest();
  /**TODO: DECLARANDO EL CONSTRUCTOR */

  constructor(
    private fb: FormBuilder,
    private _personaService: PersonaService,
  ) {
    //nuestro formulario persona request
    this.myForm = this.fb.group({
      idpersona: [{ value: 0, disabled: true }, [Validators.required]],
      descripcion: [null, [Validators.required]],
      funcion: [null, [Validators.required]],
      idEstado: [null, [Validators.required]],
    });
  }


  ngOnInit(): void {

    console.log("title ==>", this.title);
    console.log("persona ==>", this.persona);

    this.myForm.patchValue(this.persona);

  }


  guardar() {

    
    this.personaEnvio = this.myForm.getRawValue()

    // this.personaEnvio.idEstado = convertToBoolean(this.personaEnvio.idEstado.toString());

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

    this._personaService.create(this.personaEnvio).subscribe({
      next:(data:PersonaResponse)=>{
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
    this._personaService.update(this.personaEnvio).subscribe({
      next:(data:PersonaResponse)=>{
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