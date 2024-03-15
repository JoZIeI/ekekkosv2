import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericFilterRequest } from '../../../models/generic-filter-request.model';
import { Router } from '@angular/router';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { GenericFilterResponse } from '../../../models/generec-filter-response.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { PersonaResponse } from '../../../models/persona-response.module';
import { PersonaService } from '../../../services/persona.service';

@Component({
  selector: 'app-man-persona-list',
  templateUrl: './man-persona-list.component.html',
  styleUrls: ['./man-persona-list.component.scss']
})
export class ManPersonaListComponent implements OnInit {


  modalRef?: BsModalRef;
  personas: PersonaResponse[] = [];
  personaSelected: PersonaResponse = new PersonaResponse();
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
    private _personaService: PersonaService,
  ) {
    //nuestro formulario persona request
    this.myFormFilter = this.fb.group({
      ApPaterno: ["", []],
      ApMaterno: ["", []],
      Dni: ["", []],
    });
  }

  /**
   * FIXME: ES EL PRIMER EVENTO QUE EJECUTA EL COMPONENTE
   * */
  ngOnInit(): void {

    this.filtrar();

  }

  listarpersonas() {
    
    this._personaService.getAll().subscribe({

      next: (data: PersonaResponse[]) => {
        this.personas = data;
      },
      error: (err) => {
        console.log("error ", err);
      },
      complete: () => {
        //hare algo
      },

    });
  }


  crearpersona(template: TemplateRef<any>) {
    this.personaSelected = new PersonaResponse();
    this.titleModal = "NUEVO persona";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }


  editarpersona(template: TemplateRef<any>, persona: PersonaResponse) {
    this.personaSelected = persona;
    this.titleModal = "EDITAR persona";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.listarpersonas();
    }

  }


  eliminarRegistro(id: number) {
    let result = confirm("¿Está seguro de eliminar el registro?");

    if (result) {
      this._personaService.delete(id).subscribe({
        next: (data: number) => {
          alert("Registro eliminado de forma correcta");
        },
        error: () => { },
        complete: () => {
          this.listarpersonas();
        }
      });
    }

  }

  filtrar() {
    debugger
    let valueForm = this.myFormFilter.getRawValue();
    this.request.filtros.push({ name: "ApPaterno", value: valueForm.ApPaterno });
    this.request.filtros.push({ name: "ApMaterno", value: valueForm.ApMaterno });
    this.request.filtros.push({ name: "Dni", value: valueForm.Dni });
    this._personaService.genericFilter(this.request).subscribe({
      next: (data: GenericFilterResponse<PersonaResponse>) => {
        console.log(data);
        this.personas = data.lista;
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
