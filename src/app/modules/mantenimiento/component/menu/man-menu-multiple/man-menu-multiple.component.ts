import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MenuResponse } from '../../../models/menu-response.module';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-man-menu-multiple',
  templateUrl: './man-menu-multiple.component.html',
  styleUrls: ['./man-menu-multiple.component.scss']
})
export class ManMenuMultipleComponent implements OnInit {

  form: FormGroup;
  menusBack: MenuResponse[] = [];
  constructor(
    private fb: FormBuilder,
    private _menuService: MenuService
  ) {
    this.form = this.fb.group({
      menus: this.fb.array([])
    });

  }
  ngOnInit(): void {

    this._menuService.getAll().subscribe({
      next: (data: MenuResponse[]) => {
        this.menusBack = data;

        this.menusBack.forEach(x => {
          let menu = this.nuevomenu(x);
          this.menusArrayForm.push(menu);
        });


      },
      error: () => { },
      complete: () => { }
    });

  }

  get menusArrayForm(): FormArray { return this.form.get("menus") as FormArray };




  addmenu() {

    let menu = this.nuevomenu(new MenuResponse())
    this.menusArrayForm.push(menu);
  }

  nuevomenu(menu: MenuResponse) {
    return this.fb.group({
      // id: [{ value: menu.idmenu, disabled: true }, [Validators.required]],
      // descripcion: [menu.descripcion, [Validators.required]],
      // funcion: [menu.funcion, [Validators.required]],
      // idEstado: [menu.idEstado, [Validators.required]],
    })
  }

  removemenu(i: number) {
    this.menusArrayForm.removeAt(i)
  }

  save() {
    console.log(this.form.getRawValue());

  }

}