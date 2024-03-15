import { Component, OnInit, TemplateRef } from '@angular/core';
import { CargoResponse } from '../../../models/cargo-response.module';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericFilterRequest } from '../../../models/generic-filter-request.model';
import { Router } from '@angular/router';
import { CargoService } from '../../../services/cargo.service';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { GenericFilterResponse } from '../../../models/generec-filter-response.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-man-cargo-list',
  templateUrl: './man-cargo-list.component.html',
  styleUrls: ['./man-cargo-list.component.scss']
})
export class ManCargoListComponent implements OnInit {


  modalRef?: BsModalRef;
  cargos: CargoResponse[] = [];
  cargoSelected: CargoResponse = new CargoResponse();
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
    private _cargoService: CargoService,
  ) {
    //nuestro formulario cargo request
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

  listarcargos() {
    
    this._cargoService.getAll().subscribe({

      next: (data: CargoResponse[]) => {
        this.cargos = data;
      },
      error: (err) => {
        console.log("error ", err);
      },
      complete: () => {
        //hare algo
      },

    });
  }


  crearcargo(template: TemplateRef<any>) {
    this.cargoSelected = new CargoResponse();
    this.titleModal = "NUEVO cargo";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }


  editarcargo(template: TemplateRef<any>, cargo: CargoResponse) {
    this.cargoSelected = cargo;
    this.titleModal = "EDITAR cargo";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.listarcargos();
    }

  }


  eliminarRegistro(id: number) {
    let result = confirm("¿Está seguro de eliminar el registro?");

    if (result) {
      this._cargoService.delete(id).subscribe({
        next: (data: number) => {
          alert("Registro eliminado de forma correcta");
        },
        error: () => { },
        complete: () => {
          this.listarcargos();
        }
      });
    }

  }

  filtrar() {
    
    let valueForm = this.myFormFilter.getRawValue();
    this.request.filtros.push({ name: "nombre", value: valueForm.nombre });

    this._cargoService.genericFilter(this.request).subscribe({
      next: (data: GenericFilterResponse<CargoResponse>) => {
        console.log(data);
        this.cargos = data.lista;
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
  limpiarFiltros() {
    this.request.filtros = [];
    this.myFormFilter.reset();
    this.listarcargos();
  }
}
