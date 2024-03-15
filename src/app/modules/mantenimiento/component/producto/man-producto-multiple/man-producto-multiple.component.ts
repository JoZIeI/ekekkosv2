import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoResponse } from '../../../models/producto-response.model';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-man-producto-multiple',
  templateUrl: './man-producto-multiple.component.html',
  styleUrls: ['./man-producto-multiple.component.scss']
})
export class ManProductoMultipleComponent implements OnInit {

  form: FormGroup;
  productosBack: ProductoResponse[] = [];
  constructor(
    private fb: FormBuilder,
    private _productoService: ProductoService
  ) {
    this.form = this.fb.group({
      productos: this.fb.array([])
    });

  }
  ngOnInit(): void {

    this._productoService.getAll().subscribe({
      next: (data: ProductoResponse[]) => {
        this.productosBack = data;

        this.productosBack.forEach(x => {
          let producto = this.nuevoproducto(x);
          this.productosArrayForm.push(producto);
        });


      },
      error: () => { },
      complete: () => { }
    });

  }

  get productosArrayForm(): FormArray { return this.form.get("productos") as FormArray };




  addproducto() {

    let producto = this.nuevoproducto(new ProductoResponse())
    this.productosArrayForm.push(producto);
  }

  nuevoproducto(producto: ProductoResponse) {
    return this.fb.group({
      // id: [{ value: producto.idproducto, disabled: true }, [Validators.required]],
      // descripcion: [producto.descripcion, [Validators.required]],
      // funcion: [producto.funcion, [Validators.required]],
      // idEstado: [producto.idEstado, [Validators.required]],
    })
  }

  removeproducto(i: number) {
    this.productosArrayForm.removeAt(i)
  }

  save() {
    console.log(this.form.getRawValue());

  }

}