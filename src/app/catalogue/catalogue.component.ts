import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
declare var $: any;
import 'turn.js';
import { ImgproService } from '../services/imgpro.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  filenames: Array<string>
  hrefZip: string = ""
  
  constructor(
    private router: Router,
    private imgService: ImgproService,
    private dom: DomSanitizer
  ) {
    this.filenames = JSON.parse(this.router.getCurrentNavigation().extras.state.filenames);
    this.getImagesZip();
  }

  ngOnInit(): void {
    /*$(document).ready(function () {
      $('#magazine').turn({
        width: 1000,
        height: 500,
        autoCenter: true
        // ... plus any extra option you need
      });
    });*/
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      $('#magazine').turn('next');
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      $('#magazine').turn('previous');
    }
  }

  getImagesZip() {
    this.imgService.compress({ names: this.filenames}).subscribe(response => {
      console.log(response);
      this.hrefZip = `http://localhost:3000/static/${response.filename}`;
    })
  }

}

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}