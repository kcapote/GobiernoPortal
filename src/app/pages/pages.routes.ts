import { Routes, RouterModule } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { PagesComponent } from './pages.component';
import { NewCategoriaComponent } from './categorias/new-categoria.component';
import { ManualesComponent } from './manuales/manuales.component';
import { NewManualComponent } from './manuales/new-manual.component';
import { EditCategoryComponent } from './categorias/edit-category.component';
import { EditManualComponent } from './manuales/edit-manual.component';
import { NormasComponent } from './normas/normas.component';


const app_pages_routes: Routes = [
    {path: '', component: PagesComponent,
      children: [
        {path: 'categorias', component: CategoriasComponent}, 
        {path: 'nuevaCategoria', component: NewCategoriaComponent},
        {path: 'editCategoria/:id', component: EditCategoryComponent},
        {path: 'manuales', component: ManualesComponent},
        {path: 'nuevoManual', component: NewManualComponent},
        {path: 'editarManual/:id', component: EditManualComponent},
        {path: 'normas', component: NormasComponent}
        
      ]     
    }
]; 
    
export const PAGES_ROUTES = RouterModule.forChild(app_pages_routes);    

