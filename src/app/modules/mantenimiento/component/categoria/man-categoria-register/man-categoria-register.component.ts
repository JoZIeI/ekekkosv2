import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductoCategoriumResponse } from '../../../models/productocategorium-response.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductoCategoriumRequest } from '../../../models/productocategorium-request.module';
import { ProductocategoriumService } from '../../../services/productocategorium.service';
import { convertToBoolean } from 'src/app/functions/general.functions';
import { AccionMantConst } from 'src/app/constants/general.constants';

@Component({
  selector: 'app-man-categoria-register',
  templateUrl: './man-categoria-register.component.html',
  styleUrls: ['./man-categoria-register.component.scss']
})
export class ManCategoriaRegisterComponent implements OnInit {


  /**TODO: DECLARANDO VARIABLES DE ENTRADA */
  @Input() title: string = "";
  @Input() categoria: ProductoCategoriumResponse = new ProductoCategoriumResponse();
  @Input() accion: number = 0;


  /**TODO: DECLARANDO VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();



  /**TODO: DECLARANDO VARIABLES INTERNAS */

  myForm: FormGroup;
  categoriaEnvio: ProductoCategoriumRequest = new ProductoCategoriumRequest();
  /**TODO: DECLARANDO EL CONSTRUCTOR */

  constructor(
    private fb: FormBuilder,
    private _categoriaService: ProductocategoriumService,
  ) {
    //nuestro formulario categoria request
    this.myForm = this.fb.group({
      // idcategoria: [{ value: 0, disabled: true }, [Validators.required]],
      // descripcion: [null, [Validators.required]],
      // funcion: [null, [Validators.required]],
      // idEstado: [null, [Validators.required]],
    });
  }


  ngOnInit(): void {

    console.log("title ==>", this.title);
    console.log("categoria ==>", this.categoria);

    this.myForm.patchValue(this.categoria);

  }


  guardar() {

    
    this.categoriaEnvio = this.myForm.getRawValue()

    // this.categoriaEnvio.idCategoria = convertToBoolean(this.categoriaEnvio.idCategoria.toString());

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

    this._categoriaService.create(this.categoriaEnvio).subscribe({
      next:(data:ProductoCategoriumResponse)=>{
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
    this._categoriaService.update(this.categoriaEnvio).subscribe({
      next:(data:ProductoCategoriumResponse)=>{
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