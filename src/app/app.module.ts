import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AuthInterceptor } from './service/auth.interceptor';

import { MantenimientoModule } from './modules/mantenimiento/mantenimiento.module';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    /**
     * TODO: PARA USAR DOBLE BINDIG / USO DE FORMULARIOS
     */
    FormsModule,
    HttpClientModule,

  ],
  
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
