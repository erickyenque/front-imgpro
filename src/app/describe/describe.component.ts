import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ImgproService } from '../services/imgpro.service';
import { ImageResponse } from '../types/response/ImageResponse';

import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-describe',
  templateUrl: './describe.component.html',
  styleUrls: ['./describe.component.css']
})
export class DescribeComponent implements OnInit {

  filenames: Array<string>
  form: FormGroup;
  images: Array<ImageResponse>;
  loadImage = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private imgService: ImgproService,
    private spinner: NgxSpinnerService
  ) { 
    this.filenames = JSON.parse(this.router.getCurrentNavigation().extras.state.filenames);
  }

  ngOnInit(): void {
    this.crearFormulario();
    this.filenames.forEach(f => {
      this.addProduct();
    })
    this.getImage();
  }

  crearFormulario() {
    this.form = this.fb.group({
      product: this.fb.array([])
    });
  }

  get product(): FormArray {
    return this.form.get('product') as FormArray;
  }

  addProduct() {
    const productGroup = this.fb.group({
      title: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl('')
    });
  
    this.product.push(productGroup);
  }

  onSubmit() {
    console.log(this.form.getRawValue());
  }

  getImage() { 
    this.loadImage = false; 
    this.spinner.show();  
    const request = this.filenames.map(f => this.imgService.getImage(f));
    forkJoin(request).subscribe(resp => {
      console.log(resp);
      this.images = resp;
      this.loadImage = true;  
      this.spinner.hide();
    }, error => console.log(error));
  }

  generateImage(base64: string) {
    return 'data:image/jpg;base64,' + base64;
  }

  createCatalogue() {
    this.router.navigate(['/catalogue'], { state: { filenames: JSON.stringify(this.filenames) }});
  }
}
