import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServerConfig } from '../config/ServerConfig';
import { UploadResponse } from '../types/response/UploadResponse';
import { FileRequest } from '../types/request/FileRequest';
import { ProcessingResponse } from '../types/response/ProcessingResponse';
import { ImageResponse } from '../types/response/ImageResponse';

@Injectable({
  providedIn: 'root'
})
export class ImgproService {

  private ENPOINT_UPLOAD = "/upload";
  private ENPOINT_PROCESSING = "/processing";
  private ENPOINT_IMAGE = "/image";

  private getEnpoint(endpoint: string) {
    return `${ServerConfig.getServer()}${endpoint}` 
  }

  constructor(
    private http: HttpClient
  ) { }

  upload(files: File[]) {
    const formData: FormData = new FormData();
    files.forEach(f => {
      formData.append('images', f, f.name);
    })    
    return this.http.post<UploadResponse>(this.getEnpoint(this.ENPOINT_UPLOAD), formData);
  }

  processing(fileRequest: FileRequest) {
    return this.http.post<ProcessingResponse>(this.getEnpoint(this.ENPOINT_PROCESSING), fileRequest);
  }

  getImage(filename: string) {
    let httpParams = new HttpParams().append("filename", filename);
    return this.http.get<ImageResponse>(this.getEnpoint(this.ENPOINT_IMAGE), { params: httpParams });
  }

}
