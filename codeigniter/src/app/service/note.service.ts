import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CookieService } from 'angular2-cookie';
import { Observable } from 'rxjs';
import { DatabaseService } from './database.service';
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  res = "";
  email = "";
  constructor(private http: HttpClient, private cookie: CookieService, private dbs: DatabaseService) { }
  mode: any = {};

  private storenote = "http://localhost/codeigniter/note";
  private fetch = "http://localhost/codeigniter/fetch";
  private colorurl = "http://localhost/codeigniter/color";
  private resultcard = "http://localhost/codeigniter/resultcard";
  store(mode5, email, datetime, color) {
    debugger;
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("email", email);
    params.append("title", mode5.title);
    params.append("note", mode5.note);
    params.append("date", datetime);
    params.append("color", color)
    console.log(params);

    // return this.http.post(this.storenote, params, otheroption).pipe(
    //   map((res: Response) => res)
    // )

    return this.http.post(this.storenote, params, otheroption);
  }

  storeRefresh(email) {
    debugger;
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'

    }
    const params = new FormData();
    params.append("email", email);

    // return this.http.post(this.fetch, params, otheroption).pipe(
    //   map((res: Response) => res)
    // )
    return this.http.post(this.fetch, params, otheroption);

  }

  updateTheCard(idcard, colorcard) {

    debugger;
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("idcard", idcard);
    params.append("colorcard", colorcard);
    return this.http.post(this.colorurl, params, otheroption);

  }
  //updating the note on db when card title and note is changed
  updateNoteDb(idcard, model) {
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("idcard", idcard);
    params.append("colorcard", model.note);
    params.append("colorcard", model.title);
    return this.http.post(this.colorurl, params, otheroption)
  }    

  updateReminder(id, model) {
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("idcard", id);
    params.append("date", model);
    return this.http.post(this.resultcard, params, otheroption)
  }


  //main ends
}

