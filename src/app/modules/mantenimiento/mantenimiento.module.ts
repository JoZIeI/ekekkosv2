import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
// import { MantRolLisComponent } from './component/RolAdmin/mant-rol-lis/mant-rol-lis.component';
// import { MantRolMultipleComponent } from './component/RolAdmin/mant-rol-multiple/mant-rol-multiple.component';
// import { MantRolRegisterComponent } from './component/RolAdmin/mant-rol-register/mant-rol-register.component';
import { SharedModule } from '../shared/shared.module';
import { ManMesaListComponent } from './component/mesa/man-mesa-list/man-mesa-list.component';
import { ManMesaRegisterComponent } from './component/mesa/man-mesa-register/man-mesa-register.component';
import { ManMesaMultipleComponent } from './component/mesa/man-mesa-multiple/man-mesa-multiple.component';
import { ManProductoListComponent } from './component/producto/man-producto-list/man-producto-list.component';
import { ManProductoMultipleComponent } from './component/producto/man-producto-multiple/man-producto-multiple.component';
import { ManProductoRegisterComponent } from './component/producto/man-producto-register/man-producto-register.component';
import { ManCargoListComponent } from './component/cargo/man-cargo-list/man-cargo-list.component';
import { ManCargoMultipleComponent } from './component/cargo/man-cargo-multiple/man-cargo-multiple.component';
import { ManCargoRegisterComponent } from './component/cargo/man-cargo-register/man-cargo-register.component';
import { ManColaboradorListComponent } from './component/colaborador/man-colaborador-list/man-colaborador-list.component';
import { ManColaboradorMultipleComponent } from './component/colaborador/man-colaborador-multiple/man-colaborador-multiple.component';
import { ManColaboradorRegisterComponent } from './component/colaborador/man-colaborador-register/man-colaborador-register.component';
import { ManDetallepedidoListComponent } from './component/detallepedido/man-detallepedido-list/man-detallepedido-list.component';
import { ManDetallepedidoMultipleComponent } from './component/detallepedido/man-detallepedido-multiple/man-detallepedido-multiple.component';
import { ManDetallepedidoRegisterComponent } from './component/detallepedido/man-detallepedido-register/man-detallepedido-register.component';
import { ManMenuListComponent } from './component/menu/man-menu-list/man-menu-list.component';
import { ManMenuMultipleComponent } from './component/menu/man-menu-multiple/man-menu-multiple.component';
import { ManMenuRegisterComponent } from './component/menu/man-menu-register/man-menu-register.component';
import { ManMenurolMultipleComponent } from './component/menurol/man-menurol-multiple/man-menurol-multiple.component';
import { ManMenurolRegisterComponent } from './component/menurol/man-menurol-register/man-menurol-register.component';
import { ManMetodopagoListComponent } from './component/metodopago/man-metodopago-list/man-metodopago-list.component';
import { ManMetodopagoMultipleComponent } from './component/metodopago/man-metodopago-multiple/man-metodopago-multiple.component';
import { ManMetodopagoRegisterComponent } from './component/metodopago/man-metodopago-register/man-metodopago-register.component';
import { ManPedidoListComponent } from './component/pedido/man-pedido-list/man-pedido-list.component';
import { ManPedidoMultipleComponent } from './component/pedido/man-pedido-multiple/man-pedido-multiple.component';
import { ManPedidoRegisterComponent } from './component/pedido/man-pedido-register/man-pedido-register.component';
import { ManPersonageneroMultipleComponent } from './component/personagenero/man-personagenero-multiple/man-personagenero-multiple.component';
import { ManPersonageneroRegisterComponent } from './component/personagenero/man-personagenero-register/man-personagenero-register.component';
import { ManPersonaListComponent } from './component/persona/man-persona-list/man-persona-list.component';
import { ManPersonaMultipleComponent } from './component/persona/man-persona-multiple/man-persona-multiple.component';
import { ManPersonaRegisterComponent } from './component/persona/man-persona-register/man-persona-register.component';
import { ManPersonatipodocumentoListComponent } from './component/personatipodocumento/man-personatipodocumento-list/man-personatipodocumento-list.component';
import { ManPersonatipodocumentoMultipleComponent } from './component/personatipodocumento/man-personatipodocumento-multiple/man-personatipodocumento-multiple.component';
import { ManPersonatipodocumentoRegisterComponent } from './component/personatipodocumento/man-personatipodocumento-register/man-personatipodocumento-register.component';
import { ManPersonatipoListComponent } from './component/personatipo/man-personatipo-list/man-personatipo-list.component';
import { ManPersonatipoMultipleComponent } from './component/personatipo/man-personatipo-multiple/man-personatipo-multiple.component';
import { ManPersonatipoRegisterComponent } from './component/personatipo/man-personatipo-register/man-personatipo-register.component';
import { ManCategoriaListComponent } from './component/categoria/man-categoria-list/man-categoria-list.component';
import { ManCategoriaMultipleComponent } from './component/categoria/man-categoria-multiple/man-categoria-multiple.component';
import { ManCategoriaRegisterComponent } from './component/categoria/man-categoria-register/man-categoria-register.component';
import { ManRolListComponent } from './component/rol/man-rol-list/man-rol-list.component';
import { ManRolMultipleComponent } from './component/rol/man-rol-multiple/man-rol-multiple.component';
import { ManRolRegisterComponent } from './component/rol/man-rol-register/man-rol-register.component';
import { ManUbicaciongeoListComponent } from './component/ubicaciongeo/man-ubicaciongeo-list/man-ubicaciongeo-list.component';
import { ManUbicaciongeoMultipleComponent } from './component/ubicaciongeo/man-ubicaciongeo-multiple/man-ubicaciongeo-multiple.component';
import { ManUbicaciongeoRegisterComponent } from './component/ubicaciongeo/man-ubicaciongeo-register/man-ubicaciongeo-register.component';
import { ManUsuarioListComponent } from './component/usuario/man-usuario-list/man-usuario-list.component';
import { ManUsuarioMultipleComponent } from './component/usuario/man-usuario-multiple/man-usuario-multiple.component';
import { ManUsuarioRegisterComponent } from './component/usuario/man-usuario-register/man-usuario-register.component';
import { ManMenurolListComponent } from './component/menurol/man-menurol-list/man-menurol-list.component';
import { ManPersonageneroListComponent } from './component/personagenero/man-personagenero-list/man-personagenero-list.component';

@NgModule({
  declarations: [
    // MantRolLisComponent,
    // MantRolMultipleComponent,
    // MantRolRegisterComponent,

    ManMesaListComponent,
    ManMesaRegisterComponent,
    ManMesaMultipleComponent,

    ManProductoListComponent,
    ManProductoMultipleComponent,
    ManProductoRegisterComponent,
    ManCargoListComponent,
    ManCargoMultipleComponent,
    ManCargoRegisterComponent,
    ManColaboradorListComponent,
    ManColaboradorMultipleComponent,
    ManColaboradorRegisterComponent,
    ManDetallepedidoListComponent,
    ManDetallepedidoMultipleComponent,
    ManDetallepedidoRegisterComponent,
    ManMenuListComponent,
    ManMenuMultipleComponent,
    ManMenuRegisterComponent,
    ManMenurolListComponent,
    ManMenurolMultipleComponent,
    ManMenurolRegisterComponent,
    ManMetodopagoListComponent,
    ManMetodopagoMultipleComponent,
    ManMetodopagoRegisterComponent,
    ManPedidoListComponent,
    ManPedidoMultipleComponent,
    ManPedidoRegisterComponent,
    ManPersonageneroListComponent,
    ManPersonageneroRegisterComponent,
    ManPersonageneroMultipleComponent,
    ManPersonageneroRegisterComponent,
    ManPersonaListComponent,
    ManPersonaMultipleComponent,
    ManPersonaRegisterComponent,
    ManPersonatipodocumentoListComponent,
    ManPersonatipodocumentoMultipleComponent,
    ManPersonatipodocumentoRegisterComponent,
    ManPersonatipoListComponent,
    ManPersonatipoMultipleComponent,
    ManPersonatipoRegisterComponent,
    ManCategoriaListComponent,
    ManCategoriaMultipleComponent,
    ManCategoriaRegisterComponent,
    ManRolListComponent,
    ManRolMultipleComponent,
    ManRolRegisterComponent,
    ManUbicaciongeoListComponent,
    ManUbicaciongeoMultipleComponent,
    ManUbicaciongeoRegisterComponent,
    ManUsuarioListComponent,
    ManUsuarioMultipleComponent,
    ManUsuarioRegisterComponent
    
  ],
  imports: [
    CommonModule,
    MantenimientoRoutingModule,
    SharedModule
  ]
})
export class MantenimientoModule { }
