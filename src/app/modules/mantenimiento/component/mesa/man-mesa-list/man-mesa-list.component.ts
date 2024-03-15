import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MesaService } from '../../../services/mesa.service';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { GenericFilterRequest } from 'src/app/Models/generic-filter-request.model';
import { GenericFilterResponse } from 'src/app/Models/generec-filter-response.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { MesaResponse } from '../../../models/mesa-response.module';

@Component({
  selector: 'app-man-mesa-list',
  templateUrl: './man-mesa-list.component.html',
  styleUrls: ['./man-mesa-list.component.scss']
})
export class ManMesaListComponent implements OnInit {


  modalRef?: BsModalRef;
  mesas: MesaResponse[] = [];
  mesaSelected: MesaResponse = new MesaResponse();
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
    private _mesaService: MesaService,
  ) {
    //nuestro formulario mesa request
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

    this.listarmesas();

  }

  listarmesas() {
    
    this._mesaService.getAll().subscribe({

      next: (data: MesaResponse[]) => {
        this.mesas = data;
      },
      error: (err) => {
        console.log("error ", err);
      },
      complete: () => {
        //hare algo
      },

    });
  }


  crearmesa(template: TemplateRef<any>) {
    this.mesaSelected = new MesaResponse();
    this.titleModal = "NUEVO mesa";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }


  editarmesa(template: TemplateRef<any>, mesa: MesaResponse) {
    this.mesaSelected = mesa;
    this.titleModal = "EDITAR mesa";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.listarmesas();
    }

  }


  eliminarRegistro(id: number) {
    let result = confirm("¿Está seguro de eliminar el registro?");

    if (result) {
      this._mesaService.delete(id).subscribe({
        next: (data: number) => {
          alert("Registro eliminado de forma correcta");
        },
        error: () => { },
        complete: () => {
          this.listarmesas();
        }
      });
    }

  }

//   filtrar() {
//     debugger
//     let valueForm = this.myFormFilter.getRawValue();
//     this.request.filtros.push({ name: "descripcion", value: valueForm.descripcion });
//     this.request.filtros.push({ name: "funcion", value: valueForm.funcion });
//     this.request.filtros.push({ name: "idEstado", value: valueForm.idEstado });
//     this._mesaService.genericFilter(this.request).subscribe({
//       next: (data: GenericFilterResponse<MesaResponse>) => {
//         console.log(data);
//         this.mesas = data.lista;
//         this.totalItems = data.totalRegistros;
//       },
//       error: () => {
//         console.log("error");
//       },
//       complete: () => {
//         console.log("completo");
//       },
//     });
//   }

//   changePage(event: PageChangedEvent) {
//     this.request.numeroPagina = event.page;
//     this.filtrar();
//   }


//   changeItemsPerPage() {
//     this.request.cantidad = this.itemsPerPage;
//     this.filtrar();
//   }
// }
}
