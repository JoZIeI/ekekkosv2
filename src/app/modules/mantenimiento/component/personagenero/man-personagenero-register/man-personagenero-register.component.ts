import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaGeneroResponse } from '../../../models/personagenero-response.module';
import { PersonaGeneroRequest } from '../../../models/personagenero-request.module';
import { PersonageneroService } from '../../../services/personagenero.service';
import { convertToBoolean } from 'src/app/functions/general.functions';
import { AccionMantConst } from 'src/app/constants/general.constants';

@Component({
  selector: 'app-man-personagenero-register',
  templateUrl: './man-personagenero-register.component.html',
  styleUrls: ['./man-personagenero-register.component.scss']
})
export class ManPersonageneroRegisterComponent implements OnInit {


  /**TODO: DECLARANDO VARIABLES DE ENTRADA */
  @Input() title: string = "";
  @Input() genero: PersonaGeneroResponse = new PersonaGeneroResponse();
  @Input() accion: number = 0;


  /**TODO: DECLARANDO VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();



  /**TODO: DECLARANDO VARIABLES INTERNAS */

  myForm: FormGroup;
  generoEnvio: PersonaGeneroRequest = new PersonaGeneroRequest();
  /**TODO: DECLARANDO EL CONSTRUCTOR */

  constructor(
    private fb: FormBuilder,
    private _personageneroService: PersonageneroService,
  ) {
    //nuestro formulario personagenero request
    this.myForm = this.fb.group({
      idpersonagenero: [{ value: 0, disabled: true }, [Validators.required]],
      descripcion: [null, [Validators.required]],
      funcion: [null, [Validators.required]],
      idEstado: [null, [Validators.required]],
    });
  }


  ngOnInit(): void {

    console.log("title ==>", this.title);
    console.log("personagenero ==>", this.genero);

    this.myForm.patchValue(this.genero);

  }


  guardar() {

    
    this.generoEnvio = this.myForm.getRawValue()

    // this.personageneroEnvio.idEstado = convertToBoolean(this.personageneroEnvio.idEstado.toString());

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

    this._personageneroService.create(this.generoEnvio).subscribe({
      next:(data:PersonaGeneroResponse)=>{
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
    this._personageneroService.update(this.generoEnvio).subscribe({
      next:(data:PersonaGeneroResponse)=>{
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