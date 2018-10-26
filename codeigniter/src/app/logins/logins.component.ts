import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DatabaseService } from '../service/database.service';
import { Router } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material";
import { NgxSpinnerService } from "ngx-spinner";
import {CookieService} from 'angular2-cookie';

// import { LocalStorageService } from "ngx-webstorage";
@Component({
  selector: 'app-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.css']
})
export class LoginsComponent {
  iserror: boolean;
  errorMessage: any;
  errorstack: any;
  ValueError:any;
  constructor(private service: DatabaseService, private routes: Router,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    private spinner:NgxSpinnerService,private cookie:CookieService) { 

    iconRegistry.addSvgIcon(
    "fb",
    sanitizer.bypassSecurityTrustResourceUrl("assets/img/login/fb.svg")
    );
    iconRegistry.addSvgIcon(
    "g",
    sanitizer.bypassSecurityTrustResourceUrl("assets/img/login/g.svg")
    );
    }

  public title = "Fundoo Notes";
  // values from [formControl] in form
  email = new FormControl('', [Validators.required, Validators.email]);
  passwd = new FormControl('', [Validators.required]);
  // setLocal(){
  //   this.ls.store("user","dilip");
  // }
  model: any = {};// fetching the value from form  by [(ngModel)]
  responseMessage = "";

  getEmailErrorMessage() {

    return this.email.hasError('required') ? 'Email is required' :
      '';
  }
  getPasswordErrorMessage() {
    return this.passwd.hasError('required') ? 'password is required' :
      '';
  }
  saves() {
    // this.setLocal();
    this.spinner.show();
    debugger;
    var fetch = this.model;     // define the function and parameter (ts)
    this.cookie.put("email",this.model.email);
    this.service.Login(fetch).subscribe(
      (status: any) => {
        debugger;
        if (status.status == "1") {
          debugger;
          console.log("got respo", status);
          this.spinner.hide();
          alert("LoggedIn Succesfully")
          this.spinner.hide();
          this.routes.navigate(['/fundoo'])
        } 
        else if (status.status == "null") {
          debugger;
          this.spinner.hide();
          alert("Enter Valid Email/Password Field")
          this.spinner.hide();

        }else if( status.status == "2"){
          this.spinner.hide();

          alert("Email/Mobile is Incorrect")
          this.spinner.hide();

          // this.ValueError = "Email/Mobile is Incorrect";
        }
        else if( status.status == "3"){
          this.spinner.hide();

          alert("Validated Your EmailID")
          this.spinner.hide();

          // this.ValueError = "Email/Mobile is Incorrect";
        }
        else {
          this.spinner.hide();

          alert("InCorrect Password")
          this.spinner.hide();

          // this.ValueError = "Email/Mobile is Incorrect";
        }
      },
      error => {
        this.iserror = true;
        this.errorMessage = error.message;
        this.errorstack = error.stack;
        }
      );
  }

  // ngOnInit() {
  //   this.spinner.hide();
  //   // setTimeout(()=>{
  //   //   this.spinner.show();
  //   // },5000);
	// }
}