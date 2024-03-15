import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MetodoPagoResponse } from '../../../models/metodopago-response.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericFilterRequest } from '../../../models/generic-filter-request.model';
import { Router } from '@angular/router';
import { MetodopagoService } from '../../../services/metodopago.service';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { GenericFilterResponse } from '../../../models/generec-filter-response.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-man-metodopago-list',
  templateUrl: './man-metodopago-list.component.html',
  styleUrls: ['./man-metodopago-list.component.scss']
})
export class ManMetodopagoListComponent implements OnInit {


  modalRef?: BsModalRef;
  metodopagos: MetodoPagoResponse[] = [];
  metodopagoSelected: MetodoPagoResponse = new MetodoPagoResponse();
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
    private _metodopagoService: MetodopagoService,
  ) {
    //nuestro formulario metodopago request
    this.myFormFilter = this.fb.group({
      nombre: ["", []],    
    });
  }

  /**
   * FIXME: ES EL PRIMER EVENTO QUE EJECUTA EL COMPONENTE
   * */
  ngOnInit(): void {

    this.filtrar();

  }

  listarmetodopagos() {
    
    this._metodopagoService.getAll().subscribe({

      next: (data: MetodoPagoResponse[]) => {
        this.metodopagos = data;
      },
      error: (err) => {
        console.log("error ", err);
      },
      complete: () => {
        //hare algo
      },

    });
  }


  crearmetodopago(template: TemplateRef<any>) {
    this.metodopagoSelected = new MetodoPagoResponse();
    this.titleModal = "NUEVO metodopago";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }


  editarmetodopago(template: TemplateRef<any>, metodopago: MetodoPagoResponse) {
    this.metodopagoSelected = metodopago;
    this.titleModal = "EDITAR metodopago";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.listarmetodopagos();
    }

  }


  eliminarRegistro(id: number) {
    let result = confirm("¿Está seguro de eliminar el registro?");

    if (result) {
      this._metodopagoService.delete(id).subscribe({
        next: (data: number) => {
          alert("Registro eliminado de forma correcta");
        },
        error: () => { },
        complete: () => {
          this.listarmetodopagos();
        }
      });
    }

  }

  filtrar() {
    debugger
    let valueForm = this.myFormFilter.getRawValue();
    this.request.filtros.push({ name: "nombre", value: valueForm.nombre });
    this._metodopagoService.genericFilter(this.request).subscribe({
      next: (data: GenericFilterResponse<MetodoPagoResponse>) => {
        console.log(data);
        this.metodopagos = data.lista;
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
