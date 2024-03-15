import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './pages/welcome/welcome.component';
import { authGuard } from './guard/auth.guard';


const routes: Routes = [


  //se llama ruteo simple
  {
    path: '', component: WelcomeComponent
  },


  //vamos a hacer uso de un lazy loading
  {
    path: 'auth', loadChildren: () => import("./modules/auth/auth.module").then(x => x.AuthModule)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () => import("./modules/template/template.module").then(x => x.TemplateModule)

  },


   //{
   //  path: '**', redirectTo: '/404'
   //}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
