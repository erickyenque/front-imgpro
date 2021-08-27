import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { DescribeComponent } from './describe/describe.component';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  {
    path: "home", component: HomeComponent
  },
  {
    path: "upload", component: UploadComponent
  },
  {
    path: "describe", component: DescribeComponent
  },
  {
    path: "catalogue", component: CatalogueComponent
  },
  {
    path: "**", redirectTo: "home"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
