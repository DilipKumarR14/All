import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
// import { NgForm } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
constructor(private http:HttpClient){}
mode:any={};
public urls="http://localhost/codeigniter/regform";

  Register(mode){
    const params=new FormData();
    params.append("name",mode.name);
    params.append("email",mode.email);
    params.append("mobile",mode.mobile);
    params.append("password",mode.passwd);

    debugger;
    alert("Data transfered")
    this.http.post(this.urls,params).
    subscribe(response=>{
      console.log(response);
    },(err:HttpErrorResponse)=>{
      console.log(err)
    }
    );
  }
}
