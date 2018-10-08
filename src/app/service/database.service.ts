import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { NgForm } from '@angular/forms';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private http: HttpClient) { }
  mode: any = {};
  public urls = "http://localhost/codeigniter/regform";

  Register(mode) {
    const params = new FormData();
    params.append("name", mode.name);
    params.append("email", mode.email);
    params.append("mobile", mode.mobile);
    params.append("password", mode.passwd);


    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    debugger;
    return this.http.post(this.urls, params, otheroption).pipe(
      map((res: Response) => res)
    );

    // alert("Data transfered")
    // let obs=this.http.post(this.urls, params);
    //   obs.subscribe();
  }
}
