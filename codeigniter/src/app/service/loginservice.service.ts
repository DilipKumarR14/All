import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private http: HttpClient) { }
  mode: any = {};
  public urls = "http://localhost/codeigniter/login";

  Register(mode) {
    const params = new FormData();
    params.append("email", mode.email);
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
