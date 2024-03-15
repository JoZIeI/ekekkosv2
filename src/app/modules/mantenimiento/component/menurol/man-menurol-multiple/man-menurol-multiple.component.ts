import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MenuRolResponse } from '../../../models/menurol-response.module';
import { MenurolService } from '../../../services/menurol.service';

@Component({
  selector: 'app-man-menurol-multiple',
  templateUrl: './man-menurol-multiple.component.html',
  styleUrls: ['./man-menurol-multiple.component.scss']
})
export class ManMenurolMultipleComponent implements OnInit {

  form: FormGroup;
  menurolsBack: MenuRolResponse[] = [];
  constructor(
    private fb: FormBuilder,
    private _menurolService: MenurolService
  ) {
    this.form = this.fb.group({
      menurols: this.fb.array([])
    });

  }
  ngOnInit(): void {

    this._menurolService.getAll().subscribe({
      next: (data: MenuRolResponse[]) => {
        this.menurolsBack = data;

        this.menurolsBack.forEach(x => {
          let menurol = this.nuevomenurol(x);
          this.menurolsArrayForm.push(menurol);
        });


      },
      error: () => { },
      complete: () => { }
    });

  }

  get menurolsArrayForm(): FormArray { return this.form.get("menurols") as FormArray };




  addmenurol() {

    let menurol = this.nuevomenurol(new MenuRolResponse())
    this.menurolsArrayForm.push(menurol);
  }

  nuevomenurol(menurol: MenuRolResponse) {
    return this.fb.group({
      // id: [{ value: menurol.idmenurol, disabled: true }, [Validators.required]],
      // descripcion: [menurol.descripcion, [Validators.required]],
      // funcion: [menurol.funcion, [Validators.required]],
      // idEstado: [menurol.idEstado, [Validators.required]],
    })
  }

  removemenurol(i: number) {
    this.menurolsArrayForm.removeAt(i)
  }

  save() {
    console.log(this.form.getRawValue());

  }

}