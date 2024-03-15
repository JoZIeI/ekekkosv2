import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MetodoPagoResponse } from '../../../models/metodopago-response.module';
import { MetodopagoService } from '../../../services/metodopago.service';

@Component({
  selector: 'app-man-metodopago-multiple',
  templateUrl: './man-metodopago-multiple.component.html',
  styleUrls: ['./man-metodopago-multiple.component.scss']
})
export class ManMetodopagoMultipleComponent implements OnInit {

  form: FormGroup;
  metodopagosBack: MetodoPagoResponse[] = [];
  constructor(
    private fb: FormBuilder,
    private _metodopagoService: MetodopagoService
  ) {
    this.form = this.fb.group({
      metodopagos: this.fb.array([])
    });

  }
  ngOnInit(): void {

    this._metodopagoService.getAll().subscribe({
      next: (data: MetodoPagoResponse[]) => {
        this.metodopagosBack = data;

        this.metodopagosBack.forEach(x => {
          let metodopago = this.nuevometodopago(x);
          this.metodopagosArrayForm.push(metodopago);
        });


      },
      error: () => { },
      complete: () => { }
    });

  }

  get metodopagosArrayForm(): FormArray { return this.form.get("metodopagos") as FormArray };




  addmetodopago() {

    let metodopago = this.nuevometodopago(new MetodoPagoResponse())
    this.metodopagosArrayForm.push(metodopago);
  }

  nuevometodopago(metodopago: MetodoPagoResponse) {
    return this.fb.group({
      // id: [{ value: metodopago.idmetodopago, disabled: true }, [Validators.required]],
      // descripcion: [metodopago.descripcion, [Validators.required]],
      // funcion: [metodopago.funcion, [Validators.required]],
      // idEstado: [metodopago.idEstado, [Validators.required]],
    })
  }

  removemetodopago(i: number) {
    this.metodopagosArrayForm.removeAt(i)
  }

  save() {
    console.log(this.form.getRawValue());

  }

}