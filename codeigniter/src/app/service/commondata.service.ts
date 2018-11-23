import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * @description send the message to an observable which are sent to all angular 
 *  component that subscribes of the observable
 * 
 */
export class CommondataService {

  private sendData = new Subject<any>();
  private cardLabel = new Subject<any>();
  notifyObservables$ = this.sendData.asObservable();
  cardLabelObservables$ = this.cardLabel.asObservable();
  constructor() { }
  /**
   * @param data 
   * method present in fundoo component
   */
  public commonData(data: any) {
    //manual send the broadcast data from subject
    this.sendData.next(data);
  }
  /**
   * @method labelForEachCard
   * @param label 
   * return the label of each card
   */
  public labelForEachCard(label: any) {
    this.cardLabel.next(label);
  }


}
