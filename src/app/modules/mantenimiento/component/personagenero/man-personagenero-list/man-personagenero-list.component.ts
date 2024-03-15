import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PersonaGeneroResponse} from '../../../models/personagenero-response.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericFilterRequest } from '../../../models/generic-filter-request.model';
import { Router } from '@angular/router';
import { PersonageneroService } from '../../../services/personagenero.service';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { GenericFilterResponse } from '../../../models/generec-filter-response.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-man-personagenero-list',
  templateUrl: './man-personagenero-list.component.html',
  styleUrls: ['./man-personagenero-list.component.scss']
})
export class ManPersonageneroListComponent implements OnInit {

  modalRef?: BsModalRef;
  generos: PersonaGeneroResponse[] = [];
  generoSelected: PersonaGeneroResponse = new PersonaGeneroResponse();
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
    private _generoService: PersonageneroService,
  ) {
    //nuestro formulario genero request
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

  listargeneros() {
    
    this._generoService.getAll().subscribe({

      next: (data: PersonaGeneroResponse[]) => {
        this.generos = data;
      },
      error: (err) => {
        console.log("error ", err);
      },
      complete: () => {
        //hare algo
      },

    });
  }


  creargenero(template: TemplateRef<any>) {
    this.generoSelected = new PersonaGeneroResponse();
    this.titleModal = "NUEVO genero";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }


  editargenero(template: TemplateRef<any>, genero: PersonaGeneroResponse) {
    this.generoSelected = genero;
    this.titleModal = "EDITAR genero";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.listargeneros();
    }

  }


  eliminarRegistro(id: number) {
    let result = confirm("¿Está seguro de eliminar el registro?");

    if (result) {
      this._generoService.delete(id).subscribe({
        next: (data: number) => {
          alert("Registro eliminado de forma correcta");
        },
        error: () => { },
        complete: () => {
          this.listargeneros();
        }
      });
    }

  }

  filtrar() {
    debugger
    let valueForm = this.myFormFilter.getRawValue();
    this.request.filtros.push({ name: "nombre", value: valueForm.nombre });
    this._generoService.genericFilter(this.request).subscribe({
      next: (data: GenericFilterResponse<PersonaGeneroResponse>) => {
        console.log(data);
        this.generos = data.lista;
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
