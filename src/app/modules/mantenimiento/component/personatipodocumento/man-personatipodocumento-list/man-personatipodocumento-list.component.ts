import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericFilterRequest } from '../../../models/generic-filter-request.model';
import { Router } from '@angular/router';
import { PersonatipodocumentoService } from '../../../services/personatipodocumento.service';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { GenericFilterResponse } from '../../../models/generec-filter-response.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { PersonaTipoDocumentoResponse } from '../../../models/personatipodocumento-response.module';

@Component({
  selector: 'app-man-personatipodocumento-list',
  templateUrl: './man-personatipodocumento-list.component.html',
  styleUrls: ['./man-personatipodocumento-list.component.scss']
})
export class ManPersonatipodocumentoListComponent implements OnInit {


  modalRef?: BsModalRef;
  tipodocumentos: PersonaTipoDocumentoResponse[] = [];
  tipodocumentoSelected: PersonaTipoDocumentoResponse = new PersonaTipoDocumentoResponse();
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
    private _tipodocumentoService: PersonatipodocumentoService,
  ) {
    //nuestro formulario tipodocumento request
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

  listartipodocumentos() {
    
    this._tipodocumentoService.getAll().subscribe({

      next: (data: PersonaTipoDocumentoResponse[]) => {
        this.tipodocumentos = data;
      },
      error: (err) => {
        console.log("error ", err);
      },
      complete: () => {
        //hare algo
      },

    });
  }


  creartipodocumento(template: TemplateRef<any>) {
    this.tipodocumentoSelected = new PersonaTipoDocumentoResponse();
    this.titleModal = "NUEVO tipodocumento";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }


  editartipodocumento(template: TemplateRef<any>, tipodocumento: PersonaTipoDocumentoResponse) {
    this.tipodocumentoSelected = tipodocumento;
    this.titleModal = "EDITAR tipodocumento";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.listartipodocumentos();
    }

  }


  eliminarRegistro(id: number) {
    let result = confirm("¿Está seguro de eliminar el registro?");

    if (result) {
      this._tipodocumentoService.delete(id).subscribe({
        next: (data: number) => {
          alert("Registro eliminado de forma correcta");
        },
        error: () => { },
        complete: () => {
          this.listartipodocumentos();
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
    this._tipodocumentoService.genericFilter(this.request).subscribe({
      next: (data: GenericFilterResponse<PersonaTipoDocumentoResponse>) => {
        console.log(data);
        this.tipodocumentos = data.lista;
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
