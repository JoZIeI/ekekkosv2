import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { PedidoResponse } from '../../../models/pedido-response.module';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-man-pedido-multiple',
  templateUrl: './man-pedido-multiple.component.html',
  styleUrls: ['./man-pedido-multiple.component.scss']
})
export class ManPedidoMultipleComponent implements OnInit {

  form: FormGroup;
  pedidosBack: PedidoResponse[] = [];
  constructor(
    private fb: FormBuilder,
    private _pedidoService: PedidoService
  ) {
    this.form = this.fb.group({
      pedidos: this.fb.array([])
    });

  }
  ngOnInit(): void {

    this._pedidoService.getAll().subscribe({
      next: (data: PedidoResponse[]) => {
        this.pedidosBack = data;

        this.pedidosBack.forEach(x => {
          let pedido = this.nuevopedido(x);
          this.pedidosArrayForm.push(pedido);
        });


      },
      error: () => { },
      complete: () => { }
    });

  }

  get pedidosArrayForm(): FormArray { return this.form.get("pedidos") as FormArray };




  addpedido() {

    let pedido = this.nuevopedido(new PedidoResponse())
    this.pedidosArrayForm.push(pedido);
  }

  nuevopedido(pedido: PedidoResponse) {
    return this.fb.group({
      // id: [{ value: pedido.idpedido, disabled: true }, [Validators.required]],
      // descripcion: [pedido.descripcion, [Validators.required]],
      // funcion: [pedido.funcion, [Validators.required]],
      // idEstado: [pedido.idEstado, [Validators.required]],
    })
  }

  removepedido(i: number) {
    this.pedidosArrayForm.removeAt(i)
  }

  save() {
    console.log(this.form.getRawValue());

  }

}