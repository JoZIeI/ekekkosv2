import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericFilterRequest } from '../../../models/generic-filter-request.model';
import { Router } from '@angular/router';
import { PersonatipoService } from '../../../services/personatipo.service';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { GenericFilterResponse } from '../../../models/generec-filter-response.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { PersonaTipoResponse } from '../../../models/personatipo-response.module';

@Component({
  selector: 'app-man-personatipo-list',
  templateUrl: './man-personatipo-list.component.html',
  styleUrls: ['./man-personatipo-list.component.scss']
})
export class ManPersonatipoListComponent implements OnInit {


  modalRef?: BsModalRef;
  tipos: PersonaTipoResponse[] = [];
  tipoSelected: PersonaTipoResponse = new PersonaTipoResponse();
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
    private _tipoService: PersonatipoService,
  ) {
    //nuestro formulario tipo request
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

  listartipos() {
    
    this._tipoService.getAll().subscribe({

      next: (data: PersonaTipoResponse[]) => {
        this.tipos = data;
      },
      error: (err) => {
        console.log("error ", err);
      },
      complete: () => {
        //hare algo
      },

    });
  }


  creartipo(template: TemplateRef<any>) {
    this.tipoSelected = new PersonaTipoResponse();
    this.titleModal = "NUEVO tipo";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }


  editartipo(template: TemplateRef<any>, tipo: PersonaTipoResponse) {
    this.tipoSelected = tipo;
    this.titleModal = "EDITAR tipo";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.listartipos();
    }

  }


  eliminarRegistro(id: number) {
    let result = confirm("¿Está seguro de eliminar el registro?");

    if (result) {
      this._tipoService.delete(id).subscribe({
        next: (data: number) => {
          alert("Registro eliminado de forma correcta");
        },
        error: () => { },
        complete: () => {
          this.listartipos();
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
    this._tipoService.genericFilter(this.request).subscribe({
      next: (data: GenericFilterResponse<PersonaTipoResponse>) => {
        console.log(data);
        this.tipos = data.lista;
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
