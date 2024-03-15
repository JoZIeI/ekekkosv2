import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonaTipoResponse } from '../../../models/personatipo-response.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonaTipoRequest } from '../../../models/personatipo-request.module';
import { PersonatipoService } from '../../../services/personatipo.service';
import { AccionMantConst } from 'src/app/constants/general.constants';

@Component({
  selector: 'app-man-personatipo-register',
  templateUrl: './man-personatipo-register.component.html',
  styleUrls: ['./man-personatipo-register.component.scss']
})
export class ManPersonatipoRegisterComponent implements OnInit {


  /**TODO: DECLARANDO VARIABLES DE ENTRADA */
  @Input() title: string = "";
  @Input() tipo: PersonaTipoResponse = new PersonaTipoResponse();
  @Input() accion: number = 0;


  /**TODO: DECLARANDO VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();



  /**TODO: DECLARANDO VARIABLES INTERNAS */

  myForm: FormGroup;
  tipoEnvio: PersonaTipoRequest = new PersonaTipoRequest();
  /**TODO: DECLARANDO EL CONSTRUCTOR */

  constructor(
    private fb: FormBuilder,
    private _tipoService: PersonatipoService,
  ) {
    //nuestro formulario tipo request
    this.myForm = this.fb.group({
      // idtipo: [{ value: 0, disabled: true }, [Validators.required]],
      // descripcion: [null, [Validators.required]],
      // funcion: [null, [Validators.required]],
      // idEstado: [null, [Validators.required]],
    });
  }


  ngOnInit(): void {

    console.log("title ==>", this.title);
    console.log("tipo ==>", this.tipo);

    this.myForm.patchValue(this.tipo);

  }


  guardar() {

    
    this.tipoEnvio = this.myForm.getRawValue()

    // this.tipoEnvio.idtipo = convertToBoolean(this.tipoEnvio.idtipo.toString());

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

    this._tipoService.create(this.tipoEnvio).subscribe({
      next:(data:PersonaTipoResponse)=>{
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
    this._tipoService.update(this.tipoEnvio).subscribe({
      next:(data:PersonaTipoResponse)=>{
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