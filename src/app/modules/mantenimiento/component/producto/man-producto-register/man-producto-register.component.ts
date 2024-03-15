import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { ProductoResponse } from '../../../models/producto-response.model';
import { ProductoRequest } from '../../../models/producto-request.model';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-man-producto-register',
  templateUrl: './man-producto-register.component.html',
  styleUrls: ['./man-producto-register.component.scss']
})
export class ManProductoRegisterComponent implements OnInit {


  /**TODO: DECLARANDO VARIABLES DE ENTRADA */
  @Input() title: string = "";
  @Input() producto: ProductoResponse = new ProductoResponse();
  @Input() accion: number = 0;


  /**TODO: DECLARANDO VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();



  /**TODO: DECLARANDO VARIABLES INTERNAS */

  myForm: FormGroup;
  productoEnvio: ProductoRequest = new ProductoRequest();
  /**TODO: DECLARANDO EL CONSTRUCTOR */

  constructor(
    private fb: FormBuilder,
    private _productoService: ProductoService,
  ) {
    //nuestro formulario producto request
    this.myForm = this.fb.group({
      // idproducto: [{ value: 0, disabled: true }, [Validators.required]],
      // descripcion: [null, [Validators.required]],
      // funcion: [null, [Validators.required]],
      // idEstado: [null, [Validators.required]],
    });
  }


  ngOnInit(): void {

    console.log("title ==>", this.title);
    console.log("producto ==>", this.producto);

    this.myForm.patchValue(this.producto);

  }


  guardar() {

    
    this.productoEnvio = this.myForm.getRawValue()

    // this.productoEnvio.idEstado = convertToBoolean(this.productoEnvio.idEstado.toString());

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

    this._productoService.create(this.productoEnvio).subscribe({
      next:(data:ProductoResponse)=>{
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
    this._productoService.update(this.productoEnvio).subscribe({
      next:(data:ProductoResponse)=>{
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