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
import { ComboCategoriasComponent } from '../components/combo-categorias/combo-categorias.component';
import { EditCategoryComponent } from './categorias/edit-category.component';
import { EditManualComponent } from './manuales/edit-manual.component';
import { MsgBoxComponent } from '../components/msg-box/msg-box.component';
import { NormasComponent } from './normas/normas.component';
import { MsgBoxService } from '../components/msg-box/msg-box.service';
import { ComboComponent } from '../components/combo/combo.component';
import { NewNormaComponent } from './normas/new-norma.component';
import { FormNormaComponent } from './normas/form-norma.component';
import { EditNormaComponent } from './normas/edit-norma.component';
import { HomeComponent } from './home/home.component';
import { CatologoComponent } from './catologo/catologo.component';
import { NoticeComponent } from './notices/notice.component';
import { NewNoticeComponent } from './notices/new-notice.component';
import { FormNoticeComponent } from './notices/form-notice.component';
import { EditNoticeComponent } from './notices/edit-notice.component';


@NgModule({
   declarations: [
     CategoriasComponent,
     PagesComponent,
     NewCategoriaComponent,
     FormCategoriaComponent,
     ManualesComponent,
     FormManualComponent,
     NewManualComponent,
     EditCategoryComponent,
     ComboCategoriasComponent,
     EditManualComponent,
     MsgBoxComponent,
     NormasComponent,
     ComboComponent,
     NewNormaComponent,
     EditNormaComponent,
     FormNormaComponent,
     HomeComponent,
     CatologoComponent,
     NoticeComponent,
     NewNoticeComponent,
     FormNoticeComponent,
     EditNoticeComponent

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
   ], 
   providers: [
     MsgBoxService
   ]


})

export class PagesModule { }
