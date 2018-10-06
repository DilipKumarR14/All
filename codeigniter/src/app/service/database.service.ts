import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
constructor(private http:HttpClient){}
mode:any={};
public urls="http://localhost/codeigniter/regform";
// var values={
//   name:mode.name,

// }
  Register(mode){
    alert("data transfered")
    this.http.get(this.urls,mode).
    subscribe(response=>{
      console.log(response);
    },(err:HttpErrorResponse)=>{
      console.log(err)
    }
    );
  }
}
