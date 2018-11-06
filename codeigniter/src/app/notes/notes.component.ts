import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NoteService } from '../service/note.service';
import { CookieService } from 'angular2-cookie';
import { CommondataService } from '../service/commondata.service';
import { Subscription } from 'rxjs';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material';
import { UpdatecardComponent } from '../updatecard/updatecard.component';
declare let require: any;
@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

    public title = new FormControl();
    public note = new FormControl();
    public temp = false;

    private subscribedata: Subscription;

    email = this.cookie.get("email");
    time = "";
    model: any = {};
    res2 = "";
    exp = false;
    res = false;
    public date = new Date();
    errorMsg: any;
    error: boolean = false;
    public datemsg = Date.now().toString();
    // myDate: Date;
    // myTime: Date;
    titles = document.getElementById("title");
    notes = document.getElementById("note");
    view: any;
    test: any;
    public count = this.test;

    // for colors variable

    public color: string;

    public now: Date = new Date();
    gridview: boolean = false;

    // when the button is clicked on time setting later today
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
    maincard: boolean = true;
    expcard: boolean = false;
    displaycard: boolean = true;

    constructor(private service: NoteService, private cookie: CookieService,
        private common: CommondataService, public dialog: MatDialog) {
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

    imageUpload($event) {

    }

    OnDestroy() {

    }

    expan() {
        this.exp = true;
    }
    expanclose() {
        this.exp = false;
    }
    ngOnInit() {
        //once the page is reloaded data is fetched 
        debugger;
        this.service.storeRefresh(this.email).subscribe((status: any) => {
            this.test = status;
        });

    }
    matcardVisbility() {
        this.maincard = false;
        this.expcard = true;
    }
    expcardVisibiilty() {
        this.expcard = false;
        this.maincard = true;
    }


    closeReminder() {
        this.res = false;
    }


    // when the close is clicked on the card for savinf to database
    save() {
        debugger;
        let dateFormat = require("dateformat");
        let dateformat = dateFormat(this.model.date, "dd/mm/yyyy");
        let datetime = dateformat + " " + this.model.time;
        this.service.store(this.model, this.email, datetime, this.color).subscribe(
            (status: any) => {
                debugger;
                if (status.status == 404 || status.status == 204) {
                    alert("UnAuthorised User !!!");
                } else {
                    this.test = status;
                }


            }, error => {
                this.error = true;
                this.errorMsg = error.message;// error.message inbuilt method
            });

        this.model.title = null;
        this.model.note = null;
        this.color = null;
        this.model.time = "";
        this.model.date = "";
    }

    //change the color
    setColor(idcard, colorcard) {

        debugger;
        this.service.updateTheCard(idcard, colorcard).subscribe();

        this.test.forEach(element => {
            debugger;
            if (element.id == idcard) {
                return element.colorcode = colorcard;
            }
            else {
                return;
            }
        });
    }



    updateNote(idcard, model) {
        this.service.updateNoteDb(idcard, model).subscribe(
            (status: any) => {
                alert("status returned")
                this.test = status;
            }
        )
    }

    public sendupdatecard = "";
    openDialog(dat): void {
        const dialogRef = this.dialog.open(UpdatecardComponent, {
            width: '46%',
            height: '23%',
            data: { se: dat }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }






    //main ends

}
