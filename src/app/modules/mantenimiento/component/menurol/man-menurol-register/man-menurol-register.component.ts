import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuRolResponse } from '../../../models/menurol-response.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuRolRequest } from '../../../models/menurol-request.module';
import { MenurolService } from '../../../services/menurol.service';
import { convertToBoolean } from 'src/app/functions/general.functions';
import { AccionMantConst } from 'src/app/constants/general.constants';

@Component({
  selector: 'app-man-menurol-register',
  templateUrl: './man-menurol-register.component.html',
  styleUrls: ['./man-menurol-register.component.scss']
})
export class ManMenurolRegisterComponent implements OnInit {


  /**TODO: DECLARANDO VARIABLES DE ENTRADA */
  @Input() title: string = "";
  @Input() menurol: MenuRolResponse = new MenuRolResponse();
  @Input() accion: number = 0;


  /**TODO: DECLARANDO VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();



  /**TODO: DECLARANDO VARIABLES INTERNAS */

  myForm: FormGroup;
  menurolEnvio: MenuRolRequest = new MenuRolRequest();
  /**TODO: DECLARANDO EL CONSTRUCTOR */

  constructor(
    private fb: FormBuilder,
    private _menurolService: MenurolService,
  ) {
    //nuestro formulario menurol request
    this.myForm = this.fb.group({
      // idmenurol: [{ value: 0, disabled: true }, [Validators.required]],
      // descripcion: [null, [Validators.required]],
      // funcion: [null, [Validators.required]],
      // idEstado: [null, [Validators.required]],
    });
  }


  ngOnInit(): void {

    console.log("title ==>", this.title);
    console.log("menurol ==>", this.menurol);

    this.myForm.patchValue(this.menurol);

  }


  guardar() {

    
    this.menurolEnvio = this.myForm.getRawValue()

    // this.menurolEnvio.idStatus = convertToBoolean(this.menurolEnvio.idStatus.toString());

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

    this._menurolService.create(this.menurolEnvio).subscribe({
      next:(data:MenuRolResponse)=>{
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
    this._menurolService.update(this.menurolEnvio).subscribe({
      next:(data:MenuRolResponse)=>{
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