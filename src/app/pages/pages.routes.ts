import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';





const app_pages_routes:Routes = [
    {path: '**', component:PagenotfoundComponent} 
]; 
    
export const APP_ROUTES_PAGES = RouterModule.forChild(app_pages_routes);    

