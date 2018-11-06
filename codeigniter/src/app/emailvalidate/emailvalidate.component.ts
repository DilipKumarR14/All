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
    this.service.Valid(fetch).subscribe(
      // data returned will be stored in status variable
      (status: any) => {
        if (status.status == "200") {
          console.log("got respo", status);
          alert("Validated Successfully")
          // move to the other page after success
          this.routes.navigate(['/logins'])
        }
        else if (status.status == "null") {
          alert("Enter All Mandatory Field")
        }
        else if (status.status == "304") {
          alert("Already Validated")
        }
        else if (status.status == "204") {
          alert("MailID not Found")
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
