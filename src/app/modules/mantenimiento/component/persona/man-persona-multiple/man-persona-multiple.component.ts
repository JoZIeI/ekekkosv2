import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { PersonaResponse } from 'src/app/Models/persona-response.model';
import { PersonaService } from '../../../services/persona.service';

@Component({
  selector: 'app-man-persona-multiple',
  templateUrl: './man-persona-multiple.component.html',
  styleUrls: ['./man-persona-multiple.component.scss']
})
export class ManPersonaMultipleComponent implements OnInit {

  form: FormGroup;
  personasBack: PersonaResponse[] = [];
  constructor(
    private fb: FormBuilder,
    private _personaService: PersonaService
  ) {
    this.form = this.fb.group({
      personas: this.fb.array([])
    });

  }
  ngOnInit(): void {

    this._personaService.getAll().subscribe({
      next: (data: PersonaResponse[]) => {
        this.personasBack = data;

        this.personasBack.forEach(x => {
          let persona = this.nuevopersona(x);
          this.personasArrayForm.push(persona);
        });


      },
      error: () => { },
      complete: () => { }
    });

  }

  get personasArrayForm(): FormArray { return this.form.get("personas") as FormArray };




  addpersona() {

    let persona = this.nuevopersona(new PersonaResponse())
    this.personasArrayForm.push(persona);
  }

  nuevopersona(persona: PersonaResponse) {
    return this.fb.group({
      // id: [{ value: persona.idpersona, disabled: true }, [Validators.required]],
      // descripcion: [persona.descripcion, [Validators.required]],
      // funcion: [persona.funcion, [Validators.required]],
      // idEstado: [persona.idEstado, [Validators.required]],
    })
  }

  removepersona(i: number) {
    this.personasArrayForm.removeAt(i)
  }

  save() {
    console.log(this.form.getRawValue());

  }

}