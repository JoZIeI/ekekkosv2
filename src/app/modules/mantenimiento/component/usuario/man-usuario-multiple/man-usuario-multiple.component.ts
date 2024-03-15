import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioResponse } from '../../../models/usuario-response.model';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-man-usuario-multiple',
  templateUrl: './man-usuario-multiple.component.html',
  styleUrls: ['./man-usuario-multiple.component.scss']
})
export class ManUsuarioMultipleComponent implements OnInit {

  form: FormGroup;
  usuariosBack: UsuarioResponse[] = [];
  constructor(
    private fb: FormBuilder,
    private _usuarioService: UsuarioService
  ) {
    this.form = this.fb.group({
      usuarios: this.fb.array([])
    });

  }
  ngOnInit(): void {

    this._usuarioService.getAll().subscribe({
      next: (data: UsuarioResponse[]) => {
        this.usuariosBack = data;

        this.usuariosBack.forEach(x => {
          let usuario = this.nuevousuario(x);
          this.usuariosArrayForm.push(usuario);
        });


      },
      error: () => { },
      complete: () => { }
    });

  }

  get usuariosArrayForm(): FormArray { return this.form.get("usuarios") as FormArray };




  addusuario() {

    let usuario = this.nuevousuario(new UsuarioResponse())
    this.usuariosArrayForm.push(usuario);
  }

  nuevousuario(usuario: UsuarioResponse) {
    return this.fb.group({
      // id: [{ value: usuario.idusuario, disabled: true }, [Validators.required]],
      // descripcion: [usuario.descripcion, [Validators.required]],
      // funcion: [usuario.funcion, [Validators.required]],
      // idEstado: [usuario.idEstado, [Validators.required]],
    })
  }

  removeusuario(i: number) {
    this.usuariosArrayForm.removeAt(i)
  }

  save() {
    console.log(this.form.getRawValue());

  }

}