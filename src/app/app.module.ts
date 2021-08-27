import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { UploadComponent } from './upload/upload.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DescribeComponent } from './describe/describe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { HttpClientModule } from '@angular/common/http';

import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    UploadComponent,
    DescribeComponent,
    CatalogueComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    NgxDropzoneModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
