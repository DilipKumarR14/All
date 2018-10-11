import { Component, OnInit } from '@angular/core';
import {FormControl,Validators } from '@angular/forms';
import { DatabaseService } from '../service/database.service';
import { Router } from '@angular/router';
@Component({
	selector: 'app-forget',
	templateUrl: './forget.component.html',
	styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

	public title="Forget Password";
email = new FormControl('',[Validators.required,Validators.email]);
model : any = {};// fetching the value from form
responseMessage="";
	constructor(private service:DatabaseService,private routes:Router) { }
	getErrorMessage(){  
		return this.email.hasError('required') ? 'Email is required':
		'';
	}
	save()
{
	var fetch = this.model;          // define the function and parameter (ts)
    this.service.Forget(fetch).subscribe
      (
      (status: any) => {
        debugger;
        if (status.status == "1") {

          console.log("got respo", status);
          alert("Check Your EMail")
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
	ngOnInit() {
	}

}
