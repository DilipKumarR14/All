import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DatabaseService } from '../service/database.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-emailvalidate',
  templateUrl: './emailvalidate.component.html',
  styleUrls: ['./emailvalidate.component.css']
})
export class EmailvalidateComponent implements OnInit {

  public title = "";
  email = new FormControl('', [Validators.email]);

  model: any = {};// fetching the value from form
  responseMessage = "";
  constructor(private service: DatabaseService, private routes: Router) { }
 
  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Email is required' :
      '';
  }
  save() {
    var fetch = this.model; 
    debugger;
    this.service.Valid(fetch).subscribe(
      // data returned will be stored in status variable
      (status: any) => {
        debugger;
        if (status.status == "1") {
          console.log("got respo", status);
          // this.responseMessage="Successfully Saved";
          alert("Validated Successfully")
          // move to the other page after success
          this.routes.navigate(['/logins'])
        }
        else if (status.status == "null") {
          alert("Enter All Mandatory Field")
        }
        else {
          alert("Link Is Expired")
        }
      }
    );
  }
  ngOnInit() {
  }

}
