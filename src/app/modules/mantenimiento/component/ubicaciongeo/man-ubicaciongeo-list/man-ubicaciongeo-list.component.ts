import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UbicacionGeoResponse } from '../../../models/ubicaciongeo-response.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericFilterRequest } from '../../../models/generic-filter-request.model';
import { Router } from '@angular/router';
import { UbicaciongeoService } from '../../../services/ubicaciongeo.service';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { GenericFilterResponse } from '../../../models/generec-filter-response.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-man-ubicaciongeo-list',
  templateUrl: './man-ubicaciongeo-list.component.html',
  styleUrls: ['./man-ubicaciongeo-list.component.scss']
})
export class ManUbicaciongeoListComponent implements OnInit {


  modalRef?: BsModalRef;
  ubicacions: UbicacionGeoResponse[] = [];
  ubicacionSelected: UbicacionGeoResponse = new UbicacionGeoResponse();
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
    private _ubicacionService: UbicaciongeoService,
  ) {
    //nuestro formulario ubicacion request
    this.myFormFilter = this.fb.group({
      Direccion: ["", []],
      Distrito: ["", []],
      Provincia: ["", []],
      Departamento: ["", []],
      Ubicacion: ["", []],
    });
  }

  /**
   * FIXME: ES EL PRIMER EVENTO QUE EJECUTA EL COMPONENTE
   * */
  ngOnInit(): void {

    this.filtrar();

  }

  listarubicacions() {
    
    this._ubicacionService.getAll().subscribe({

      next: (data: UbicacionGeoResponse[]) => {
        this.ubicacions = data;
      },
      error: (err) => {
        console.log("error ", err);
      },
      complete: () => {
        //hare algo
      },

    });
  }


  crearubicacion(template: TemplateRef<any>) {
    this.ubicacionSelected = new UbicacionGeoResponse();
    this.titleModal = "NUEVO ubicacion";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }


  editarubicacion(template: TemplateRef<any>, ubicacion: UbicacionGeoResponse) {
    this.ubicacionSelected = ubicacion;
    this.titleModal = "EDITAR ubicacion";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.listarubicacions();
    }

  }


  eliminarRegistro(id: number) {
    let result = confirm("¿Está seguro de eliminar el registro?");

    if (result) {
      this._ubicacionService.delete(id).subscribe({
        next: (data: number) => {
          alert("Registro eliminado de forma correcta");
        },
        error: () => { },
        complete: () => {
          this.listarubicacions();
        }
      });
    }

  }

  filtrar() {
    
    let valueForm = this.myFormFilter.getRawValue();
    this.request.filtros.push({ name: "Direccion", value: valueForm.Direccion });
    this.request.filtros.push({ name: "Distrito", value: valueForm.Distrito });
    this.request.filtros.push({ name: "Provincia", value: valueForm.Provincia });
    this.request.filtros.push({ name: "Departamento", value: valueForm.Departamento });
    this.request.filtros.push({ name: "Ubicacion", value: valueForm.Ubicacion });
    this._ubicacionService.genericFilter(this.request).subscribe({
      next: (data: GenericFilterResponse<UbicacionGeoResponse>) => {
        console.log(data);
        this.ubicacions = data.lista;
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
    this.listarubicacions();
  }
}
