import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { APP_ROUTES } from './app.routes';
import { PagesModule } from './pages/pages.module';
import { FooterComponent } from './components/footer/footer.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ServiceService } from './services/service.service';
import { HttpClientModule } from '@angular/common/http';
import { MsgBoxService } from './components/msg-box/msg-box.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PagenotfoundComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    HttpClientModule
  ],
  providers: [ServiceService, MsgBoxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
