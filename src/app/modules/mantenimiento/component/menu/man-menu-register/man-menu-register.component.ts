import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuResponse } from '../../../models/menu-response.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuRequest } from '../../../models/menu-request.module';
import { MenuService } from '../../../services/menu.service';
import { convertToBoolean } from 'src/app/functions/general.functions';
import { AccionMantConst } from 'src/app/constants/general.constants';

@Component({
  selector: 'app-man-menu-register',
  templateUrl: './man-menu-register.component.html',
  styleUrls: ['./man-menu-register.component.scss']
})
export class ManMenuRegisterComponent implements OnInit {


  /**TODO: DECLARANDO VARIABLES DE ENTRADA */
  @Input() title: string = "";
  @Input() menu: MenuResponse = new MenuResponse();
  @Input() accion: number = 0;


  /**TODO: DECLARANDO VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();



  /**TODO: DECLARANDO VARIABLES INTERNAS */

  myForm: FormGroup;
  menuEnvio: MenuRequest = new MenuRequest();
  /**TODO: DECLARANDO EL CONSTRUCTOR */

  constructor(
    private fb: FormBuilder,
    private _menuService: MenuService,
  ) {
    //nuestro formulario menu request
    this.myForm = this.fb.group({
      // idmenu: [{ value: 0, disabled: true }, [Validators.required]],
      // descripcion: [null, [Validators.required]],
      // funcion: [null, [Validators.required]],
      // idEstado: [null, [Validators.required]],
    });
  }


  ngOnInit(): void {

    console.log("title ==>", this.title);
    console.log("menu ==>", this.menu);

    this.myForm.patchValue(this.menu);

  }


  guardar() {

    
    this.menuEnvio = this.myForm.getRawValue()

    this.menuEnvio.idEstado = convertToBoolean(this.menuEnvio.idEstado.toString());

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

    this._menuService.create(this.menuEnvio).subscribe({
      next:(data:MenuResponse)=>{
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
    this._menuService.update(this.menuEnvio).subscribe({
      next:(data:MenuResponse)=>{
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