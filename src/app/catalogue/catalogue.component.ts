import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
import { ImgproService } from '../services/imgpro.service';
declare var jsPDF:any;
import { ImageResponse } from '../types/response/ImageResponse';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  images: Array<ImageResponse>
  filenames: Array<string>
  data: DataCatalogue
  hrefZip: string = ""
  
  constructor(
    private router: Router,
    private imgService: ImgproService
  ) {
    this.images = JSON.parse(this.router.getCurrentNavigation().extras.state.images);
    this.filenames = JSON.parse(this.router.getCurrentNavigation().extras.state.filenames);
    this.data = JSON.parse(this.router.getCurrentNavigation().extras.state.data);
    console.log(this.data);
    this.getImagesZip();
  }

  ngOnInit(): void {
    let self = this;
    $(document).ready(function () {      
      self.generateFlipBok();
      $('#flipbook').turn({
        width: 1000,
        height: 600,
        autoCenter: true
      })
    });
  }

  generateFlipBok() {
    let _length = this.data.product.length;
    let data = $('#flipbook').html().split(" ");
    let attr = "";
    data.forEach((d: string) => { d.includes("_ngcontent")? attr = d : "" })
    for (let index = 0; index < _length; index += 3) {
      let row1 = '', row2 = '', row3 = '';
      if(index < _length){
        row1 = `
          <div ${attr} class="row">
            <div ${attr} class="col-6">
              <img ${attr} src="${'data:image/jpg;base64,' + this.images[index].base64}" class="img-fluid image">
            </div>
            <div ${attr} class="col-4">
              <h3 ${attr} class="title">${this.data.product[index].title}</h3>
              <p ${attr} class="description">${this.data.product[index].description}</p>
            </div>
            <div ${attr} class="col-2">
              <span ${attr} class="price">${this.data.product[index].price}</span>
            </div>
          </div>`;
      }
      if((index + 1) < _length){
        row2 = `
          <div class="row">
            <div class="col-6">
              <img src="${'data:image/jpg;base64,' + this.images[index + 1].base64}" class="img-fluid image">
            </div>
            <div class="col-4">
              <h3 class="title">${this.data.product[index + 1].title}</h3>
              <p class="description">${this.data.product[index + 1].description}</p>
            </div>
            <div class="col-2">
              <span class="price">${this.data.product[index + 1].price}</span>
            </div>
          </div>`;
      }
      if((index + 2) < _length) {
        row3 = `
          <div ${attr} class="row">
            <div ${attr} class="col-6">
              <img ${attr} src="${'data:image/jpg;base64,' + this.images[index + 2].base64}" class="img-fluid image">
            </div>
            <div ${attr} class="col-4">
              <h3 ${attr} class="title">${this.data.product[index + 2].title}</h3>
              <p ${attr} class="description">${this.data.product[index + 2].description}</p>
            </div>
            <div ${attr} class="col-2">
              <span ${attr} class="price">${this.data.product[index + 2].price}</span>
            </div>
          </div>`;
      }
      $('#flipbook').append(`<div ${attr}>${row1 + row2 + row3}</div>`);
    }
    //$('#flipbook').append(`<div></div>`);
    //$('#flipbook').append(`<div class="hard"></div>`);
    //$('#flipbook').append(`<div class="hard"></div>`);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      $('#flipbook').turn('next');
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      $('#flipbook').turn('previous');
    }
  }

  getImagesZip() {
    this.imgService.compress({ names: this.filenames}).subscribe(response => {
      console.log(response);
      this.hrefZip = `http://localhost:3000/static/${response.filename}`;
    })
  }

  downloadPdf() {
    const doc = new jsPDF();
    let y = 0;
    let x = 0;
    this.data.product.forEach((product, index) => {
      var imgData = 'data:image/jpg;base64,' + this.images[index].base64;
      doc.addImage(imgData, 'JPEG', 10, 10 + x, 100, 120);
      doc.text(product.title, 120, 10 + y + x);
      doc.text(product.description, 120, 20 + y + x);
      doc.setDrawColor(0);
      doc.setFillColor(255, 159, 126);
      doc.rect(120, 23 + y + x, 30, 10, 'FD');
      doc.setDrawColor(0);
      doc.text(`S/ ${product.price.toFixed(2)}`, 125, 30 + y + x);
      y += 20;
      x += 120;
    })    
    doc.save(`${Date.now()}_catalogue.pdf`);
  }

}

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

export interface DataCatalogue {
  product: Array<Product>
}
export interface Product {
  title: string,
  description: string,
  price: number
}