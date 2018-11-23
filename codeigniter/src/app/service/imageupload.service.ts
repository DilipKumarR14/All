import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'angular2-cookie';

@Injectable({
  providedIn: 'root'
})
export class ImageuploadService {

  constructor(private http: HttpClient, private cookie: CookieService) { }
  private imageurl = "http://localhost/codeigniter/image";
  /**
   * to upload the image for the profile picture
   * @param fileToUpload image file to be stored in db
   * @param email 
   */
  uploadImage(fileToUpload: File, email) {

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("fileKey", fileToUpload, fileToUpload.name);
    params.append("email", email);
    return this.http.post(this.imageurl, params, otheroption);
  }

  private pic = "http://localhost/codeigniter/getpics";

  /**
   * to get the profile picture when the 
   * @param email to store the email
   */
  getPic(email) {

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("email", email);
    return this.http.post(this.pic, params, otheroption);

  }

  postFile(fileToUpload: File) {

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const endpoint = 'http://localhost/codeigniter/getpics';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    formData.append("email", this.cookie.get("email"));
    return this.http.post(endpoint, formData, otheroption)
  }
}
