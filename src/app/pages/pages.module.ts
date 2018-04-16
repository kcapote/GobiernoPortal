import { NgModule } from '@angular/core';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { APP_ROUTES_PAGES } from './pages.routes';

@NgModule({
   declarations:[
       
    PagenotfoundComponent,
  
   ],
   exports:[
    PagenotfoundComponent,
    
    
   ]     


})

export class PagesModule { }