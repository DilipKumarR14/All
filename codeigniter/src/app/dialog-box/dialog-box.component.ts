import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../fundoo/fundoo.component';
import { LabelService } from '../service/label.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
  test: any;

  imgSrc = "../../assets/img/login/label.svg";
  altimg = "../../assets/img/login/delete.svg";
  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private service: LabelService) { }

  onNoClick() {
    
    this.dialogRef.close(this.items);
  }
  items: any;
  // for saving the label into db
  labels() {
    this.service.label(this.data).subscribe(
      (status: any) => {
        this.items = status;
        this.dialogRef.close(status);
      }
    );
  }
// for fetching the label 
  fetchnote(){
    this.service.fetchlabel().subscribe(
      (status:any)=>{
        this.items = status;
      }
    )
  }

  ngOnInit()
  {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.fetchnote();
  }

  // for the delete the label 
  deletelabel(id){
    this.service.delete(id).subscribe(
      (status:any)=>{
        this.items = status;
        this.dialogRef.close(status);
      }
    )
  }

  // for the edit the label

  editLabel(id,data){
    this.service.editLabel(id,data).subscribe(
      (status:any)=>{
        this.items = status;
        this.dialogRef.close(status);
      }
    )
  }

}
