import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(private http: HttpClient, private cookie: CookieService) { }
private url = "http://localhost/codeigniter/addLabel";
private fetch = "http://localhost/codeigniter/fetchLabel";

mode:any;
  label(mode){
    debugger;
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("label",mode.label);
    const email  = this.cookie.get("email");
    params.append("email",email)
    return this.http.post(this.url,params,otheroption);

  }
  fetchlabel(){
    debugger;
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    const email  = this.cookie.get("email");
    params.append("email",email)
    return this.http.post(this.fetch,params,otheroption);
  }
}
