import { Component, OnInit } from '@angular/core';
import { ImageuploadService } from '../service/imageupload.service';
import { CookieService } from 'angular2-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profilepic',
  templateUrl: './profilepic.component.html',
  styleUrls: ['./profilepic.component.css']
})
export class ProfilepicComponent implements OnInit {
  fileToUpload: File;

  constructor(private imageservice:ImageuploadService,private cookie:CookieService,
    private router:Router) { }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
     
    this.fileToUpload = files.item(0);
    // console.log(this.fileToUpload);

    this.imageservice.uploadImage(this.fileToUpload,this.cookie.get("email"))
      .subscribe((status:any)=>{
         
        console.log(status);
        alert(status);
      },
      error=>{
         
        this.router.navigate(['/errorpage']);
        console.log(error.error.text)
      });
    

    alert(this.fileToUpload.name);
    
}
}
