import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';
import { CategoriasComponent } from './categorias/categorias.component';
import { PagesComponent } from './pages.component';
import { NewCategoriaComponent } from './categorias/new-categoria.component';
import { FormCategoriaComponent } from './categorias/form-categoria.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
   declarations: [
     CategoriasComponent,
     PagesComponent,
     NewCategoriaComponent,
     FormCategoriaComponent
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
