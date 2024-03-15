import { Component, OnInit } from '@angular/core';
import { PersonaGeneroResponse } from '../../../models/personagenero-response.module';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { PersonageneroService } from '../../../services/personagenero.service';

@Component({
  selector: 'app-man-personagenero-multiple',
  templateUrl: './man-personagenero-multiple.component.html',
  styleUrls: ['./man-personagenero-multiple.component.scss']
})
export class ManPersonageneroMultipleComponent implements OnInit {

  form: FormGroup;
  generosBack: PersonaGeneroResponse[] = [];
  constructor(
    private fb: FormBuilder,
    private _generoService: PersonageneroService
  ) {
    this.form = this.fb.group({
      generos: this.fb.array([])
    });

  }
  ngOnInit(): void {

    this._generoService.getAll().subscribe({
      next: (data: PersonaGeneroResponse[]) => {
        this.generosBack = data;

        this.generosBack.forEach(x => {
          let genero = this.nuevogenero(x);
          this.generosArrayForm.push(genero);
        });


      },
      error: () => { },
      complete: () => { }
    });

  }

  get generosArrayForm(): FormArray { return this.form.get("generos") as FormArray };




  addgenero() {

    let genero = this.nuevogenero(new PersonaGeneroResponse())
    this.generosArrayForm.push(genero);
  }

  nuevogenero(genero: PersonaGeneroResponse) {
    return this.fb.group({
      // id: [{ value: genero.idgenero, disabled: true }, [Validators.required]],
      // descripcion: [genero.descripcion, [Validators.required]],
      // funcion: [genero.funcion, [Validators.required]],
      // idEstado: [genero.idEstado, [Validators.required]],
    })
  }

  removegenero(i: number) {
    this.generosArrayForm.removeAt(i)
  }

  save() {
    console.log(this.form.getRawValue());

  }

}