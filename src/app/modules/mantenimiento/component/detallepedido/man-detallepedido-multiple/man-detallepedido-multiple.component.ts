import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DetallePedidoResponse } from '../../../models/detallepedido-response.module';
import { DetallepedidoService } from '../../../services/detallepedido.service';

@Component({
  selector: 'app-man-detallepedido-multiple',
  templateUrl: './man-detallepedido-multiple.component.html',
  styleUrls: ['./man-detallepedido-multiple.component.scss']
})
export class ManDetallepedidoMultipleComponent implements OnInit {

  form: FormGroup;
  detallepedidosBack: DetallePedidoResponse[] = [];
  constructor(
    private fb: FormBuilder,
    private _detallepedidoService: DetallepedidoService
  ) {
    this.form = this.fb.group({
      detallepedidos: this.fb.array([])
    });

  }
  ngOnInit(): void {

    this._detallepedidoService.getAll().subscribe({
      next: (data: DetallePedidoResponse[]) => {
        this.detallepedidosBack = data;

        this.detallepedidosBack.forEach(x => {
          let detallepedido = this.nuevodetallepedido(x);
          this.detallepedidosArrayForm.push(detallepedido);
        });


      },
      error: () => { },
      complete: () => { }
    });

  }

  get detallepedidosArrayForm(): FormArray { return this.form.get("detallepedidos") as FormArray };




  adddetallepedido() {

    let detallepedido = this.nuevodetallepedido(new DetallePedidoResponse())
    this.detallepedidosArrayForm.push(detallepedido);
  }

  nuevodetallepedido(detallepedido: DetallePedidoResponse) {
    return this.fb.group({
      // id: [{ value: detallepedido.iddetallepedido, disabled: true }, [Validators.required]],
      // descripcion: [detallepedido.descripcion, [Validators.required]],
      // funcion: [detallepedido.funcion, [Validators.required]],
      // idEstado: [detallepedido.idEstado, [Validators.required]],
    })
  }

  removedetallepedido(i: number) {
    this.detallepedidosArrayForm.removeAt(i)
  }

  save() {
    console.log(this.form.getRawValue());

  }

}