import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImgproService } from '../services/imgpro.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(
    private imgService: ImgproService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  files: File[] = [];

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  processImages() {
    this.imgService.upload(this.files).subscribe(resp => {
      this.imgService.processing(resp).subscribe(response => {
        this.router.navigate(['/describe'], { state: { filenames: JSON.stringify(response.names) }});
      })      
    }) 
  }

}
