import { Component, HostListener, OnInit } from '@angular/core';
declare var $:any;
import 'turn.js';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  
  constructor() { }

  ngOnInit(): void {
    $(document).ready(function () {
      $('#magazine').turn({
        width: 1000,
        height: 500,
        autoCenter: true
        // ... plus any extra option you need
      });
    });
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

}

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}