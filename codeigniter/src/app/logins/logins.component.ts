import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DatabaseService } from '../service/database.service';
import { Router } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material";
@Component({
  selector: 'app-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.css']
})
export class LoginsComponent {
  constructor(private service: DatabaseService, private routes: Router,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { 

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
    debugger;
    var fetch = this.model;     // define the function and parameter (ts)
    this.service.Login(fetch).subscribe(
      (status: any) => {
        debugger;
        if (status.status == "1") {
          debugger;
          console.log("got respo", status);
          alert("LoggedIn Succesfully")
          this.routes.navigate(['/logins'])
        } 
        else if (status.status == "null") {
          debugger;
          alert("Enter All Mandatory Field")
        }else if( status.status == "2"){
          alert("Email/Mobile is Already Present")
        }
        else {
          alert("InCorrect Password")
        }
      });
  }
}