import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GenericFilterRequest } from '../../../models/generic-filter-request.model';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { GenericFilterResponse } from '../../../models/generec-filter-response.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { UsuarioResponse } from '../../../models/usuario-response.model';


@Component({
  selector: 'app-man-usuario-list',
  templateUrl: './man-usuario-list.component.html',
  styleUrls: ['./man-usuario-list.component.scss']
})
export class ManUsuarioListComponent implements OnInit {


  modalRef?: BsModalRef;
  usuarios: UsuarioResponse[] = [];
  usuarioSelected: UsuarioResponse = new UsuarioResponse();
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
    private _usuarioService: UsuarioService,
  ) {
    //nuestro formulario usuario request
    this.myFormFilter = this.fb.group({
      nombre: ["", []],      
    });
  }

  /**
   * FIXME: ES EL PRIMER EVENTO QUE EJECUTA EL COMPONENTE
   * */
  ngOnInit(): void {

    this.listarusuarios();

  }

  listarusuarios() {
    
    this._usuarioService.getAll().subscribe({

      next: (data: UsuarioResponse[]) => {
        this.usuarios = data;
      },
      error: (err) => {
        console.log("error ", err);
      },
      complete: () => {
        //hare algo
      },

    });
  }


  crearusuario(template: TemplateRef<any>) {
    this.usuarioSelected = new UsuarioResponse();
    this.titleModal = "NUEVO usuario";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }


  editarusuario(template: TemplateRef<any>, usuario: UsuarioResponse) {
    this.usuarioSelected = usuario;
    this.titleModal = "EDITAR usuario";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.listarusuarios();
    }

  }


  eliminarRegistro(id: number) {
    let result = confirm("¿Está seguro de eliminar el registro?");

    if (result) {
      this._usuarioService.delete(id).subscribe({
        next: (data: number) => {
          alert("Registro eliminado de forma correcta");
        },
        error: () => { },
        complete: () => {
          this.listarusuarios();
        }
      });
    }

  }

  filtrar() {
    debugger
    let valueForm = this.myFormFilter.getRawValue();
    this.request.filtros.push({ name: "nombre", value: valueForm.descripcion });

    this._usuarioService.genericFilter(this.request).subscribe({
      next: (data: GenericFilterResponse<UsuarioResponse>) => {
        console.log(data);
        this.usuarios = data.lista;
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
