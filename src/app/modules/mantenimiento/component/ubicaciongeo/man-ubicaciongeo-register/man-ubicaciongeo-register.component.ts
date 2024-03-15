import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UbicacionGeoResponse } from '../../../models/ubicaciongeo-response.module';
import { UbicacionGeoRequest } from '../../../models/ubicaciongeo-request.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UbicaciongeoService } from '../../../services/ubicaciongeo.service';
import { AccionMantConst } from 'src/app/constants/general.constants';

@Component({
  selector: 'app-man-ubicaciongeo-register',
  templateUrl: './man-ubicaciongeo-register.component.html',
  styleUrls: ['./man-ubicaciongeo-register.component.scss']
})
export class ManUbicaciongeoRegisterComponent implements OnInit {


  /**TODO: DECLARANDO VARIABLES DE ENTRADA */
  @Input() title: string = "";
  @Input() ubicacion: UbicacionGeoResponse = new UbicacionGeoResponse();
  @Input() accion: number = 0;


  /**TODO: DECLARANDO VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();



  /**TODO: DECLARANDO VARIABLES INTERNAS */

  myForm: FormGroup;
  ubicacionEnvio: UbicacionGeoRequest = new UbicacionGeoRequest();
  /**TODO: DECLARANDO EL CONSTRUCTOR */

  constructor(
    private fb: FormBuilder,
    private _ubicacionService: UbicaciongeoService,
  ) {
    //nuestro formulario ubicacion request
    this.myForm = this.fb.group({
      // idubicacion: [{ value: 0, disabled: true }, [Validators.required]],
      // descripcion: [null, [Validators.required]],
      // funcion: [null, [Validators.required]],
      // idEstado: [null, [Validators.required]],
    });
  }


  ngOnInit(): void {

    console.log("title ==>", this.title);
    console.log("ubicacion ==>", this.ubicacion);

    this.myForm.patchValue(this.ubicacion);

  }


  guardar() {

    
    this.ubicacionEnvio = this.myForm.getRawValue()

    // this.ubicacionEnvio.idEstado = convertToBoolean(this.ubicacionEnvio.idEstado.toString());

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

    this._ubicacionService.create(this.ubicacionEnvio).subscribe({
      next:(data:UbicacionGeoResponse)=>{
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
    this._ubicacionService.update(this.ubicacionEnvio).subscribe({
      next:(data:UbicacionGeoResponse)=>{
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