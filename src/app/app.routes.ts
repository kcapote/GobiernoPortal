import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { PagesComponent } from './pages/pages.component';





const app_routes:Routes = [
    {path: '',component:PagesComponent }  
    
]; 
    
export const APP_ROUTES = RouterModule.forRoot(app_routes);    

