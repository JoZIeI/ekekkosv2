import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ColaboradorResponse } from '../../../models/colaborador-response.module';
import { ColaboradorService } from '../../../services/colaborador.service';

@Component({
  selector: 'app-man-colaborador-multiple',
  templateUrl: './man-colaborador-multiple.component.html',
  styleUrls: ['./man-colaborador-multiple.component.scss']
})
export class ManColaboradorMultipleComponent implements OnInit {

  form: FormGroup;
  colaboradorsBack: ColaboradorResponse[] = [];
  constructor(
    private fb: FormBuilder,
    private _colaboradorService: ColaboradorService
  ) {
    this.form = this.fb.group({
      colaboradors: this.fb.array([])
    });

  }
  ngOnInit(): void {

    this._colaboradorService.getAll().subscribe({
      next: (data: ColaboradorResponse[]) => {
        this.colaboradorsBack = data;

        this.colaboradorsBack.forEach(x => {
          let colaborador = this.nuevocolaborador(x);
          this.colaboradorsArrayForm.push(colaborador);
        });


      },
      error: () => { },
      complete: () => { }
    });

  }

  get colaboradorsArrayForm(): FormArray { return this.form.get("colaboradors") as FormArray };




  addcolaborador() {

    let colaborador = this.nuevocolaborador(new ColaboradorResponse())
    this.colaboradorsArrayForm.push(colaborador);
  }

  nuevocolaborador(colaborador: ColaboradorResponse) {
    return this.fb.group({
      // id: [{ value: colaborador.idcolaborador, disabled: true }, [Validators.required]],
      // descripcion: [colaborador.descripcion, [Validators.required]],
      // funcion: [colaborador.funcion, [Validators.required]],
      // idEstado: [colaborador.idEstado, [Validators.required]],
    })
  }

  removecolaborador(i: number) {
    this.colaboradorsArrayForm.removeAt(i)
  }

  save() {
    console.log(this.form.getRawValue());

  }

}