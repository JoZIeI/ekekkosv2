import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DetallePedidoResponse } from '../../../models/detallepedido-response.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericFilterRequest } from '../../../models/generic-filter-request.model';
import { Router } from '@angular/router';
import { DetallepedidoService } from '../../../services/detallepedido.service';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { GenericFilterResponse } from '../../../models/generec-filter-response.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-man-detallepedido-list',
  templateUrl: './man-detallepedido-list.component.html',
  styleUrls: ['./man-detallepedido-list.component.scss']
})
export class ManDetallepedidoListComponent implements OnInit {


  modalRef?: BsModalRef;
  detallepedidos: DetallePedidoResponse[] = [];
  detallepedidoSelected: DetallePedidoResponse = new DetallePedidoResponse();
  titleModal: string = "";
  accionModal: number = 0;
  myFormFilter: FormGroup;
  totalItems: number = 0;
  itemsPerPage: number = 3;
  request: GenericFilterRequest = new GenericFilterRequest();


  constructor(
    private _route: Router,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private _detallepedidoService: DetallepedidoService,
  ) {
    //nuestro formulario detallepedido request
    this.myFormFilter = this.fb.group({
      descripcion: ["", []],
      funcion: ["", []],
      idEstado: ["", []],
    });
  }

  /**
   * FIXME: ES EL PRIMER EVENTO QUE EJECUTA EL COMPONENTE
   * */
  ngOnInit(): void {

    this.filtrar();

  }

  listardetallepedidos() {
    
    this._detallepedidoService.getAll().subscribe({

      next: (data: DetallePedidoResponse[]) => {
        this.detallepedidos = data;
      },
      error: (err) => {
        console.log("error ", err);
      },
      complete: () => {
        //hare algo
      },

    });
  }


  creardetallepedido(template: TemplateRef<any>) {
    this.detallepedidoSelected = new DetallePedidoResponse();
    this.titleModal = "NUEVO detallepedido";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }


  editardetallepedido(template: TemplateRef<any>, detallepedido: DetallePedidoResponse) {
    this.detallepedidoSelected = detallepedido;
    this.titleModal = "EDITAR detallepedido";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.listardetallepedidos();
    }

  }


  eliminarRegistro(id: number) {
    let result = confirm("¿Está seguro de eliminar el registro?");

    if (result) {
      this._detallepedidoService.delete(id).subscribe({
        next: (data: number) => {
          alert("Registro eliminado de forma correcta");
        },
        error: () => { },
        complete: () => {
          this.listardetallepedidos();
        }
      });
    }

  }

  filtrar() {
    debugger
    let valueForm = this.myFormFilter.getRawValue();
    this.request.filtros.push({ name: "descripcion", value: valueForm.descripcion });
    this.request.filtros.push({ name: "funcion", value: valueForm.funcion });
    this.request.filtros.push({ name: "idEstado", value: valueForm.idEstado });
    this._detallepedidoService.genericFilter(this.request).subscribe({
      next: (data: GenericFilterResponse<DetallePedidoResponse>) => {
        console.log(data);
        this.detallepedidos = data.lista;
        this.totalItems = data.totalRegistros;
      },
      error: () => {
        console.log("error");
      },
      complete: () => {
        console.log("completo");
      },
    });
  }

  changePage(event: PageChangedEvent) {
    this.request.numeroPagina = event.page;
    this.filtrar();
  }


  changeItemsPerPage() {
    this.request.cantidad = this.itemsPerPage;
    this.filtrar();
  }
}
