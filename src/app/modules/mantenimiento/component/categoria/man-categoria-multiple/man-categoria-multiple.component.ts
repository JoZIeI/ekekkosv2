import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ProductoCategoriumResponse } from '../../../models/productocategorium-response.module';
import { ProductocategoriumService } from '../../../services/productocategorium.service';

@Component({
  selector: 'app-man-categoria-multiple',
  templateUrl: './man-categoria-multiple.component.html',
  styleUrls: ['./man-categoria-multiple.component.scss']
})
export class ManCategoriaMultipleComponent implements OnInit {

  form: FormGroup;
  categoriasBack: ProductoCategoriumResponse[] = [];
  constructor(
    private fb: FormBuilder,
    private _categoriaService: ProductocategoriumService
  ) {
    this.form = this.fb.group({
      categorias: this.fb.array([])
    });

  }
  ngOnInit(): void {

    this._categoriaService.getAll().subscribe({
      next: (data: ProductoCategoriumResponse[]) => {
        this.categoriasBack = data;

        this.categoriasBack.forEach(x => {
          let categoria = this.nuevocategoria(x);
          this.categoriasArrayForm.push(categoria);
        });


      },
      error: () => { },
      complete: () => { }
    });

  }

  get categoriasArrayForm(): FormArray { return this.form.get("categorias") as FormArray };




  addcategoria() {

    let categoria = this.nuevocategoria(new ProductoCategoriumResponse())
    this.categoriasArrayForm.push(categoria);
  }

  nuevocategoria(categoria: ProductoCategoriumResponse) {
    return this.fb.group({
      // id: [{ value: categoria.idcategoria, disabled: true }, [Validators.required]],
      // descripcion: [categoria.descripcion, [Validators.required]],
      // funcion: [categoria.funcion, [Validators.required]],
      // idEstado: [categoria.idEstado, [Validators.required]],
    })
  }

  removecategoria(i: number) {
    this.categoriasArrayForm.removeAt(i)
  }

  save() {
    console.log(this.form.getRawValue());

  }

}