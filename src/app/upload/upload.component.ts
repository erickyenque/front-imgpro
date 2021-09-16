import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImgproService } from '../services/imgpro.service';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(
    private imgService: ImgproService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  files: File[] = [];

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  processImages() {
    if(this.files.length > 0) {
      this.spinner.show();
      this.imgService.upload(this.files).subscribe(resp => {
        this.imgService.processing(resp).subscribe(response => {
          this.router.navigate(['/describe'], { state: { filenames: JSON.stringify(response.names) }});
          this.spinner.hide();
        }, error => {
          console.log(error);
          Swal.fire('Oops...', error, 'error');
        })      
      }, error => {
        console.log(error);
        Swal.fire('Oops...', error, 'error');
      }) 
    }else {
      Swal.fire('Oops...', 'No hay imágenes seleccionadas!', 'error')
    }
  }

}
