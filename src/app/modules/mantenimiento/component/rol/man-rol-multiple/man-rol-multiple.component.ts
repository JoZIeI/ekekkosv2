import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolResponse } from 'src/app/Models/rol-response-model';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-man-rol-multiple',
  templateUrl: './man-rol-multiple.component.html',
  styleUrls: ['./man-rol-multiple.component.scss']
})
export class ManRolMultipleComponent implements OnInit {

  form: FormGroup;
  rolsBack: RolResponse[] = [];
  constructor(
    private fb: FormBuilder,
    private _rolService: RolService
  ) {
    this.form = this.fb.group({
      rols: this.fb.array([])
    });

  }
  ngOnInit(): void {

    this._rolService.getAll().subscribe({
      next: (data: RolResponse[]) => {
        this.rolsBack = data;

        this.rolsBack.forEach(x => {
          let rol = this.nuevorol(x);
          this.rolsArrayForm.push(rol);
        });


      },
      error: () => { },
      complete: () => { }
    });

  }

  get rolsArrayForm(): FormArray { return this.form.get("rols") as FormArray };




  addrol() {

    let rol = this.nuevorol(new RolResponse())
    this.rolsArrayForm.push(rol);
  }

  nuevorol(rol: RolResponse) {
    return this.fb.group({
      id: [{ value: rol.idRol, disabled: true }, [Validators.required]],
      descripcion: [rol.descripcion, [Validators.required]],
      funcion: [rol.funcion, [Validators.required]],
      idEstado: [rol.idEstado, [Validators.required]],
    })
  }

  removerol(i: number) {
    this.rolsArrayForm.removeAt(i)
  }

  save() {
    console.log(this.form.getRawValue());

  }

}