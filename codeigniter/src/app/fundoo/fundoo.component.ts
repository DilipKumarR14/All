import { Component, Inject, OnInit } from '@angular/core';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material';
import { CommondataService } from "../service/commondata.service";
import { CookieService } from 'angular2-cookie';
import { Router } from '@angular/router';
import { LabelService } from '../service/label.service';
import { ProfilepicComponent } from '../profilepic/profilepic.component';
import { ImageuploadService } from '../service/imageupload.service';

export interface DialogData {
  label: string;
}

@Component({
  selector: 'app-fundoo',
  templateUrl: './fundoo.component.html',
  styleUrls: ['./fundoo.component.css'],
})

export class FundooComponent implements OnInit {
  label: string;
  panelOpenState = false;
  items;

  url = "";
  result = '';
  pic: boolean = false;
  constructor(public dialog: MatDialog, private commondata: CommondataService, private cookie: CookieService, private router: Router, private service: LabelService, private image: ImageuploadService) {

  }
  // // for the profile pic
  // onSelectFile(event) {

  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();

  //     reader.readAsDataURL(event.target.files[0]); // read file as data url
  //      
  //     reader.onload = (event) => {
  //        // called once readAsDataURL is completed
  //       this.url = event.target.result;
  //       this.image.uploadImage(this.url, this.cookie.get("email")).subscribe(
  //         (status: any) => {
  //           if (status.status == "true") {
  //             alert("Saved")
  //           } else {
  //             alert("NO!!!!!!!!")
  //           }
  //         }
  //       ), (error) => {
  //         alert(error.error.text)
  //       }
  //     }
  //   }
  // }




  fileToUpload:File = null;

  onSelectFile(files:FileList) {
     
    this.fileToUpload  = files.item(0);
    this.image.uploadImage(this.fileToUpload,this.cookie.get("email"))
    .subscribe(
      (status:any) => {
       this.url = status.path;
    }, error => {
        console.log(error);
        alert(error.error.text)
      });
  }





// when the profilc pic is selected
  profile() {
    this.pic = true;
  }

  getmail = this.cookie.get("email");

  imgloc: string = "../../assets/img/login/listview.svg";
  view: boolean = false;
  viewtip: string = "Grid_View";

  toggle() {
    this.view = !this.view
    if (this.view) {
      this.imgloc = "../../assets/img/login/gridview.svg";
      this.viewtip = "Grid_View";
    }
    else {
      this.imgloc = "../../assets/img/login/listview.svg";
      this.viewtip = "List_View";
    }
    //notify the commondata service true/false
    this.commondata.commonData(this.view);

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '35%',
      data: { label: this.label }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined)
        this.items = result;
    });
  }
  public changeIcon;
  icon: any = true;

  viewNote() {
    if (this.icon == true) {
      this.icon = "view_module";
    }
    else {
      this.changeIcon = "view_module";
    }
  }

  logout() {

    this.cookie.remove("email");
    localStorage.removeItem("token");
    this.router.navigate(['/logins']);
  }

  fetchnote() {
    this.service.fetchlabel().subscribe(
      (status: any) => {
        this.items = status;
      }
    )
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    this.service.fetchlabel().subscribe(
      (status: any) => {
        this.items = status;
      }
    )
     
    this.image.getPic(this.cookie.get("email")).subscribe(
      (status: any) => {
         
        this.url = status.profilepic;
      }, (error) => {
        alert(error.error.text)
      }
    )
  }

  fetchSpecificLabel(label, email) {

    this.commondata.labelForEachCard(label);

  }
  profilepic(event) {
    console.log(event);

  }

  // openDialogPic():void{
  //   const dialogRef = this.dialog.open(ProfilepicComponent, {
  //     width: '35%',
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result!=undefined)
  //     this.items = result;
  //   });
  // }




}

