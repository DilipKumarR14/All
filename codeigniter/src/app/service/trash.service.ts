import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'angular2-cookie';

@Injectable({
  providedIn: 'root'
})
export class TrashService {

  constructor(private http: HttpClient, private cookie: CookieService) { }

  private storenote = "http://localhost/codeigniter/deleterecover";
  private fetch = "http://localhost/codeigniter/delete";
  private delforver = "http://localhost/codeigniter/deleteForever";
  /**
   * id of the card to recover from trash
   * @param id id the card
   */
  deleteRecover(id) {

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("id", id);

    console.log(params);
    return this.http.post(this.storenote, params, otheroption);
  }

  /**
   * to display the card in the trash component
   * @param email store the email
   */
  storeRefresh(email) {
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'

    }
    const params = new FormData();
    params.append("email", email);
    return this.http.post(this.fetch, params, otheroption);
  }
  /**
   * to delete the card forever
   * @param id store the id of the card
   */
  deleteForever(id) {
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'

    }
    const params = new FormData();
    params.append("id", id);
    return this.http.post(this.delforver, params, otheroption);
  }

}
