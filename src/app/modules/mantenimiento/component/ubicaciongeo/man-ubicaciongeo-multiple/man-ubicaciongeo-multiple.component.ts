import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { UbicacionGeoResponse } from '../../../models/ubicaciongeo-response.module';
import { UbicaciongeoService } from '../../../services/ubicaciongeo.service';

@Component({
  selector: 'app-man-ubicaciongeo-multiple',
  templateUrl: './man-ubicaciongeo-multiple.component.html',
  styleUrls: ['./man-ubicaciongeo-multiple.component.scss']
})
export class ManUbicaciongeoMultipleComponent implements OnInit {

  form: FormGroup;
  ubicacionsBack: UbicacionGeoResponse[] = [];
  constructor(
    private fb: FormBuilder,
    private _ubicacionService: UbicaciongeoService
  ) {
    this.form = this.fb.group({
      ubicacions: this.fb.array([])
    });

  }
  ngOnInit(): void {

    this._ubicacionService.getAll().subscribe({
      next: (data: UbicacionGeoResponse[]) => {
        this.ubicacionsBack = data;

        this.ubicacionsBack.forEach(x => {
          let ubicacion = this.nuevoubicacion(x);
          this.ubicacionsArrayForm.push(ubicacion);
        });


      },
      error: () => { },
      complete: () => { }
    });

  }

  get ubicacionsArrayForm(): FormArray { return this.form.get("ubicacions") as FormArray };




  addubicacion() {

    let ubicacion = this.nuevoubicacion(new UbicacionGeoResponse())
    this.ubicacionsArrayForm.push(ubicacion);
  }

  nuevoubicacion(ubicacion: UbicacionGeoResponse) {
    return this.fb.group({
      // id: [{ value: ubicacion.idubicacion, disabled: true }, [Validators.required]],
      // descripcion: [ubicacion.descripcion, [Validators.required]],
      // funcion: [ubicacion.funcion, [Validators.required]],
      // idEstado: [ubicacion.idEstado, [Validators.required]],
    })
  }

  removeubicacion(i: number) {
    this.ubicacionsArrayForm.removeAt(i)
  }

  save() {
    console.log(this.form.getRawValue());

  }

}