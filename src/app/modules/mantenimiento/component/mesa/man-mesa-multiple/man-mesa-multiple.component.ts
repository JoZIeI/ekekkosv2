import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MesaResponse } from '../../../models/mesa-response.module';
import { MesaService } from '../../../services/mesa.service';



@Component({
  selector: 'app-man-mesa-multiple',
  templateUrl: './man-mesa-multiple.component.html',
  styleUrls: ['./man-mesa-multiple.component.scss']
})
export class ManMesaMultipleComponent implements OnInit {

  form: FormGroup;
  mesasBack: MesaResponse[] = [];
  constructor(
    private fb: FormBuilder,
    private _mesaService: MesaService
  ) {
    this.form = this.fb.group({
      mesas: this.fb.array([])
    });

  }
  ngOnInit(): void {

    this._mesaService.getAll().subscribe({
      next: (data: MesaResponse[]) => {
        this.mesasBack = data;

        this.mesasBack.forEach(x => {
          let mesa = this.nuevomesa(x);
          this.mesasArrayForm.push(mesa);
        });


      },
      error: () => { },
      complete: () => { }
    });

  }

  get mesasArrayForm(): FormArray { return this.form.get("mesas") as FormArray };




  addmesa() {

    let mesa = this.nuevomesa(new MesaResponse())
    this.mesasArrayForm.push(mesa);
  }

  nuevomesa(mesa: MesaResponse) {
    return this.fb.group({
      // id: [{ value: mesa.idmesa, disabled: true }, [Validators.required]],
      // descripcion: [mesa.descripcion, [Validators.required]],
      // funcion: [mesa.funcion, [Validators.required]],
      // idEstado: [mesa.idEstado, [Validators.required]],
    })
  }

  removemesa(i: number) {
    this.mesasArrayForm.removeAt(i)
  }

  save() {
    console.log(this.form.getRawValue());

  }

}