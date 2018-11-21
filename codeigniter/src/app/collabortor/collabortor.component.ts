import { Component, OnInit, Inject } from '@angular/core';
import { CookieService } from 'angular2-cookie';
import { Router } from '@angular/router';
import { CollaboratorService } from '../service/collaborator.service';
import { DialogData } from '../notes/notes.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UpdatecardComponent } from '../updatecard/updatecard.component';

@Component({
    selector: 'app-collabortor',
    templateUrl: './collabortor.component.html',
    styleUrls: ['./collabortor.component.css']
})
export class CollabortorComponent implements OnInit {
    i: any;
    test: any;


    constructor(public dialogRef: MatDialogRef<UpdatecardComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData, private cookie: CookieService, private router: Router,
        private collabservice: CollaboratorService) { }


        
    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
            //Add 'implements OnInit' to the class.
            
        this.collabservice.getOwner(this.data.datas.id).subscribe(
            (status: any) => {
                if (status == "") {
                    this.owner = this.cookie.get("email")
                } else {
                    this.owner = status[0].owner;
                }
            }, error => {
                console.log(error)
            }
        );

        this.getCollabEmail();
          
    }
    model: any;
    owner: any;
    collab: boolean = true;
    // res = this.dialogRef.afterClosed();
    ownerid: any;
    /**
     * @description to show the collabs in the below cards
     */
    saveCollab(model, id) {
        //  
        // this.ownerid = id;
        // this.collabservice.getEmail(model, id, this.owner).subscribe(
        //     (status: any) => {
        //         if(status.res == "200"){
        //              
        //             alert("Success")
        //             this.dialogRef.close(status.allemail)
        //         }else{
        //              
        //             alert("Error")
        //         }
        //     }, error => {
        //         console.log(error);
        //         this.router.navigate(['/errorpage']);
        //  }
        // )
        this.collabservice.getDisplayCollab(this.test).subscribe(
            (status: any) => {
                  this.dialogRef.close(status)
            }
        )

    }
    emails: any;
    allemail: any = [];

    /**
     * @description to get all the collab and to check the owner/or not , 
     * invalid email or not
     * @param email store thhe email id entred by the user
     * @param id store the id of the card
     */
    getAll(email, id) {
         
        this.collabservice.checkmail(email, id).subscribe(
            (status: any) => {
                 
                if (status.status == "true") {
                    this.emails = status.email;
                    // return the result back to note componet to display
                    this.dialogRef.close(this.emails)
                    
                }else if(status.status == "notaowner"){
                    alert("Your Are Not A Owner of Card")
                }else if (status.status == "owner"){
                    alert("Owner Cant Be Added")
                } else if(status.status == "invalidemail"){
                    alert("Invalid EMAIL")
                }
            }
        );
    }
    // to get all collabed email
    /**
     * @description to get all the collab email and display in thhe note card
     */
    collabmail: any;
    getCollabEmail() {
        this.collabservice.getCollabedEmail(this.data.datas.id).subscribe(
            (status: any) => {
                 
                this.collabmail = status.email;
            }
        );
    }
    // for delete particulae emailid from card collabed
    /**
     * @description to delete the collab email in the card
     * @param id store the id of the card
     * @param email store thhe email id entred by the user
     */
    collabDelete(id, email) {
         
        // if(this.cookie.get("email") == email){
             
        this.collabservice.deleteCollabEmail(id, email).subscribe(
            (status: any) => {
                if(status.status == "true" && status.status!="nap"){
                    this.collabmail = status.email;
                    this.dialogRef.close(this.collabmail)
                }else if (status.status == "nap"){
                    alert("Can't Be Deleted")
                }else if(status.status == "deletemyself"){
                    alert("Delete Yourself")
                    this.collabmail = status.email;
                    // to pass to the note component 
                    this.dialogRef.close(this.collabmail)
                }else{
                    this.router.navigate(['/errorpage'])
                }
                this.dialogRef.close(this.collabmail);
            },(error)=>{
                alert(error.error.text)
            }
        );
        // }else{
        //      
        //     alert("NOt Allowed")
        // }
     
    }

    // for cancel button

    collabClose() {
        this.dialogRef.close();
    }

}
