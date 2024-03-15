import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { PersonaTipoDocumentoResponse } from '../../../models/personatipodocumento-response.module';
import { PersonatipodocumentoService } from '../../../services/personatipodocumento.service';

@Component({
  selector: 'app-man-personatipodocumento-multiple',
  templateUrl: './man-personatipodocumento-multiple.component.html',
  styleUrls: ['./man-personatipodocumento-multiple.component.scss']
})
export class ManPersonatipodocumentoMultipleComponent implements OnInit {

  form: FormGroup;
  tipodocumentosBack: PersonaTipoDocumentoResponse[] = [];
  constructor(
    private fb: FormBuilder,
    private _tipodocumentoService: PersonatipodocumentoService
  ) {
    this.form = this.fb.group({
      tipodocumentos: this.fb.array([])
    });

  }
  ngOnInit(): void {

    this._tipodocumentoService.getAll().subscribe({
      next: (data: PersonaTipoDocumentoResponse[]) => {
        this.tipodocumentosBack = data;

        this.tipodocumentosBack.forEach(x => {
          let tipodocumento = this.nuevotipodocumento(x);
          this.tipodocumentosArrayForm.push(tipodocumento);
        });


      },
      error: () => { },
      complete: () => { }
    });

  }

  get tipodocumentosArrayForm(): FormArray { return this.form.get("tipodocumentos") as FormArray };




  addtipodocumento() {

    let tipodocumento = this.nuevotipodocumento(new PersonaTipoDocumentoResponse())
    this.tipodocumentosArrayForm.push(tipodocumento);
  }

  nuevotipodocumento(tipodocumento: PersonaTipoDocumentoResponse) {
    return this.fb.group({
      // id: [{ value: tipodocumento.idtipodocumento, disabled: true }, [Validators.required]],
      // descripcion: [tipodocumento.descripcion, [Validators.required]],
      // funcion: [tipodocumento.funcion, [Validators.required]],
      // idEstado: [tipodocumento.idEstado, [Validators.required]],
    })
  }

  removetipodocumento(i: number) {
    this.tipodocumentosArrayForm.removeAt(i)
  }

  save() {
    console.log(this.form.getRawValue());

  }

}