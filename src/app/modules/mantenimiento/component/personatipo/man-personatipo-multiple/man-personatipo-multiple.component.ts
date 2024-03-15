import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { PersonaTipoResponse } from '../../../models/personatipo-response.module';
import { PersonatipoService } from '../../../services/personatipo.service';

@Component({
  selector: 'app-man-personatipo-multiple',
  templateUrl: './man-personatipo-multiple.component.html',
  styleUrls: ['./man-personatipo-multiple.component.scss']
})
export class ManPersonatipoMultipleComponent implements OnInit {

  form: FormGroup;
  tiposBack: PersonaTipoResponse[] = [];
  constructor(
    private fb: FormBuilder,
    private _tipoService: PersonatipoService
  ) {
    this.form = this.fb.group({
      tipos: this.fb.array([])
    });

  }
  ngOnInit(): void {

    this._tipoService.getAll().subscribe({
      next: (data: PersonaTipoResponse[]) => {
        this.tiposBack = data;

        this.tiposBack.forEach(x => {
          let tipo = this.nuevotipo(x);
          this.tiposArrayForm.push(tipo);
        });


      },
      error: () => { },
      complete: () => { }
    });

  }

  get tiposArrayForm(): FormArray { return this.form.get("tipos") as FormArray };




  addtipo() {

    let tipo = this.nuevotipo(new PersonaTipoResponse())
    this.tiposArrayForm.push(tipo);
  }

  nuevotipo(tipo: PersonaTipoResponse) {
    return this.fb.group({
      // id: [{ value: tipo.idtipo, disabled: true }, [Validators.required]],
      // descripcion: [tipo.descripcion, [Validators.required]],
      // funcion: [tipo.funcion, [Validators.required]],
      // idEstado: [tipo.idEstado, [Validators.required]],
    })
  }

  removetipo(i: number) {
    this.tiposArrayForm.removeAt(i)
  }

  save() {
    console.log(this.form.getRawValue());

  }

}