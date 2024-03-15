import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericFilterRequest } from 'src/app/Models/generic-filter-request.model';
import { Router } from '@angular/router';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { ProductoResponse } from '../../../models/producto-response.model';
import { ProductoService } from '../../../services/producto.service';
import { GenericFilterResponse } from '../../../models/generec-filter-response.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-man-producto-list',
  templateUrl: './man-producto-list.component.html',
  styleUrls: ['./man-producto-list.component.scss']
})
export class ManProductoListComponent implements OnInit {

  modalRef?: BsModalRef;
  productos: ProductoResponse[] = [];
  productoSelected: ProductoResponse = new ProductoResponse();
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
    private _productoService: ProductoService,
  ) {
    //nuestro formulario producto request
    this.myFormFilter = this.fb.group({
      Nombre: ["", []],
      Descripcion: ["", []],
      Stock: ["", []],
      Precio: ["", []],     
    });
  }

  /**
   * FIXME: ES EL PRIMER EVENTO QUE EJECUTA EL COMPONENTE
   * */
  ngOnInit(): void {

    this.filtrar();

  }

  listarproductos() {
    
    this._productoService.getAll().subscribe({

      next: (data: ProductoResponse[]) => {
        this.productos = data;
      },
      error: (err) => {
        console.log("error ", err);
      },
      complete: () => {
        //hare algo
      },

    });
  }


  crearproducto(template: TemplateRef<any>) {
    this.productoSelected = new ProductoResponse();
    this.titleModal = "NUEVO producto";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }


  editarproducto(template: TemplateRef<any>, producto: ProductoResponse) {
    this.productoSelected = producto;
    this.titleModal = "EDITAR producto";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.listarproductos();
    }

  }


  eliminarRegistro(id: number) {
    let result = confirm("¿Está seguro de eliminar el registro?");

    if (result) {
      this._productoService.delete(id).subscribe({
        next: (data: number) => {
          alert("Registro eliminado de forma correcta");
        },
        error: () => { },
        complete: () => {
          this.listarproductos();
        }
      });
    }

  }

  filtrar() {
    debugger
    let valueForm = this.myFormFilter.getRawValue();
    this.request.filtros.push({ name: "Nombre", value: valueForm.Nombre });
    this.request.filtros.push({ name: "Descripcion", value: valueForm.Descripcion });
    this.request.filtros.push({ name: "Stock", value: valueForm.Stock });
    this.request.filtros.push({ name: "Precio", value: valueForm.Stock });
    this._productoService.genericFilter(this.request).subscribe({
      next: (data: GenericFilterResponse<ProductoResponse>) => {
        console.log(data);
        this.productos = data.lista;
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



