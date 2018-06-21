import { Routes, RouterModule } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { PagesComponent } from './pages.component';
import { NewCategoriaComponent } from './categorias/new-categoria.component';
import { ManualesComponent } from './manuales/manuales.component';
import { NewManualComponent } from './manuales/new-manual.component';
import { EditCategoryComponent } from './categorias/edit-category.component';
import { EditManualComponent } from './manuales/edit-manual.component';
import { NormasComponent } from './normas/normas.component';
import { NewNormaComponent } from './normas/new-norma.component';
import { EditNormaComponent } from './normas/edit-norma.component';
import { HomeComponent } from './home/home.component';
import { CatologoComponent } from './catologo/catologo.component';
import { NewNoticeComponent } from './notices/new-notice.component';
import { NoticeComponent } from './notices/notice.component';
import { EditNoticeComponent } from './notices/edit-notice.component';
import { UserComponent } from './users/user.component';
import { NewUserComponent } from './users/new-user.component';
import { EditUserComponent } from './users/edit-user.component';





const app_pages_routes: Routes = [
    {path: '', component: PagesComponent,
      children: [
        {path: 'categorias', component: CategoriasComponent}, 
        {path: 'nuevaCategoria', component: NewCategoriaComponent},
        {path: 'editCategoria/:id', component: EditCategoryComponent},
        {path: 'manuales', component: ManualesComponent},
        {path: 'nuevoManual', component: NewManualComponent},
        {path: 'editarManual/:id', component: EditManualComponent},
        {path: 'editarNorma/:id', component: EditNormaComponent},
        {path: 'normas', component: NormasComponent},
        {path: 'nuevaNorma', component: NewNormaComponent},
        {path: 'home', component: HomeComponent},
        {path: 'notices', component: NoticeComponent},
        {path: 'newNotice', component: NewNoticeComponent},
        {path: 'editNotice/:id', component: EditNoticeComponent},
        {path: 'catalogo', component: CatologoComponent },
        {path: 'users', component: UserComponent },
        {path: 'newUser', component: NewUserComponent },
        {path: 'editUser/:id', component: EditUserComponent },
        {path: '', component: HomeComponent }
        
      ]     
    }
]; 
    
export const PAGES_ROUTES = RouterModule.forChild(app_pages_routes);    

