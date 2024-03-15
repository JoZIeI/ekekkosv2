import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MenuRolResponse } from '../../../models/menurol-response.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericFilterRequest } from '../../../models/generic-filter-request.model';
import { Router } from '@angular/router';
import { MenurolService } from '../../../services/menurol.service';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { GenericFilterResponse } from '../../../models/generec-filter-response.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-man-menumenurol-list',
  templateUrl: './man-menurol-list.component.html',
  styleUrls: ['./man-menurol-list.component.scss']
})
export class ManMenurolListComponent implements OnInit {

  modalRef?: BsModalRef;
  menurols: MenuRolResponse[] = [];
  menurolSelected: MenuRolResponse = new MenuRolResponse();
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
    private _menurolService: MenurolService,
  ) {
    //nuestro formulario menurol request
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

  listarmenurols() {
    
    this._menurolService.getAll().subscribe({

      next: (data: MenuRolResponse[]) => {
        this.menurols = data;
      },
      error: (err) => {
        console.log("error ", err);
      },
      complete: () => {
        //hare algo
      },

    });
  }


  crearmenurol(template: TemplateRef<any>) {
    this.menurolSelected = new MenuRolResponse();
    this.titleModal = "NUEVO menurol";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }


  editarmenurol(template: TemplateRef<any>, menurol: MenuRolResponse) {
    this.menurolSelected = menurol;
    this.titleModal = "EDITAR menurol";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.listarmenurols();
    }

  }


  eliminarRegistro(id: number) {
    let result = confirm("¿Está seguro de eliminar el registro?");

    if (result) {
      this._menurolService.delete(id).subscribe({
        next: (data: number) => {
          alert("Registro eliminado de forma correcta");
        },
        error: () => { },
        complete: () => {
          this.listarmenurols();
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
    this._menurolService.genericFilter(this.request).subscribe({
      next: (data: GenericFilterResponse<MenuRolResponse>) => {
        console.log(data);
        this.menurols = data.lista;
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
