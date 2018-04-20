import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';
import { CategoriasComponent } from './categorias/categorias.component';
import { PagesComponent } from './pages.component';
import { NewCategoriaComponent } from './categorias/new-categoria.component';
import { FormCategoriaComponent } from './categorias/form-categoria.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManualesComponent } from './manuales/manuales.component';
import { FormManualComponent } from './manuales/form-manual.component';
import { NewManualComponent } from './manuales/new-manual.component';

@NgModule({
   declarations: [
     CategoriasComponent,
     PagesComponent,
     NewCategoriaComponent,
     FormCategoriaComponent,
     ManualesComponent,
     FormManualComponent,
     NewManualComponent
   ],
   exports: [
      CategoriasComponent,
      PagesComponent
   ],
   imports: [
     BrowserModule,
     PAGES_ROUTES,
     FormsModule, 
     ReactiveFormsModule
   ]


})

export class PagesModule { }
