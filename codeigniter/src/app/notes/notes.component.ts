import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NoteService } from '../service/note.service';
import { CookieService } from 'angular2-cookie';
import { error } from 'util';
import { CommondataService } from '../service/commondata.service';
import { Subscription } from 'rxjs';
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
    test: any;

    constructor(private service: NoteService, private cookie: CookieService,
        private common: CommondataService) {
        this.service.storeRefresh(this.email).subscribe((status: any) => {
            this.test = status;
        });
        // call the function recursively every 5 seconds 
        setInterval(() => {
            this.somefunc();
        }, 5000);

        this.subscribedata = common.notifyObservables$.subscribe((res) => {
            this.view = res;
        })
    }
    // function that display the note when the date and time is matched
    somefunc() {
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

    // when the close is clicked on the card for savinf to database
    save() {
        // var fetch = this.model;
        let dateFormat = require("dateformat");
        let dateformat = dateFormat(this.model.date, "dd/mm/yyyy");
        let datetime = dateformat + " " + this.model.time;
        this.service.store(this.model, this.email, datetime).subscribe(
            (status: any) => {

                this.test = status;

            }, error => {
                this.error = true;
                this.errorMsg = error.message;// error.message inbuilt method
            });
    }

    @Input() get: boolean;



    //main ends

}
