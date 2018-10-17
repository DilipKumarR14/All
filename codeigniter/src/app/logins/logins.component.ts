import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DatabaseService } from '../service/database.service';
import { Router } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material";
import { NgxSpinnerService } from "ngx-spinner";

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
  constructor(private service: DatabaseService, private routes: Router,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    private spinner:NgxSpinnerService) { 

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
  email = new FormControl('', [Validators.required, Validators.email]);
  passwd = new FormControl('', [Validators.required]);
  model: any = {};// fetching the value from form
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
    this.spinner.show();
    debugger;
    var fetch = this.model;     // define the function and parameter (ts)
    this.service.Login(fetch).subscribe(
      (status: any) => {
        debugger;
        if (status.status == "1") {
          debugger;
          console.log("got respo", status);
          this.spinner.hide();
          alert("LoggedIn Succesfully")
          this.spinner.hide();
          this.routes.navigate(['/fun'])
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