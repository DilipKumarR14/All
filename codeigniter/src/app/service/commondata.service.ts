import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommondataService {

private notify = new Subject<any>();
notifyObservables$ = this.notify.asObservable();
  constructor() { }
  debugger;
  public notifyOther(data:any){
    this.notify.next(data);
  }
}
