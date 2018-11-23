import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'angular2-cookie';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor(private http: HttpClient, private cookie: CookieService) { }
  private storenote = "http://localhost/codeigniter/remindernote";
  /**
   * to store the reminder set for the card
   * @param email to store the email of the card
   */
  reminder(email) {
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("email", email);

    return this.http.post(this.storenote, params, otheroption);
  }


}
