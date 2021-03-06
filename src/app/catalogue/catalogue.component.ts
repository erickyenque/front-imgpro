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
          <div ${attr} class="row mt-4">
            <div ${attr} class="col-6">
              <img ${attr} src="${'data:image/jpg;base64,' + this.images[index].base64}" class="img-fluid image">
            </div>
            <div ${attr} class="col-4">
              <h3 ${attr} class="title">${this.data.product[index].title}</h3>
              <p ${attr} class="description">${this.data.product[index].description}</p>
            </div>
            <div ${attr} class="col-2">
              <span ${attr} class="price">S/ ${this.data.product[index].price.toFixed(2)}</span>
            </div>
          </div>`;
      }
      if((index + 1) < _length){
        row2 = `
          <div ${attr} class="row mt-4">
            <div ${attr} class="col-6">
              <img ${attr} src="${'data:image/jpg;base64,' + this.images[index + 1].base64}" class="img-fluid image">
            </div>
            <div ${attr} class="col-4">
              <h3 ${attr} class="title">${this.data.product[index + 1].title}</h3>
              <p ${attr} class="description">${this.data.product[index + 1].description}</p>
            </div>
            <div ${attr} class="col-2">
              <span ${attr} class="price">S/ ${this.data.product[index + 1].price.toFixed(2)}</span>
            </div>
          </div>`;
      }
      if((index + 2) < _length) {
        row3 = `
          <div ${attr} class="row mt-4">
            <div ${attr} class="col-6">
              <img ${attr} src="${'data:image/jpg;base64,' + this.images[index + 2].base64}" class="img-fluid image">
            </div>
            <div ${attr} class="col-4">
              <h3 ${attr} class="title">${this.data.product[index + 2].title}</h3>
              <p ${attr} class="description">${this.data.product[index + 2].description}</p>
            </div>
            <div ${attr} class="col-2">
              <span ${attr} class="price">S/ ${this.data.product[index + 2].price.toFixed(2)}</span>
            </div>
          </div>`;
      }
      $('#flipbook').append(`<div ${attr} class="pagina">${row1 + row2 + row3}</div>`);
    }
    $('#flipbook').append(`<div ${attr} class="hard"></div>`);
    $('#flipbook').append(`<div ${attr} class="hard"></div>`);
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
    let y = 10;
    let x = 0;
    
    doc.setFillColor(48, 96, 144);    
    doc.rect(0, 0, 210, 297, 'FD'); // filled red square with black borders    
    doc.setLineWidth(1);
    doc.setDrawColor(255, 255, 255);     
    doc.setFillColor(48, 96, 144);    
    doc.ellipse(60, 140, 50, 50, 'FD');
    doc.ellipse(155, 105, 40, 40, 'FD');
    doc.ellipse(150, 180, 25, 25, 'FD');

    //Agregando imagenes de portada
    var img = new Image();
    img.src = 'assets/portada1.png';
    doc.addImage(img, 'PNG', 0, 80, 120, 120);
    img.src = 'assets/portada2.png';
    doc.addImage(img, 'PNG', 120, 70, 70, 70);
    img.src = 'assets/portada3.png';
    doc.addImage(img, 'PNG', 130, 160, 40, 40);

    //Agregando estrellas a la portada
    img.src = 'assets/estrella.png';
    doc.addImage(img, 'PNG', 15, 10, 5, 5);
    doc.addImage(img, 'PNG', 80, 8, 5, 5);
    doc.addImage(img, 'PNG', 120, 10, 5, 5);
    doc.addImage(img, 'PNG', 200, 5, 5, 5);
    doc.addImage(img, 'PNG', 110, 70, 5, 5);
    doc.addImage(img, 'PNG', 10, 70, 10, 10);
    doc.addImage(img, 'PNG', 10, 180, 7, 7);
    doc.addImage(img, 'PNG', 15, 220, 5, 5);
    doc.addImage(img, 'PNG', 50, 210, 5, 5);
    doc.addImage(img, 'PNG', 80, 220, 5, 5);
    doc.addImage(img, 'PNG', 100, 210, 5, 5);
    doc.addImage(img, 'PNG', 150, 220, 10, 10);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(50);
    doc.setFontType('bold'); 
    doc.text("NOVEDADES JERZITO", 10, 40);
    doc.setFontSize(18);
    doc.setFontType('bold'); 
    doc.text("ROPA PARA NI??OS Y NI??AS", 40, 50);
    
    doc.setFillColor(255, 255, 255);    
    doc.rect(0, 257, 210, 40, 'FD'); // filled red square with black borders

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.setFontType('normal');
    img.src = 'assets/location.png';
    doc.addImage(img, 'PNG', 10, 265, 8, 8);
    doc.text("Emporio Comercial La Explanada puesto W11", 30, 272);
    img.src = 'assets/facebook.png';
    doc.addImage(img, 'PNG', 10, 280, 10, 10);
    doc.text("Novedades Jerzito", 30, 287);

    img.src = 'assets/whatsapp.png';
    doc.addImage(img, 'PNG', 110, 280, 10, 10);
    doc.text("938 483 565", 130, 287);


    doc.addPage();
    doc.setFillColor(48, 96, 144);    
    doc.rect(0, 0, 210, 297, 'FD');
    
    this.data.product.forEach((product, index) => {

      if (((index) % 3) == 0)
      {
        doc.addPage();
        img.src = 'assets/fondo.png';
        doc.addImage(img, 'PNG', 0, 0, 210, 297);
        x= 0; // Restart height position
      }

      var imgData = 'data:image/jpg;base64,' + this.images[index].base64;
      doc.addImage(imgData, 'JPEG', 10, 10 + x, 75, 75);
      doc.setFontSize(20);
      doc.setFontType('bold');
      doc.text(product.title, 120, 10 + y + x);
      doc.setFontSize(11);
      doc.setFontType('normal');
      doc.text(product.description, 120, 20 + y + x);
      doc.setFontSize(11);
      doc.setFontType('bold');
      doc.text(`S/ ${product.price.toFixed(2)}`, 170, 10 + y + x);
      x += 100;      
    })
    doc.addPage();
    doc.setFillColor(48, 96, 144);    
    doc.rect(0, 0, 210, 297, 'FD');
    doc.addPage();
    doc.setFillColor(48, 96, 144);    
    doc.rect(0, 0, 210, 297, 'FD'); // filled red square with black borders
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