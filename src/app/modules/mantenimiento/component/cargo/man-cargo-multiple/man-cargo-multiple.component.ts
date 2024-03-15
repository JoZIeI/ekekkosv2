import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CargoResponse } from '../../../models/cargo-response.module';
import { CargoService } from '../../../services/cargo.service';

@Component({
  selector: 'app-man-cargo-multiple',
  templateUrl: './man-cargo-multiple.component.html',
  styleUrls: ['./man-cargo-multiple.component.scss']
})
export class ManCargoMultipleComponent implements OnInit {

  form: FormGroup;
  cargosBack: CargoResponse[] = [];
  constructor(
    private fb: FormBuilder,
    private _cargoService: CargoService
  ) {
    this.form = this.fb.group({
      cargos: this.fb.array([])
    });

  }
  ngOnInit(): void {

    this._cargoService.getAll().subscribe({
      next: (data: CargoResponse[]) => {
        this.cargosBack = data;

        this.cargosBack.forEach(x => {
          let cargo = this.nuevocargo(x);
          this.cargosArrayForm.push(cargo);
        });


      },
      error: () => { },
      complete: () => { }
    });

  }

  get cargosArrayForm(): FormArray { return this.form.get("cargos") as FormArray };




  addcargo() {

    let cargo = this.nuevocargo(new CargoResponse())
    this.cargosArrayForm.push(cargo);
  }

  nuevocargo(cargo: CargoResponse) {
    return this.fb.group({
      idRol: [{ value: cargo.idCargo, disabled: true }, [Validators.required]],
      nombre: [cargo.nombre, [Validators.required]],
      // funcion: [cargo.funcion, [Validators.required]],
      // idEstado: [cargo.idEstado, [Validators.required]],
    })
  }

  removecargo(i: number) {
    this.cargosArrayForm.removeAt(i)
  }

  save() {
    console.log(this.form.getRawValue());

  }

}