import { Component, OnInit, Inject, Input, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../notes/notes.component';
import { NoteService } from '../service/note.service';
import { CookieService } from 'angular2-cookie';
import { CommondataService } from '../service/commondata.service';
import { Subscription } from 'rxjs';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material';
declare let require: any;
let dateFormat = require("dateformat");

@Component({
  selector: 'app-updatecard',
  templateUrl: './updatecard.component.html',
  styleUrls: ['./updatecard.component.css']
})
export class UpdatecardComponent implements OnInit {

  private subscribedata: Subscription;
  email = this.cookie.get("email");
  public color: string;
  public now: Date = new Date();
  gridview: boolean = false;
  reminderenable: boolean = false;
  time = "";
  res = false;
  // for fetch the cards
  test: any;
  view: any;
  exp: boolean;
  model: any = {};
  currentDateAndTime: string;
  currenttime: any;
  timer_button: boolean;
  timer_panel: boolean;
  cardmenu: boolean = false;
  idstore: any;
  date = "";;

  settime() {
    this.time = "Select Time ";
    this.res = true;
  }
  // when the button is clicked on time setting for tomorrow
  settimetomo() {
    this.time = "Tomorrow 8.00PM";
  }
  // when the button is clicked on time setting for next week
  settimeweek() {
    this.time = "Next Week 8.00PM"
  }


  constructor(public dialogRef: MatDialogRef<UpdatecardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private service: NoteService, private cookie: CookieService,
    private common: CommondataService, ) {
    // import is required from particular component
    // receiving the result from the notescomponent

    this.service.storeRefresh(this.email).subscribe((status: any) => {
      this.test = status;
    });
    // call the function recursively every 5 seconds 

    setInterval(() => {
      this.dateformater();
    }, 5000);

    //common data shared by the subject in commondataservice
    this.subscribedata = this.common.notifyObservables$.subscribe((res) => {
      this.view = res;
    })
  }

  // function that display the note when the date and time is matched
  dateformater() {
    this.test.forEach(element => {
      // dateformat need to be installed 
      let dateFormat = require('dateformat');
      let now = new Date();
      // fetch the today time
      let todaytime = dateFormat(now, "dd/mm/yyyy hh:MM tt");
      // let res = dateFormat(element.time,"hh:MM tt");
      // checks the today date and time with db time and date
      if (todaytime == element.date) {
        alert("remainder")
      }
      else {
        return;
      }
    });
  }

  ngOnInit() {
    //once the page is reloaded data is fetched 

    this.service.storeRefresh(this.email).subscribe((status: any) => {
      this.test = status;
    });

  }

  // close the popup box afetr edititng
  onNoClick(): void {

    this.dialogRef.close();
  }
  //change the color
  setColor(idcard, colorcard) {


    this.service.updateTheCard(idcard, colorcard).subscribe(
      (status: any) => {
        status = this.test;
      });

    this.test.forEach(element => {

      if (element.id == idcard) {
        return element.colorcode = colorcard;
      }
      else {
        return;
      }
    });
  }

  // used for display and selecting the date and time under the particular card
  // for list view
  viewcard() {
    this.cardmenu = true;
  }

  // for close the card after time and date is selected
  //for list view
  editReminder(id) {

    this.cardmenu = false;
    let currentDate = dateFormat(this.model.date, "dd/mm/yyyy");
    let result = currentDate + " " + this.model.time;
    this.data.datas.date = result;
    this.service.popUpdateReminder(id, this.data.datas).subscribe();
  }
  deleteNote(id) {

    this.service.deleteNote(id).subscribe(
      (status: any) => {

        this.dialogRef.close(status);
      }
    );

  }

  save(datas) {

    this.service.saveData(datas).subscribe();
    this.dialogRef.close();
  }




  //main ends
}
