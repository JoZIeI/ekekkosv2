import { Component, OnInit, TemplateRef } from '@angular/core';
import { PedidoResponse } from '../../../models/pedido-response.module';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericFilterRequest } from '../../../models/generic-filter-request.model';
import { Router } from '@angular/router';
import { PedidoService } from '../../../services/pedido.service';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { GenericFilterResponse } from '../../../models/generec-filter-response.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-man-pedido-list',
  templateUrl: './man-pedido-list.component.html',
  styleUrls: ['./man-pedido-list.component.scss']
})
export class ManPedidoListComponent implements OnInit {


  modalRef?: BsModalRef;
  pedidos: PedidoResponse[] = [];
  pedidoSelected: PedidoResponse = new PedidoResponse();
  titleModal: string = "";
  accionModal: number = 0;
  // myFormFilter: FormGroup;
  totalItems: number = 0;
  itemsPerPage: number = 3;
  request: GenericFilterRequest = new GenericFilterRequest();


  constructor(
    private _route: Router,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private _pedidoService: PedidoService,
  ) {
    //nuestro formulario pedido request
    // this.myFormFilter = this.fb.group({
    //   descripcion: ["", []],
    //   funcion: ["", []],
    //   idEstado: ["", []],
    // });
  }

  /**
   * FIXME: ES EL PRIMER EVENTO QUE EJECUTA EL COMPONENTE
   * */
  ngOnInit(): void {

    this.listarpedidos();

  }

  listarpedidos() {
    
    this._pedidoService.getAll().subscribe({

      next: (data: PedidoResponse[]) => {
        this.pedidos = data;
      },
      error: (err) => {
        console.log("error ", err);
      },
      complete: () => {
        //hare algo
      },

    });
  }


  crearpedido(template: TemplateRef<any>) {
    this.pedidoSelected = new PedidoResponse();
    this.titleModal = "NUEVO pedido";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }


  editarpedido(template: TemplateRef<any>, pedido: PedidoResponse) {
    this.pedidoSelected = pedido;
    this.titleModal = "EDITAR pedido";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.listarpedidos();
    }

  }


  eliminarRegistro(id: number) {
    let result = confirm("¿Está seguro de eliminar el registro?");

    if (result) {
      this._pedidoService.delete(id).subscribe({
        next: (data: number) => {
          alert("Registro eliminado de forma correcta");
        },
        error: () => { },
        complete: () => {
          this.listarpedidos();
        }
      });
    }

  }

  // filtrar() {
  //   debugger
  //   let valueForm = this.myFormFilter.getRawValue();
  //   this.request.filtros.push({ name: "descripcion", value: valueForm.descripcion });
  //   this.request.filtros.push({ name: "funcion", value: valueForm.funcion });
  //   this.request.filtros.push({ name: "idEstado", value: valueForm.idEstado });
  //   this._pedidoService.genericFilter(this.request).subscribe({
  //     next: (data: GenericFilterResponse<PedidoResponse>) => {
  //       console.log(data);
  //       this.pedidos = data.lista;
  //       this.totalItems = data.totalRegistros;
  //     },
  //     error: () => {
  //       console.log("error");
  //     },
  //     complete: () => {
  //       console.log("completo");
  //     },
  //   });
  // }

  // changePage(event: PageChangedEvent) {
  //   this.request.numeroPagina = event.page;
  //   this.filtrar();
  // }


  // changeItemsPerPage() {
  //   this.request.cantidad = this.itemsPerPage;
  //   this.filtrar();
  // }
}
