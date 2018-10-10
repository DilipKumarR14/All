import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DatabaseService } from '../service/database.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.css']
})
export class LoginsComponent {
  constructor(private service: DatabaseService, private routes: Router) { }

  public title = "Login In";
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

    var fetch = this.model;               // define the function and parameter (ts)
    this.service.Login(fetch).subscribe
      (
      (status: any) => {
        debugger;
        if (status.status == "1") {

          console.log("got respo", status);
          alert("SuccessFully Saved")
          this.routes.navigate(['/logins'])
        }
        else if (status.status == "null") {
          alert("Enter All Mandatory Field")
        }
        else {
          alert("Email/Mobile is Already Present")
        }
      });
  }
}