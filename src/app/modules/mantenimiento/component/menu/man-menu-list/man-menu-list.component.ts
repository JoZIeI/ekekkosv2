import { Component, OnInit, TemplateRef } from '@angular/core';
import { MenuResponse } from '../../../models/menu-response.module';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericFilterRequest } from '../../../models/generic-filter-request.model';
import { Router } from '@angular/router';
import { MenuService } from '../../../services/menu.service';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { GenericFilterResponse } from '../../../models/generec-filter-response.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-man-menu-list',
  templateUrl: './man-menu-list.component.html',
  styleUrls: ['./man-menu-list.component.scss']
})
export class ManMenuListComponent implements OnInit {


  modalRef?: BsModalRef;
  menus: MenuResponse[] = [];
  menuSelected: MenuResponse = new MenuResponse();
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
    private _menuService: MenuService,
  ) {
    //nuestro formulario menu request
    this.myFormFilter = this.fb.group({
      nombre: ["", []],
      descripcion: ["", []],
      icono: ["", []],
      dato: ["", []],
      url: ["", []],
      padre: ["", []],
      estado: ["", []],
      usuariocrea: ["", []],
      usuarioactua: ["", []],
    });
  }

  /**
   * FIXME: ES EL PRIMER EVENTO QUE EJECUTA EL COMPONENTE
   * */
  ngOnInit(): void {

    this.filtrar();

  }

  listarmenus() {
    
    this._menuService.getAll().subscribe({

      next: (data: MenuResponse[]) => {
        this.menus = data;
      },
      error: (err) => {
        console.log("error ", err);
      },
      complete: () => {
        //hare algo
      },

    });
  }


  crearmenu(template: TemplateRef<any>) {
    this.menuSelected = new MenuResponse();
    this.titleModal = "NUEVO menu";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }


  editarmenu(template: TemplateRef<any>, menu: MenuResponse) {
    this.menuSelected = menu;
    this.titleModal = "EDITAR menu";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.listarmenus();
    }

  }


  eliminarRegistro(id: number) {
    let result = confirm("¿Está seguro de eliminar el registro?");

    if (result) {
      this._menuService.delete(id).subscribe({
        next: (data: number) => {
          alert("Registro eliminado de forma correcta");
        },
        error: () => { },
        complete: () => {
          this.listarmenus();
        }
      });
    }

  }

  filtrar() {
    debugger
    let valueForm = this.myFormFilter.getRawValue();
    this.request.filtros.push({ name: "nombre", value: valueForm.nombre });
    this.request.filtros.push({ name: "descripcion", value: valueForm.descripcion });
    this.request.filtros.push({ name: "icono", value: valueForm.icono });
    this.request.filtros.push({ name: "dato", value: valueForm.dato });
    this.request.filtros.push({ name: "url", value: valueForm.url });
    this.request.filtros.push({ name: "padre", value: valueForm.padre });
    this.request.filtros.push({ name: "estado", value: valueForm.estado });
    this.request.filtros.push({ name: "usuariocrea", value: valueForm.usuariocrea });
    this.request.filtros.push({ name: "usuarioactua", value: valueForm.usuarioactua });
    this._menuService.genericFilter(this.request).subscribe({
      next: (data: GenericFilterResponse<MenuResponse>) => {
        console.log(data);
        this.menus = data.lista;
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
