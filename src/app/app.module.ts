import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { APP_ROUTES } from './app.routes';
import { PagesModule } from './pages/pages.module';
import { PagesComponent } from './pages/pages.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PagesComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
