import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServerConfig } from '../config/ServerConfig';
import { UploadResponse } from '../types/response/UploadResponse';
import { FileRequest } from '../types/request/FileRequest';
import { ProcessingResponse } from '../types/response/ProcessingResponse';
import { ImageResponse } from '../types/response/ImageResponse';
import { CompressResponse } from '../types/response/CompressResponse';

@Injectable({
  providedIn: 'root'
})
export class ImgproService {

  private ENDPOINT_UPLOAD = "/upload";
  private ENDPOINT_PROCESSING = "/processing";
  private ENDPOINT_IMAGE = "/image";
  private ENDPOINT_COMPRESS = "/compress";

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
    return this.http.post<UploadResponse>(this.getEnpoint(this.ENDPOINT_UPLOAD), formData);
  }

  processing(fileRequest: FileRequest) {
    return this.http.post<ProcessingResponse>(this.getEnpoint(this.ENDPOINT_PROCESSING), fileRequest);
  }

  getImage(filename: string) {
    let httpParams = new HttpParams().append("filename", filename);
    return this.http.get<ImageResponse>(this.getEnpoint(this.ENDPOINT_IMAGE), { params: httpParams });
  }

  compress(fileRequest: FileRequest) {
    return this.http.post<CompressResponse>(this.getEnpoint(this.ENDPOINT_COMPRESS), fileRequest);
  }

}
