import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductoCategoriumResponse } from '../../../models/productocategorium-response.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericFilterRequest } from '../../../models/generic-filter-request.model';
import { Router } from '@angular/router';
import { ProductocategoriumService } from '../../../services/productocategorium.service';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { GenericFilterResponse } from '../../../models/generec-filter-response.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-man-categoria-list',
  templateUrl: './man-categoria-list.component.html',
  styleUrls: ['./man-categoria-list.component.scss']
})
export class ManCategoriaListComponent implements OnInit {


  modalRef?: BsModalRef;
  categorias: ProductoCategoriumResponse[] = [];
  categoriaSelected: ProductoCategoriumResponse = new ProductoCategoriumResponse();
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
    private _categoriaService: ProductocategoriumService,
  ) {
    //nuestro formulario categoria request
    this.myFormFilter = this.fb.group({
      Descripcion: ["", []],
      
    });
  }

  /**
   * FIXME: ES EL PRIMER EVENTO QUE EJECUTA EL COMPONENTE
   * */
  ngOnInit(): void {

    this.filtrar();

  }

  listarcategorias() {
    
    this._categoriaService.getAll().subscribe({

      next: (data: ProductoCategoriumResponse[]) => {
        this.categorias = data;
      },
      error: (err) => {
        console.log("error ", err);
      },
      complete: () => {
        //hare algo
      },

    });
  }


  crearcategoria(template: TemplateRef<any>) {
    this.categoriaSelected = new ProductoCategoriumResponse();
    this.titleModal = "NUEVO categoria";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }


  editarcategoria(template: TemplateRef<any>, categoria: ProductoCategoriumResponse) {
    this.categoriaSelected = categoria;
    this.titleModal = "EDITAR categoria";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.listarcategorias();
    }

  }


  eliminarRegistro(id: number) {
    let result = confirm("¿Está seguro de eliminar el registro?");

    if (result) {
      this._categoriaService.delete(id).subscribe({
        next: (data: number) => {
          alert("Registro eliminado de forma correcta");
        },
        error: () => { },
        complete: () => {
          this.listarcategorias();
        }
      });
    }

  }

  filtrar() {

    let valueForm = this.myFormFilter.getRawValue();
    this.request.filtros.push({ name: "Descripcion", value: valueForm.Descripcion });
    this._categoriaService.genericFilter(this.request).subscribe({
      next: (data: GenericFilterResponse<ProductoCategoriumResponse>) => {
        console.log(data);
        this.categorias = data.lista;
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
