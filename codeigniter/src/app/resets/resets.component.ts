import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DatabaseService } from '../service/database.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-resets',
  templateUrl: './resets.component.html',
  styleUrls: ['./resets.component.css']
})
export class ResetsComponent implements OnInit {
  public title = "Reset Password";
  passwd = new FormControl('', [Validators.required]);
  passwd1 = new FormControl('', [Validators.required]);
  model: any = {};// fetching the value from form
  responseMessage = "";
  constructor(private service: DatabaseService, private routes: Router) { }
  getPassErrorMessage() {
    return this.passwd.hasError('required') ? 'Password is required' :
      '';
  }
  getConfErrorMessage() {
    return this.passwd1.hasError('required') ? 'Confirm Password is required' :
      '';
  }
  pass = new FormControl("", [Validators.required]);
  getPass1ErrorMessage() {
    return this.pass.hasError("required")
      ? "You must enter password"
      : "enter 6 digit password";
  }
  save() {
    var fetch = this.model;
    debugger;
    this.service.Forget(fetch).subscribe(
      // data returned will be stored in status variable
      (status: any) => {
        debugger;
        if (status.status == "1") {

          console.log("got respo", status);
          // this.responseMessage="Successfully Saved";
          alert("Email Available")
          // move to the other page after success
          this.routes.navigate(['/resets'])
        }
        else if (status.status == "null") {
          alert("Enter All Mandatory Field")
        }
        else {
          alert("Email-Id is Not Present")
        }
      }
    );
  }
  ngOnInit() {
  }

}
