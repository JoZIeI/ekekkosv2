import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { MantRolLisComponent } from './component/RolAdmin/mant-rol-lis/mant-rol-lis.component';
// import { MantRolMultipleComponent } from './component/RolAdmin/mant-rol-multiple/mant-rol-multiple.component';
import { ManMesaListComponent } from './component/mesa/man-mesa-list/man-mesa-list.component';
import { ManProductoListComponent } from './component/producto/man-producto-list/man-producto-list.component';
import { ManCargoListComponent } from './component/cargo/man-cargo-list/man-cargo-list.component';
import { ManDetallepedidoListComponent } from './component/detallepedido/man-detallepedido-list/man-detallepedido-list.component';
import { ManMenuListComponent } from './component/menu/man-menu-list/man-menu-list.component';
import { ManMenurolListComponent } from './component/menurol/man-menurol-list/man-menurol-list.component';
import { ManMetodopagoListComponent } from './component/metodopago/man-metodopago-list/man-metodopago-list.component';
import { ManPedidoListComponent } from './component/pedido/man-pedido-list/man-pedido-list.component';
import { ManPersonaListComponent } from './component/persona/man-persona-list/man-persona-list.component';
import { ManPersonatipoListComponent } from './component/personatipo/man-personatipo-list/man-personatipo-list.component';
import { ManPersonatipodocumentoListComponent } from './component/personatipodocumento/man-personatipodocumento-list/man-personatipodocumento-list.component';
import { ManCategoriaListComponent } from './component/categoria/man-categoria-list/man-categoria-list.component';
import { ManRolListComponent } from './component/rol/man-rol-list/man-rol-list.component';
import { ManUbicaciongeoListComponent } from './component/ubicaciongeo/man-ubicaciongeo-list/man-ubicaciongeo-list.component';
import { ManUsuarioListComponent } from './component/usuario/man-usuario-list/man-usuario-list.component';
import { ManColaboradorListComponent } from './component/colaborador/man-colaborador-list/man-colaborador-list.component';
import { ManPersonageneroListComponent } from './component/personagenero/man-personagenero-list/man-personagenero-list.component';

const routes: Routes = [


  // {
  //   path: 'RolAdmin',component:MantRolLisComponent
  // },
  // {
  //   path: 'RolAdmin', component: MantOrigenRegisterComponent
  // },
  // {
  //   path: 'RolAdmin',component:MantRolMultipleComponent
  // },
  
  {
    path: 'mesa', component: ManMesaListComponent
  },
  
  {
    path: 'producto', component: ManProductoListComponent
  },

  {
    path: 'cargo', component: ManCargoListComponent
  },

  {
    path: 'categoria', component: ManCategoriaListComponent
  },

  {
    path: 'colaborador', component: ManColaboradorListComponent
  },

  {
    path: 'detallepedido', component: ManDetallepedidoListComponent
  },

  {
    path: 'menu', component: ManMenuListComponent
  },

  {
    path: 'menurol', component: ManMenurolListComponent
  },

  {
    path: 'metodopago', component: ManMetodopagoListComponent
  },

  {
    path: 'pedido', component: ManPedidoListComponent
  },

  {
    path: 'persona', component: ManPersonaListComponent
  },

  {
    path: 'personagenero', component: ManPersonageneroListComponent
  },

  {
    path: 'personatipo', component: ManPersonatipoListComponent
  },

  {
    path: 'tipodocumento', component: ManPersonatipodocumentoListComponent
  },

  {
    path: 'rol', component: ManRolListComponent
  },

  {
    path: 'ubicacion', component: ManUbicaciongeoListComponent
  },

  {
    path: 'usuario', component: ManUsuarioListComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientoRoutingModule { }
