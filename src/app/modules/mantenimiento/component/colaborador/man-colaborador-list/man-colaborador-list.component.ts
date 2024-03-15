import { Component, OnInit, TemplateRef } from '@angular/core';
import { ColaboradorResponse } from '../../../models/colaborador-response.module';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericFilterRequest } from '../../../models/generic-filter-request.model';
import { Router } from '@angular/router';
import { ColaboradorService } from '../../../services/colaborador.service';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { GenericFilterResponse } from '../../../models/generec-filter-response.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-man-colaborador-list',
  templateUrl: './man-colaborador-list.component.html',
  styleUrls: ['./man-colaborador-list.component.scss']
})
export class ManColaboradorListComponent implements OnInit {


  modalRef?: BsModalRef;
  colaboradors: ColaboradorResponse[] = [];
  colaboradorSelected: ColaboradorResponse = new ColaboradorResponse();
  titleModal: string = "";
  accionModal: number = 0;
  // myFormFilter: FormGroup;
  totalItems: number = 0;
  itemsPerPage: number = 3;
  request: GenericFilterRequest = new GenericFilterRequest();


  constructor(
    private _route: Router,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private _colaboradorService: ColaboradorService,
  ) {
    //nuestro formulario colaborador request
    // this.myFormFilter = this.fb.group({
    //   descripcion: ["", []],
    //   funcion: ["", []],
    //   idEstado: ["", []],
    // });
  }

  /**
   * FIXME: ES EL PRIMER EVENTO QUE EJECUTA EL COMPONENTE
   * */
  ngOnInit(): void {

    this.listarcolaboradors();

  }

  listarcolaboradors() {
    
    this._colaboradorService.getAll().subscribe({

      next: (data: ColaboradorResponse[]) => {
        this.colaboradors = data;
      },
      error: (err) => {
        console.log("error ", err);
      },
      complete: () => {
        //hare algo
      },

    });
  }


  crearcolaborador(template: TemplateRef<any>) {
    this.colaboradorSelected = new ColaboradorResponse();
    this.titleModal = "NUEVO colaborador";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }


  editarcolaborador(template: TemplateRef<any>, colaborador: ColaboradorResponse) {
    this.colaboradorSelected = colaborador;
    this.titleModal = "EDITAR colaborador";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.listarcolaboradors();
    }

  }


  eliminarRegistro(id: number) {
    let result = confirm("¿Está seguro de eliminar el registro?");

    if (result) {
      this._colaboradorService.delete(id).subscribe({
        next: (data: number) => {
          alert("Registro eliminado de forma correcta");
        },
        error: () => { },
        complete: () => {
          this.listarcolaboradors();
        }
      });
    }

  }

  // filtrar() {
  //   debugger
  //   let valueForm = this.myFormFilter.getRawValue();
  //   this.request.filtros.push({ name: "descripcion", value: valueForm.descripcion });
  //   this.request.filtros.push({ name: "funcion", value: valueForm.funcion });
  //   this.request.filtros.push({ name: "idEstado", value: valueForm.idEstado });
  //   this._colaboradorService.genericFilter(this.request).subscribe({
  //     next: (data: GenericFilterResponse<ColaboradorResponse>) => {
  //       console.log(data);
  //       this.colaboradors = data.lista;
  //       this.totalItems = data.totalRegistros;
  //     },
  //     error: () => {
  //       console.log("error");
  //     },
  //     complete: () => {
  //       console.log("completo");
  //     },
  //   });
  // }

  // changePage(event: PageChangedEvent) {
  //   this.request.numeroPagina = event.page;
  //   this.filtrar();
  // }


  // changeItemsPerPage() {
  //   this.request.cantidad = this.itemsPerPage;
  //   this.filtrar();
  // }
}
