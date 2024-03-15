import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GenericFilterRequest } from 'src/app/Models/generic-filter-request.model';
import { RolResponse } from 'src/app/Models/rol-response-model';
import { RolService } from '../../../services/rol.service';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { GenericFilterResponse } from 'src/app/Models/generec-filter-response.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-man-rol-list',
  templateUrl: './man-rol-list.component.html',
  styleUrls: ['./man-rol-list.component.scss']
})
export class ManRolListComponent implements OnInit {


  modalRef?: BsModalRef;
  rols: RolResponse[] = [];
  rolSelected: RolResponse = new RolResponse();
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
    private _rolService: RolService,
  ) {
    //nuestro formulario rol request
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

  listarrols() {
    
    this._rolService.getAll().subscribe({

      next: (data: RolResponse[]) => {
        this.rols = data;
      },
      error: (err) => {
        console.log("error ", err);
      },
      complete: () => {
        //hare algo
      },

    });
  }


  crearrol(template: TemplateRef<any>) {
    this.rolSelected = new RolResponse();
    this.titleModal = "NUEVO rol";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }


  editarrol(template: TemplateRef<any>, rol: RolResponse) {
    this.rolSelected = rol;
    this.titleModal = "EDITAR rol";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.listarrols();
    }

  }


  eliminarRegistro(id: number) {
    let result = confirm("¿Está seguro de eliminar el registro?");

    if (result) {
      this._rolService.delete(id).subscribe({
        next: (data: number) => {
          alert("Registro eliminado de forma correcta");
        },
        error: () => { },
        complete: () => {
          this.listarrols();
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
    this._rolService.genericFilter(this.request).subscribe({
      next: (data: GenericFilterResponse<RolResponse>) => {
        console.log(data);
        this.rols = data.lista;
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
