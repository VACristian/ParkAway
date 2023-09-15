import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DataHandlerService } from './services/data-handler.service';
import { PricingComponent } from './pricing/pricing.component';
import { QRCodeModule } from 'angularx-qrcode';
import { CreateTichetComponent } from './create-tichet/create-tichet.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthInterceptor } from 'src/authentification/auth.interceptor';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {NgbDropdown, NgbDropdownModule, NgbModule, NgbTimepicker, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapsModule } from '@angular/google-maps';
import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { FaqComponent } from './faq/faq.component';
import { MytichetsComponent } from './mytichets/mytichets.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { JsonPipe } from '@angular/common';
import { ManageComponent } from './manage/manage.component';











@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    PricingComponent,
    CreateTichetComponent,
    AboutComponent,
    FeaturesComponent,
    FaqComponent,
    MytichetsComponent,
    ManageComponent,
   
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QRCodeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgbDropdownModule,
    BrowserModule,
    GoogleMapsModule,
    PdfViewerModule,
    NgbTimepickerModule, 
    FormsModule,
    JsonPipe
 
   
  
    
  ],
  
  providers: [DataHandlerService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    
    multi: true
  }],
  
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
