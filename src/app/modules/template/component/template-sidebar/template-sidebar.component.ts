import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-sidebar',
  templateUrl: './template-sidebar.component.html',
  styleUrls: ['./template-sidebar.component.scss']
})
export class TemplateSidebarComponent implements OnInit {
  menu: any[] = [];
  ngOnInit(): void {


    this.rellenarMenu();

  }

  rellenarMenu() {
    let rolId = sessionStorage.getItem("idRol");
    
    switch (rolId) {
      //TODO: CUANDO ES ADMINISTRADOR
      case "1":
        this.menu = [
          {
            name: "Mantenimiento", target: "TargerMantenimiento", icon: "fas fa-trash",
            subMenu: [
              { name: "RolAdmin", url: "mantenimiento/RolAdmin", icon: "fas fa-card" },
              // { name: "persona", url: "mantenimiento/ruta2", icon: "fas fa-users" },
              // { name: "origen", url: "mantenimiento/ruta3", icon: "fas fa-dashboard" },
              // { name: "usuario", url: "mantenimiento/ruta4", icon: "fas fa-users" },
              // { name: "tipo documento", url: "mantenimiento/ruta5", icon: "fas fa-file" },
            ]
          },
          // {
          //   name: "Atencion", target: "TargerAtencion", icon: "fas fa-edit",
          //   subMenu: [
          //     { name: "atención 1", url: "mantenimiento/ruta6", icon: "fas fa-card" },
          //     { name: "atención 2", url: "mantenimiento/ruta7", icon: "fas fa-users" },
          //     { name: "atención 3", url: "mantenimiento/ruta8", icon: "fas fa-dashboard" },
          //     { name: "atención 4", url: "mantenimiento/ruta9", icon: "fas fa-users" },
          //     { name: "atención 5", url: "mantenimiento/ruta10", icon: "fas fa-file" },
          //   ]
          // }
        ];
        break;
      case "2": break;
      case "3": break;
      case "4": break;
      case "5": break;
      case "6": break;
    }


  }






}
